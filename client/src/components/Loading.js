import React from 'react'

const Loading = () => {
  return (
    <div className='w-full self-center my-auto'>
        <div class=" rounded-md p-4 max-w-sm sm:max-w-md w-full mx-auto">
  <div class="animate-pulse flex space-x-4">
    <div class="rounded-full dark:bg-red-500 bg-white h-10 w-10 sm:h-20 sm:w-20"></div> {/*Circle */}
    <div class="flex-1 space-y-6 py-3">
      <div class="h-2 dark:bg-red-500 bg-white rounded"></div> {/**Top Bar */}
      <div class="space-y-3">
        <div class="grid grid-cols-3 gap-4">
          <div class="h-2 dark:bg-red-500 bg-white rounded col-span-2"></div>
          <div class="h-2 dark:bg-red-500 bg-white rounded col-span-1"></div>
        </div>
        <div class="h-2 dark:bg-red-500 bg-white rounded"></div>
      </div>
    </div>
  </div>
</div>   
        </div> 
  )
}

export default Loading