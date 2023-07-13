import React from 'react'

const Footer = () => {
  return (
    <div className='border-t-2 border-black z-10 text-center bg-white dark:bg-black'>
    <div className='flex justify-center items-center gap-5 py-2'>
        <a href={'https://instagram.com/'}><i className="fa-brands text-lg sm:text-2xl fa-instagram duration-300  dark:hover:text-rose-700 hover:scale-110 cursor-pointer"></i></a>
        <a href={'https://github.com/ekedayen-e'}><i className="fa-brands text-lg sm:text-2xl fa-github hover:scale-110  dark:hover:text-rose-700 cursor-pointer"></i></a>
        <a href={'https://www.linkedin.com/in/ekedayen-e/'}> <i className="fa-brands text-lg sm:text-2xl fa-linkedin dark:hover:text-rose-700 hover:scale-110 cursor-pointer"></i></a>
    </div>
    © Romanga
    </div>
  )
}

export default Footer