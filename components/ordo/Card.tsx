/**
 * Ordo Card Component
 * ===================
 * 
 * Card component with accent color variants for the customer-facing website.
 */

import { cn } from '@/lib/utils/cn'
import { ReactNode, HTMLAttributes, forwardRef } from 'react'

type CardVariant = 'default' | 'outlined' | 'elevated' | 'pink' | 'yellow' | 'green' | 'primary'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  padding?: 'none' | 'sm' | 'md' | 'lg'
  children: ReactNode
}

const variantStyles: Record<CardVariant, string> = {
  default: 'bg-ordo-white border border-ordo-divider',
  outlined: 'bg-transparent border border-ordo-divider',
  elevated: 'bg-ordo-white border border-ordo-divider shadow-ordo-md',
  pink: 'bg-ordo-pink-100 border-0',
  yellow: 'bg-ordo-yellow-100 border-0',
  green: 'bg-ordo-green-100 border-0',
  primary: 'bg-ordo-primary-100 border-0',
}

const paddingStyles = {
  none: 'p-0',
  sm: 'p-4 tablet:p-6',
  md: 'p-6 tablet:p-8',
  lg: 'p-8 tablet:p-10',
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  function Card({ variant = 'default', padding = 'md', children, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-ordo-lg overflow-hidden',
          variantStyles[variant],
          paddingStyles[padding],
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
// CARD HEADER
// ============================================

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  function CardHeader({ children, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn('mb-4', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

// ============================================
// CARD TITLE
// ============================================

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode
  as?: 'h2' | 'h3' | 'h4'
}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  function CardTitle({ children, className, as: Tag = 'h3', ...props }, ref) {
    return (
      <Tag
        ref={ref}
        className={cn(
          'font-body font-semibold text-ordo-xl leading-ordo-snug text-ordo-neutral-500',
          className
        )}
        {...props}
      >
        {children}
      </Tag>
    )
  }
)

// ============================================
// CARD CONTENT
// ============================================

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  function CardContent({ children, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn('text-ordo-neutral-400', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

// ============================================
// CARD FOOTER
// ============================================

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  function CardFooter({ children, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn('mt-6 flex items-center gap-4', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

// ============================================
// FEATURE CARD (Pre-composed)
// ============================================

interface FeatureCardProps {
  title: string
  description: string
  icon?: ReactNode
  action?: ReactNode
  variant?: CardVariant
  className?: string
}

export function FeatureCard({ 
  title, 
  description, 
  icon, 
  action,
  variant = 'elevated',
  className 
}: FeatureCardProps) {
  return (
    <Card variant={variant} className={className}>
      {icon && (
        <div className="mb-4 w-12 h-12 rounded-ordo-md bg-ordo-primary-100 flex items-center justify-center text-ordo-primary-300">
          {icon}
        </div>
      )}
      <CardTitle>{title}</CardTitle>
      <CardContent>
        <p className="font-body text-ordo-sm leading-ordo-normal mt-2">
          {description}
        </p>
      </CardContent>
      {action && (
        <CardFooter>
          {action}
        </CardFooter>
      )}
    </Card>
  )
}
