'use client'
import { man } from '@/app/image'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react'
import Image from 'next/image'
import React from 'react'
import { IoPeople } from 'react-icons/io5'

type Props = {}

function page({ }: Props) {
    const rows = [
        {
            key: "1",
            name: "Tony Reichert",
            role: "CEO",
            status: "Active",
        },
        {
            key: "2",
            name: "Zoey Lang",
            role: "Technical Lead",
            status: "Paused",
        },
        {
            key: "3",
            name: "Jane Fisher",
            role: "Senior Developer",
            status: "Active",
        },
        {
            key: "4",
            name: "William Howard",
            role: "Community Manager",
            status: "Vacation",
        },
    ];

    const columns = [
        {
            key: "name",
            label: "NAME",
        },
        {
            key: "role",
            label: "ROLE",
        },
        {
            key: "status",
            label: "STATUS",
        },
    ];
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
                            <h1 className="font-bold text-2xl text-white">Hai admin, selamat datang 👋</h1>
                            <p className="text-sm text-white">Mari mulai memanagement perpustakaan ini</p>
                        </div>
                    </div>

                    <div className="flex justify-center items-center order-1 lg:order-2">
                        <div className="h-40">
                            <Image className="w-full h-full" src={man} alt="dashboard" />
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

            <div className="mt-5 mb-4">
                <h1 className='text-xl font-bold text-primaryGreen italic mb-2' >Terakhir di kembalikan</h1>
                <Table >
                    <TableHeader columns={columns}>
                        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                    </TableHeader>
                    <TableBody items={rows}>
                        {(item) => (
                            <TableRow key={item.key}>
                                {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </DefaultLayout>

    )
}

export default page