/**
 * Ordo Logo Component
 * ===================
 * 
 * The official Ordo logo using the SVG asset from Figma.
 */

import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils/cn'

interface LogoProps {
  className?: string
  href?: string
  variant?: 'dark' | 'light'
}

export function Logo({ className, href = '/', variant = 'dark' }: LogoProps) {
  const logo = (
    <Image
      src="/images/ordo-logo.svg"
      alt="Ordo"
      width={69}
      height={38}
      className={cn(
        'h-[38px] w-auto',
        variant === 'light' && 'invert',
        className
      )}
      priority
    />
  )

  if (href) {
    return (
      <Link href={href} className="flex items-center">
        {logo}
      </Link>
    )
  }

  return logo
}

