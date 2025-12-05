/**
 * Ordo Hero Component
 * ===================
 * 
 * Hero section component for landing pages.
 */

import { cn } from '@/lib/utils/cn'
import { ReactNode } from 'react'
import { Container } from './Container'
import { Heading, Text } from './Typography'

interface HeroProps {
  title: string
  subtitle?: string
  children?: ReactNode
  align?: 'left' | 'center'
  background?: 'white' | 'surface' | 'gradient'
  className?: string
}

const bgStyles = {
  white: 'bg-ordo-white',
  surface: 'bg-ordo-surface',
  gradient: 'bg-gradient-to-b from-ordo-white to-ordo-surface',
}

export function Hero({
  title,
  subtitle,
  children,
  align = 'center',
  background = 'white',
  className,
}: HeroProps) {
  return (
    <section
      className={cn(
        'py-ordo-2xl tablet:py-ordo-3xl desktop:py-[180px]',
        bgStyles[background],
        className
      )}
    >
      <Container>
        <div className={cn(
          'max-w-4xl',
          align === 'center' && 'mx-auto text-center'
        )}>
          <Heading level={1} className="mb-4">
            {title}
          </Heading>
          
          {subtitle && (
            <Text 
              size="lg" 
              color="secondary"
              className="max-w-2xl mb-ordo-xl"
              as="p"
            >
              {subtitle}
            </Text>
          )}
          
          {children && (
            <div className={cn(
              'flex flex-col tablet:flex-row gap-4 mt-ordo-xl',
              align === 'center' && 'justify-center'
            )}>
              {children}
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}

// ============================================
// HERO WITH IMAGE
// ============================================

interface HeroWithImageProps extends Omit<HeroProps, 'align'> {
  image: ReactNode
  imagePosition?: 'right' | 'bottom'
}

export function HeroWithImage({
  title,
  subtitle,
  children,
  image,
  imagePosition = 'right',
  background = 'white',
  className,
}: HeroWithImageProps) {
  return (
    <section
      className={cn(
        'py-ordo-2xl tablet:py-ordo-3xl',
        bgStyles[background],
        className
      )}
    >
      <Container>
        <div className={cn(
          'grid gap-ordo-xl tablet:gap-ordo-2xl',
          imagePosition === 'right' 
            ? 'tablet:grid-cols-2 items-center' 
            : 'grid-cols-1'
        )}>
          {/* Content */}
          <div className={imagePosition === 'bottom' ? 'text-center max-w-3xl mx-auto' : ''}>
            <Heading level={1} className="mb-4">
              {title}
            </Heading>
            
            {subtitle && (
              <Text 
                size="lg" 
                color="secondary"
                className="mb-ordo-lg"
                as="p"
              >
                {subtitle}
              </Text>
            )}
            
            {children && (
              <div className={cn(
                'flex flex-col tablet:flex-row gap-4',
                imagePosition === 'bottom' && 'justify-center'
              )}>
                {children}
              </div>
            )}
          </div>
          
          {/* Image */}
          <div className={cn(
            'relative',
            imagePosition === 'bottom' && 'order-last'
          )}>
            {image}
          </div>
        </div>
      </Container>
    </section>
  )
}

// ============================================
// STATS / TILES
// ============================================

interface StatTile {
  value: string
  label: string
  icon?: ReactNode
}

interface StatsTilesProps {
  stats: StatTile[]
  className?: string
}

export function StatsTiles({ stats, className }: StatsTilesProps) {
  return (
    <div className={cn(
      'grid grid-cols-1 tablet:grid-cols-3 gap-0',
      className
    )}>
      {stats.map((stat, index) => (
        <div 
          key={index}
          className="py-ordo-lg tablet:py-ordo-xl text-center border-b tablet:border-b-0 tablet:border-r border-ordo-divider last:border-0"
        >
          {stat.icon && (
            <div className="w-14 h-14 tablet:w-16 tablet:h-16 mx-auto mb-3 rounded-full bg-ordo-primary-100 flex items-center justify-center">
              {stat.icon}
            </div>
          )}
          <p className="font-body font-semibold text-ordo-xl text-ordo-neutral-500">
            {stat.value}
          </p>
          <p className="font-body text-ordo-sm text-ordo-neutral-400 mt-1">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  )
}

