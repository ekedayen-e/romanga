import React from 'react'

const Newsbar = ({news}) => {
  return (
    <div className='p-1 flex overflow-scroll flex-col justify-start items-center h-screen rounded-sm bg-white border-r-2 border-l-2 border-black text-black dark:text-black dark:bg-rose-500 w-3/12 sm:w-2/12'>
        <h1 className='text-xs lg:text-2xl py-2'>News</h1>
        <div className='w-full lg:py-2 lg:p-5 grid grid-cols-1 gap-y-5'>
            {news.map((article) => {
                return (
                  <div key={article.title}>
                    <a className='hover:underline' target='_blank' href={article.url}>{article.title}</a>
                  </div>  
                )
            })}
        </div>
    </div>
  )
}

export default Newsbar