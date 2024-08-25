'use client'
import Image from 'next/image'
import { useState, useRef } from 'react'
import profileIcon from '@/public/profile.svg'
import ProfileDetails from './ProfileDetails'
import useOnClickOutside from '@/hook/useOnClickOutside'

const Profile = () => {
  const [open, setOpen] = useState<boolean>(false)
  const profileRef = useRef<HTMLDivElement>(null)
  const handleOpenProfile = () => {
    setOpen((prev) => !prev)
  }
  const handleCloseProfile = () => {
    setOpen(false)
  }
  useOnClickOutside(profileRef, handleCloseProfile)

  return (
    <div className="relative" ref={profileRef}>
      <button
        className="w-10 h-10 rounded-full overflow-hidden relative cursor-pointer hover:scale-105 duration-300"
        onClick={handleOpenProfile}
      >
        <Image src={profileIcon} alt="profile logo" fill className="object-cover" />
      </button>
      {open && <ProfileDetails />}
    </div>
  )
}

export default Profile
