'use client'

import { getAllBooks } from '@/api/method'
import ButtonSecondary from '@/components/elements/buttonSecondary'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { truncateText } from '@/utils/helper'
import { useDisclosure } from '@heroui/react'
import React, { useEffect } from 'react'
import { IoSearch } from 'react-icons/io5'

type Props = {}

const Page = (props: Props) => {
    const [data, setData]: any = React.useState([])
    const [searchTerm, setSearchTerm] = React.useState('')

    const fetchBooks = async () => {
        try {
            const books = await getAllBooks()
            setData(books)
        } catch (err) {
            console.error('Gagal mengambil data buku:', err)
        }
    }

    useEffect(() => {
        fetchBooks()
    }, [])

    const filteredData = data.filter((item: any) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <DefaultLayout>
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold text-primaryGreen italic mb-2">
                    Semua List Buku
                </h1>
            </div>

            <div className="flex w-full px-3 py-2 items-center gap-3 rounded-lg mt-4 border-2 border-primaryGreen">
                <IoSearch color="#3E5F44" size={20} />
                <input
                    placeholder="SEARCH"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full placeholder-gray-500 border-none focus:outline-none focus:ring-0"
                />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
                {filteredData.map((item: any) => (
                    <div
                        className="shadow-xl rounded-lg flex flex-col h-full"
                        key={item.id}
                    >
                        <div className="flex justify-center items-center">
                            <img
                                className="rounded-t-lg h-40 w-full object-cover"
                                src={item.image}
                                alt={item.title}
                            />
                        </div>
                        <div className="p-2 flex flex-col flex-grow">
                            <div className="mb-2">
                                <p className="text-[11px] text-gray-400 line-clamp-1">
                                    {item.author}
                                </p>
                                <h1 className="text-[11px] font-semibold line-clamp-2">
                                    {truncateText(item.title, 38)}
                                </h1>
                            </div>
                            <div className="mt-auto">
                                <h1 className="text-[11px]">
                                    Stok Tersedia {item.stock_available}
                                </h1>
                                <h1 className="text-[11px] text-gray-400">
                                    Rak nomor {item.rack}
                                </h1>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </DefaultLayout>
    )
}

export default Page
