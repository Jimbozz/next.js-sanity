import { motion } from 'framer-motion'
import Link from 'next/link'
import type { PortableTextBlock } from 'next-sanity'

import { CustomPortableText } from '@/components/shared/CustomPortableText'

import { OlavstoppenLogo } from './olavstoppen-logo'

interface NavigationDrawerProps {
  menuItems: React.ReactNode
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
  href: string
  buttonText: string
  footerSocialLinks: PortableTextBlock[]
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { ease: 'easeOut' } },
}

const drawerVariants = {
  hidden: { x: '100%', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: {
      ease: 'easeOut',
    },
  },
}

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // Delay between children animations
    },
  },
}

export const NavigationDrawer = ({
  menuItems,
  footerSocialLinks,
}: NavigationDrawerProps) => {
  return (
    <motion.aside
      className="fixed right-0 top-0 z-20 flex h-screen w-screen"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={drawerVariants}
    >
      <motion.div
        className="flex flex-1 flex-col bg-ot-gray p-4"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      >
        <div className="mb-16 flex items-center">
          <Link href="/" rel="noreferrer noopener">
            <div className="w-36 md:hidden">
              <OlavstoppenLogo strokeColor={'white'} />
            </div>
          </Link>
        </div>
        {/* Menu Items */}
        <motion.ul
          className="mx-0 flex flex-grow flex-col gap-6"
          initial="hidden"
          animate="visible"
          variants={listVariants}
        >
          {menuItems}
        </motion.ul>
        {/* Nav Footer */}
        <motion.div
          className="mt-auto flex flex-col-reverse justify-between gap-2 md:flex-row"
          initial="hidden"
          animate="visible"
          variants={listVariants}
        >
          <motion.address
            className="flex flex-col gap-2 font-light not-italic text-white"
            variants={itemVariants}
          >
            <a href="mailto:hello@olavstoppen.no">hello@olavstoppen.no</a>
            <p>Laberget 28, 4020 Stavanger</p>
          </motion.address>
          {footerSocialLinks && (
            <nav className="flex flex-col gap-2">
              <CustomPortableText
                value={footerSocialLinks}
                paragraphClasses="text-white font-light !mb-0"
              />
            </nav>
          )}
        </motion.div>
      </motion.div>
    </motion.aside>
  )
}
