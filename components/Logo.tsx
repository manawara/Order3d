import Image from 'next/image'
import logo from '@/public/logo.svg'
const Logo = () => {
  return (
    <div className="w-36">
      <Image src={logo} alt="logo order" height={60} />
    </div>
  )
}

export default Logo
