/**
 * Ordo Typography Components
 * ==========================
 * 
 * Responsive typography components for the customer-facing website.
 * Uses Noto Serif for headings and Outfit for body text.
 */

import { cn } from '@/lib/utils/cn'
import { ReactNode, ElementType } from 'react'

// ============================================
// HEADING COMPONENT
// ============================================

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

interface HeadingProps {
  level?: HeadingLevel
  children: ReactNode
  className?: string
  as?: ElementType
}

const headingStyles: Record<HeadingLevel, string> = {
  1: 'font-heading font-bold text-ordo-3xl leading-ordo-tight tracking-ordo-tight text-ordo-neutral-500',
  2: 'font-heading font-bold text-ordo-2xl leading-ordo-tight tracking-ordo-tight text-ordo-neutral-500',
  3: 'font-body font-semibold text-ordo-xl leading-ordo-snug text-ordo-neutral-500',
  4: 'font-body font-semibold text-ordo-lg leading-ordo-snug text-ordo-neutral-500',
  5: 'font-body font-semibold text-ordo-md leading-ordo-normal text-ordo-neutral-500',
  6: 'font-body font-semibold text-ordo-sm leading-ordo-normal text-ordo-neutral-500',
}

export function Heading({ 
  level = 1, 
  children, 
  className,
  as,
}: HeadingProps) {
  const Tag = as || (`h${level}` as ElementType)
  
  return (
    <Tag className={cn(headingStyles[level], className)}>
      {children}
    </Tag>
  )
}

// ============================================
// TEXT COMPONENT
// ============================================

type TextSize = 'xs' | 'sm' | 'base' | 'lg'
type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold'
type TextColor = 'primary' | 'secondary' | 'muted' | 'white' | 'inherit'

interface TextProps {
  size?: TextSize
  weight?: TextWeight
  color?: TextColor
  children: ReactNode
  className?: string
  as?: ElementType
}

const textSizeStyles: Record<TextSize, string> = {
  xs: 'text-ordo-xs leading-[1.45] tracking-ordo-wide',
  sm: 'text-ordo-sm leading-ordo-normal tracking-ordo-normal',
  base: 'text-ordo-sm leading-ordo-normal tracking-ordo-normal',
  lg: 'text-ordo-lg leading-ordo-relaxed tracking-ordo-normal',
}

const textWeightStyles: Record<TextWeight, string> = {
  regular: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
}

const textColorStyles: Record<TextColor, string> = {
  primary: 'text-ordo-neutral-500',
  secondary: 'text-ordo-neutral-400',
  muted: 'text-ordo-neutral-300',
  white: 'text-ordo-white',
  inherit: 'text-inherit',
}

export function Text({ 
  size = 'base',
  weight = 'regular',
  color = 'primary',
  children, 
  className,
  as = 'p',
}: TextProps) {
  const Tag = as
  
  return (
    <Tag 
      className={cn(
        'font-body',
        textSizeStyles[size],
        textWeightStyles[weight],
        textColorStyles[color],
        className
      )}
    >
      {children}
    </Tag>
  )
}

// ============================================
// LABEL COMPONENT
// ============================================

interface LabelProps {
  children: ReactNode
  className?: string
}

export function Label({ children, className }: LabelProps) {
  return (
    <span 
      className={cn(
        'font-body text-ordo-xs font-semibold uppercase tracking-ordo-wide text-ordo-neutral-400',
        className
      )}
    >
      {children}
    </span>
  )
}

// ============================================
// LINK TEXT COMPONENT
// ============================================

interface LinkTextProps {
  children: ReactNode
  className?: string
  href?: string
}

export function LinkText({ children, className, href }: LinkTextProps) {
  const Tag = href ? 'a' : 'span'
  
  return (
    <Tag 
      href={href}
      className={cn(
        'font-body font-medium text-ordo-primary-300 hover:text-ordo-primary-400 transition-colors cursor-pointer inline-flex items-center gap-1',
        className
      )}
    >
      {children}
      <svg 
        className="w-4 h-4" 
        viewBox="0 0 16 16" 
        fill="currentColor"
      >
        <path d="M8.7 4.3a1 1 0 0 0-1.4 1.4L9.58 8l-2.3 2.3a1 1 0 1 0 1.42 1.4l3-3a1 1 0 0 0 0-1.4l-3-3Z"/>
      </svg>
    </Tag>
  )
}
