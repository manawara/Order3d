'use client'
import Logo from '../Logo'
import Profile from '../Profile/Profile'
import Hamburger from './Hamburger'

const Header = () => {
  return (
    <header className="border-b bottom-0 border-b-greenLight px-8 py-4 flex justify-between items-center z-20 ">
      <Hamburger />
      <Logo />
      <Profile />
    </header>
  )
}

export default Header
