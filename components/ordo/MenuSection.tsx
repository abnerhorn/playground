'use client'

/**
 * Menu Section
 * ============
 * 
 * "Explore our menu" section with infinite scrolling food ticker.
 */

import Link from 'next/link'
import Image from 'next/image'

// Food images for the ticker
const foodImages = [
  { src: '/images/food-1.png', alt: 'Cheeseburger with Potato Wedges' },
  { src: '/images/food-2.png', alt: 'Pancakes with Bacon' },
  { src: '/images/food-3.png', alt: 'Alfredo Pasta with Chicken and Broccoli' },
  { src: '/images/food-4.png', alt: 'Grilled Chicken with Rice and Broccoli' },
  { src: '/images/food-5.png', alt: 'Buttermilk Pancakes' },
  { src: '/images/food-6.png', alt: 'Chicken Stir Fry with Rice' },
  { src: '/images/food-7.png', alt: 'Sweet Potato Mash with Vegetables' },
  { src: '/images/food-8.png', alt: 'Teriyaki Chicken Bowl' },
]

function ArrowIcon() {
  return (
    <svg 
      width="16" 
      height="16" 
      viewBox="0 0 16 16" 
      fill="none" 
      className="ml-2"
    >
      <path 
        d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" 
        fill="currentColor"
      />
    </svg>
  )
}

export function MenuSection() {
  // Duplicate images for seamless infinite scroll
  const allImages = [...foodImages, ...foodImages]

  return (
    <section className="bg-white py-14 tablet:py-20 desktop:py-[120px] overflow-hidden">
      {/* Header */}
      <div className="max-w-[1280px] mx-auto px-6 mb-12 tablet:mb-16 desktop:mb-20">
        <div className="flex flex-col gap-2 text-center">
          <h2 className="font-heading font-bold text-2xl tablet:text-4xl desktop:text-5xl text-[rgba(0,0,0,0.87)] tracking-[-0.02em] leading-[1.1]">
            Explore our menu
          </h2>
          <p className="font-body text-base tablet:text-xl desktop:text-2xl text-[rgba(0,0,0,0.87)] tracking-[0.15px] leading-normal">
            See Exactly What You&apos;ll Get – 100% Accurate Photos
          </p>
        </div>
      </div>

      {/* Infinite Scrolling Ticker */}
      <div className="relative w-full">
        <div 
          className="flex gap-2 tablet:gap-4 desktop:gap-6 animate-ticker"
          style={{
            width: 'fit-content',
          }}
        >
          {allImages.map((image, index) => (
            <div
              key={index}
              className="relative flex-shrink-0 w-[150px] h-[150px] tablet:w-[280px] tablet:h-[280px] desktop:w-[382px] desktop:h-[382px] rounded-2xl tablet:rounded-3xl desktop:rounded-[32px] overflow-hidden"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 150px, (max-width: 1280px) 280px, 382px"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Button */}
      <div className="max-w-[1280px] mx-auto px-6 mt-12 tablet:mt-16 desktop:mt-20">
        <div className="flex justify-center">
          <Link
            href="/menus"
            className="inline-flex items-center justify-center px-6 py-3 bg-black/[0.04] text-[rgba(0,0,0,0.95)] font-body font-semibold text-sm tablet:text-base desktop:text-lg rounded-xl hover:bg-black/[0.08] transition-colors border-2 border-white/15 w-full tablet:w-auto"
          >
            View our menu
            <ArrowIcon />
          </Link>
        </div>
      </div>

      {/* CSS for infinite scroll animation */}
      <style jsx>{`
        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-ticker {
          animation: ticker 30s linear infinite;
        }
        
        @media (max-width: 768px) {
          .animate-ticker {
            animation-duration: 20s;
          }
        }
      `}</style>
    </section>
  )
}

