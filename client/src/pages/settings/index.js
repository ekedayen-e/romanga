import React, {useState} from 'react'
import { storage } from '../../../firebase'
import { getDownloadURL,  ref, uploadBytes } from 'firebase/storage'
import {updateProfile} from 'firebase/auth'
import { useAuth } from '@/context/AuthProvider'

const Settings = () => {
    const {currentUser} = useAuth();
    const [imageUpload, setImageUpload] = useState(null)
    const [msg, setMsg] = useState('')

    const upload = (e) => {
        e.preventDefault()
        if(imageUpload == null) return;
        const imageRef = ref(storage, `images/${currentUser.uid}`)
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                updateProfile(currentUser, {photoURL: url })
                setMsg("Uploaded Successfully")
        }).catch(error => setMsg('Something went wrong'))
    })
    }

  return (
    
    <div className='flex gap-5 flex-col justify-evenly items-center'>
        <div><h1 className='text-xl my-5 sm:text-5xl'>Settings</h1></div>
        <div className='w-full'>
            <form className='p-2'>
                <h2 className='text-xl lg:text-3xl'>Upload Profile Pic: {msg}</h2>
                <div className='flex flex-row justify-start items-center gap-x-5'>
                <i onClick={(e) => {e.preventDefault(); document.getElementById('image').click()}} className="duration-300 hover:animate-bounce text-xl lg:text-5xl hover:opaciy-40 cursor-pointer my-5 fa-solid fa-image"></i>
                <p className='text-xl'>{imageUpload?.name}</p>
                <input id='image' className='w-full max-w-[40ch] hover:opaciy-40 cursor-pointer my-5 hidden' onChange={(e) => setImageUpload(e.target.files[0])} type="file" name="filename"/>
                <div><button onClick={upload} type='submit' className='text-lg lg:text-2xl duration-300 cursor-pointer dark:bg-black dark:text-red-500 bg-white rounded-lg p-2 text-black hover:scale-110'>Upload</button></div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Settings