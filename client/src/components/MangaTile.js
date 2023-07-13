import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/router'
const MangaTile = ({src, title, id}) => {
    const router = useRouter( )
  return (
    <div onClick={() => router.push(`/manga/${id}`)} className="flex justify-center items-center w-full duration-300 hover:scale-110 cursor-pointer before:content-[attr(data-hover)] before:text-white before:dark:text-red-500 before:hover:block before:absolute before:z-10 before:hidden before:text-xs before:sm:text-xs before:md:text-xl before:lg:text-xl before:text-center before:duration-300 before:font-black" data-hover={title.length <= 20 ? title : title.slice(0,19) + "..."}>
        <Image className='duration-300 hover:blur-sm hover:rounded-xl rounded-xl' src={src} width={260} height={56} layout="responsive"/>
    </div>
  )
}

export default MangaTile