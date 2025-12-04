/**
 * Health Check Endpoint
 * =====================
 * 
 * Returns server status for infrastructure and monitoring.
 * 
 * GET /api/health → { status: 'ok', timestamp: ISO string, appId: string | null }
 * 
 * Use cases:
 * - Load balancer health checks
 * - Uptime monitoring (e.g., Better Stack, Pingdom)
 * - Deployment verification
 * - App identity verification (via appId)
 * 
 * The appId field enables the deployment status check to verify
 * that production is running the same app as local development.
 */

import { NextResponse } from 'next/server'

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

type HealthResponse = {
  status: 'ok'
  timestamp: string
  appId: string | null
}

// -----------------------------------------------------------------------------
// Route Handler
// -----------------------------------------------------------------------------

export async function GET(): Promise<NextResponse<HealthResponse>> {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    appId: process.env.APP_ID ?? null,
  })
}
