/**
 * Type-Safe Environment Variables
 * ================================
 *
 * Uses @t3-oss/env-nextjs for runtime validation and type safety.
 * Import `env` from this file instead of using process.env directly.
 *
 * Benefits:
 * - Build-time validation catches missing variables
 * - TypeScript autocomplete for all env vars
 * - Runtime validation in development
 * - Clear documentation of required vs optional variables
 *
 * Usage:
 *   import { env } from '@/lib/env'
 *   const url = env.NEXT_PUBLIC_SITE_URL
 */

import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  /**
   * Server-side environment variables schema.
   * These are only available on the server.
   */
  server: {
    // Database
    DATABASE_URL: z.string().url().optional(),

    // Authentication (NextAuth.js)
    AUTH_SECRET: z.string().min(1).optional(),
    GOOGLE_CLIENT_ID: z.string().min(1).optional(),
    GOOGLE_CLIENT_SECRET: z.string().min(1).optional(),

    // Admin setup
    ADMIN_EMAIL: z.string().email().optional(),
    ADMIN_NAME: z.string().optional(),

    // Environment
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  },

  /**
   * Client-side environment variables schema.
   * These are exposed to the browser (prefix with NEXT_PUBLIC_).
   */
  client: {
    NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
    NEXT_PUBLIC_CONTACT_EMAIL: z.string().email().optional(),
  },

  /**
   * Runtime environment variables.
   * Map environment variables to the schema.
   */
  runtimeEnv: {
    // Server
    DATABASE_URL: process.env.DATABASE_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_NAME: process.env.ADMIN_NAME,
    NODE_ENV: process.env.NODE_ENV,

    // Client
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_CONTACT_EMAIL: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
  },

  /**
   * Skip validation in certain environments.
   * Useful for Docker builds where env vars aren't available.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,

  /**
   * Allow empty strings for optional variables.
   */
  emptyStringAsUndefined: true,
});

