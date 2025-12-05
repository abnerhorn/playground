'use client'

/**
 * Design Tokens Showcase
 * ======================
 * 
 * Visual reference page for the Ordo customer-facing website design system.
 * Displays all colors, typography, spacing, and component tokens.
 */

import { useState } from 'react'

// Design tokens extracted from Figma
const tokens = {
  colors: {
    primary: [
      { name: '--color-primary-100', value: '#C9E4F9', label: '100' },
      { name: '--color-primary-200', value: '#7BB8D9', label: '200' },
      { name: '--color-primary-300', value: '#0099D6', label: '300' },
      { name: '--color-primary-400', value: '#0077B3', label: '400' },
      { name: '--color-primary-500', value: '#1A5276', label: '500' },
    ],
    neutrals: [
      { name: '--color-neutral-100', value: '#F0F0F0', label: '100' },
      { name: '--color-neutral-200', value: '#D0D0D0', label: '200' },
      { name: '--color-neutral-300', value: '#A0A0A0', label: '300' },
      { name: '--color-neutral-400', value: '#606060', label: '400' },
      { name: '--color-neutral-500', value: '#000000', label: '500' },
    ],
    accents: {
      pink: [
        { name: '--color-pink-100', value: '#F5E6F0', label: '100' },
        { name: '--color-pink-200', value: '#E8B4D0', label: '200' },
        { name: '--color-pink-300', value: '#D46F9B', label: '300' },
        { name: '--color-pink-400', value: '#A34470', label: '400' },
        { name: '--color-pink-500', value: '#6B2D4A', label: '500' },
      ],
      yellow: [
        { name: '--color-yellow-100', value: '#F7EED8', label: '100' },
        { name: '--color-yellow-200', value: '#F5D99A', label: '200' },
        { name: '--color-yellow-300', value: '#F5C24A', label: '300' },
        { name: '--color-yellow-400', value: '#F5A623', label: '400' },
        { name: '--color-yellow-500', value: '#8B5A2B', label: '500' },
      ],
      green: [
        { name: '--color-green-100', value: '#DDF2E4', label: '100' },
        { name: '--color-green-200', value: '#8DCAA0', label: '200' },
        { name: '--color-green-300', value: '#5DB57A', label: '300' },
        { name: '--color-green-400', value: '#2E9E4E', label: '400' },
        { name: '--color-green-500', value: '#1D6B35', label: '500' },
      ],
    },
  },
  typography: {
    families: [
      { name: '--font-family-heading', value: '"Noto Serif", Georgia, serif', label: 'Heading' },
      { name: '--font-family-body', value: '"Outfit", system-ui, sans-serif', label: 'Body' },
    ],
    weights: [
      { name: '--font-weight-regular', value: '400', label: 'Regular' },
      { name: '--font-weight-medium', value: '500', label: 'Medium' },
      { name: '--font-weight-semibold', value: '600', label: 'SemiBold' },
      { name: '--font-weight-bold', value: '700', label: 'Bold' },
    ],
    sizes: [
      { name: '--font-size-xs', value: '14px', rem: '0.875rem', label: 'XS' },
      { name: '--font-size-sm', value: '16px', rem: '1rem', label: 'SM' },
      { name: '--font-size-md', value: '18px', rem: '1.125rem', label: 'MD' },
      { name: '--font-size-lg', value: '20px', rem: '1.25rem', label: 'LG' },
      { name: '--font-size-xl', value: '32px', rem: '2rem', label: 'XL' },
      { name: '--font-size-2xl', value: '48px', rem: '3rem', label: '2XL' },
      { name: '--font-size-3xl', value: '64px', rem: '4rem', label: '3XL' },
    ],
  },
  spacing: [
    { name: '--space-xs', value: '8px', rem: '0.5rem', label: 'XS' },
    { name: '--space-sm', value: '10px', rem: '0.625rem', label: 'SM' },
    { name: '--space-md', value: '15px', rem: '0.9375rem', label: 'MD' },
    { name: '--space-lg', value: '24px', rem: '1.5rem', label: 'LG' },
    { name: '--space-xl', value: '40px', rem: '2.5rem', label: 'XL' },
    { name: '--space-2xl', value: '72px', rem: '4.5rem', label: '2XL' },
  ],
  radii: [
    { name: '--border-radius-sm', value: '4px', label: 'SM' },
    { name: '--border-radius-md', value: '8px', label: 'MD' },
    { name: '--border-radius-lg', value: '16px', label: 'LG' },
    { name: '--border-radius-full', value: '9999px', label: 'Full' },
  ],
  shadows: [
    { name: '--shadow-sm', value: '0 1px 2px rgba(0, 0, 0, 0.05)', label: 'Small' },
    { name: '--shadow-md', value: '0 4px 6px rgba(0, 0, 0, 0.1)', label: 'Medium' },
    { name: '--shadow-lg', value: '0 10px 15px rgba(0, 0, 0, 0.1)', label: 'Large' },
  ],
}

function ColorSwatch({ color, showLabel = true }: { color: { name: string; value: string; label: string }; showLabel?: boolean }) {
  const [copied, setCopied] = useState(false)
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(color.value)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  
  const isLight = color.value.toUpperCase().includes('F') && 
                  (color.value.toUpperCase().startsWith('#F') || 
                   color.value.toUpperCase().startsWith('#E') ||
                   color.value.toUpperCase().startsWith('#D') ||
                   color.value.toUpperCase().startsWith('#C'))
  
  return (
    <button
      onClick={copyToClipboard}
      className="group text-left transition-transform hover:scale-105 active:scale-95"
    >
      <div
        className={`w-16 h-16 rounded-full mb-2 transition-shadow group-hover:shadow-lg ${isLight ? 'border border-gray-200' : ''}`}
        style={{ backgroundColor: color.value }}
      />
      {showLabel && (
        <>
          <p className="text-xs font-medium text-gray-800 text-center">{color.label}</p>
          <p className="text-[10px] text-gray-500 font-mono text-center">
            {copied ? '✓ Copied!' : color.value}
          </p>
        </>
      )}
    </button>
  )
}

function ColorScale({ title, colors, accentColor }: { title: string; colors: { name: string; value: string; label: string }[]; accentColor?: string }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">{title}</h3>
        {accentColor && (
          <div className="h-1 flex-1 rounded-full" style={{ backgroundColor: accentColor }} />
        )}
      </div>
      <div className="flex gap-4 items-end">
        {colors.map((color) => (
          <ColorSwatch key={color.name} color={color} />
        ))}
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-8 pb-3 border-b-2 border-[#0099D6]">
        {title}
      </h2>
      {children}
    </section>
  )
}

function Subsection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">{title}</h3>
      {children}
    </div>
  )
}

export default function DesignTokensPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fafbfc' }}>
      {/* Header */}
      <header 
        className="sticky top-0 z-10 backdrop-blur-md border-b"
        style={{ backgroundColor: 'rgba(255,255,255,0.9)', borderColor: 'rgba(0,0,0,0.08)' }}
      >
        <div className="max-w-6xl mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg"
              style={{ backgroundColor: '#0099D6' }}
            >
              O
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Ordo Design System</h1>
              <p className="text-xs text-gray-500">Customer-facing website tokens</p>
            </div>
          </div>
          <a 
            href="/.cursor/rules/design-tokens.mdc"
            className="text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            style={{ backgroundColor: '#0099D6', color: 'white' }}
          >
            View Raw Tokens →
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-8 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 
            className="text-5xl font-bold mb-4"
            style={{ fontFamily: '"Noto Serif", Georgia, serif', color: '#1A5276' }}
          >
            Design Tokens
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: 'Outfit, system-ui, sans-serif' }}>
            Visual reference for colors, typography, spacing, and components used across Ordo&apos;s customer-facing website.
          </p>
        </div>

        {/* Colors */}
        <Section title="Colors">
          {/* Primary */}
          <ColorScale 
            title="UX Primary (Blue)" 
            colors={tokens.colors.primary} 
            accentColor="#0099D6"
          />

          {/* Accent Palette */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">UX Accents</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ColorScale title="Pink" colors={tokens.colors.accents.pink} accentColor="#D46F9B" />
              <ColorScale title="Yellow / Orange" colors={tokens.colors.accents.yellow} accentColor="#F5A623" />
              <ColorScale title="Green" colors={tokens.colors.accents.green} accentColor="#2E9E4E" />
            </div>
          </div>

          {/* Neutrals */}
          <ColorScale 
            title="Neutrals" 
            colors={tokens.colors.neutrals} 
            accentColor="#606060"
          />
        </Section>

        {/* Typography */}
        <Section title="Typography">
          {/* Font Families */}
          <Subsection title="Font Families">
            <div className="space-y-6">
              <div className="p-6 bg-white rounded-2xl border border-gray-100">
                <p className="text-sm text-gray-500 mb-2 font-mono">--font-family-heading</p>
                <p 
                  className="text-4xl"
                  style={{ fontFamily: '"Noto Serif", Georgia, serif' }}
                >
                  Noto Serif — The quick brown fox
                </p>
                <p className="text-xs text-gray-400 mt-2">Used for H1, H2 headings</p>
              </div>
              <div className="p-6 bg-white rounded-2xl border border-gray-100">
                <p className="text-sm text-gray-500 mb-2 font-mono">--font-family-body</p>
                <p 
                  className="text-4xl"
                  style={{ fontFamily: 'Outfit, system-ui, sans-serif' }}
                >
                  Outfit — The quick brown fox
                </p>
                <p className="text-xs text-gray-400 mt-2">Used for body text and UI elements</p>
              </div>
            </div>
          </Subsection>

          {/* Font Weights */}
          <Subsection title="Font Weights">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {tokens.typography.weights.map((weight) => (
                <div key={weight.name} className="p-5 bg-white rounded-xl border border-gray-100">
                  <p 
                    className="text-3xl mb-2"
                    style={{ fontFamily: 'Outfit, system-ui, sans-serif', fontWeight: Number(weight.value) }}
                  >
                    Aa
                  </p>
                  <p className="text-sm font-medium text-gray-800">{weight.label}</p>
                  <p className="text-xs text-gray-500 font-mono">{weight.value}</p>
                </div>
              ))}
            </div>
          </Subsection>

          {/* Font Sizes */}
          <Subsection title="Font Sizes">
            <div className="space-y-4">
              {tokens.typography.sizes.map((size) => (
                <div 
                  key={size.name} 
                  className="flex items-center gap-6 p-4 bg-white rounded-xl border border-gray-100"
                >
                  <div className="w-16 text-center">
                    <span 
                      className="text-xs font-bold px-2 py-1 rounded text-white"
                      style={{ backgroundColor: '#0099D6' }}
                    >
                      {size.label}
                    </span>
                  </div>
                  <p 
                    className="flex-1 text-gray-800"
                    style={{ 
                      fontFamily: 'Outfit, system-ui, sans-serif',
                      fontSize: size.value,
                      lineHeight: 1.2
                    }}
                  >
                    The quick brown fox jumps
                  </p>
                  <div className="text-right">
                    <p className="text-xs font-mono text-gray-500">{size.value}</p>
                    <p className="text-[10px] font-mono text-gray-400">{size.rem}</p>
                  </div>
                </div>
              ))}
            </div>
          </Subsection>

          {/* Typography Presets */}
          <Subsection title="Typography Presets">
            <div className="space-y-6 p-8 bg-white rounded-2xl border border-gray-100">
              <div>
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Heading 1</span>
                <p 
                  className="mt-1"
                  style={{ 
                    fontFamily: '"Noto Serif", Georgia, serif',
                    fontSize: '64px',
                    fontWeight: 700,
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                    color: '#1A5276'
                  }}
                >
                  Hero Title
                </p>
              </div>
              <div>
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Heading 2</span>
                <p 
                  className="mt-1"
                  style={{ 
                    fontFamily: '"Noto Serif", Georgia, serif',
                    fontSize: '48px',
                    fontWeight: 700,
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                    color: '#1A5276'
                  }}
                >
                  Section Title
                </p>
              </div>
              <div>
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Heading 3</span>
                <p 
                  className="mt-1"
                  style={{ 
                    fontFamily: 'Outfit, system-ui, sans-serif',
                    fontSize: '32px',
                    fontWeight: 600,
                    lineHeight: 1.33,
                    color: '#000000'
                  }}
                >
                  Card Title
                </p>
              </div>
              <div>
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Body Large</span>
                <p 
                  className="mt-1"
                  style={{ 
                    fontFamily: 'Outfit, system-ui, sans-serif',
                    fontSize: '20px',
                    fontWeight: 500,
                    lineHeight: 1.6,
                    letterSpacing: '0.009em',
                    color: '#000000'
                  }}
                >
                  Feature description text that explains key benefits.
                </p>
              </div>
              <div>
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Body</span>
                <p 
                  className="mt-1"
                  style={{ 
                    fontFamily: 'Outfit, system-ui, sans-serif',
                    fontSize: '16px',
                    fontWeight: 400,
                    lineHeight: 1.5,
                    letterSpacing: '0.009em',
                    color: '#000000'
                  }}
                >
                  Standard body text used throughout the website for paragraphs and content blocks.
                </p>
              </div>
              <div>
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Body Small</span>
                <p 
                  className="mt-1"
                  style={{ 
                    fontFamily: 'Outfit, system-ui, sans-serif',
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: 1.45,
                    letterSpacing: '0.03em',
                    color: '#606060'
                  }}
                >
                  Captions, labels, and helper text.
                </p>
              </div>
            </div>
          </Subsection>
        </Section>

        {/* Spacing */}
        <Section title="Spacing">
          <div className="space-y-4">
            {tokens.spacing.map((space) => (
              <div 
                key={space.name}
                className="flex items-center gap-6 p-4 bg-white rounded-xl border border-gray-100"
              >
                <div className="w-16 text-center">
                  <span 
                    className="text-xs font-bold px-2 py-1 rounded text-white"
                    style={{ backgroundColor: '#0099D6' }}
                  >
                    {space.label}
                  </span>
                </div>
                <div className="flex-1 flex items-center gap-4">
                  <div 
                    className="h-8 rounded"
                    style={{ 
                      width: space.value, 
                      backgroundColor: '#0099D6',
                      minWidth: space.value
                    }}
                  />
                  <span className="text-sm text-gray-500">{space.value}</span>
                </div>
                <p className="text-xs font-mono text-gray-400">{space.name}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Border Radius */}
        <Section title="Border Radius">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {tokens.radii.map((radius) => (
              <div 
                key={radius.name}
                className="p-6 bg-white border border-gray-100 rounded-xl text-center"
              >
                <div 
                  className="w-20 h-20 mx-auto mb-4"
                  style={{ 
                    backgroundColor: '#0099D6',
                    borderRadius: radius.value
                  }}
                />
                <p className="text-sm font-medium text-gray-800">{radius.label}</p>
                <p className="text-xs font-mono text-gray-500">{radius.value}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Shadows */}
        <Section title="Shadows">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tokens.shadows.map((shadow) => (
              <div 
                key={shadow.name}
                className="p-8 bg-white rounded-2xl border border-gray-50"
                style={{ boxShadow: shadow.value }}
              >
                <p className="text-lg font-semibold text-gray-800 mb-2">{shadow.label}</p>
                <p className="text-xs font-mono text-gray-500 break-all">{shadow.value}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Components Preview */}
        <Section title="Components Preview">
          {/* Buttons */}
          <Subsection title="Buttons">
            <div className="flex flex-wrap items-center gap-4 p-8 bg-white rounded-2xl border border-gray-100">
              <button 
                className="px-6 py-3 rounded-lg font-semibold text-white transition-all hover:opacity-90 active:scale-95"
                style={{ 
                  backgroundColor: '#0099D6',
                  fontFamily: 'Outfit, system-ui, sans-serif'
                }}
              >
                Primary Button
              </button>
              <button 
                className="px-6 py-3 rounded-lg font-semibold transition-all hover:bg-gray-50"
                style={{ 
                  border: '1px solid #D0D0D0',
                  color: '#000000',
                  fontFamily: 'Outfit, system-ui, sans-serif'
                }}
              >
                Secondary Button
              </button>
              <button 
                className="px-4 py-2 font-medium flex items-center gap-2 transition-opacity hover:opacity-80"
                style={{ 
                  color: '#000000',
                  fontFamily: 'Outfit, system-ui, sans-serif'
                }}
              >
                Text Button
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8.7 4.3a1 1 0 0 0-1.4 1.4L9.58 8l-2.3 2.3a1 1 0 1 0 1.42 1.4l3-3a1 1 0 0 0 0-1.4l-3-3Z"/>
                </svg>
              </button>
            </div>
          </Subsection>

          {/* Cards */}
          <Subsection title="Cards">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div 
                className="p-8 bg-white rounded-2xl"
                style={{ 
                  border: '1px solid #D0D0D0',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              >
                <h3 
                  className="text-xl font-semibold mb-3"
                  style={{ fontFamily: 'Outfit, system-ui, sans-serif', color: '#000000' }}
                >
                  Feature Card
                </h3>
                <p 
                  className="text-base mb-4"
                  style={{ 
                    fontFamily: 'Outfit, system-ui, sans-serif', 
                    color: '#606060',
                    lineHeight: 1.5
                  }}
                >
                  Standard feature card with the new design system.
                </p>
                <button 
                  className="font-medium flex items-center gap-2"
                  style={{ 
                    color: '#0099D6',
                    fontFamily: 'Outfit, system-ui, sans-serif'
                  }}
                >
                  Learn more
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8.7 4.3a1 1 0 0 0-1.4 1.4L9.58 8l-2.3 2.3a1 1 0 1 0 1.42 1.4l3-3a1 1 0 0 0 0-1.4l-3-3Z"/>
                  </svg>
                </button>
              </div>
              <div 
                className="p-8 rounded-2xl"
                style={{ backgroundColor: '#DDF2E4' }}
              >
                <h3 
                  className="text-xl font-semibold mb-3"
                  style={{ fontFamily: 'Outfit, system-ui, sans-serif', color: '#1D6B35' }}
                >
                  Green Accent
                </h3>
                <p 
                  className="text-base"
                  style={{ 
                    fontFamily: 'Outfit, system-ui, sans-serif', 
                    color: '#1D6B35',
                    lineHeight: 1.5,
                    opacity: 0.85
                  }}
                >
                  Cards can use accent backgrounds with matching dark text.
                </p>
              </div>
              <div 
                className="p-8 rounded-2xl"
                style={{ backgroundColor: '#F5E6F0' }}
              >
                <h3 
                  className="text-xl font-semibold mb-3"
                  style={{ fontFamily: 'Outfit, system-ui, sans-serif', color: '#6B2D4A' }}
                >
                  Pink Accent
                </h3>
                <p 
                  className="text-base"
                  style={{ 
                    fontFamily: 'Outfit, system-ui, sans-serif', 
                    color: '#6B2D4A',
                    lineHeight: 1.5,
                    opacity: 0.85
                  }}
                >
                  Use 100-level for backgrounds, 500-level for text.
                </p>
              </div>
            </div>
          </Subsection>

          {/* Navigation */}
          <Subsection title="Navigation">
            <div 
              className="p-6 bg-white rounded-2xl border border-gray-100"
            >
              <nav className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: '#0099D6' }}
                  >
                    O
                  </div>
                  <span 
                    className="font-semibold"
                    style={{ fontFamily: 'Outfit, system-ui, sans-serif', color: '#000000' }}
                  >
                    ordo
                  </span>
                </div>
                <div 
                  className="flex items-center gap-8"
                  style={{ fontFamily: 'Outfit, system-ui, sans-serif' }}
                >
                  <a href="#" className="text-base" style={{ color: '#000000' }}>Schools</a>
                  <a href="#" className="text-base" style={{ color: '#000000' }}>Our menus</a>
                  <a href="#" className="text-base" style={{ color: '#000000' }}>Case studies</a>
                  <a href="#" className="text-base" style={{ color: '#000000' }}>Announcements</a>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    className="px-4 py-2 rounded-lg font-medium text-white text-sm"
                    style={{ backgroundColor: '#0099D6' }}
                  >
                    Request a Quote
                  </button>
                  <button 
                    className="px-4 py-2 rounded-lg font-medium text-sm"
                    style={{ 
                      border: '1px solid #D0D0D0',
                      color: '#000000'
                    }}
                  >
                    Log In
                  </button>
                </div>
              </nav>
            </div>
          </Subsection>
        </Section>

        {/* Responsive */}
        <Section title="Responsive Design">
          {/* Breakpoints */}
          <Subsection title="Breakpoints">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Mobile', width: '393px', icon: '📱' },
                { name: 'Tablet', width: '768px', icon: '📱' },
                { name: 'Desktop', width: '1280px', icon: '🖥️' },
                { name: 'Wide', width: '1440px', icon: '🖥️' },
              ].map((bp) => (
                <div 
                  key={bp.name}
                  className="p-5 bg-white rounded-xl border border-gray-100 text-center"
                >
                  <p className="text-2xl mb-2">{bp.icon}</p>
                  <p className="text-sm font-semibold text-gray-800">{bp.name}</p>
                  <p className="text-xs font-mono text-gray-500">{bp.width}</p>
                </div>
              ))}
            </div>
          </Subsection>

          {/* Typography Scale */}
          <Subsection title="Responsive Typography">
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-xl border border-gray-100">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase">Element</th>
                    <th className="text-center p-4 text-xs font-semibold text-gray-500 uppercase">Mobile</th>
                    <th className="text-center p-4 text-xs font-semibold text-gray-500 uppercase">Tablet</th>
                    <th className="text-center p-4 text-xs font-semibold text-gray-500 uppercase">Desktop</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { element: 'Heading 1 (Hero)', mobile: '36px', tablet: '48px', desktop: '64px' },
                    { element: 'Heading 2 (Section)', mobile: '28px', tablet: '36px', desktop: '48px' },
                    { element: 'Heading 3 (Card)', mobile: '20px', tablet: '24px', desktop: '32px' },
                    { element: 'Body Large', mobile: '16px', tablet: '18px', desktop: '20px' },
                    { element: 'Body', mobile: '16px', tablet: '16px', desktop: '16px' },
                    { element: 'Body Small', mobile: '14px', tablet: '14px', desktop: '14px' },
                  ].map((row) => (
                    <tr key={row.element} className="border-b border-gray-50 last:border-0">
                      <td className="p-4 text-sm font-medium text-gray-800">{row.element}</td>
                      <td className="p-4 text-center">
                        <span className="text-xs font-mono px-2 py-1 rounded bg-gray-100 text-gray-600">{row.mobile}</span>
                      </td>
                      <td className="p-4 text-center">
                        <span className="text-xs font-mono px-2 py-1 rounded bg-gray-100 text-gray-600">{row.tablet}</span>
                      </td>
                      <td className="p-4 text-center">
                        <span className="text-xs font-mono px-2 py-1 rounded bg-gray-100 text-gray-600">{row.desktop}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Subsection>

          {/* Layout Differences */}
          <Subsection title="Layout Differences">
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-xl border border-gray-100">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase">Property</th>
                    <th className="text-center p-4 text-xs font-semibold text-gray-500 uppercase">Mobile (393px)</th>
                    <th className="text-center p-4 text-xs font-semibold text-gray-500 uppercase">Desktop (1280px+)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { property: 'Container Padding', mobile: '24px', desktop: '320px (centered)' },
                    { property: 'Content Width', mobile: '345px', desktop: '1280px' },
                    { property: 'Nav Height', mobile: '70px', desktop: '86px' },
                    { property: 'Nav Layout', mobile: 'Logo + Hamburger', desktop: 'Full horizontal menu' },
                    { property: 'Button Height', mobile: '44px', desktop: '59px' },
                    { property: 'Button Layout', mobile: 'Stacked (vertical)', desktop: 'Side-by-side' },
                    { property: 'Feature Grid', mobile: '1 column', desktop: '2 columns' },
                    { property: 'Section Padding Top', mobile: '56px', desktop: '120px' },
                  ].map((row) => (
                    <tr key={row.property} className="border-b border-gray-50 last:border-0">
                      <td className="p-4 text-sm font-medium text-gray-800">{row.property}</td>
                      <td className="p-4 text-center text-sm text-gray-600">{row.mobile}</td>
                      <td className="p-4 text-center text-sm text-gray-600">{row.desktop}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Subsection>

          {/* Mobile vs Desktop Preview */}
          <Subsection title="Button Layout Comparison">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Mobile Preview */}
              <div className="p-6 bg-white rounded-2xl border border-gray-100">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">📱 Mobile</p>
                <div 
                  className="mx-auto p-4 rounded-xl border-2 border-dashed border-gray-200"
                  style={{ width: '200px' }}
                >
                  <div className="space-y-3">
                    <button 
                      className="w-full py-3 rounded-lg font-semibold text-white text-sm"
                      style={{ backgroundColor: '#0099D6' }}
                    >
                      Primary Button
                    </button>
                    <button 
                      className="w-full py-3 rounded-lg font-semibold text-sm"
                      style={{ border: '1px solid #D0D0D0', color: '#000000' }}
                    >
                      Secondary Button
                    </button>
                  </div>
                </div>
                <p className="text-[10px] text-gray-400 text-center mt-3">Full-width, stacked vertically</p>
              </div>

              {/* Desktop Preview */}
              <div className="p-6 bg-white rounded-2xl border border-gray-100">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">🖥️ Desktop</p>
                <div className="p-4 rounded-xl border-2 border-dashed border-gray-200">
                  <div className="flex gap-3 justify-center">
                    <button 
                      className="px-6 py-3 rounded-lg font-semibold text-white text-sm"
                      style={{ backgroundColor: '#0099D6' }}
                    >
                      Primary Button
                    </button>
                    <button 
                      className="px-6 py-3 rounded-lg font-semibold text-sm"
                      style={{ border: '1px solid #D0D0D0', color: '#000000' }}
                    >
                      Secondary Button
                    </button>
                  </div>
                </div>
                <p className="text-[10px] text-gray-400 text-center mt-3">Auto-width, side-by-side</p>
              </div>
            </div>
          </Subsection>

          {/* Navigation Comparison */}
          <Subsection title="Navigation Comparison">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Mobile Nav */}
              <div className="p-6 bg-white rounded-2xl border border-gray-100">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">📱 Mobile Nav (70px)</p>
                <div 
                  className="p-4 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-between"
                  style={{ height: '70px' }}
                >
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-6 h-6 rounded flex items-center justify-center text-white font-bold text-xs"
                      style={{ backgroundColor: '#0099D6' }}
                    >
                      O
                    </div>
                    <span className="font-semibold text-sm">ordo</span>
                  </div>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 12h18M3 6h18M3 18h18" />
                  </svg>
                </div>
              </div>

              {/* Desktop Nav */}
              <div className="p-6 bg-white rounded-2xl border border-gray-100">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">🖥️ Desktop Nav (86px)</p>
                <div 
                  className="p-4 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-between overflow-hidden"
                  style={{ height: '70px' }}
                >
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-6 h-6 rounded flex items-center justify-center text-white font-bold text-xs"
                      style={{ backgroundColor: '#0099D6' }}
                    >
                      O
                    </div>
                    <span className="font-semibold text-sm">ordo</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <span>Schools</span>
                    <span>Menus</span>
                    <span>Case studies</span>
                  </div>
                  <button 
                    className="px-3 py-1.5 rounded text-white text-xs"
                    style={{ backgroundColor: '#0099D6' }}
                  >
                    Quote
                  </button>
                </div>
              </div>
            </div>
          </Subsection>
        </Section>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            Design tokens extracted from{' '}
            <a 
              href="https://www.figma.com/design/I6ut1BYbe41mZCaEF9IDAe/Website-4.0?node-id=2202-5311"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-700"
            >
              Figma design file
            </a>
            {' '}•{' '}
            <a 
              href="https://www.figma.com/design/I6ut1BYbe41mZCaEF9IDAe/Website-4.0?node-id=2278-1440"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-700"
            >
              Mobile frame
            </a>
          </p>
        </footer>
      </main>
    </div>
  )
}
