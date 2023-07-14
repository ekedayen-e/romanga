import React from 'react'
import MangaTile from './MangaTile'



const Sidebar = ({topManga}) => {
  return (
    <div className='p-1 flex overflow-scroll flex-col justify-start items-center h-screen rounded-sm bg-white border-l-2 border-r-2 border-black text-black dark:text-black dark:bg-rose-500 w-3/12 sm:w-2/12'>
        <h1 className='text-xs lg:text-2xl py-2'>Top Reads</h1>
        <div className='w-full flex-1 lg:py-2 lg:p-5 grid grid-cols-1 gap-y-5'>
            {topManga.map((manga) => {
                return (
                    <MangaTile src={manga.image.jpg.default} title={manga.title.default} id={manga.id}/>
                )
            })}
        </div>
    </div>
  )
}

export default Sidebar