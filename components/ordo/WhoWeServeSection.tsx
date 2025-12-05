'use client'

/**
 * Who We Serve Section
 * ====================
 * 
 * Grid of service categories showing who Ordo serves.
 */

import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils/cn'

// Service categories data
const services = [
  {
    id: 'public-districts',
    title: 'Public Districts',
    description: 'Modernize your cafeteria with fresh food through federal programs like NSLP, SBP, SFSP, FFVP, and others.',
    descriptionMobile: 'Modernize your cafeteria with fresh foods, new technology & better logistics.',
    icon: '/images/icon-public-districts.png',
    bgColor: '#D5F1FF',
    href: '/schools/public',
  },
  {
    id: 'charter-networks',
    title: 'Charter & Networks',
    description: 'We provide reliable, fresh food service for single charter schools and networks of schools.',
    descriptionMobile: 'Reliable, fresh food service for single schools or across campuses.',
    icon: '/images/icon-charter-networks.png',
    bgColor: 'rgba(200, 240, 220, 0.5)',
    href: '/schools/charter',
  },
  {
    id: 'preschool-daycare',
    title: 'Preschool & Daycare',
    description: 'Ordo serves nutritious, CACFP-compliant meals for children at preschools, Head Start programs, and more.',
    descriptionMobile: 'Ordo serves nutritious, CACFP-compliant meals for young children, delivered daily.',
    icon: '/images/icon-preschool-daycare.png',
    bgColor: '#FEE8F9',
    href: '/schools/preschool',
  },
  {
    id: 'private-schools',
    title: 'Private Schools',
    description: 'Our executive chefs prepare delicious, homestyle meals for private schools and boarding schools.',
    descriptionMobile: 'Our executive chefs prepare delicious, homestyle meals',
    icon: '/images/icon-private-schools.png',
    bgColor: '#FFDFC6',
    href: '/schools/private',
  },
]

// Chevron right icon
function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={cn('w-6 h-6 tablet:w-8 tablet:h-8 text-gray-400', className)} 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  )
}

// Service card component
function ServiceCard({ 
  service, 
  isLast = false,
  className 
}: { 
  service: typeof services[0]
  isLast?: boolean
  className?: string 
}) {
  return (
    <Link
      href={service.href}
      className={cn(
        'flex gap-3 tablet:gap-4 items-center p-3 tablet:p-6 group hover:bg-gray-50 transition-colors',
        !isLast && 'border-b border-black/[0.12]',
        className
      )}
    >
      {/* Icon */}
      <div 
        className="relative w-[72px] h-[72px] tablet:w-[104px] tablet:h-[104px] rounded-2xl flex-shrink-0 overflow-hidden flex items-center justify-center"
        style={{ backgroundColor: service.bgColor }}
      >
        <Image
          src={service.icon}
          alt=""
          width={60}
          height={40}
          className="object-contain w-[45px] h-[30px] tablet:w-[60px] tablet:h-[40px]"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="font-body font-semibold text-base tablet:text-2xl text-[rgba(0,0,0,0.95)] leading-normal">
          {service.title}
        </h3>
        {/* Desktop description */}
        <p className="hidden tablet:block font-body text-lg text-[rgba(0,0,0,0.87)] leading-[1.5] tracking-[0.15px] mt-2">
          {service.description}
        </p>
        {/* Mobile description */}
        <p className="tablet:hidden font-body text-sm text-[rgba(0,0,0,0.87)] leading-normal tracking-[0.15px] mt-1">
          {service.descriptionMobile}
        </p>
      </div>

      {/* Arrow */}
      <ChevronRightIcon className="flex-shrink-0 group-hover:translate-x-1 transition-transform" />
    </Link>
  )
}

export function WhoWeServeSection() {
  return (
    <section className="bg-white py-14 tablet:py-20 desktop:py-[120px]">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header */}
        <h2 className="font-heading font-bold text-2xl tablet:text-4xl desktop:text-5xl text-[rgba(0,0,0,0.87)] text-center tracking-[-0.02em] leading-[1.1] mb-6 tablet:mb-12 desktop:mb-16">
          Who we serve
        </h2>

        {/* Services Grid */}
        <div className="border border-black/[0.12] rounded-2xl tablet:rounded-[32px] overflow-hidden">
          {/* Desktop: 2x2 grid */}
          <div className="hidden tablet:grid tablet:grid-cols-2">
            {/* Top row */}
            <ServiceCard 
              service={services[0]} 
              className="border-r border-black/[0.12]"
            />
            <ServiceCard 
              service={services[1]} 
            />
            {/* Bottom row */}
            <ServiceCard 
              service={services[2]} 
              isLast 
              className="border-r border-black/[0.12]"
            />
            <ServiceCard 
              service={services[3]} 
              isLast
            />
          </div>

          {/* Mobile: stacked list */}
          <div className="tablet:hidden">
            {services.map((service, index) => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                isLast={index === services.length - 1}
              />
            ))}
          </div>
        </div>

        {/* Contact Button */}
        <div className="mt-8 tablet:mt-12 desktop:mt-16 flex justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-black/[0.04] text-[rgba(0,0,0,0.87)] font-body font-semibold text-sm tablet:text-lg desktop:text-2xl rounded-xl hover:bg-black/[0.08] transition-colors border-2 border-white/15 w-full tablet:w-auto"
          >
            Contact us
          </Link>
        </div>
      </div>
    </section>
  )
}

