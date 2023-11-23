import React, { ReactNode } from 'react'
import MainNav from './MainNav'

interface LayoutProps {
  children?: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <MainNav />
      <main>{children}</main>
    </div>
  )
}

export default Layout
