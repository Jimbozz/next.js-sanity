'use client'

import { useEffect, useRef, useState } from 'react'

import { getSpacingClasses } from '@/sanity/lib/utils'
import type { SpacingSettings } from '@/types'

type AccordionItemProps = {
  heading: string
  content: string
  isOpen: boolean
  isFirst: boolean
  onToggle: () => void
}

interface AccordionProps {
  accordionSections: AccordionItemProps[]
  spacingSettings?: SpacingSettings
}

function AccordionItem({
  heading,
  content,
  isOpen,
  isFirst,
  onToggle,
}: AccordionItemProps) {
  const contentRef = useRef<HTMLDivElement | null>(null)
  const borderTop = isFirst ? 'border-t-[1px]' : ''
  const isAccordionOpen = isOpen ? 'opacity-30' : 'opacity-100'
  return (
    <div className={`col-span-12 border-b-[1px] border-black/10 ${borderTop}`}>
      <button
        onClick={onToggle}
        className={`accordion-heading flex w-full justify-center px-6 py-6 font-light hover:opacity-30 ${isAccordionOpen} `}
      >
        {heading}
      </button>
      <div
        ref={contentRef}
        className="grid grid-cols-1 overflow-hidden transition-all duration-500 ease-in-out md:grid-cols-12"
        style={{
          maxHeight: isOpen ? contentRef.current?.scrollHeight : 0,
        }}
      >
        <div className="col-span-5 col-start-7 pb-11 pt-4 text-base font-light md:pb-16 md:pt-12 md:leading-[44px]">
          {content}
        </div>
      </div>
    </div>
  )
}

export function Accordion({
  accordionSections,
  spacingSettings,
}: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const accordionRef = useRef<HTMLDivElement | null>(null)
  const spacingClasses = getSpacingClasses(spacingSettings)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      accordionRef.current &&
      !accordionRef.current.contains(event.target as Node)
    ) {
      setOpenIndex(null)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <section
      ref={accordionRef}
      className={`grid grid-cols-12 ${spacingClasses}`}
    >
      {accordionSections.map((item, index) => (
        <AccordionItem
          key={index}
          heading={item.heading}
          content={item.content}
          isOpen={openIndex === index}
          onToggle={() => toggleItem(index)}
          isFirst={!index}
        />
      ))}
    </section>
  )
}

export default Accordion
