'use client'
import Logo from '../Logo'
import Profile from '../Profile/Profile'
import Hamburger from './Hamburger'

const Header = () => {
  return (
    <header className="fixed w-full border-b border-b-greenLight px-8 py-4 flex justify-between items-center z-40 bg-greenDark ">
      <Hamburger />
      <Logo />
      <Profile />
    </header>
  )
}

export default Header
