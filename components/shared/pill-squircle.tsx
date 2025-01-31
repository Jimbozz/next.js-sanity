'use client'
import { Squircle } from 'corner-smoothing'

const SQUIRCLE_OPTIONS = {
  cornerRadius: 100,
  cornerSmoothing: 1,
  preserveSmoothing: true,
}

interface PillSquircleProps {
  className?: string
  style?: React.CSSProperties

  children?: React.ReactNode
  tagType?: keyof React.ReactHTML | React.ComponentType<'button' | 'div'>
}

export const PillSquircle = ({
  children,
  className,
  style,
  tagType,
}: PillSquircleProps) => {
  return (
    <Squircle
      as={tagType ?? 'div'}
      {...SQUIRCLE_OPTIONS}
      className={className}
      style={style}
    >
      {children}
    </Squircle>
  )
}
