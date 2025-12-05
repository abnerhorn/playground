/**
 * Ordo Badge Component
 * ====================
 * 
 * Badges and tags for the customer-facing website.
 * 
 * Usage:
 * <Badge>Default</Badge>
 * <Badge variant="green">Success</Badge>
 * <Badge variant="pill">Pill shape</Badge>
 */

import { ReactNode, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils/cn'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
  variant?: 'default' | 'primary' | 'green' | 'pink' | 'yellow' | 'outline'
  size?: 'sm' | 'md'
  pill?: boolean
}

/**
 * Badge - Tag/label component
 */
export function Badge({ 
  children, 
  className,
  variant = 'default',
  size = 'sm',
  pill = false,
  ...props 
}: BadgeProps) {
  const variants = {
    default: 'bg-ordo-neutral-100 text-ordo-neutral-500',
    primary: 'bg-ordo-primary-100 text-ordo-primary-500',
    green: 'bg-ordo-green-100 text-ordo-green-500',
    pink: 'bg-ordo-pink-100 text-ordo-pink-500',
    yellow: 'bg-ordo-yellow-100 text-ordo-yellow-500',
    outline: 'bg-transparent border border-ordo-divider text-ordo-neutral-500',
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center',
        'font-body font-medium',
        variants[variant],
        sizes[size],
        pill ? 'rounded-full' : 'rounded-ordo-sm',
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

