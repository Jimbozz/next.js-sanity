'use client'
import { Squircle } from 'corner-smoothing'
import { useEffect, useState } from 'react'

const DEFAULT_OPTIONS = {
  cornerSmoothing: 1,
}

interface FigureSquircleProps {
  className?: string

  children?: React.ReactNode

  onMouseEnter?: (event: React.MouseEvent<HTMLDivElement>) => void

  onMouseLeave?: (event: React.MouseEvent<HTMLDivElement>) => void

  onMouseMove?: (event: React.MouseEvent<HTMLDivElement>) => void

  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

export const FigureSquircle = ({
  children,
  className,
}: FigureSquircleProps) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    return () => {
      window.removeEventListener('resize', checkIfMobile)
    }
  }, [])

  const cornerRadius = isMobile ? 8 : 16 // 8px for mobile, 16px for desktop

  return (
    <Squircle
      as="figure"
      {...DEFAULT_OPTIONS}
      cornerRadius={cornerRadius}
      className={className}
    >
      {children}
    </Squircle>
  )
}
