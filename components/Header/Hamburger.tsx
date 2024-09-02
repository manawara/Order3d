'use client'
import { useContextHamburger } from '@/context/ContextHamburger'
import { motion, MotionConfig } from 'framer-motion'

const Hamburger = () => {
  const ctx = useContextHamburger()
  const variants = {
    top: {
      open: { top: ['0%', '50%', '50%'], rotate: [0, 0, 45] },
      close: { top: ['50%', '50%', '0%'], rotate: [45, 0, 0] },
    },
    middle: {
      open: { opacity: [1, 1, 0] },
      close: { opacity: [0, 0, 1] },
    },
    bottom: {
      open: { top: ['100%', '50%', '50%'], rotate: [0, 0, -45] },
      close: { top: ['50%', '50%', '100%'], rotate: [-45, 0, 0] },
    },
  }

  return (
    <MotionConfig transition={{ duration: 0.5, times: [0, 0.4, 1] }}>
      <motion.button
        initial={false}
        animate={ctx.open ? 'open' : 'close'}
        onClick={ctx.handleOpen}
        className="relative top-0 left-0 w-8 h-6 flex-col md:hidden"
      >
        <motion.span
          variants={variants.top}
          className="absolute left-0 top-0 h-[2px] bg-greenLight w-full origin-center"
        ></motion.span>
        <motion.span
          variants={variants.middle}
          className="absolute left-0 top-[50%] h-[2px] bg-greenLight w-full"
        ></motion.span>
        <motion.span
          variants={variants.bottom}
          className="absolute left-0 top-[100%] h-[2px] bg-greenLight w-full origin-center"
        ></motion.span>
      </motion.button>
    </MotionConfig>
  )
}

export default Hamburger
