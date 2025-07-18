'use client'
import ButtonSecondary from '@/components/elements/buttonSecondary'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { useDisclosure } from '@heroui/react'
import React from 'react'
import { IoSearch } from 'react-icons/io5'

type Props = {}

const page = (props: Props) => {


    return (
        <DefaultLayout>
            <div className="flex items-center justify-between">
                <h1 className='text-xl font-bold text-primaryGreen italic mb-2' >Semua List Buku</h1>
            </div>

            <div className="flex w-full px-3 py-2 items-center gap-3 rounded-lg  mt-4 border-2 border-primaryGreen" >
                <IoSearch color="#3E5F44" size={20} />
                <input placeholder="SEARCH" className=" border-none w-full placeholder-gray-500" type="text" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
                <div className='shadow-xl rounded-lg' >
                    <div className=" flex justify-center items-center">
                        <img className=' rounded-t-lg h-40 w-full' src="https://image.gramedia.net/rs:fit:0:0/plain/https://cdn.gramedia.com/uploads/items/9786237046066_JOKOWI_Kisah-Perjuangan-dan-Inspirasi.jpg" alt="" />
                    </div>
                    <div className='p-2'   >
                        <p className='text-sm mt-2 text-gray-400' >Gabriel Yonatan</p>
                        <h1 className='text-sm font-semibold'>Seri Mengelola Negara Ketika Sarah Marah</h1>
                        <h1 className='text-sm ' >89 Stock</h1>
                        <h1 className='text-sm text-gray-400' >Rak nomor 28</h1>
                    </div>
                </div>


                <div className='shadow-xl rounded-lg' >
                    <div className=" flex justify-center items-center">
                        <img className=' rounded-t-lg h-40 w-full' src="https://image.gramedia.net/rs:fit:0:0/plain/https://cdn.gramedia.com/uploads/items/9786237046066_JOKOWI_Kisah-Perjuangan-dan-Inspirasi.jpg" alt="" />
                    </div>
                    <div className='p-2'   >
                        <p className='text-sm mt-2 text-gray-400' >Gabriel Yonatan</p>
                        <h1 className='text-sm font-semibold'>Seri Mengelola Negara Ketika Sarah Marah</h1>
                        <h1 className='text-sm ' >89 Stock</h1>
                        <h1 className='text-sm text-gray-400' >Rak nomor 28</h1>
                    </div>

                </div>
            </div>
        </DefaultLayout>
    )
}

export default page