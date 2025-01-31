'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { PortableTextBlock } from 'next-sanity'
import { useEffect, useMemo, useState } from 'react'

import { PillSquircle } from '@/components/shared/pill-squircle'
import { isBackgroundDark, resolveHref } from '@/sanity/lib/utils'
import type { MenuItem, SettingsPayload } from '@/types'

import { BurgerButton } from './BurgerButton'
import { NavigationDrawer } from './navigation-drawer'
import { OlavstoppenLogo } from './olavstoppen-logo'

interface HeaderProps {
  data: SettingsPayload
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { ease: 'easeOut' } },
}

export default function Header({ data = {} as SettingsPayload }: HeaderProps) {
  const {
    menuItems = [] as MenuItem[],
    footerSocialLinks = [] as PortableTextBlock[],
    menuCallToAction,
  } = data

  const [isNavbarVisible, setIsNavbarVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [strokeColor, setStrokeColor] = useState<
    'hsl(0, 0%, 100%)' | 'hsl(0, 0%, 0%)'
  >('hsl(0, 0%, 0%)')
  const [backgroundColor, setBackgroundColor] = useState<string | null>(null)
  const [navbarColor, setNavbarColor] = useState<string | null>(null)
  const [logoColor, setLogoColor] = useState<'#2B2B2B' | 'white'>('#2B2B2B')

  const menuItemsWithHome = useMemo(
    () =>
      [{ _type: 'home', slug: '', title: 'Home' }, ...menuItems] as MenuItem[],
    [menuItems],
  )

  const ctaHref = resolveHref(
    menuCallToAction?.page._type,
    menuCallToAction?.page.slug,
  )

  // Handle navbar visibility and background on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      // For desktop viewports
      if (window.innerWidth >= 768) {
        // Toggle visibility based on scroll direction
        if (currentScrollY > lastScrollY && currentScrollY > 50) {
          setIsNavbarVisible(false) // Scrolling down
        } else {
          setIsNavbarVisible(true) // Scrolling up
        }
      }

      if (currentScrollY > 50) {
        setNavbarColor(backgroundColor)
      } else {
        setNavbarColor(null)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY, backgroundColor])

  //Sets logo color based on background color
  useEffect(() => {
    const darkBackground = isBackgroundDark(backgroundColor)
    setLogoColor(darkBackground ? 'white' : '#2B2B2B')
  }, [backgroundColor])

  //Listens for changes in body background color
  useEffect(() => {
    const body = document.querySelector('body')
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'style'
        ) {
          const backgroundColor = body?.style.backgroundColor || null
          setBackgroundColor(backgroundColor)
        }
      })
    })

    if (body) {
      observer.observe(body, { attributes: true, attributeFilter: ['style'] })
    }
    return () => {
      observer.disconnect()
    }
  }, [])

  //Changes burger icon color based on background color
  useEffect(() => {
    const isDark = isBackgroundDark(backgroundColor)
    if (isMenuOpen || isDark) {
      setStrokeColor('hsl(0, 0%, 100%)')
    } else {
      setStrokeColor('hsl(0, 0%, 0%)')
    }
  }, [isMenuOpen, backgroundColor])

  //Removes nav link to contact page if in desktop view
  const [isMobileViewport, setIsMobileViewport] = useState(false)

  useEffect(() => {
    const mediaQueryList = window.matchMedia('(max-width: 768px)')
    setIsMobileViewport(mediaQueryList.matches)
  }, [])

  // Desktop navigation links
  const desktopNavLinks = useMemo(
    () =>
      menuItems.map((menuItem, key) => {
        const href = resolveHref(menuItem._type, menuItem.slug)
        const isActive = pathname === href
        const isContactMenuItem = menuItem.slug === 'contact'

        if (!href) return null
        if (!isMobileViewport && isContactMenuItem) return null

        return (
          <li key={key} className="flex items-center">
            <Link
              href={href}
              className={`text-[25px] font-light lg:text-3xl ${isActive && 'underline'} decoration-2 underline-offset-4 hover:underline`}
              aria-current={isActive ? 'page' : undefined}
            >
              {menuItem.title}
            </Link>
          </li>
        )
      }),
    [menuItems, pathname, isMobileViewport],
  )

  // Mobile navigation links
  const mobileNavLinks = useMemo(
    () =>
      menuItemsWithHome.map((menuItem, key) => {
        const href = resolveHref(menuItem._type, menuItem.slug)
        const isActive = pathname === href
        if (!href) return null

        return (
          <motion.li
            key={key}
            className="group flex items-center"
            variants={itemVariants}
          >
            <span
              className={`mr-5 block h-2 w-2 rounded-full border-[1px] ${
                isActive ? 'bg-white' : 'border-transparent'
              } group-hover:border-white`}
            ></span>
            <Link
              onClick={() => setIsMenuOpen(false)}
              role="link"
              aria-current={pathname === href ? 'page' : undefined}
              href={href}
              className="text-4xl font-light text-white md:text-5xl"
            >
              {menuItem.title}
            </Link>
          </motion.li>
        )
      }),
    [menuItemsWithHome, pathname],
  )

  if (!ctaHref) return null

  const ctaButtonText = menuCallToAction?.buttonText || 'GET IN TOUCH'

  return (
    <header
      className={`fixed left-0 top-0 z-10 w-full px-4 py-4 transition-transform duration-300 ${
        isNavbarVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
      style={{ backgroundColor: navbarColor || undefined }}
    >
      <nav className="flex items-center justify-between">
        <Link href="/" rel="noreferrer noopener">
          <div className="w-36 md:w-48">
            <OlavstoppenLogo strokeColor={logoColor} />
          </div>
        </Link>
        <div className="flex items-center gap-5 md:flex-row md:gap-8">
          {/* Desktop Navigation Links */}
          <ul className="hidden items-center gap-8 md:flex">
            {desktopNavLinks}
          </ul>
          <PillSquircle
            tagType={'button'}
            className="h-fit bg-ot-blue px-3 py-[4px] text-sm font-light text-white md:px-6 md:py-2 md:text-lg"
          >
            <Link href={ctaHref}>{ctaButtonText}</Link>
          </PillSquircle>
          {/* Mobile Burger Menu Button */}
          <div className="flex w-6 md:hidden">
            <BurgerButton
              toggle={() => setIsMenuOpen(!isMenuOpen)}
              isOpen={isMenuOpen}
              strokeColor={strokeColor}
            />
          </div>
        </div>
      </nav>
      <AnimatePresence>
        {isMenuOpen && (
          <NavigationDrawer
            menuItems={mobileNavLinks}
            setIsMenuOpen={setIsMenuOpen}
            href={ctaHref}
            buttonText={ctaButtonText}
            footerSocialLinks={footerSocialLinks}
          />
        )}
      </AnimatePresence>
    </header>
  )
}
