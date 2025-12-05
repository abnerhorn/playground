/**
 * Root Layout
 * ===========
 * 
 * The root layout wraps all pages with:
 * - Global CSS
 * - Font (Inter)
 * - Providers (Session, Theme)
 * - Metadata defaults
 */

import './globals.css'
import { Inter, Noto_Serif, Outfit } from 'next/font/google'
import { Providers } from './providers'
import { Metadata } from 'next'
import { SITE } from '@/lib/site-config'
import { DeployBanner } from '@/components/DeployBanner'

const inter = Inter({ subsets: ['latin'] })

// Ordo design system fonts
const notoSerif = Noto_Serif({ 
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-noto-serif',
  display: 'swap',
})

const outfit = Outfit({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-outfit',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: SITE.name,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${notoSerif.variable} ${outfit.variable}`}>
        <DeployBanner />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

