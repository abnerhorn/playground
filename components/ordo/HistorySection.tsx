'use client'

/**
 * History Section
 * ===============
 * 
 * "The History Behind Ordo" section featuring Andrea Rosenblume.
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

export function HistorySection() {
  return (
    <section className="bg-white py-14 tablet:py-24 desktop:py-[184px]">
      <div className="max-w-[1280px] mx-auto px-6 tablet:px-16">
        {/* Content container - side by side on desktop, stacked on mobile */}
        <div className="flex flex-col tablet:flex-row tablet:items-center gap-6 tablet:gap-12 desktop:gap-[72px]">
          
          {/* Image */}
          <div className="relative w-full tablet:flex-1">
            <div className="relative aspect-[345/250] tablet:aspect-[726/825] rounded-2xl tablet:rounded-[40px] border-[5px] tablet:border-[6px] border-[#D9EFFE] overflow-hidden">
              <Image
                src="/images/andrea-history.jpg"
                alt="Andrea Rosenblume, July 1978"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Text content */}
          <div className="flex flex-col gap-4 tablet:gap-6 desktop:gap-10 tablet:flex-1">
            {/* Badge + Heading + Body */}
            <div className="flex flex-col gap-2 tablet:gap-4 desktop:gap-6">
              {/* Badge */}
              <div className="inline-flex">
                <span className="inline-flex items-center justify-center px-3 tablet:px-5 py-0.5 tablet:py-1 bg-[#D9EFFE] rounded-full">
                  <span className="font-body font-medium text-xs tablet:text-base text-[#241E5D] tracking-[0.15px]">
                    The History Behind Ordo
                  </span>
                </span>
              </div>

              {/* Heading */}
              <h2 className="font-heading font-bold text-2xl tablet:text-4xl desktop:text-5xl text-black leading-tight tracking-[-0.02em]">
                Meet Andrea, our CEO&apos;s mother, who served her district for 30+ years.
              </h2>
            </div>

            {/* Body text */}
            <p className="font-body text-base tablet:text-lg desktop:text-2xl text-black leading-normal tracking-[0.15px]">
              The history of Ordo dates back more than 40 years ago when the founder&apos;s mother, Andrea Rosenblume, served as a child nutrition educator in Great Neck Public Schools in New York. Andrea carried her belief in eating healthy back to their household, which later inspired her son Hunter Rosenblume to start Ordo to change school lunch forever.
            </p>

            {/* CTA Button */}
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-black/[0.04] text-[rgba(0,0,0,0.87)] font-body font-semibold text-sm tablet:text-lg desktop:text-2xl rounded-xl hover:bg-black/[0.08] transition-colors border-2 border-white/15 w-fit"
            >
              Learn more
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

