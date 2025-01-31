'use client'
import { usePathname } from 'next/navigation'
import type { FC, PropsWithChildren } from 'react'
import { useEffect } from 'react'

import { isBackgroundDark } from '@/sanity/lib/utils'

type BackgroundContainerProps = {
  hexCode?: string
} & PropsWithChildren

export const BackgroundContainer: FC<BackgroundContainerProps> = ({
  hexCode,
  children,
}) => {
  const pathname = usePathname()

  useEffect(() => {
    const body = document.querySelector('body')
    const changeHexToRGB = (hex: string | undefined): string | null => {
      if (!hex) return null
      const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
      hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b
      })

      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result
        ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`
        : null
    }
    const rgbColor = changeHexToRGB(hexCode)
    const isDark = isBackgroundDark(rgbColor)

    if (body) {
      if (hexCode) {
        body.className = isDark ? 'text-white' : 'text-black'
        body.style.backgroundColor = hexCode
      } else {
        body.style.backgroundColor = '#f5f5f5'
        body.className = 'text-black'
      }
    }
  }, [pathname, hexCode])
  return children
}
