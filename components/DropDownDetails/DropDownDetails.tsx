'use client'
import { useRef, useState } from 'react'
import { CircleEllipsis, DeleteIcon, Edit, Eye } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import useOnClickOutside from '@/hook/useOnClickOutside'

const DropDownDetails = () => {
  const [open, setOpen] = useState(false)

  const circleRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(circleRef, () => setOpen(false))

  const handleOpenDropDown = () => {
    setOpen((prev) => !prev)
  }

  return (
    <div className="relative left-0">
      <motion.button whileHover={{ scale: 1.05 }} className="flex justify-center mx-auto">
        <CircleEllipsis onClick={handleOpenDropDown} className="z-10 cursor-pointer" />
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div
            ref={circleRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute top-8 -left-1/3 z-20"
          >
            <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-greenLight translate-x-[70px]" />
            <ul className="p-3 bg-greenLight overflow-hidden rounded shadow-md text-xs">
              <li className="flex gap-2 items-center mb-2">
                <Eye size={16} />
                Wyświetl
              </li>
              <li className="flex gap-2 items-center mb-2">
                <Edit size={16} />
                Edycja
              </li>
              <li className="flex gap-2 items-center">
                <DeleteIcon size={16} />
                Usuń
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DropDownDetails
