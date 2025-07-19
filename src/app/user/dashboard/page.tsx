'use client'
import { getAllBooks } from '@/api/method'
import { mann_above } from '@/app/image'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { truncateText } from '@/utils/helper'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { IoPeople } from 'react-icons/io5'
import { Swiper, SwiperSlide } from 'swiper/react'

type Props = {}

const page = (props: Props) => {
    const [data, setData]: any = React.useState([])
    const router = useRouter();
    const fetchBooks = async () => {
        try {
            const books = await getAllBooks();
            setData(books);
        } catch (err) {
            console.error('Gagal mengambil data buku:', err);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    console.log(data);

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
                        {data.map((item: any) => (
                            <SwiperSlide key={item.id}>
                                <div className="shadow-xl rounded-lg flex flex-col h-[270px] my-3">
                                    <div className="flex justify-center items-center">
                                        <img
                                            className="rounded-t-lg h-40 w-full object-cover"
                                            src={item.image}
                                            alt={item.title}
                                        />
                                    </div>
                                    <div className="p-2 flex flex-col flex-grow">
                                        <div className="mb-2">
                                            <p className="text-[11px] text-gray-400">{truncateText(item.author, 17)}</p>
                                            <h1 className="text-[11px] font-medium line-clamp-2">{truncateText(item.title, 38)}</h1>
                                        </div>
                                        <div className="mt-auto">
                                            <h1 className="text-[11px]">Stok {item.stock}</h1>
                                            <h1 className="text-[11px] text-gray-400">Rak nomor {item.rak}</h1>
                                        </div>
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