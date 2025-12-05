/**
 * Marketing Homepage
 * ==================
 * 
 * Customer-facing landing page using the Ordo design system.
 * Access at: /marketing
 */

import { HomeHero, MenuSection, WhoWeServeSection, HistorySection, ExpansionSection, FreshFoodSection, ModernizeSection, FAQSection, CTASection, Footer } from '@/components/ordo'

export default function MarketingHomePage() {
  return (
    <main className="min-h-screen bg-white">
      <HomeHero />
      <MenuSection />
      <WhoWeServeSection />
      <HistorySection />
      <ExpansionSection />
      <FreshFoodSection />
      <ModernizeSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  )
}
