'use client'

/**
 * Home Hero Section
 * =================
 * 
 * Hero section for the Ordo homepage matching the Figma design.
 * Includes: Nav, Hero Text + Buttons, Stats Tiles
 */

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Logo } from './Logo'
import { cn } from '@/lib/utils/cn'

// ============================================
// TYPES
// ============================================

interface NavLink {
  label: string
  href: string
}

interface StatTile {
  icon: string
  value: string
  label: string
  description?: string
}

// ============================================
// DEFAULT DATA
// ============================================

const navLinks: NavLink[] = [
  { label: 'Schools', href: '/schools' },
  { label: 'Our menus', href: '/menus' },
  { label: 'Case studies', href: '/case-studies' },
  { label: 'Announcements', href: '/announcements' },
]

const stats: StatTile[] = [
  {
    icon: '/images/icon-building.png',
    value: '40+',
    label: 'Years of History',
    description: 'Supports all meal programs: SBP, NSLP, CACFP & more.',
  },
  {
    icon: '/images/icon-school.png',
    value: '15+',
    label: 'States in 2025',
    description: 'No ultra-processed: all meals are fresh with whole ingredients.',
  },
  {
    icon: '/images/icon-avocado.png',
    value: '3M+',
    label: 'Meals Last Year',
    description: 'Hassle-free orders and reports to automate compliance.',
  },
]

// ============================================
// ICONS
// ============================================

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg className={cn('w-6 h-6', className)} fill="none" stroke="black" viewBox="0 0 24 24">
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
// NAV COMPONENT
// ============================================

function Nav() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-200',
          isScrolled && 'shadow-sm'
        )}
      >
        <div className="max-w-[1280px] mx-auto px-4 tablet:px-6 desktop:px-16">
          <div className="flex items-center justify-between h-[70px] desktop:h-[86px]">
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation */}
            <div className="hidden tablet:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-body font-medium text-[15px] text-black tracking-[0.46px] leading-[26px] hover:text-ordo-primary-300 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop CTAs */}
            <div className="hidden tablet:flex items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-4 py-2 bg-[#0096da] text-white font-body font-medium text-[15px] rounded-lg hover:bg-[#0077b3] transition-colors tracking-[-0.075px] leading-[1.45]"
              >
                Request a quote
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center px-4 py-2 bg-black/[0.04] text-black/[0.87] font-body font-medium text-[15px] rounded-lg hover:bg-black/[0.08] transition-colors border border-white/15 tracking-[-0.075px] leading-[1.45]"
              >
                Log in
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="tablet:hidden p-2 -mr-2"
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-[70px] desktop:h-[86px]" />

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 tablet:hidden',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <div
        className={cn(
          'fixed top-0 right-0 bottom-0 z-50 w-[280px] bg-white shadow-xl transition-transform duration-300 tablet:hidden',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-black/10">
          <span className="font-body font-semibold">Menu</span>
          <button onClick={() => setIsOpen(false)} aria-label="Close menu" className="p-2 -mr-2">
            <CloseIcon />
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-3 px-4 rounded-lg font-body text-[15px] text-black hover:bg-black/[0.04] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 space-y-3">
            <Link
              href="/contact"
              className="flex items-center justify-center w-full py-3 bg-[#0096da] text-white font-body font-semibold text-base rounded-xl hover:bg-[#0077b3] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Request a Quote
            </Link>
            <Link
              href="/login"
              className="flex items-center justify-center w-full py-3 bg-black/[0.04] text-black/[0.87] font-body font-semibold text-base rounded-xl hover:bg-black/[0.08] transition-colors border border-white/15"
              onClick={() => setIsOpen(false)}
            >
              Log in
            </Link>
          </div>
        </nav>
      </div>
    </>
  )
}

// ============================================
// HERO TEXT SECTION
// ============================================

function HeroText() {
  return (
    <section className="py-14 tablet:py-20 desktop:py-[120px]">
      <div className="max-w-[1280px] mx-auto px-6 desktop:px-16">
        <div className="flex flex-col items-center text-center gap-10">
          {/* Heading */}
          <div className="flex flex-col gap-4 tablet:gap-6 max-w-[914px]">
            <h1 className="font-heading font-bold text-[36px] tablet:text-[48px] desktop:text-[64px] leading-[1.1] tracking-[-0.02em] text-[rgba(0,0,0,0.95)]">
              America&apos;s fastest-growing{' '}
              <br className="hidden tablet:block" />
              K-12 food service
            </h1>
            <p className="font-body text-lg tablet:text-xl desktop:text-2xl leading-[1.5] tracking-[0.15px] text-[rgba(0,0,0,0.87)]">
              See why schools in 15+ states choose Ordo for NSLP, CACFP, &amp; more
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col tablet:flex-row gap-4 w-full tablet:w-auto">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#0096da] text-white font-body font-semibold text-lg tablet:text-xl desktop:text-2xl rounded-xl hover:bg-[#0077b3] transition-colors tracking-[-0.12px] leading-[1.45] w-full tablet:w-auto"
            >
              Request a quote
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-6 py-3 bg-black/[0.04] text-black/[0.87] font-body font-semibold text-lg tablet:text-xl desktop:text-2xl rounded-xl hover:bg-black/[0.08] transition-colors border-2 border-white/15 tracking-[-0.12px] leading-[1.45] w-full tablet:w-auto"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================
// STATS TILES SECTION
// ============================================

function StatsTiles() {
  return (
    <section className="border-t border-b border-black/[0.12]">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col tablet:flex-row">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                'flex flex-col tablet:flex-row items-center gap-2 tablet:gap-6 py-4 tablet:py-12 px-6 flex-1',
                'border-b tablet:border-b-0 tablet:border-l tablet:border-r border-black/[0.12] last:border-b-0',
                index === 0 && 'tablet:border-l-0',
                index === stats.length - 1 && 'tablet:border-r-0'
              )}
            >
              {/* Icon */}
              <div className="relative w-14 h-14 tablet:w-[72px] tablet:h-[72px] desktop:w-[87px] desktop:h-[87px] flex-shrink-0">
                <Image
                  src={stat.icon}
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>

              {/* Text */}
              <div className="flex flex-col gap-1 tablet:gap-2 text-center tablet:text-left flex-1">
                <h3 className="font-heading font-bold text-[18px] tablet:text-xl desktop:text-2xl text-[rgba(0,0,0,0.87)] leading-normal whitespace-nowrap">
                  {stat.value} {stat.label}
                </h3>
                {stat.description && (
                  <p className="font-body text-sm tablet:text-base desktop:text-lg text-[#5b5b5b] leading-normal tracking-[0.15px] hidden tablet:block">
                    {stat.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================
// MAIN EXPORT
// ============================================

export function HomeHero() {
  return (
    <>
      <Nav />
      <HeroText />
      <StatsTiles />
    </>
  )
}

