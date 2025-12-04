/**
 * Launch Wizard API
 * 
 * POST — Generate project files from wizard input
 * 
 * Development only. Does NOT delete anything - the generated prompt
 * tells Cursor to clean up template files as part of building.
 */

import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import {
  type LaunchData,
  generateBuildMd,
  generateReadme,
  generateSiteConfig,
  generateCursorPrompt,
  generateTomorrowMd,
  generateFutureMd,
} from './templates'

// -----------------------------------------------------------------------------
// Config
// -----------------------------------------------------------------------------

const IS_DEV = process.env.NODE_ENV === 'development'
const PROJECT_ROOT = process.cwd()

const GENERATED_FILES: Record<string, (data: LaunchData) => string> = {
  'plans/BUILD.md': generateBuildMd,
  'lib/site-config.ts': generateSiteConfig,
  'README.md': generateReadme,
  'plans/Tomorrow.md': generateTomorrowMd,
  'plans/Future.md': generateFutureMd,
}

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

type ApiResponse<T = unknown> = { success: true } & T | { success: false; error: string }

function json<T>(data: ApiResponse<T>, status = 200): NextResponse {
  return NextResponse.json(data, { status })
}

function forbidden(message = 'Development only'): NextResponse {
  return json({ success: false, error: message }, 403)
}

function badRequest(message: string): NextResponse {
  return json({ success: false, error: message }, 400)
}

function serverError(message: string): NextResponse {
  return json({ success: false, error: message }, 500)
}

function validateLaunchData(data: unknown): data is LaunchData {
  if (!data || typeof data !== 'object') return false
  const d = data as Record<string, unknown>
  return (
    typeof d.projectName === 'string' && d.projectName.trim().length > 0 &&
    typeof d.tagline === 'string' && d.tagline.trim().length > 0 &&
    typeof d.appDescription === 'string' && d.appDescription.trim().length >= 20
  )
}

async function writeFile(relativePath: string, content: string): Promise<void> {
  const fullPath = path.join(PROJECT_ROOT, relativePath)
  await fs.mkdir(path.dirname(fullPath), { recursive: true })
  await fs.writeFile(fullPath, content, 'utf-8')
}

// -----------------------------------------------------------------------------
// POST — Generate Files
// -----------------------------------------------------------------------------

export async function POST(request: Request) {
  if (!IS_DEV) return forbidden()

  let data: unknown
  try {
    data = await request.json()
  } catch {
    return badRequest('Invalid JSON')
  }

  if (!validateLaunchData(data)) {
    return badRequest('Missing required fields: projectName, tagline, appDescription (min 20 chars)')
  }

  try {
    const filesModified: string[] = []
    
    for (const [filePath, generator] of Object.entries(GENERATED_FILES)) {
      await writeFile(filePath, generator(data))
      filesModified.push(filePath)
    }

    return json({
      success: true,
      filesModified,
      cursorPrompt: generateCursorPrompt(data),
    })
  } catch (error) {
    console.error('[launch] Generation failed:', error)
    return serverError('Failed to generate project files')
  }
}
