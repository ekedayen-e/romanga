
import { Inter } from 'next/font/google'
import Sidebar from '@/components/Sidebar'
import { useEffect, useState } from 'react'
import Loading from '@/components/Loading'
import MangaTile from '@/components/MangaTile'
import { useAuth } from '@/context/AuthProvider'
import Newsbar from '@/components/Newsbar'

const inter = Inter({ subsets: ['latin'] })

export async function getServerSideProps() {
  let response;
  let news;
    response = await fetch('https://romanga-backend.onrender.com/api/top').then(response => response.json())
    news = await fetch('https://romanga-backend.onrender.com/api/news').then(response => response.json())
    
  return {
    props: {topManga: response, randNews: news}
  };
}

export default function Home({search, topManga, randNews}) {
  const {currentUser} = useAuth();
  return (
    <div className='gap-2 sm:gap-4 text-xs sm:text-sm flex justify-start items-center'>
      <Sidebar topManga={topManga}/>
      <div className='w-full flex flex-col justify-start items-start h-screen'>
        {!search ? 
        <Loading/>
        :
        <div className='px-5 py-5 gap-5 lg:px-20 lg:py-10 lg:gap-10 w-full overflow-auto grid grid-cols-3 lg:grid-cols-5'>
          {search.map((manga) => {
                return (
                    <MangaTile src={manga.image.jpg.default} title={manga.title.default} id={manga.id}/>
                )
            })}
        </div>
        }
      </div>
      <Newsbar news={randNews}/>
    </div>
  )
}
