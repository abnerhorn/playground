'use client'

/**
 * Footer
 * ======
 * 
 * Site footer with navigation links, Instagram CTA, and copyright.
 */

import Link from 'next/link'
import Image from 'next/image'

const footerLinks = {
  products: {
    title: 'Products',
    links: [
      { label: 'Order Now', href: '/order' },
      { label: 'Cafeteria Kiosk', href: '/kiosk' },
      { label: 'Kitchen Manager', href: '/kitchen-manager' },
      { label: 'School Admin', href: '/school-admin' },
      { label: 'Point of Sale', href: '/pos' },
    ],
  },
  resources: {
    title: 'Resources',
    links: [
      { label: 'Announcements', href: '/announcements' },
      { label: 'Case studies', href: '/case-studies' },
      { label: 'Our menus', href: '/menus' },
      { label: 'School Admin', href: '/school-admin' },
      { label: 'Point of Sale', href: '/pos' },
    ],
  },
  company: {
    title: 'Company',
    links: [
      { label: 'Our story', href: '/about' },
      { label: 'Partner with us', href: '/partner' },
      { label: 'Careers', href: '/careers' },
    ],
  },
  support: {
    title: 'Support',
    links: [
      { label: 'Help center', href: '/help' },
      { label: '(855) 756-2909', href: 'tel:+18557562909' },
      { label: 'support@ordo.com', href: 'mailto:support@ordo.com' },
    ],
  },
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="font-body font-medium text-xl text-white leading-8 tracking-[0.15px]">
        {title}
      </h3>
      <ul className="flex flex-col gap-4">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="font-body text-base text-white leading-6 tracking-[0.15px] hover:opacity-80 transition-opacity"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="bg-[#323232] px-6 tablet:px-16 py-16 tablet:py-[120px]">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-[72px]">
        {/* Logo & Instagram Row */}
        <div className="flex flex-col tablet:flex-row tablet:items-center tablet:justify-between gap-8">
          {/* Logo & Tagline */}
          <div className="flex flex-col tablet:flex-row items-center gap-4 tablet:gap-2">
            <Image
              src="/images/ordo-logo-white.svg"
              alt="Ordo"
              width={112}
              height={62}
              className="h-[62px] w-auto"
            />
            <p className="font-body text-base text-white text-center tablet:text-left leading-7 tracking-[0.15px]">
              America&apos;s fastest-growing school lunch program.
            </p>
          </div>

          {/* Instagram CTA */}
          <Link
            href="https://instagram.com/ordofood"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-[#5B5B5B] rounded-2xl p-4 hover:bg-[#6B6B6B] transition-colors"
          >
            <Image
              src="/images/instagram-icon.png"
              alt="Instagram"
              width={51}
              height={51}
              className="w-[51px] h-[51px]"
            />
            <p className="font-body text-base text-white leading-6 tracking-[0.15px] max-w-[256px]">
              Check out our Instagram featuring interesting schools across the US!
            </p>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 gap-10 tablet:gap-8">
          <FooterColumn {...footerLinks.products} />
          <FooterColumn {...footerLinks.resources} />
          <FooterColumn {...footerLinks.company} />
          <FooterColumn {...footerLinks.support} />
        </nav>

        {/* Copyright */}
        <div className="text-center">
          <p className="font-body text-sm text-white leading-5 tracking-[0.17px]">
            2025 Ordo, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

