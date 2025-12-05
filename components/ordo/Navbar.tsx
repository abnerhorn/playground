'use client'

/**
 * Ordo Navbar Component
 * =====================
 * 
 * Responsive navigation for the customer-facing website.
 * Desktop: Full horizontal nav with links
 * Mobile: Logo + hamburger menu with slide-out drawer
 */

import { cn } from '@/lib/utils/cn'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button, IconButton } from './Button'
import { Container } from './Container'

// ============================================
// TYPES
// ============================================

interface NavLink {
  label: string
  href: string
}

interface NavbarProps {
  logo?: React.ReactNode
  links?: NavLink[]
  ctaLabel?: string
  ctaHref?: string
  secondaryCtaLabel?: string
  secondaryCtaHref?: string
  className?: string
}

// ============================================
// ICONS
// ============================================

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg className={cn('w-6 h-6', className)} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={cn('w-6 h-6', className)} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

// ============================================
// DEFAULT LOGO
// ============================================

function OrdoLogo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn('flex items-center gap-2', className)}>
      <div className="w-8 h-8 tablet:w-10 tablet:h-10 rounded-lg bg-ordo-primary-300 flex items-center justify-center text-ordo-white font-bold text-sm tablet:text-base">
        O
      </div>
      <span className="font-body font-semibold text-ordo-neutral-500 text-lg tablet:text-xl">
        ordo
      </span>
    </Link>
  )
}

// ============================================
// DEFAULT LINKS
// ============================================

const defaultLinks: NavLink[] = [
  { label: 'Schools', href: '/schools' },
  { label: 'Our menus', href: '/menus' },
  { label: 'Case studies', href: '/case-studies' },
  { label: 'Announcements', href: '/announcements' },
]

// ============================================
// NAVBAR COMPONENT
// ============================================

export function Navbar({
  logo,
  links = defaultLinks,
  ctaLabel = 'Request a Quote',
  ctaHref = '/contact',
  secondaryCtaLabel = 'Log In',
  secondaryCtaHref = '/login',
  className,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-200',
          isScrolled 
            ? 'bg-ordo-white/95 backdrop-blur-md shadow-ordo-sm' 
            : 'bg-ordo-white',
          className
        )}
      >
        <Container>
          <div className="flex items-center justify-between h-[var(--ordo-nav-height)]">
            {/* Logo */}
            {logo || <OrdoLogo />}

            {/* Desktop Navigation */}
            <div className="hidden tablet:flex items-center gap-10">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-body text-ordo-sm text-ordo-neutral-500 hover:text-ordo-primary-300 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop CTAs */}
            <div className="hidden tablet:flex items-center gap-3">
              <Button href={ctaHref} size="sm">
                {ctaLabel}
              </Button>
              <Button href={secondaryCtaHref} variant="secondary" size="sm">
                {secondaryCtaLabel}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <IconButton
              icon={<MenuIcon />}
              label="Open menu"
              variant="ghost"
              className="tablet:hidden"
              onClick={() => setIsOpen(true)}
            />
          </div>
        </Container>
      </nav>

      {/* Spacer to prevent content from going under fixed nav */}
      <div className="h-[var(--ordo-nav-height)]" />

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-50 bg-ordo-black/50 transition-opacity duration-300 tablet:hidden',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Menu Drawer */}
      <div
        className={cn(
          'fixed top-0 right-0 bottom-0 z-50 w-[280px] bg-ordo-white shadow-ordo-xl transition-transform duration-300 tablet:hidden',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-ordo-divider">
          <span className="font-body font-semibold text-ordo-neutral-500">Menu</span>
          <IconButton
            icon={<CloseIcon />}
            label="Close menu"
            variant="ghost"
            onClick={() => setIsOpen(false)}
          />
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-3 px-4 rounded-ordo-md font-body text-ordo-sm text-ordo-neutral-500 hover:bg-ordo-neutral-100 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-6 space-y-3">
            <Button href={ctaHref} fullWidth onClick={() => setIsOpen(false)}>
              {ctaLabel}
            </Button>
            <Button href={secondaryCtaHref} variant="secondary" fullWidth onClick={() => setIsOpen(false)}>
              {secondaryCtaLabel}
            </Button>
          </div>
        </nav>
      </div>
    </>
  )
}

// ============================================
// FOOTER
// ============================================

interface FooterLink {
  label: string
  href: string
}

interface FooterColumn {
  title: string
  links: FooterLink[]
}

interface FooterProps {
  columns?: FooterColumn[]
  copyright?: string
  className?: string
}

const defaultFooterColumns: FooterColumn[] = [
  {
    title: 'Products',
    links: [
      { label: 'Order Now', href: '/order' },
      { label: 'Cafeteria Kiosk', href: '/kiosk' },
      { label: 'Kitchen Manager', href: '/kitchen' },
      { label: 'School Admin', href: '/admin' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Announcements', href: '/announcements' },
      { label: 'Case studies', href: '/case-studies' },
      { label: 'Our menus', href: '/menus' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Our story', href: '/about' },
      { label: 'Partner with us', href: '/partners' },
      { label: 'Careers', href: '/careers' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help center', href: '/help' },
      { label: '(855) 756-2909', href: 'tel:+18557562909' },
      { label: 'support@ordo.com', href: 'mailto:support@ordo.com' },
    ],
  },
]

export function Footer({
  columns = defaultFooterColumns,
  copyright = `${new Date().getFullYear()} Ordo, Inc. All rights reserved.`,
  className,
}: FooterProps) {
  return (
    <footer className={cn('bg-ordo-white border-t border-ordo-divider', className)}>
      <Container>
        <div className="py-ordo-2xl tablet:py-ordo-3xl">
          {/* Top section */}
          <div className="flex flex-col tablet:flex-row tablet:items-center justify-between gap-6 mb-ordo-xl">
            <OrdoLogo />
            <p className="font-body text-ordo-sm text-ordo-neutral-400 max-w-xs">
              America&apos;s fastest-growing school lunch program.
            </p>
          </div>

          {/* Navigation columns */}
          <div className="grid grid-cols-2 tablet:grid-cols-4 gap-8 mb-ordo-xl">
            {columns.map((column) => (
              <div key={column.title}>
                <h4 className="font-body font-semibold text-ordo-sm text-ordo-neutral-500 mb-4">
                  {column.title}
                </h4>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="font-body text-ordo-xs text-ordo-neutral-400 hover:text-ordo-primary-300 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Copyright */}
          <div className="pt-ordo-lg border-t border-ordo-divider">
            <p className="font-body text-ordo-xs text-ordo-neutral-300">
              {copyright}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}

