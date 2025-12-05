/**
 * Ordo Input Components
 * =====================
 * 
 * Form inputs for the customer-facing website.
 * 
 * Usage:
 * <Input placeholder="Enter your email" />
 * <Textarea placeholder="Message" />
 * <FormField label="Email" error="Required">
 *   <Input />
 * </FormField>
 */

import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

/**
 * Input - Text input component
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'ordo-input',
          'w-full h-11 tablet:h-[52px] desktop:h-[59px]',
          'px-ordo-md',
          'font-body text-ordo-sm',
          'text-ordo-neutral-500',
          'bg-ordo-white',
          'border border-ordo-divider rounded-ordo-md',
          'placeholder:text-ordo-neutral-300',
          'focus:outline-none focus:border-ordo-primary-300 focus:ring-2 focus:ring-ordo-primary-100',
          'disabled:bg-ordo-neutral-100 disabled:cursor-not-allowed',
          'transition-all duration-150',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-100',
          className
        )}
        {...props}
      />
    )
  }
)

Input.displayName = 'OrdoInput'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
}

/**
 * Textarea - Multiline text input
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'ordo-textarea',
          'w-full min-h-[120px]',
          'p-ordo-md',
          'font-body text-ordo-sm',
          'text-ordo-neutral-500',
          'bg-ordo-white',
          'border border-ordo-divider rounded-ordo-md',
          'placeholder:text-ordo-neutral-300',
          'focus:outline-none focus:border-ordo-primary-300 focus:ring-2 focus:ring-ordo-primary-100',
          'disabled:bg-ordo-neutral-100 disabled:cursor-not-allowed',
          'resize-y',
          'transition-all duration-150',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-100',
          className
        )}
        {...props}
      />
    )
  }
)

Textarea.displayName = 'OrdoTextarea'

interface FormFieldProps {
  children: ReactNode
  label?: string
  error?: string
  hint?: string
  required?: boolean
  className?: string
}

/**
 * FormField - Wrapper for form inputs with label and error
 */
export function FormField({
  children,
  label,
  error,
  hint,
  required,
  className,
}: FormFieldProps) {
  return (
    <div className={cn('flex flex-col gap-ordo-xs', className)}>
      {label && (
        <label className="font-body font-medium text-ordo-sm text-ordo-neutral-500">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {children}
      
      {hint && !error && (
        <p className="font-body text-ordo-xs text-ordo-neutral-400">
          {hint}
        </p>
      )}
      
      {error && (
        <p className="font-body text-ordo-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}

