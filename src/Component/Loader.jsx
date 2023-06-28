import React from 'react'
import { useLoaderState } from './zustand/useLoaderState'

const Loader = () => {
const {isLoading} = useLoaderState();
console.log(isLoading)

    if(!isLoading) return null;

  return (
    <div
        id= "loader"
        className='fixed inset-0 bg-opacity-60 bg-[gray] flex justify-center items-center z-50'
        >
            <div className='w-10 h-10 border-[3.5px] bg-[gray]  border-b-[pink] rounded-full animate-spin'>
            </div>
    </div>
  )
}

export default Loader
