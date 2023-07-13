import React from 'react'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/router'

const SearchBar = ({setSearch}) => {
    const router = useRouter();
    const [input, setInput] = useState('')

    const submit = async(e) => {
        e.preventDefault();
        if(!input) {
            setSearch(false)
            router.push('/')
            return;
        }
        let response = await fetch(`http://localhost:3001/api/search?show=${input}`)
        let data = await response.json();
        setSearch(data)
        router.push('/')

    }
    
  return (
    <form onSubmit={submit} className='flex w-full justify-center items-center gap-x-2'>
        <i class="select-none duration-300 hover:scale-110 text-md lg:text-2xl fa-solid fa-magnifying-glass"></i>
        <input className='outline-none w-full text-black dark:text-rose-500 bg-gray-300 dark:bg-gray-900 max-w-[60ch] text-md lg:text-lg rounded-xl p-3' value={input} onChange={e => setInput(e.target.value)} type='search' />
    </form>
  )
}

export default SearchBar