'use client'
import { motion } from 'framer-motion'
import { LogOut, Settings } from 'lucide-react'
import SignOutButton from '../Logout'
import Link from 'next/link'

const ProfileDetails = () => {
  return (
    <motion.div
      className="flex flex-col absolute top-14 -left-24 bg-greenLight rounded-lg py-3 text-xs w-36 shadow-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute -top-2 left-1/2 translate-x-[34px] w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-greenLight"></div>
      <ul className="flex flex-col items-stretch gap-2">
        <li className="border-b-[1px] border-white w-full text-center pb-3 font-semibold text-sm hover:bg-green-600 transition-colors duration-200 cursor-pointer">
          Moje konto
        </li>
        <motion.li
          className="text-center pt-2 hover:bg-green-600 transition-colors duration-200 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/profile-setting" className="flex justify-center items-center gap-2">
            <Settings size={14} />
            Ustawienia
          </Link>
        </motion.li>
        <motion.li
          className="text-center hover:bg-green-600 transition-colors duration-200 cursor-pointer flex justify-center items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <LogOut size={14} />
          <SignOutButton />
        </motion.li>
      </ul>
    </motion.div>
  )
}

export default ProfileDetails
