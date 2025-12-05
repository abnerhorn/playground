'use client'

/**
 * Expansion Section
 * =================
 * 
 * "Expansion to 15+ States" section showing Ordo's growth.
 */

import Link from 'next/link'
import Image from 'next/image'

// School/District logos
const logos = [
  { src: '/images/logo-spreckles-union.png', alt: 'Spreckles Union School District' },
  { src: '/images/logo-hillsborough.png', alt: 'Hillsborough City School District' },
  { src: '/images/logo-doral-academy.png', alt: 'Doral Academy' },
  { src: '/images/logo-educational-solutions.png', alt: 'Educational Solutions' },
  { src: '/images/logo-contra-costa.png', alt: 'Contra Costa County' },
  { src: '/images/logo-ross-valley.png', alt: 'Ross Valley School District' },
  { src: '/images/logo-soar-charter.png', alt: 'SOAR Charter School' },
]

// Arrow icon for button
function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className}
      width="16" 
      height="16" 
      viewBox="0 0 24 24" 
      fill="none"
    >
      <path 
        d="M5 12H19M19 12L12 5M19 12L12 19" 
        stroke="#241E5D" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ExpansionSection() {
  return (
    <section className="bg-white py-14 tablet:py-24 desktop:py-[184px]">
      <div className="max-w-[1280px] mx-auto px-6 tablet:px-16">
        {/* Content container - side by side on desktop, stacked on mobile */}
        <div className="flex flex-col tablet:flex-row tablet:items-center gap-6 tablet:gap-12 desktop:gap-[72px]">
          
          {/* Text content - left side on desktop */}
          <div className="flex flex-col gap-4 tablet:gap-6 desktop:gap-10 tablet:flex-1 order-2 tablet:order-1">
            {/* Badge + Heading + Body */}
            <div className="flex flex-col gap-2 tablet:gap-4 desktop:gap-6">
              {/* Badge */}
              <div className="inline-flex">
                <span className="inline-flex items-center justify-center px-3 tablet:px-5 py-0.5 tablet:py-1 bg-[#DBF7D9] rounded-full">
                  <span className="font-body font-medium text-[11px] tablet:text-base text-[rgba(0,60,35,0.9)] tracking-[0.15px]">
                    Now available nationwide
                  </span>
                </span>
              </div>

              {/* Heading */}
              <h2 className="font-heading font-bold text-2xl tablet:text-4xl desktop:text-5xl text-black leading-tight tracking-[-0.02em]">
                Expansion to 15+ States Since August, 2021.
              </h2>

              {/* Body text */}
              <p className="font-body text-base tablet:text-lg desktop:text-2xl text-black leading-normal tracking-[0.15px]">
                In the last 5 years, Ordo has expanded from its home state to 18 U.S. states and served hundreds of schools — from rural Ohio to New York City, California, Texas, and beyond.
              </p>

              {/* Logos */}
              <div className="flex items-center gap-2 mt-2">
                {logos.map((logo) => (
                  <div key={logo.alt} className="relative flex-1 aspect-[113/77]">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 40px, 80px"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <Link
              href="/availability"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-black/[0.04] text-[rgba(0,0,0,0.87)] font-body font-semibold text-sm tablet:text-lg desktop:text-2xl rounded-xl hover:bg-black/[0.08] transition-colors border-2 border-white/15 w-fit"
            >
              Check availability
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </div>

          {/* Image - right side on desktop, top on mobile */}
          <div className="relative w-full tablet:w-[637px] tablet:flex-shrink-0 order-1 tablet:order-2">
            <div className="relative aspect-[2927/1984] tablet:aspect-auto tablet:h-[432px] rounded-2xl tablet:rounded-[20px] border-[5px] tablet:border-8 border-[#DBF7D9] overflow-hidden">
              <Image
                src="/images/expansion-team.jpg"
                alt="Ordo team members in aprons"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 637px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

