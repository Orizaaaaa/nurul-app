'use client'
import { mann_above } from '@/app/image'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { IoPeople } from 'react-icons/io5'
import { Swiper, SwiperSlide } from 'swiper/react'

type Props = {}

const page = (props: Props) => {
    const router = useRouter();
    return (
        <DefaultLayout>
            <div className="relative bg-primaryGreen w-full p-3 rounded-xl overflow-hidden">
                {/* Decorative Circles with background */}
                <div className="absolute -top-10 -left-10 w-32 h-32  bg-white/35 opacity-30 rounded-full z-0"></div>
                <div className="absolute top-1/2 left-10 w-16 h-16  bg-white/35 opacity-30 rounded-full z-0"></div>
                <div className="absolute bottom-0 right-5 w-24 h-24  bg-white/35 opacity-30 rounded-full z-0"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40  bg-white/35 opacity-20 rounded-full z-0"></div>

                {/* Main Content */}
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2">
                    <div className="flex justify-center items-center">
                        <div>
                            <h1 className="font-bold text-2xl text-white">Hai siswa, selamat datang 👋</h1>
                            <p className="text-sm text-white">Mari mulai membaca banyak buku di perpustakaan ini</p>
                        </div>
                    </div>

                    <div className="flex justify-center items-center order-1 lg:order-2">
                        <div className="h-40">
                            <Image className="w-full h-full" src={mann_above} alt="dashboard" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 my-5 gap-5">
                <div className='bg-primaryGreen rounded-xl p-2' >
                    <div className="flex gap-3 items-center">
                        <IoPeople size={20} color='white' />
                        <h1 className='text-white' >Jumlah Peminjam saat ini</h1>

                    </div>
                    <h1 className='text-white text-3xl font-bold mt-3' >4</h1>
                </div>
                <div className='bg-primaryGreen rounded-xl p-2' >
                    <div className="flex gap-3 items-center">
                        <IoPeople size={20} color='white' />
                        <h1 className='text-white' >Jumlah Peminjam saat ini</h1>

                    </div>
                    <h1 className='text-white text-3xl font-bold mt-3' >4</h1>
                </div>

                <div className='bg-primaryGreen rounded-xl p-2' >
                    <div className="flex gap-3 items-center">
                        <IoPeople size={20} color='white' />
                        <h1 className='text-white' >Jumlah Peminjam saat ini</h1>

                    </div>
                    <h1 className='text-white text-3xl font-bold mt-3' >4</h1>
                </div>
            </div>

            <div className='grid-cols-6 mb-8' >
                <div className="flex justify-between items-center">
                    <h1 className='text-xl font-bold text-primaryGreen italic mb-2' >Buku Terbaru Saat Ini</h1>
                    <p className='text-secondaryGreen' onClick={() => router.push('/user/book_list')} >Lihat Semua</p>
                </div>

                <div className="mt-4">
                    <Swiper
                        spaceBetween={16}
                        breakpoints={{
                            320: {
                                slidesPerView: 1,
                            },
                            480: {
                                slidesPerView: 2,
                            },
                            640: {
                                slidesPerView: 3,
                            },
                            768: {
                                slidesPerView: 4,
                            },
                            1024: {
                                slidesPerView: 5,
                            },
                        }}
                        pagination={{ clickable: true }}
                        navigation
                    >
                        {[...Array(8)].map((_, i) => (
                            <SwiperSlide key={i}>
                                <div className="shadow-xl rounded-lg">
                                    <div className="flex justify-center items-center">
                                        <img
                                            className="rounded-t-lg h-40 w-full"
                                            src="https://image.gramedia.net/rs:fit:0:0/plain/https://cdn.gramedia.com/uploads/items/9786237046066_JOKOWI_Kisah-Perjuangan-dan-Inspirasi.jpg"
                                            alt=""
                                        />
                                    </div>
                                    <div className="p-2">
                                        <p className="text-sm mt-2 text-gray-400">Gabriel Yonatan</p>
                                        <h1 className="text-sm font-semibold">
                                            Seri Mengelola Negara Ketika Sarah Marah
                                        </h1>
                                        <h1 className="text-sm">89 Stock</h1>
                                        <h1 className="text-sm text-gray-400">Rak nomor 28</h1>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

            </div>
        </DefaultLayout>
    )
}

export default page