'use client'
import ButtonPrimary from '@/components/elements/buttonPrimary'
import ButtonSecondary from '@/components/elements/buttonSecondary'
import InputForm from '@/components/elements/input/InputForm'
import ModalDefault from '@/components/fragments/modal/modal'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { useDisclosure } from '@heroui/react'
import { title } from 'process'
import React from 'react'

type Props = {}

const page = (props: Props) => {
    const { onOpen, onClose, isOpen } = useDisclosure();
    const [form, setForm] = React.useState({
        image: '',
        title: '',
        author: '',
        stock: 0,
        rak: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };
    return (
        <DefaultLayout>
            <div className="flex items-center justify-between">
                <h1 className='text-xl font-bold text-primaryGreen italic mb-2' >Semua List Buku</h1>
                <ButtonSecondary className='py-2 px-3 rounded-xl' onClick={onOpen} >Tambah Buku</ButtonSecondary>
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
            <ModalDefault isOpen={isOpen} onClose={onClose}>
                <h1 className='text-xl font-medium mb-4' >Tambah Buku</h1>
                <InputForm
                    className="bg-green-700/30"
                    type="text"
                    value={form.title}

                    htmlFor="title"
                    title="Judul Buku"
                    placeholder="Masukan Judul Buku"
                    onChange={handleChange}
                />

                <InputForm
                    className="bg-green-700/30"
                    type="text"
                    value={form.author}

                    htmlFor="author"
                    title="Penulis Buku"
                    placeholder="Masukan Penulis Buku"
                    onChange={handleChange}
                />

                <InputForm
                    className="bg-green-700/30"
                    type="number"
                    value={form.stock}

                    htmlFor="stock"
                    title="Stok Buku"
                    placeholder="Masukan Jumlah Stok"
                    onChange={handleChange}
                />

                <InputForm
                    className="bg-green-700/30"
                    type="text"
                    value={form.rak}

                    htmlFor="rak"
                    title="Lokasi Rak"
                    placeholder="Masukan Lokasi Rak"
                    onChange={handleChange}
                />

                <div className="flex justify-end">
                    <div className="flex">
                        <ButtonSecondary className='py-2 px-3 rounded-xl mr-2' onClick={onClose} >Batal</ButtonSecondary>
                        <ButtonPrimary className='py-2 px-3 rounded-xl' >Tambah</ButtonPrimary>
                    </div>
                </div>

            </ModalDefault>
        </DefaultLayout>
    )
}

export default page