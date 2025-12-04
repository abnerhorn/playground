/**
 * Deployment Status Endpoint
 * ==========================
 * 
 * Determines if the production deployment is live and matches this app.
 * 
 * Detection flow:
 * 1. Verify NEXT_PUBLIC_SITE_URL is configured with a real domain
 * 2. Verify APP_ID is set locally (from launch wizard)
 * 3. Ping production's /api/health endpoint
 * 4. Compare APP_ID to confirm it's the same app
 * 
 * Used by DeployBanner to auto-hide once production is live.
 * 
 * GET /api/deployment-status → { deployed: boolean, reason: string }
 */

import { NextResponse } from 'next/server'

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

const HEALTH_ENDPOINT = '/api/health'
const FETCH_TIMEOUT_MS = 10_000 // 10 seconds
const LOCALHOST_PATTERNS = ['localhost', '127.0.0.1', '0.0.0.0'] as const

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

type DeploymentStatus = {
  deployed: boolean
  reason: string
}

type HealthResponse = {
  status: string
  appId?: string | null
  timestamp?: string
}

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

function createResponse(deployed: boolean, reason: string): NextResponse<DeploymentStatus> {
  return NextResponse.json({ deployed, reason })
}

function isLocalhost(url: string): boolean {
  const lowered = url.toLowerCase()
  return LOCALHOST_PATTERNS.some(pattern => lowered.includes(pattern))
}

function buildHealthUrl(baseUrl: string): string {
  const normalized = baseUrl.replace(/\/+$/, '') // Remove trailing slashes
  return `${normalized}${HEALTH_ENDPOINT}`
}

async function fetchWithTimeout(
  url: string, 
  timeoutMs: number
): Promise<Response> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 
        'Accept': 'application/json',
        'User-Agent': 'DeploymentStatusCheck/1.0',
      },
      signal: controller.signal,
      cache: 'no-store',
      redirect: 'follow', // Allow redirects (e.g., http→https)
    })
    return response
  } finally {
    clearTimeout(timeoutId)
  }
}

// -----------------------------------------------------------------------------
// Route Handler
// -----------------------------------------------------------------------------

export async function GET(): Promise<NextResponse<DeploymentStatus>> {
  const productionUrl = process.env.NEXT_PUBLIC_SITE_URL
  const localAppId = process.env.APP_ID

  // Validation: Production URL must be configured
  if (!productionUrl) {
    return createResponse(false, 'NEXT_PUBLIC_SITE_URL not configured')
  }

  // Validation: Must not be localhost
  if (isLocalhost(productionUrl)) {
    return createResponse(false, 'NEXT_PUBLIC_SITE_URL points to localhost')
  }

  // Validation: APP_ID must exist (set by launch wizard)
  if (!localAppId) {
    return createResponse(false, 'APP_ID not configured (run launch wizard first)')
  }

  const healthUrl = buildHealthUrl(productionUrl)

  try {
    const response = await fetchWithTimeout(healthUrl, FETCH_TIMEOUT_MS)

    if (!response.ok) {
      return createResponse(
        false, 
        `Production health check returned ${response.status}`
      )
    }

    let health: HealthResponse
    try {
      health = await response.json()
    } catch {
      return createResponse(false, 'Production health endpoint returned invalid JSON')
    }

    // Verify it's the same app
    if (!health.appId) {
      return createResponse(false, 'Production missing APP_ID in health response')
    }

    if (health.appId !== localAppId) {
      return createResponse(false, 'APP_ID mismatch — different app at production URL')
    }

    return createResponse(true, 'Production deployed and verified')

  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return createResponse(false, 'Production health check timed out')
      }
      return createResponse(false, `Cannot reach production: ${error.message}`)
    }
    return createResponse(false, 'Cannot reach production: Unknown error')
  }
}
