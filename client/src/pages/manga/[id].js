import React,{useState, useEffect} from 'react'
import Image from 'next/image'
import StarRatings from 'react-star-ratings'
import { useAuth } from '@/context/AuthProvider'
import { db } from '../../../firebase'
import {doc, getDoc, updateDoc, arrayRemove, arrayUnion, setDoc}from 'firebase/firestore'
import Loading from '@/components/Loading'
import { comment } from 'postcss'

export async function getServerSideProps(context) {
  const id = context.params.id
  let response = await fetch(`https://romanga-backend.onrender.com/api/get/${id}`)
  const manga = await response.json()

  return {
    props: {manga}
  }
}


const MangaPage = ({manga}) => {
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
        <Image className='blur-sm' src={manga.image.jpg.large} width={270} height={50} layout="responsive"/>
      </div>
      <div className='overflow-auto absolute bg-gray-900 backdrop-blur-md bg-opacity-70 top-0 w-full h-full flex flex-col justify-start items-center'>
        
        <div className='mt-28'>
          <h1 className=' text-lg sm:text-lg md:text-2xl lg:text-4xl text-center text-white dark:text-red-500'>{manga.title.default} <i onClick={favorite} className={`text-white dark:text-red-500 text-lg sm:text-lg md:text-xl lg:text-3xl hover:scale-110 hover:text-white dark:hover:text-red-500 select-none ${like ? 'fa-solid' : 'fa-regular'} fa-heart`}></i></h1>
          <div className='text-center my-10'>
          <StarRatings starDimension='2rem' rating={rating} starHoverColor="yellow" starRatedColor="yellow" changeRating={updateRating} numberOfStars={5} name='rating'/>
          </div>
        </div>

        <div className='sm:text-xs lg:text-lg my-10 w-8/12'>
          <p className='text-white dark:text-red-500'>{manga.synopsis}</p>
        </div>

        <div className='p-3 text-white dark:text-red-500 overflow-scroll w-full h-full bg-gradient-to-b from-transparent to-black'>
          <h1 className='mb-2 border-b-2 uppercase text-xl lg:text-3xl'>Reviews</h1>
          <form id='reviewForm' onSubmit={submit}>
            <label>Let us know what you think ❤️</label>
            <div>
          <input form='reviewForm' value={review} onChange={e => setReview(e.target.value)} className='w-full rounded-lg p-1 text-md lg:text-xl bg-black dark:bg-gray-900' placeholder='Leave a review...'/>
          </div>
          </form>  
          <div className='my-2 w-full h-full p-1 rounded-lg text-md lg:text-xl bg-black dark:bg-gray-900'>   
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