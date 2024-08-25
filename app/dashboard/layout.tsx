'use client'
import Header from '@/components/Header/Header'
import Sidebar from '@/components/Sidebar/Sidebar'
import HamburgerProvider from '@/context/ContextHamburger'
import { ReactNode } from 'react'

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <HamburgerProvider>
      <Header />
      <main className="flex">
        <Sidebar />
        <div className="flex-auto mx-4 md:ml-52 mt-2">{children}</div>
      </main>
    </HamburgerProvider>
  )
}

export default DashboardLayout
