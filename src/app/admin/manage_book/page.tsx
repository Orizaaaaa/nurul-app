import DefaultLayout from '@/components/layouts/DefaultLayout'
import React from 'react'

type Props = {}

const page = (props: Props) => {
    return (
        <DefaultLayout>
            <h1 className='text-xl font-bold text-primaryGreen italic mb-2' >Semua List Buku</h1>
            <div className="grid grid-cols-5 gap-4 mt-4">
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