import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/router'
const MangaTile = ({src, title, id}) => {
    const router = useRouter()
    //<div className='overflow-auto absolute bg-opacity-1 bg-gray-900 backdrop-blur-md bg-opacity-70 top-0 w-full h-full flex flex-col justify-start items-center'>
  return (
    <div onClick={() => router.push(`/manga/${id}`)} className="flex justify-center items-center w-full duration-300 hover:scale-110 cursor-pointer before:content-[attr(data-hover)] before:text-white before:dark:text-red-900  before:hover:flex before:justify-center before:items-center before:absolute before:text-center before:z-10 before:hidden before:text-xs before:sm:text-xs before:backdrop-blur-sm before:rounded-xl before:h-full before:w-full before:md:text-xl before:bg-gray-900 before:bg-opacity-50 before:lg:text-xl before:text-center before:duration-300 before: before:font-black" data-hover={title.length <= 20 ? title : title.slice(0,19) + "..."}>
        <Image className='duration-300 hover:blur-sm hover:rounded-xl rounded-xl' src={src} width={260} height={56} layout="responsive" alt='Anime Image'/>
    </div>
  )
}

export default MangaTile