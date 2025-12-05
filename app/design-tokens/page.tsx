/**
 * Design Tokens Visual Reference
 * ==============================
 * 
 * A visual showcase of the Ordo design system tokens
 * extracted from the Figma design. This page displays:
 * - Color palette (brand, neutrals, accents)
 * - Typography scale and font families
 * - Spacing system
 * - Border radii and shadows
 */

import Link from 'next/link'

// Color token definitions from Figma
const brandColors = [
  { name: '--color-brand-primary', value: '#396ef3', label: 'Brand Primary' },
  { name: '--color-brand-primary-contrast', value: '#ffffff', label: 'Primary Contrast' },
]

const neutralColors = [
  { name: '--color-white', value: '#ffffff', label: 'White' },
  { name: '--color-black', value: '#000000', label: 'Black' },
  { name: '--color-grey-20', value: '#323232', label: 'Grey 20' },
  { name: '--color-grey-36', value: '#5b5b5b', label: 'Grey 36' },
]

const textColors = [
  { name: '--color-text-primary', value: 'rgba(0,0,0,0.87)', hex: '#000000de', label: 'Text Primary' },
  { name: '--color-text-secondary', value: '#5b5b5b', label: 'Text Secondary' },
  { name: '--color-text-on-dark', value: '#ffffff', label: 'Text On Dark' },
]

const stateColors = [
  { name: '--color-state-hover', value: 'rgba(0,0,0,0.04)', hex: '#0000000a', label: 'Hover State' },
  { name: '--color-state-focus', value: 'rgba(0,0,0,0.1)', hex: '#0000001a', label: 'Focus State' },
  { name: '--color-divider', value: 'rgba(0,0,0,0.12)', hex: '#0000001f', label: 'Divider' },
]

const accentPalettes = [
  {
    name: 'Blue',
    colors: [
      { name: 'Light', value: '#D5F1FF' },
      { name: 'Base', value: '#6DCEFF' },
    ]
  },
  {
    name: 'Green',
    colors: [
      { name: 'Light', value: '#C8F0DC' },
      { name: 'Base', value: '#2CCC8A' },
      { name: 'Dark', value: '#003C23' },
    ]
  },
  {
    name: 'Purple',
    colors: [
      { name: 'Light', value: '#EFEDFE' },
      { name: 'Base', value: '#968AF5' },
      { name: 'Dark', value: '#241E5D' },
    ]
  },
  {
    name: 'Orange',
    colors: [
      { name: 'Light', value: '#FFDFC6' },
      { name: 'Base', value: '#FF9434' },
      { name: 'Dark', value: '#612F00' },
    ]
  },
  {
    name: 'Pink',
    colors: [
      { name: 'Light', value: '#FEE8F9' },
    ]
  },
]

const fontSizes = [
  { name: '--font-size-xs', value: '14px', rem: '0.875rem' },
  { name: '--font-size-sm', value: '16px', rem: '1rem' },
  { name: '--font-size-md', value: '18px', rem: '1.125rem' },
  { name: '--font-size-lg', value: '20px', rem: '1.25rem' },
  { name: '--font-size-xl', value: '32px', rem: '2rem' },
  { name: '--font-size-2xl', value: '48px', rem: '3rem' },
  { name: '--font-size-3xl', value: '64px', rem: '4rem' },
]

const spacingScale = [
  { name: '--space-xs', value: '8px', rem: '0.5rem' },
  { name: '--space-sm', value: '10px', rem: '0.625rem' },
  { name: '--space-md', value: '15px', rem: '0.9375rem' },
  { name: '--space-lg', value: '24px', rem: '1.5rem' },
  { name: '--space-xl', value: '40px', rem: '2.5rem' },
  { name: '--space-2xl', value: '72px', rem: '4.5rem' },
]

const borderRadii = [
  { name: '--border-radius-sm', value: '4px' },
  { name: '--border-radius-md', value: '8px' },
  { name: '--border-radius-lg', value: '16px' },
  { name: '--border-radius-full', value: '9999px' },
]

function ColorSwatch({ 
  name, 
  value, 
  hex,
  label,
  size = 'normal' 
}: { 
  name: string
  value: string
  hex?: string
  label?: string
  size?: 'normal' | 'large'
}) {
  const isLight = value === '#ffffff' || value.toLowerCase().includes('fff') || 
    value.includes('0.04') || value.includes('0.1') || value.includes('0.12')
  
  return (
    <div className="flex flex-col gap-2">
      <div 
        className={`${size === 'large' ? 'h-24 w-full' : 'h-16 w-full'} rounded-lg border ${isLight ? 'border-gray-200' : 'border-transparent'}`}
        style={{ backgroundColor: value }}
      />
      <div className="space-y-0.5">
        <p className="text-sm font-medium text-gray-900">{label || name}</p>
        <p className="text-xs font-mono text-gray-500">{hex || value}</p>
      </div>
    </div>
  )
}

function Section({ 
  title, 
  description, 
  children 
}: { 
  title: string
  description?: string
  children: React.ReactNode 
}) {
  return (
    <section className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-semibold text-gray-900" style={{ fontFamily: 'var(--font-noto-serif), "Noto Serif", Georgia, serif' }}>
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-gray-500">{description}</p>
        )}
      </div>
      {children}
    </section>
  )
}

export default function DesignTokensPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              ← Back
            </Link>
            <div className="h-4 w-px bg-gray-200" />
            <h1 className="text-lg font-semibold text-gray-900">Design Tokens</h1>
          </div>
          <span className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-1 rounded">
            Ordo Website v4.0
          </span>
        </div>
      </header>

      {/* Hero */}
      <div className="bg-gradient-to-br from-[#D5F1FF] via-[#EFEDFE] to-[#FEE8F9]">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h1 
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: 'var(--font-noto-serif), "Noto Serif", Georgia, serif', letterSpacing: '-0.02em' }}
          >
            Ordo Design System
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl" style={{ fontFamily: 'var(--font-outfit), Outfit, system-ui, sans-serif' }}>
            Visual reference for the customer-facing website design tokens. 
            Extracted from Figma design file.
          </p>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        
        {/* Brand Colors */}
        <Section 
          title="Brand Colors" 
          description="Primary brand color used for CTAs, links, and interactive elements"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {brandColors.map((color) => (
              <ColorSwatch key={color.name} {...color} size="large" />
            ))}
          </div>
        </Section>

        {/* Neutrals */}
        <Section 
          title="Neutrals" 
          description="Core neutral palette for backgrounds, text, and borders"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {neutralColors.map((color) => (
              <ColorSwatch key={color.name} {...color} />
            ))}
          </div>
        </Section>

        {/* Text Colors */}
        <Section 
          title="Text Colors" 
          description="Semantic text colors with proper contrast"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {textColors.map((color) => (
              <ColorSwatch key={color.name} value={color.value} hex={color.hex || color.value} name={color.name} label={color.label} />
            ))}
          </div>
        </Section>

        {/* State Colors */}
        <Section 
          title="State & UI Colors" 
          description="Colors for interactive states and UI elements"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {stateColors.map((color) => (
              <ColorSwatch key={color.name} value={color.value} hex={color.hex || color.value} name={color.name} label={color.label} />
            ))}
          </div>
        </Section>

        {/* Accent Palette */}
        <Section 
          title="Accent Palette" 
          description="Decorative colors for illustrations, badges, and highlights"
        >
          <div className="space-y-8">
            {accentPalettes.map((palette) => (
              <div key={palette.name}>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">{palette.name}</h3>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                  {palette.colors.map((color) => (
                    <ColorSwatch 
                      key={`${palette.name}-${color.name}`} 
                      name={color.name}
                      value={color.value}
                      label={`${palette.name} ${color.name}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Typography */}
        <Section 
          title="Typography" 
          description="Font families, sizes, and text styles"
        >
          {/* Font Families */}
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Font Families</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                  <p className="text-xs font-mono text-gray-400 mb-2">--font-family-heading</p>
                  <p 
                    className="text-3xl text-gray-900"
                    style={{ fontFamily: 'var(--font-noto-serif), "Noto Serif", Georgia, serif' }}
                  >
                    Noto Serif
                  </p>
                  <p className="text-sm text-gray-500 mt-2">Used for H1, H2 headings</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                  <p className="text-xs font-mono text-gray-400 mb-2">--font-family-body</p>
                  <p 
                    className="text-3xl text-gray-900"
                    style={{ fontFamily: 'var(--font-outfit), Outfit, system-ui, sans-serif' }}
                  >
                    Outfit
                  </p>
                  <p className="text-sm text-gray-500 mt-2">Used for body text and UI</p>
                </div>
              </div>
            </div>

            {/* Font Weights */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Font Weights</h3>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 space-y-3">
                <p style={{ fontFamily: 'var(--font-outfit), Outfit, system-ui, sans-serif', fontWeight: 400 }} className="text-xl">
                  Regular (400) — Body text
                </p>
                <p style={{ fontFamily: 'var(--font-outfit), Outfit, system-ui, sans-serif', fontWeight: 500 }} className="text-xl">
                  Medium (500) — Emphasis, nav items
                </p>
                <p style={{ fontFamily: 'var(--font-outfit), Outfit, system-ui, sans-serif', fontWeight: 600 }} className="text-xl">
                  Semibold (600) — Subheadings, buttons
                </p>
                <p style={{ fontFamily: 'var(--font-noto-serif), "Noto Serif", Georgia, serif', fontWeight: 700 }} className="text-xl">
                  Bold (700) — Headings
                </p>
              </div>
            </div>

            {/* Type Scale */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Type Scale</h3>
              <div className="space-y-4">
                {fontSizes.map((size) => (
                  <div 
                    key={size.name} 
                    className="flex items-baseline gap-4 py-3 border-b border-gray-100 last:border-0"
                  >
                    <span className="text-xs font-mono text-gray-400 w-32 shrink-0">{size.value}</span>
                    <span 
                      className="text-gray-900"
                      style={{ 
                        fontSize: size.value,
                        fontFamily: parseInt(size.value) >= 48 ? 'var(--font-noto-serif), "Noto Serif", Georgia, serif' : 'var(--font-outfit), Outfit, system-ui, sans-serif',
                        lineHeight: 1.2
                      }}
                    >
                      The quick brown fox
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Typography Presets */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Typography Presets</h3>
              <div className="space-y-6 bg-gray-50 rounded-xl p-6 border border-gray-100">
                <div>
                  <p className="text-xs font-mono text-gray-400 mb-1">Heading 1</p>
                  <p 
                    className="text-gray-900"
                    style={{ 
                      fontFamily: 'var(--font-noto-serif), "Noto Serif", Georgia, serif',
                      fontSize: '64px',
                      fontWeight: 700,
                      lineHeight: 1.1,
                      letterSpacing: '-0.02em'
                    }}
                  >
                    America&apos;s fastest-growing K-12 food service
                  </p>
                </div>
                <div>
                  <p className="text-xs font-mono text-gray-400 mb-1">Heading 2</p>
                  <p 
                    className="text-gray-900"
                    style={{ 
                      fontFamily: 'var(--font-noto-serif), "Noto Serif", Georgia, serif',
                      fontSize: '48px',
                      fontWeight: 700,
                      lineHeight: 1.1,
                      letterSpacing: '-0.02em'
                    }}
                  >
                    Explore our menu
                  </p>
                </div>
                <div>
                  <p className="text-xs font-mono text-gray-400 mb-1">Heading 3</p>
                  <p 
                    className="text-gray-900"
                    style={{ 
                      fontFamily: 'var(--font-outfit), Outfit, system-ui, sans-serif',
                      fontSize: '32px',
                      fontWeight: 600,
                      lineHeight: 1.33
                    }}
                  >
                    Digital solutions built for everyone
                  </p>
                </div>
                <div>
                  <p className="text-xs font-mono text-gray-400 mb-1">Body Large</p>
                  <p 
                    className="text-gray-900"
                    style={{ 
                      fontFamily: 'var(--font-outfit), Outfit, system-ui, sans-serif',
                      fontSize: '20px',
                      fontWeight: 500,
                      lineHeight: 1.6,
                      letterSpacing: '0.009em'
                    }}
                  >
                    See why schools in 15+ states choose Ordo for NSLP, CACFP, & more
                  </p>
                </div>
                <div>
                  <p className="text-xs font-mono text-gray-400 mb-1">Body</p>
                  <p 
                    className="text-gray-700"
                    style={{ 
                      fontFamily: 'var(--font-outfit), Outfit, system-ui, sans-serif',
                      fontSize: '16px',
                      fontWeight: 400,
                      lineHeight: 1.5,
                      letterSpacing: '0.009em'
                    }}
                  >
                    Ordo offers an intuitive, web-based portal accessible on any device and all leading web browsers. 
                    Administrators can place orders online and manage the lunch program.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Spacing */}
        <Section 
          title="Spacing" 
          description="Consistent spacing scale for margins, padding, and gaps"
        >
          <div className="space-y-3">
            {spacingScale.map((space) => (
              <div 
                key={space.name} 
                className="flex items-center gap-4"
              >
                <span className="text-xs font-mono text-gray-400 w-24 shrink-0">{space.name.replace('--space-', '')}</span>
                <span className="text-sm text-gray-500 w-16 shrink-0">{space.value}</span>
                <div 
                  className="h-6 bg-[#396ef3] rounded"
                  style={{ width: space.value }}
                />
              </div>
            ))}
          </div>
        </Section>

        {/* Border Radius */}
        <Section 
          title="Border Radius" 
          description="Rounded corner values for UI elements"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {borderRadii.map((radius) => (
              <div key={radius.name} className="text-center">
                <div 
                  className="h-24 w-24 mx-auto bg-[#396ef3] mb-3"
                  style={{ borderRadius: radius.value }}
                />
                <p className="text-sm font-medium text-gray-900">{radius.name.replace('--border-radius-', '')}</p>
                <p className="text-xs font-mono text-gray-500">{radius.value}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Shadows */}
        <Section 
          title="Shadows" 
          description="Elevation levels for depth and hierarchy"
        >
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div 
                className="h-24 w-full bg-white rounded-lg mb-4"
                style={{ boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)' }}
              />
              <p className="text-sm font-medium text-gray-900">Shadow SM</p>
              <p className="text-xs font-mono text-gray-500 mt-1">0 1px 2px rgba(0,0,0,0.05)</p>
            </div>
            <div className="text-center">
              <div 
                className="h-24 w-full bg-white rounded-lg mb-4"
                style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
              />
              <p className="text-sm font-medium text-gray-900">Shadow MD</p>
              <p className="text-xs font-mono text-gray-500 mt-1">0 4px 6px rgba(0,0,0,0.1)</p>
            </div>
            <div className="text-center">
              <div 
                className="h-24 w-full bg-white rounded-lg mb-4"
                style={{ boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)' }}
              />
              <p className="text-sm font-medium text-gray-900">Shadow LG</p>
              <p className="text-xs font-mono text-gray-500 mt-1">0 10px 15px rgba(0,0,0,0.1)</p>
            </div>
          </div>
        </Section>

        {/* Components Preview */}
        <Section 
          title="Component Examples" 
          description="Buttons and interactive elements using the design tokens"
        >
          <div className="space-y-8">
            {/* Buttons */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Buttons</h3>
              <div className="flex flex-wrap items-center gap-4">
                <button 
                  className="px-6 py-3 rounded-lg text-white font-medium transition-opacity hover:opacity-90"
                  style={{ 
                    backgroundColor: '#396ef3',
                    fontFamily: 'var(--font-outfit), Outfit, system-ui, sans-serif'
                  }}
                >
                  Request a Quote
                </button>
                <button 
                  className="px-6 py-3 rounded-lg font-medium border transition-colors hover:bg-gray-50"
                  style={{ 
                    borderColor: 'rgba(0,0,0,0.12)',
                    color: 'rgba(0,0,0,0.87)',
                    fontFamily: 'var(--font-outfit), Outfit, system-ui, sans-serif'
                  }}
                >
                  Learn More
                </button>
                <button 
                  className="px-6 py-3 font-medium flex items-center gap-2 transition-opacity hover:opacity-70"
                  style={{ 
                    color: 'rgba(0,0,0,0.87)',
                    fontFamily: 'var(--font-outfit), Outfit, system-ui, sans-serif'
                  }}
                >
                  View our menu
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Cards */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Card</h3>
              <div 
                className="max-w-sm p-6 bg-white border rounded-2xl"
                style={{ 
                  borderColor: 'rgba(0,0,0,0.12)',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div 
                  className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center text-2xl"
                  style={{ backgroundColor: '#C8F0DC' }}
                >
                  🥗
                </div>
                <h4 
                  className="text-xl font-semibold mb-2"
                  style={{ 
                    fontFamily: 'var(--font-outfit), Outfit, system-ui, sans-serif',
                    color: 'rgba(0,0,0,0.87)'
                  }}
                >
                  Fresh, Whole, & Scratch-Made
                </h4>
                <p 
                  className="text-sm"
                  style={{ 
                    fontFamily: 'var(--font-outfit), Outfit, system-ui, sans-serif',
                    color: '#5b5b5b',
                    lineHeight: 1.5
                  }}
                >
                  All meals are prepared using whole ingredients and made from scratch.
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Navigation</h3>
              <div 
                className="inline-flex items-center gap-10 p-4 bg-white border rounded-lg"
                style={{ 
                  borderColor: 'rgba(0,0,0,0.12)',
                  fontFamily: 'var(--font-outfit), Outfit, system-ui, sans-serif'
                }}
              >
                <span className="text-base" style={{ color: 'rgba(0,0,0,0.87)' }}>Schools</span>
                <span className="text-base" style={{ color: 'rgba(0,0,0,0.87)' }}>Our menus</span>
                <span className="text-base" style={{ color: 'rgba(0,0,0,0.87)' }}>Case studies</span>
                <span className="text-base" style={{ color: 'rgba(0,0,0,0.87)' }}>Announcements</span>
              </div>
            </div>
          </div>
        </Section>

      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-16">
        <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Design tokens from{' '}
            <a 
              href="https://www.figma.com/design/I6ut1BYbe41mZCaEF9IDAe/Website-4.0?node-id=2278-332"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#396ef3] hover:underline"
            >
              Figma design file
            </a>
          </p>
          <Link 
            href="/.cursor/rules/design-tokens.mdc" 
            className="text-sm text-gray-500 hover:text-gray-900"
          >
            View raw tokens →
          </Link>
        </div>
      </footer>
    </div>
  )
}

