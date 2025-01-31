import { motion } from 'framer-motion'

interface BurgerButtonProps {
  toggle: () => void
  isOpen: boolean
  strokeColor: 'hsl(0, 0%, 100%)' | 'hsl(0, 0%, 0%)'
}

const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="2"
    strokeLinecap="round"
    {...props}
  />
)

export const BurgerButton = ({
  toggle,
  isOpen,
  strokeColor,
}: BurgerButtonProps) => {
  const topLineVariants = {
    closed: { d: 'M 2 3 L 22 3' }, // Horizontal top line
    open: { d: 'M 3 3 L 21 21' }, // Diagonal for "X"
  }

  const middleLineVariants = {
    closed: { d: 'M 2 12 L 22 12', opacity: 1 }, // Horizontal middle line
    open: { opacity: 0 }, // Hidden when open
  }

  const bottomLineVariants = {
    closed: { d: 'M 2 21 L 22 21' }, // Horizontal bottom line
    open: { d: 'M 3 21 L 21 3' }, // Diagonal for "X"
  }

  return (
    <button
      onClick={toggle}
      className={`z-50 md:hidden ${isOpen ? 'fixed right-4 top-4' : ''}`}
      aria-controls="mobile-menu"
      aria-expanded={isOpen}
    >
      <svg width="24" height="24" viewBox="0 0 24 24">
        <Path
          stroke={strokeColor}
          variants={topLineVariants}
          initial="closed"
          animate={isOpen ? 'open' : 'closed'}
        />
        <Path
          stroke={strokeColor}
          variants={middleLineVariants}
          initial="closed"
          animate={isOpen ? 'open' : 'closed'}
        />
        <Path
          stroke={strokeColor}
          variants={bottomLineVariants}
          initial="closed"
          animate={isOpen ? 'open' : 'closed'}
        />
      </svg>
    </button>
  )
}
