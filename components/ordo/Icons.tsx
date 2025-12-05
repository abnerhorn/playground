/**
 * Ordo Icon Components
 * ====================
 * 
 * SVG icons for the customer-facing website.
 */

import { SVGAttributes } from 'react'
import { cn } from '@/lib/utils/cn'

interface IconProps extends SVGAttributes<SVGSVGElement> {
  size?: number
}

/**
 * OrdoIcon - Main Ordo logo icon
 */
export function OrdoIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={cn('text-ordo-primary-300', className)}
      {...props}
    >
      <rect width="24" height="24" rx="6" fill="currentColor" />
      <text
        x="12"
        y="16"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill="white"
        fontFamily="Outfit, sans-serif"
      >
        O
      </text>
    </svg>
  )
}

/**
 * ArrowRight - Right arrow icon
 */
export function ArrowRight({ size = 16, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M8.7 4.3a1 1 0 0 0-1.4 1.4L9.58 8l-2.3 2.3a1 1 0 1 0 1.42 1.4l3-3a1 1 0 0 0 0-1.4l-3-3Z" />
    </svg>
  )
}

/**
 * Check - Checkmark icon
 */
export function Check({ size = 16, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M13.5 4.5L6 12L2.5 8.5" />
    </svg>
  )
}

/**
 * Menu - Hamburger menu icon
 */
export function Menu({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}

/**
 * Close - X close icon
 */
export function Close({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

/**
 * ChevronDown - Dropdown arrow
 */
export function ChevronDown({ size = 16, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M4 6l4 4 4-4" />
    </svg>
  )
}

/**
 * Star - Star rating icon
 */
export function Star({ size = 16, className, filled = false, ...props }: IconProps & { filled?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={1.5}
      className={className}
      {...props}
    >
      <path d="M8 1.5l1.76 3.57 3.94.57-2.85 2.78.67 3.93L8 10.5l-3.52 1.85.67-3.93L2.3 5.64l3.94-.57L8 1.5z" />
    </svg>
  )
}

