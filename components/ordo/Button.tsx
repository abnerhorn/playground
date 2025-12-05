/**
 * Ordo Button Component
 * =====================
 * 
 * Primary and Secondary button variants for the customer-facing website.
 * Responsive sizing: 44px height on mobile, 59px on desktop.
 */

import { cn } from '@/lib/utils/cn'
import { ReactNode, ButtonHTMLAttributes, forwardRef } from 'react'
import Link from 'next/link'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'text'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonBaseProps {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  children: ReactNode
  className?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

interface ButtonAsButton extends ButtonBaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> {
  href?: never
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string
  target?: string
  rel?: string
}

type ButtonProps = ButtonAsButton | ButtonAsLink

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-ordo-primary-300 text-ordo-white hover:bg-ordo-primary-400 active:bg-ordo-primary-500 shadow-ordo-sm hover:shadow-ordo-md',
  secondary: 'bg-transparent border border-ordo-divider text-ordo-neutral-500 hover:bg-ordo-neutral-100 active:bg-ordo-neutral-200',
  ghost: 'bg-transparent text-ordo-neutral-500 hover:bg-ordo-neutral-100 active:bg-ordo-neutral-200',
  text: 'bg-transparent text-ordo-neutral-500 hover:text-ordo-primary-300 p-0',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-ordo-xs rounded-ordo-md',
  md: 'h-[var(--ordo-button-height)] px-6 text-ordo-sm rounded-ordo-md',
  lg: 'h-14 px-8 text-ordo-md rounded-ordo-lg',
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(props, ref) {
    const {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      children,
      className,
      leftIcon,
      rightIcon,
      ...rest
    } = props

    const baseStyles = cn(
      'font-body font-semibold inline-flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none',
      variantStyles[variant],
      variant !== 'text' && sizeStyles[size],
      fullWidth && 'w-full',
      className
    )

    const content = (
      <>
        {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </>
    )

    if ('href' in props && props.href) {
      const { href, target, rel, ...linkProps } = rest as ButtonAsLink
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target={target}
          rel={rel}
          className={baseStyles}
          {...linkProps}
        >
          {content}
        </Link>
      )
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={baseStyles}
        {...(rest as ButtonAsButton)}
      >
        {content}
      </button>
    )
  }
)

// ============================================
// ICON BUTTON
// ============================================

interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  icon: ReactNode
  label: string
  variant?: ButtonVariant
  size?: ButtonSize
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton({ icon, label, variant = 'ghost', size = 'md', className, ...props }, ref) {
    const sizeMap: Record<ButtonSize, string> = {
      sm: 'w-8 h-8',
      md: 'w-10 h-10',
      lg: 'w-12 h-12',
    }

    return (
      <button
        ref={ref}
        aria-label={label}
        className={cn(
          'inline-flex items-center justify-center rounded-ordo-md transition-all duration-200',
          variantStyles[variant],
          sizeMap[size],
          className
        )}
        {...props}
      >
        {icon}
      </button>
    )
  }
)

// ============================================
// ARROW ICON (commonly used)
// ============================================

export function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={cn('w-4 h-4', className)} 
      viewBox="0 0 16 16" 
      fill="currentColor"
    >
      <path d="M8.7 4.3a1 1 0 0 0-1.4 1.4L9.58 8l-2.3 2.3a1 1 0 1 0 1.42 1.4l3-3a1 1 0 0 0 0-1.4l-3-3Z"/>
    </svg>
  )
}
