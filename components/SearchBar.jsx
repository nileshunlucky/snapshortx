'use client'

import { Search } from 'lucide-react'
import React from 'react'

const SearchBAr = () => {

    const submitHandler = (e) => {
        e.preventDefault()
    }

    return (
        <div className='flex justify-center items-center'>
            <form onSubmit={submitHandler} className="flex items-center bg-zinc-100 rounded-xl m-2  px-4 w-full">
                <Search />
                <input type="text" className="w-full bg-transparent focus:outline-none p-2" placeholder='Search'/>
            </form>
        </div>
    )
}

export default SearchBAr
