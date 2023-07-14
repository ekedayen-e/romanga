import { useTheme } from '@/context/ThemeProvider'
import React,{useState} from 'react'
import styles from './animate.module.css'
import SearchBar from './SearchBar'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/AuthProvider'
import Modal from './Modal'
import Image from 'next/image'

const Navbar = ({setSearch}) => {
    const {currentUser} = useAuth();
    const [openModal, setOpenModal] = useState(false)
    const router = useRouter();
    const [slide, setSlide] = useState(null)
    const {toggle} = useTheme();
    const switchTheme = (e) => {
        e.preventDefault();
        setSlide(prev => prev == null ? true : prev ? false : true)
        toggle()
    }
  return (
    <>
    {openModal && <Modal setOpenModal={setOpenModal}/>}
    <div className='z-10 sticky border-b-2 border-black dark:border-black top-0 left-0 w-full flex justify-between gap-x-5 items-center p-4 bg-white dark:bg-black'>
        <h1 onClick={() => router.push('/')} className='select-none duration-300 hover:scale-110 cursor-pointer text-md sm:text-xl md:text-2xl lg:text-4xl'>ROMANGA</h1>
        <SearchBar setSearch={setSearch}/>
        {currentUser == null && <h1 onClick={() => router.push('/login')}  className='duration-300 hover:scale-110 cursor-pointer text-sm lg:text-xl lg:mx-10'>Login</h1>}
        {currentUser != null && currentUser.photoURL ? <div className=''><Image onClick={() => setOpenModal(true)} src={currentUser.photoURL}  width={100} height={100} className='rounded-3xl duration-300 hover:scale-110 cursor-pointer'/></div> : <i onClick={() => setOpenModal(true)} className="duration-300 hover:scale-110 cursor-pointer text-lg md:text-3xl lg:text-3xl lg:mx-10 fa-solid fa-user"></i>}
        <div onClick={switchTheme} className='border-2 border-black hover:cursor-pointer select-none bg-sky-300 dark:bg-red-500 rounded-2xl flex gap-x-5 p-1 items-center'>
            <p className='text-xl'>☀️</p>
            <p className='text-lg'>🌙</p>
            <p className={slide == null ? "duration-300 hover:scale-110 cursor-pointer absolute text-2xl" : slide ? `duration-300 hover:scale-110 cursor-pointer absolute text-2xl ${styles.goright}` : `duration-300 hover:scale-110 cursor-pointer absolute text-2xl ${styles.goleft}` }>⚪️</p>
        </div>
    </div>
    </>
  )
}

export default Navbar