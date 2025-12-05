'use client'

/**
 * CTA Section
 * ===========
 * 
 * Final call-to-action section with food tray image.
 */

import Link from 'next/link'
import Image from 'next/image'

export function CTASection() {
  return (
    <section className="bg-white pt-14 tablet:pt-0 pb-0">
      <div className="max-w-[1280px] mx-auto px-6 tablet:px-16">
        {/* Text content */}
        <div className="flex flex-col items-center gap-6 tablet:gap-12 mb-8 tablet:mb-10">
          {/* Heading */}
          <h2 className="font-heading font-bold text-2xl tablet:text-5xl desktop:text-[64px] text-[rgba(0,0,0,0.95)] text-center tracking-[-0.02em] leading-tight max-w-[914px]">
            Upgrade to scratch-made meals at your school
          </h2>

          {/* CTA Button */}
          <Link
            href="/quote"
            className="inline-flex items-center justify-center px-6 py-3 bg-[#396EF3] text-white font-body font-semibold text-sm tablet:text-2xl rounded-xl hover:bg-[#2d5ad9] transition-colors w-full tablet:w-auto"
          >
            Request a Quote
          </Link>
        </div>
      </div>

      {/* Food tray image - full width */}
      <div className="relative w-full max-w-[1280px] mx-auto aspect-[2436/814] tablet:aspect-[1280/428]">
        <Image
          src="/images/cta-food-tray.png"
          alt="Fresh school lunch tray with fruits, vegetables, and wholesome food"
          fill
          className="object-cover object-top"
          sizes="100vw"
          priority
        />
      </div>
    </section>
  )
}

