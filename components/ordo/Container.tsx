/**
 * Ordo Container & Layout Components
 * ===================================
 * 
 * Layout components for the customer-facing website.
 * Responsive container with proper padding at all breakpoints.
 */

import { cn } from '@/lib/utils/cn'
import { ReactNode, HTMLAttributes, forwardRef } from 'react'

// ============================================
// CONTAINER
// ============================================

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  size?: 'default' | 'narrow' | 'wide' | 'full'
}

const containerSizes = {
  default: 'max-w-[1280px]',
  narrow: 'max-w-[960px]',
  wide: 'max-w-[1440px]',
  full: 'max-w-none',
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  function Container({ children, className, size = 'default', ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          'w-full mx-auto px-ordo-lg tablet:px-ordo-xl desktop:px-ordo-lg',
          containerSizes[size],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

// ============================================
// SECTION
// ============================================

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  background?: 'white' | 'surface' | 'primary' | 'pink' | 'yellow' | 'green'
  spacing?: 'sm' | 'md' | 'lg' | 'xl'
}

const bgStyles = {
  white: 'bg-ordo-white',
  surface: 'bg-ordo-surface',
  primary: 'bg-ordo-primary-100',
  pink: 'bg-ordo-pink-100',
  yellow: 'bg-ordo-yellow-100',
  green: 'bg-ordo-green-100',
}

const spacingStyles = {
  sm: 'py-ordo-xl tablet:py-ordo-2xl',
  md: 'py-ordo-2xl tablet:py-ordo-3xl',
  lg: 'py-ordo-3xl tablet:py-[120px]',
  xl: 'py-[100px] tablet:py-[160px]',
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  function Section({ children, className, background = 'white', spacing = 'lg', ...props }, ref) {
    return (
      <section
        ref={ref}
        className={cn(
          bgStyles[background],
          spacingStyles[spacing],
          className
        )}
        {...props}
      >
        {children}
      </section>
    )
  }
)

// ============================================
// SECTION HEADER
// ============================================

interface SectionHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  children?: ReactNode
}

export function SectionHeader({ 
  title, 
  subtitle, 
  align = 'left', 
  children,
  className,
  ...props 
}: SectionHeaderProps) {
  return (
    <div 
      className={cn(
        'mb-ordo-xl tablet:mb-ordo-2xl',
        align === 'center' && 'text-center',
        className
      )}
      {...props}
    >
      <h2 className="font-heading font-bold text-ordo-2xl leading-ordo-tight tracking-ordo-tight text-ordo-neutral-500">
        {title}
      </h2>
      {subtitle && (
        <p className="font-body text-ordo-md text-ordo-neutral-400 mt-2 max-w-2xl">
          {subtitle}
        </p>
      )}
      {children}
    </div>
  )
}

// ============================================
// GRID
// ============================================

interface GridProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  cols?: 1 | 2 | 3 | 4
  gap?: 'sm' | 'md' | 'lg'
}

const gridColStyles = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 tablet:grid-cols-2',
  3: 'grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3',
  4: 'grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4',
}

const gridGapStyles = {
  sm: 'gap-4 tablet:gap-6',
  md: 'gap-6 tablet:gap-8',
  lg: 'gap-8 tablet:gap-10',
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  function Grid({ children, className, cols = 2, gap = 'md', ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          'grid',
          gridColStyles[cols],
          gridGapStyles[gap],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

// ============================================
// FLEX
// ============================================

interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  direction?: 'row' | 'col'
  align?: 'start' | 'center' | 'end' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around'
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  wrap?: boolean
}

const directionStyles = {
  row: 'flex-row',
  col: 'flex-col',
}

const alignStyles = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
}

const justifyStyles = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
}

const flexGapStyles = {
  xs: 'gap-ordo-xs',
  sm: 'gap-ordo-sm',
  md: 'gap-ordo-md',
  lg: 'gap-ordo-lg',
  xl: 'gap-ordo-xl',
}

export const Flex = forwardRef<HTMLDivElement, FlexProps>(
  function Flex({ 
    children, 
    className, 
    direction = 'row', 
    align = 'start', 
    justify = 'start', 
    gap = 'md',
    wrap = false,
    ...props 
  }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          'flex',
          directionStyles[direction],
          alignStyles[align],
          justifyStyles[justify],
          flexGapStyles[gap],
          wrap && 'flex-wrap',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

// ============================================
// SPACER
// ============================================

interface SpacerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  className?: string
}

const spacerSizes = {
  xs: 'h-ordo-xs',
  sm: 'h-ordo-sm',
  md: 'h-ordo-md',
  lg: 'h-ordo-lg',
  xl: 'h-ordo-xl',
  '2xl': 'h-ordo-2xl',
  '3xl': 'h-ordo-3xl',
}

export function Spacer({ size = 'lg', className }: SpacerProps) {
  return <div className={cn(spacerSizes[size], className)} aria-hidden="true" />
}
