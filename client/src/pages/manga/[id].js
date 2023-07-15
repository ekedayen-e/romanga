import React,{useState, useEffect} from 'react'
import Image from 'next/image'
import StarRatings from 'react-star-ratings'
import { useAuth } from '@/context/AuthProvider'
import { db } from '../../../firebase'
import {doc, getDoc, updateDoc, arrayRemove, arrayUnion, setDoc}from 'firebase/firestore'
import Loading from '@/components/Loading'
import Newsbar from '@/components/Newsbar'

export async function getServerSideProps(context) {
  const id = context.params.id
  let response = await fetch(`https://romanga-backend.onrender.com/api/get/${id}`)
  let other = await fetch(`http://localhost:3001/api/news/${id}`)
  const manga = await response.json()
  const news = await other.json()

  return {
    props: {manga, news}
  }
}


const MangaPage = ({manga, news}) => {
  const {currentUser} = useAuth();
  const [rating, setRating] = useState(0)
  const [like, setLike] = useState(false)
  const [review, setReview] = useState('')
  const [comments, setComments] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getMeta = async() => {
    try {
      const docRef = doc(db, "meta", currentUser.uid);
      let result = await getDoc(docRef);
      if(result.exists()) {
      result = result.data()

      if(result && result.ratings) {
        result.ratings.map(rating => rating.title == manga.title.default && setRating(rating.score))
      }
      if(result && result.likes) {
        result.likes.map(entry => entry.title == manga.title.default && setLike(true))
      } else {
        null;
      }
    } else {
      null;
    }
  } catch(error) {
    console.error('Uh oh')
  }

}
  const getComments = async() => {
    try {
      const docRef = doc(db, "comments", manga.id.toString());
      let result = await getDoc(docRef);
      if(result.exists()) {
      result = result.data()

      if(result && result.entries) {
        setComments(result.entries);
      } else {
        null;
      }
    } else {
      null;
    }
  } catch(error) {
    console.error('Uh oh')
  }
  }

  useEffect(() => {
    if(currentUser) {
      getMeta();
    }
    getComments();
    setIsLoading(false);
  }, [])

  const updateRating = async(newRating, name) => {
    if(!currentUser) {
      return;
    }
    setRating(newRating);
    const docRef = doc(db, "meta", currentUser.uid);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()) {
      await updateDoc(docRef, {ratings: arrayRemove({title: manga.title.default, score: rating})})
      await updateDoc(docRef, {ratings: arrayUnion({title: manga.title.default, score: newRating})})
    } else {
      await setDoc(docRef, {ratings: arrayUnion({title: manga.title.default, score: newRating})})
    }
  }

  const favorite = async() => {
    if(!currentUser) {
      return;
    }
    setLike(prev => !prev);
    const docRef = doc(db, "meta", currentUser.uid);
    const docSnap = await getDoc(docRef);
    if(like) {
      await updateDoc(docRef, {likes: arrayRemove({title:manga.title.default, id: manga.id, image:manga.image.jpg.default})})
    } else {
      if(docSnap.exists()) {
        await updateDoc(docRef, {likes: arrayUnion({title:manga.title.default, id: manga.id, image:manga.image.jpg.default})})
    } else {
        await setDoc(docRef, {likes: arrayUnion({title:manga.title.default, id: manga.id, image:manga.image.jpg.default})})
    }
    }
  }

  const submit = async(e) => {
    e.preventDefault()
    if(!review || !currentUser) {
      return;
    }
    const time = new Date().toDateString();
    const docRef = doc(db, "comments", manga.id.toString())
    const docSnap = await getDoc(docRef)
    if(docSnap.exists()) {
      await updateDoc(docRef, {entries: arrayUnion({username: currentUser.email, content: review, posted: time})})
    } else {
      await setDoc(docRef, {entries: arrayUnion({username: currentUser.email, content: review, posted: time})})
    }
    setComments(prev => [...prev, {username: currentUser.email, content: review, posted: time}])
    setReview('')
  }

  console.log(manga)
  return (
    <div className='w-full h-full'>
      <div className=''>
        <Image className='blur-sm' src={manga.image.jpg.large} width={270} height={50} layout="responsive" alt='Anime Image'/>
      </div>

      <div className='overflow-auto absolute bg-opacity-1 bg-gray-900 backdrop-blur-md bg-opacity-70 top-0 w-full h-full flex flex-col gap-y-10 justify-start items-center'>

      <div className='absolute top-20 p-2 md:p-3 lg:p-5 right-0 bg-white text-black border-white dark:text-red-500 dark:bg-black'>
        <p>{'Rank #' + manga.rank}</p>
      </div>

        <div className='mt-28'>
          <h1 className='text-lg sm:text-lg md:text-2xl lg:text-4xl text-center text-white dark:text-red-500'>{manga.title.default} <i onClick={favorite} className={`text-white dark:text-red-500 text-lg sm:text-lg md:text-xl lg:text-3xl hover:scale-110 hover:text-white dark:hover:text-red-500 select-none ${like ? 'fa-solid' : 'fa-regular'} fa-heart`}></i></h1>
          <p className='font-black text-white dark:text-red-500 text-center pr-7 pt-2 text-center'>{'Score: ' + manga.score}</p>
        </div>

        <div className='flex gap-x-5 justify-center items-center font-black text-white dark:text-red-500 text-center pr-5'>
          {manga.genres.map((genre) => {
            return (
              <span className='text-center'>{genre.name}</span>
            )
          })}
        </div>

        <div className='sm:text-xs lg:text-lg w-8/12'>
          <p className='text-white dark:text-red-500'>{manga.synopsis}</p>
        </div>


        <div className='p-3 text-white dark:text-red-500 overflow-scroll w-full h-full bg-gradient-to-b from-transparent to-black'>
          <div className='mb-2 border-b-2 dark:border-black flex justify-between'>
          <h1 className='uppercase text-xl lg:text-3xl'>Reviews</h1>
          <StarRatings starDimension='2rem' rating={rating} starHoverColor="yellow" starRatedColor="yellow" changeRating={updateRating} numberOfStars={5} name='rating'/>
          </div>
          <form id='reviewForm' onSubmit={submit}>
            <label>Let us know what you think ❤️</label>
            <div>
          <input form='reviewForm' value={review} onChange={e => setReview(e.target.value)} className='w-full rounded-lg p-1 text-md lg:text-xl bg-black dark:bg-gray-900' placeholder='Leave a review...'/>
          </div>
          </form>  
          <div style={{'opacity': '70%'}} className='my-2 w-full h-full p-1 rounded-lg text-md lg:text-xl bg-black dark:bg-gray-900'>   
          {isLoading ? 
          <Loading/>
            :
            comments.map((comment) => {
              return(
                <p>{comment.username} : {comment.content} - {comment.posted}</p>
              )
            })}
            </div>
        </div>
      </div>
    </div>
  )
}

export default MangaPage