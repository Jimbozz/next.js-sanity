'use client'
import { Squircle } from 'corner-smoothing'
import { useEffect, useState } from 'react'

const DEFAULT_OPTIONS = {
  cornerSmoothing: 1,
}

interface ImageSquircleProps {
  className?: string
  children?: React.ReactNode
}

export const ImageSquircle = ({ children, className }: ImageSquircleProps) => {
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
      as={'div'}
      {...DEFAULT_OPTIONS}
      cornerRadius={cornerRadius}
      className={className}
    >
      {children}
    </Squircle>
  )
}
