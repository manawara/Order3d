'use client'
import Logo from '../Logo'
import Profile from '../Profile/Profile'
import Hamburger from './Hamburger'
import HamburgerProvider from '@/context/ContextHamburger'

const Header = () => {
  return (
    <header className="border-b bottom-0 border-b-greenLight px-8 py-4 flex justify-between items-center">
      <HamburgerProvider>
        <Hamburger />
      </HamburgerProvider>

      <Logo />
      <Profile />
    </header>
  )
}

export default Header
