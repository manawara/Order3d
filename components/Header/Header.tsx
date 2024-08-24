import React from 'react'
import Logo from '../Logo'
import Profile from '../Profile/Profile'

const Header = () => {
  return (
    <header className="border-b bottom-0 border-b-greenLight px-8 py-4 flex justify-between">
      <Logo />
      <Profile />
    </header>
  )
}

export default Header
