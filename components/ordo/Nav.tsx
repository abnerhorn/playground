/**
 * Ordo Navigation Component
 * =========================
 * 
 * Responsive navigation for the customer-facing website.
 * Shows hamburger menu on mobile, full nav on desktop.
 * 
 * Usage:
 * <Nav>
 *   <NavLink href="/schools">Schools</NavLink>
 *   <NavLink href="/menu">Our Menu</NavLink>
 * </Nav>
 */

'use client'

import { ReactNode, useState, HTMLAttributes, AnchorHTMLAttributes } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils/cn'
import { Button } from './Button'

interface NavProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode
  logo?: ReactNode
  ctaText?: string
  ctaHref?: string
  secondaryCtaText?: string
  secondaryCtaHref?: string
}

/**
 * Nav - Main navigation component
 */
export function Nav({ 
  children, 
  className,
  logo,
  ctaText = 'Request a Quote',
  ctaHref = '/contact',
  secondaryCtaText = 'Log In',
  secondaryCtaHref = '/auth/signin',
  ...props 
}: NavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav
      className={cn(
        'sticky top-0 z-50',
        'h-[var(--ordo-nav-height)]',
        'bg-white/95 backdrop-blur-md',
        'border-b border-ordo-divider',
        className
      )}
      {...props}
    >
      <div className="ordo-container h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <div className="flex-shrink-0">
            {logo || <OrdoLogo />}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden desktop:flex items-center gap-ordo-xl">
            {children}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden desktop:flex items-center gap-ordo-md">
            <Button asChild>
              <Link href={ctaHref}>{ctaText}</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href={secondaryCtaHref}>{secondaryCtaText}</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="desktop:hidden p-2 -mr-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <CloseIcon className="w-6 h-6 text-ordo-neutral-500" />
            ) : (
              <MenuIcon className="w-6 h-6 text-ordo-neutral-500" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="desktop:hidden absolute top-full left-0 right-0 bg-white border-b border-ordo-divider shadow-ordo-lg">
          <div className="ordo-container py-ordo-lg">
            <div className="flex flex-col gap-ordo-md">
              {children}
            </div>
            
            <div className="flex flex-col gap-ordo-sm mt-ordo-lg pt-ordo-lg border-t border-ordo-divider">
              <Button fullWidth asChild>
                <Link href={ctaHref}>{ctaText}</Link>
              </Button>
              <Button variant="secondary" fullWidth asChild>
                <Link href={secondaryCtaHref}>{secondaryCtaText}</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

interface NavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: ReactNode
  active?: boolean
}

/**
 * NavLink - Individual navigation link
 */
export function NavLink({ 
  href, 
  children, 
  className,
  active = false,
  ...props 
}: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'font-body text-ordo-sm font-normal',
        'text-ordo-neutral-500',
        'hover:text-ordo-primary-300',
        'transition-colors duration-150',
        'py-ordo-sm desktop:py-0',
        active && 'text-ordo-primary-300 font-medium',
        className
      )}
      {...props}
    >
      {children}
    </Link>
  )
}

/**
 * OrdoLogo - Default Ordo logo
 */
export function OrdoLogo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn('flex items-center gap-2', className)}>
      <div className="w-8 h-8 rounded-lg bg-ordo-primary-300 flex items-center justify-center">
        <span className="text-white font-bold text-sm">O</span>
      </div>
      <span className="font-body font-semibold text-ordo-neutral-500 text-lg">
        ordo
      </span>
    </Link>
  )
}

// Icons
function MenuIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor" 
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor" 
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

// Make Button accept asChild prop for Link composition
declare module './Button' {
  interface ButtonProps {
    asChild?: boolean
  }
}

