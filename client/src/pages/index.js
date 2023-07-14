
import { Inter } from 'next/font/google'
import Sidebar from '@/components/Sidebar'
import { useEffect, useState } from 'react'
import Loading from '@/components/Loading'
import MangaTile from '@/components/MangaTile'
import { useAuth } from '@/context/AuthProvider'
import Newsbar from '@/components/Newsbar'
import {getDoc, doc, } from 'firebase/firestore'
import { db } from '../../firebase'
import { requestToBodyStream } from 'next/dist/server/body-streams'

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
/*
There are 2 things to be done before loading is false:
1. Get the favorites from the database -Easy
2. Display them in a visually appealing and interactive way to the user - Hard
*/
export default function Home({search, topManga, randNews}) {
  const {currentUser} = useAuth();
  const [isLoading, setIsLoading] = useState(true)
  const [favorites, setFavorites] = useState(false)
  console.log(favorites)

  const getFavorites = async() => {
    if(!currentUser) {
      return;
    }
    const docRef = doc(db, "meta", currentUser.uid);
    let result = await getDoc(docRef);
    if(result.exists()) {
      result = result.data()
      if(result && result.likes) {
        setFavorites(result.likes);
      } else {
        null;
      }
    } else {
      null;
    }
  }

  useEffect(() => {
    getFavorites();
    setIsLoading(false)
  }, [])

  return (
    <div className='gap-2 sm:gap-4 text-xs sm:text-sm flex justify-start items-center'>
      <Sidebar topManga={topManga}/>
      <div className='w-full flex flex-col justify-start items-start h-screen'>
        {search ? 
        <div className='px-5 py-5 gap-5 lg:px-20 lg:py-10 lg:gap-10 w-full overflow-auto grid grid-cols-3 lg:grid-cols-5'>
          {search.map((manga) => {
                return (
                    <MangaTile src={manga.image.jpg.default} title={manga.title.default} id={manga.id}/>
                )
            })}
        </div>
        :
        !search && !isLoading && favorites && favorites.length > 0 ?
        <>
        <h1 className='select-none mx-auto text-xl md:text-2xl lg:text-5xl'>Favorites</h1>
        <div className='px-5 py-5 gap-5 lg:px-20 lg:py-10 lg:gap-10 w-full overflow-auto grid grid-cols-3 lg:grid-cols-5'>
          {favorites.map((manga) => {
                return (
                    <MangaTile src={manga.image} title={manga.title} id={manga.id}/>
                )
            })}
        </div> 
        </>
        :
        <Loading/>
        }
      </div>
      <Newsbar news={randNews}/>
    </div>
  )
}
