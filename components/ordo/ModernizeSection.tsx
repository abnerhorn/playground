'use client'

/**
 * Modernize Section
 * =================
 * 
 * "Modernize Your Program" feature grid section.
 */

import Link from 'next/link'
import Image from 'next/image'

// Feature cards data
const features = [
  {
    id: 'digital',
    title: 'Digital solutions built for everyone',
    description: 'Ordo offers an intuitive, web-based portal accessible on any device and all leading web browsers. Administrators can place orders online and manage the lunch program. Families can log in to see menu photos and also place orders for their students.',
    image: '/images/feature-digital.png',
    bgColor: '#FFF1DA',
  },
  {
    id: 'notifications',
    title: 'Boost participation with reminders',
    description: "Today, almost 95% of users opt-in to Push Notifications via email, text, or Whatsapp, with messaging available in English, Spanish, and more. When Ordo introduced text message reminders for pre-orders, participation increased by 15%.",
    image: '/images/feature-notifications.png',
    bgColor: '#D9EFFE',
  },
  {
    id: 'support',
    title: 'Fast feedback with our support team',
    description: "Families and schools can contact Ordo anytime through our chat support on Ordo's web-based platform. We encourage families to share feedback with us, including new menu item requests. We also answer questions about allergens or other concerns.",
    image: '/images/feature-support.png',
    bgColor: '#FAEAF5',
  },
  {
    id: 'compliance',
    title: 'Simplified compliance documentation',
    description: 'New automation tools that our team has developed in-house make it easy for schools to generate production records, delivery tickets, and meal counts. Overall, we make it easy for schools and their communities to have fresh, delicious food in their cafeterias.',
    image: '/images/feature-compliance.png',
    bgColor: '#DBF7D9',
  },
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
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Feature card component
function FeatureCard({ feature }: { feature: typeof features[0] }) {
  return (
    <div 
      className="flex flex-col gap-6 tablet:gap-8 p-6 tablet:p-8 rounded-3xl tablet:rounded-[32px] overflow-hidden"
      style={{ backgroundColor: feature.bgColor }}
    >
      {/* Illustration */}
      <div className="relative aspect-[580/378] tablet:aspect-[564/368] w-full">
        <Image
          src={feature.image}
          alt=""
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 564px"
        />
      </div>

      {/* Text content */}
      <div className="flex flex-col gap-2">
        <h3 className="font-body font-semibold text-xl tablet:text-[32px] text-[rgba(0,0,0,0.87)] leading-tight">
          {feature.title}
        </h3>
        <p className="font-body text-sm tablet:text-[22px] text-[rgba(0,0,0,0.87)] leading-normal tracking-[0.15px]">
          {feature.description}
        </p>
      </div>

      {/* CTA Button */}
      <Link
        href="/demo"
        className="inline-flex items-center justify-center gap-2 px-6 py-3 tablet:py-4 bg-black/[0.04] text-[rgba(0,0,0,0.95)] font-body font-semibold text-sm tablet:text-[22px] rounded-xl hover:bg-black/[0.08] transition-colors w-fit"
      >
        Book a demo
        <ArrowIcon className="w-4 h-4" />
      </Link>
    </div>
  )
}

export function ModernizeSection() {
  return (
    <section className="bg-white py-14 tablet:py-20 desktop:py-[120px]">
      <div className="max-w-[1280px] mx-auto px-6 tablet:px-16">
        {/* Header */}
        <div className="text-center mb-8 tablet:mb-12">
          <h2 className="font-heading font-bold text-2xl tablet:text-4xl desktop:text-5xl text-[rgba(0,0,0,0.87)] tracking-[-0.02em] leading-tight mb-2 tablet:mb-4">
            Modernize Your Program
          </h2>
          <p className="font-body text-base tablet:text-lg desktop:text-2xl text-[rgba(0,0,0,0.87)] tracking-[0.15px]">
            Order Online  •  Automate Compliance  •  24/7 Support
          </p>
        </div>

        {/* Feature Grid - 2x2 on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  )
}

