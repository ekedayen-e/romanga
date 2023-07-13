import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { useTheme } from '@/context/ThemeProvider'

const Layout = ({children, setSearch}) => {
    const {darkMode} = useTheme();
  return (
        <div className='duration-1000 relative min-h-screen flex flex-col bg-gradient-to-b from-pink-300 to-pink-500 text-black dark:bg-gradient-to-b dark:from-purple-900 dark:to-black dark:text-rose-500'>
        <Navbar setSearch={setSearch}/>
        <main className='flex-1 flex flex-col'>
            {children}
        </main>
        <Footer/>
        </div>

  )
}

export default Layout