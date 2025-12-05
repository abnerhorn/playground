'use client'

/**
 * Fresh Food Section
 * ==================
 * 
 * "Fresh, Whole, & Scratch-Made" section highlighting food quality.
 */

import Link from 'next/link'
import Image from 'next/image'

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

export function FreshFoodSection() {
  return (
    <section className="bg-white py-14 tablet:py-24 desktop:py-[184px]">
      <div className="max-w-[1280px] mx-auto px-6 tablet:px-16">
        {/* Content container - side by side on desktop, stacked on mobile */}
        <div className="flex flex-col tablet:flex-row tablet:items-center gap-6 tablet:gap-12 desktop:gap-[72px]">
          
          {/* Food Grid Image - left side on desktop */}
          <div className="relative w-full tablet:w-[424px] tablet:flex-shrink-0">
            <div className="relative aspect-[920/690] tablet:aspect-[424/566] rounded-2xl tablet:rounded-[32px] border-[5px] tablet:border-8 border-[rgba(255,148,52,0.2)] overflow-hidden">
              {/* Mobile image */}
              <Image
                src="/images/food-grid-mobile.jpg"
                alt="Fresh meals prepared by Ordo"
                fill
                className="object-cover tablet:hidden"
                sizes="100vw"
              />
              {/* Desktop image */}
              <Image
                src="/images/food-grid-desktop.jpg"
                alt="Fresh meals prepared by Ordo"
                fill
                className="object-cover hidden tablet:block"
                sizes="424px"
              />
            </div>
          </div>

          {/* Text content - right side on desktop */}
          <div className="flex flex-col gap-4 tablet:gap-6 desktop:gap-10 tablet:flex-1">
            {/* Badge + Heading */}
            <div className="flex flex-col gap-2 tablet:gap-4 desktop:gap-6">
              {/* Badge */}
              <div className="inline-flex">
                <span className="inline-flex items-center justify-center px-3 tablet:px-5 py-0.5 tablet:py-1 bg-[#FFF1DA] rounded-full">
                  <span className="font-body font-medium text-xs tablet:text-base text-[rgba(97,47,0,0.95)] tracking-[0.15px]">
                    No Ultra-Processed Foods
                  </span>
                </span>
              </div>

              {/* Heading */}
              <h2 className="font-heading font-bold text-2xl tablet:text-4xl desktop:text-5xl text-black leading-tight tracking-[-0.02em]">
                Fresh, Whole, &amp; Scratch-Made
              </h2>
            </div>

            {/* Body text */}
            <div className="font-body text-base tablet:text-lg desktop:text-2xl text-black leading-normal tracking-[0.15px] space-y-4 tablet:space-y-6">
              <p>
                As a company, we believe that fresh, healthy food should be available and affordable for every student. We don&apos;t think ultra-processed foods should be a part of a growing child&apos;s diet, much less what they eat everyday. All meals are prepared using whole ingredients and made from scratch, from the grilled chicken to the muffins.
              </p>
              <p>
                In some districts, we&apos;ve observed participation rates in the school lunch program increase by more than 100% after they partnered with Ordo.
              </p>
            </div>

            {/* CTA Button */}
            <Link
              href="/menu"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-black/[0.04] text-[rgba(0,0,0,0.87)] font-body font-semibold text-sm tablet:text-lg desktop:text-2xl rounded-xl hover:bg-black/[0.08] transition-colors border-2 border-white/15 w-fit"
            >
              <span className="tablet:hidden">Explore our menu</span>
              <span className="hidden tablet:inline">View our menu</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

