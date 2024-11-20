'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

const page = () => {
  const [image, setImage] = useState(null)
  const [loding, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    link: '',
    category: 'Hoodies'
  })

  const imageHandler = (e) => {
    setImage(e.target.files[0])
  }

  const inputHandler = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const submitHandler = async (e) => {
    setLoading(true)
    e.preventDefault()
    try {
      const form = new FormData()
      form.append('name', formData.name)
      form.append('image', image)
      form.append('link', formData.link)
      form.append('category', formData.category)

      const res = await axios.post('/api/snap', form)

      if (res.status === 201) {
        toast.success('Snap created successfully')
        setLoading(false)
        setFormData({
          name: '',
          link: '',
          category: 'Hoodies'
        })
        setImage(null)
      }

      setLoading(false)
    } catch (error) {
      toast.error('Snap creation failed')
      setLoading(false)
      console.log(error)
    }
  }
  return (
    <div className='p-5'>
      <Toaster />
      <form onSubmit={submitHandler} className='flex flex-col gap-3 md:w-1/3 border border-black p-5 rounded-lg'>
        <p>Name</p>
        <input onChange={inputHandler} value={formData.name} name='name' className='p-2 focus:outline-none border border-black' type="text" placeholder='Name' />

        <p>Image</p>
        <label>
          <Image src={`${image ? URL.createObjectURL(image) : '/snapshortx sublogo.jpeg'}`} alt="Snapshortx" width={100} height={100} />
          <input onChange={imageHandler} type="file" hidden />
        </label>

        <p>Link</p>
        <input onChange={inputHandler} value={formData.link} name='link' className='p-2 focus:outline-none border border-black' type="text" placeholder='Link' />

        <p>Category</p>
        <select onChange={inputHandler} value={formData.category} name="category" id="category" className='p-2 focus:outline-none border border-black'>
          <option value="Hoodies">Hoodies</option>
          <option value="T-shirts">T-shirts</option>
          <option value="Jackets">Jackets</option>
          <option value="Shirts">Shirts</option>
          <option value="Pants">Pants</option>
          <option value="Sneakers">Sneakers</option>
          <option value="Beauty">Beauty</option>
          <option value="Perfume">Perfume</option>
          <option value="Accessories">Accessories</option>
        </select>

        <button className='p-2 bg-black text-white' type="submit">{!loding ? 'Create' : 'Creating...'}</button>
      </form>
    </div>
  )
}

export default page
