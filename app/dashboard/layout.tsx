'use client'
import Header from '@/components/Header/Header'
import Sidebar from '@/components/Sidebar/Sidebar'
import HamburgerProvider from '@/context/ContextHamburger'
import { ReactNode } from 'react'

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <HamburgerProvider>
      <Header />
      <main className="flex max-w-screen-2xl mx-auto">
        <Sidebar />
        <div className="flex-auto mx-4 md:ml-52 mt-16 overflow-x-hidden">{children}</div>
      </main>
    </HamburgerProvider>
  )
}

export default DashboardLayout
