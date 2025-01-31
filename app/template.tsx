'use client'

import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'

export default function Template({ children }: { children: React.ReactNode }) {
  const [isFirstLoad, setIsFirstLoad] = useState(true)

  useEffect(() => {
    if (isFirstLoad) {
      const timer = setTimeout(() => {
        setIsFirstLoad(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [isFirstLoad])

  return (
    <>
      {/* Initial Load Overlay */}
      <AnimatePresence mode="wait">
        {isFirstLoad && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-black"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-3xl font-light leading-[84px] text-white lg:text-[80px]"
            >
              Think. Create. Matter.
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Content */}
      {children}
    </>
  )
}
