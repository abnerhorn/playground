/**
 * Deploy Banner
 * =============
 * 
 * Development-only banner that prompts users to deploy their app.
 * 
 * Visibility rules:
 * - Hidden in production (NODE_ENV === 'production')
 * - Hidden on /deploy/* routes (already viewing the guide)
 * - Hidden once deployment is confirmed (APP_ID match at production URL)
 * 
 * The deployment check runs in the background and caches results
 * to avoid repeated network requests.
 */

'use client'

import { useState, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

const STORAGE_KEY = 'deploy-banner-status'
const CACHE_TTL_MS = 60 * 60 * 1000 // 1 hour
const FETCH_TIMEOUT_MS = 5000 // 5 seconds

const HIDDEN_PATH_PREFIXES = ['/deploy'] as const

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

type CachedStatus = {
  deployed: boolean
  cachedAt: number
}

type DeploymentStatusResponse = {
  deployed: boolean
  reason?: string
}

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

function isDevEnvironment(): boolean {
  return process.env.NODE_ENV === 'development'
}

function shouldHideForPath(pathname: string | null): boolean {
  if (!pathname) return false
  return HIDDEN_PATH_PREFIXES.some(prefix => pathname.startsWith(prefix))
}

function getCachedStatus(): CachedStatus | null {
  if (typeof window === 'undefined') return null
  
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    
    const cached = JSON.parse(raw) as CachedStatus
    const isExpired = Date.now() - cached.cachedAt > CACHE_TTL_MS
    
    return isExpired ? null : cached
  } catch {
    return null
  }
}

function setCachedStatus(deployed: boolean): void {
  if (typeof window === 'undefined') return
  
  const status: CachedStatus = {
    deployed,
    cachedAt: Date.now(),
  }
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(status))
  } catch {
    // Storage full or unavailable — fail silently
  }
}

async function fetchDeploymentStatus(signal: AbortSignal): Promise<DeploymentStatusResponse> {
  const response = await fetch('/api/deployment-status', { signal })
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }
  
  return response.json()
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function DeployBanner() {
  const pathname = usePathname()
  const [isDeployed, setIsDeployed] = useState<boolean>(() => {
    // Check cache on initial render to avoid flash
    const cached = getCachedStatus()
    return cached?.deployed ?? false
  })

  const checkDeploymentStatus = useCallback(async (controller: AbortController) => {
    // Skip if we already know it's deployed
    const cached = getCachedStatus()
    if (cached?.deployed) {
      setIsDeployed(true)
      return
    }

    try {
      const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
      const data = await fetchDeploymentStatus(controller.signal)
      clearTimeout(timeoutId)
      
      setCachedStatus(data.deployed)
      
      if (data.deployed) {
        setIsDeployed(true)
      }
    } catch (error) {
      // Silently fail — keep showing banner on network errors
      if (error instanceof Error && error.name !== 'AbortError') {
        console.debug('[DeployBanner] Status check failed:', error.message)
      }
    }
  }, [])

  useEffect(() => {
    if (!isDevEnvironment()) return

    const controller = new AbortController()
    checkDeploymentStatus(controller)

    return () => controller.abort()
  }, [checkDeploymentStatus])

  // Early returns for visibility rules
  if (!isDevEnvironment()) return null
  if (shouldHideForPath(pathname)) return null
  if (isDeployed) return null

  return (
    <div 
      className="bg-gradient-to-r from-primary to-green-500 text-primary-foreground"
      role="banner"
      aria-label="Deployment guide available"
    >
      <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
        <span className="text-sm font-medium">
          Built-in deployment guide included.
        </span>
        <Link 
          href="/deploy" 
          className="text-sm font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-white/50 rounded"
        >
          View the Deploy Guide →
        </Link>
      </div>
    </div>
  )
}
