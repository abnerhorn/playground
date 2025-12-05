'use client'

/**
 * FAQ Section
 * ===========
 * 
 * Frequently Asked Questions accordion section.
 */

import { useState } from 'react'
import { cn } from '@/lib/utils/cn'

// FAQ data
const faqs = [
  {
    id: 'free-reduced',
    question: 'Can you provide free and reduced meals?',
    answer: 'Yes, Ordo can provide compliant food service with reimbursable meals through the National School Lunch Program, the Child and Adult Care Food Program, and other similar programs.',
  },
  {
    id: 'deliver-serve',
    question: 'Do you deliver and serve the food?',
    answer: "The company offers both vended meal service where fresh meals are delivered daily from certified kitchens, and traditional on-site food service management with chefs preparing meals on campus in school facilities.",
  },
  {
    id: 'school-size',
    question: 'What size of school do you serve?',
    answer: 'Ordo serves schools of all sizes, from small preschools to districts up to 10,000 students.',
  },
  {
    id: 'different',
    question: 'How is this any different?',
    answer: 'We make providing fresh, scratch-made food at your school as easy as clicking "Order" on your account.',
  },
  {
    id: 'areas',
    question: 'What areas do you service?',
    answer: "We currently serve schools in 18 states, but we're always expanding! Contact our partnerships team to see if Ordo is already available in your area.",
  },
]

// Chevron icon
function ChevronDownIcon({ className, isOpen }: { className?: string; isOpen?: boolean }) {
  return (
    <svg 
      className={cn(
        'w-6 h-6 text-[rgba(0,0,0,0.87)] transition-transform duration-300',
        isOpen && 'rotate-180',
        className
      )} 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )
}

// FAQ Item component
function FAQItem({ faq, isOpen, onToggle }: { 
  faq: typeof faqs[0]
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="border-b border-black/10">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-8 tablet:py-12 px-4 text-left hover:bg-black/[0.02] transition-colors"
        aria-expanded={isOpen}
      >
        <span className="font-body font-medium text-base tablet:text-xl text-[rgba(0,0,0,0.87)] tracking-[0.15px] leading-8">
          {faq.question}
        </span>
        <ChevronDownIcon isOpen={isOpen} className="flex-shrink-0" />
      </button>
      
      {/* Answer - collapsible */}
      <div 
        className={cn(
          'overflow-hidden transition-all duration-300',
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="px-4 pb-8 tablet:pb-12">
          <p className="font-body text-sm tablet:text-lg text-[rgba(0,0,0,0.7)] leading-relaxed tracking-[0.15px]">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  )
}

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(null)

  const handleToggle = (id: string) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <section className="bg-white py-14 tablet:py-20 desktop:py-[120px]">
      <div className="max-w-[1280px] mx-auto px-6 tablet:px-16">
        {/* Header */}
        <h2 className="font-heading font-bold text-2xl tablet:text-4xl desktop:text-5xl text-[rgba(0,0,0,0.87)] text-center tracking-[-0.02em] leading-tight mb-8 tablet:mb-12">
          Frequently asked questions
        </h2>

        {/* FAQ List */}
        <div className="border-t border-black/10">
          {faqs.map((faq) => (
            <FAQItem 
              key={faq.id} 
              faq={faq} 
              isOpen={openId === faq.id}
              onToggle={() => handleToggle(faq.id)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

