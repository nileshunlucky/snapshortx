import { ImagePlus, List } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const SnapEdit = () => {
    return (
        <div className='border border-b-0 border-black flex flex-col items-end h-full'>
            <div className="flex flex-col gap-5 w-[70%] mt-12">
                <Link href='/admin/snap/create'><div className="flex gap-3 items-center border border-black p-2 border-r-0 cursor-pointer">
                    <ImagePlus />
                    <p className='md:flex hidden'>Create Snap</p>
                </div></Link>

                <Link href='/admin/snap/list'><div className="flex gap-3 items-center border border-black p-2 border-r-0 cursor-pointer">
                    <List/>
                    <p className='md:flex hidden'>Edit Snap</p>
                </div></Link>
            </div>
        </div>
    )
}

export default SnapEdit
