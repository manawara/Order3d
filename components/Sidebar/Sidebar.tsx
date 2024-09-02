'use client'
import { useContextHamburger } from '@/context/ContextHamburger'
import SidebarList from './SidebarList'
const Sidebar = () => {
  const ctx = useContextHamburger()

  return (
    <aside
      className={`${
        ctx.open ? 'translate-x-0' : '-translate-x-full'
      } fixed  bg-greenDark z-10 duration-300 md:translate-x-0 min-w-48 p-4 border-r-[1px] border-greenLight min-h-screen pt-24`}
    >
      <SidebarList />
    </aside>
  )
}

export default Sidebar
