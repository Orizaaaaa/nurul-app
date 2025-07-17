import { man } from '@/app/image'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import Image from 'next/image'
import React from 'react'

type Props = {}

function page({ }: Props) {
    return (
        <DefaultLayout>
            <div className="relative bg-secondaryGreen w-full p-3 rounded-xl overflow-hidden">
                {/* Decorative Circles with background */}
                <div className="absolute -top-10 -left-10 w-32 h-32  bg-white/35 opacity-30 rounded-full z-0"></div>
                <div className="absolute top-1/2 left-10 w-16 h-16  bg-white/35 opacity-30 rounded-full z-0"></div>
                <div className="absolute bottom-0 right-5 w-24 h-24  bg-white/35 opacity-30 rounded-full z-0"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40  bg-white/35 opacity-20 rounded-full z-0"></div>

                {/* Main Content */}
                <div className="relative z-10 grid grid-cols-2">
                    <div className="flex justify-center items-center">
                        <div>
                            <h1 className="font-bold text-2xl text-white">Hai admin, selamat datang 👋</h1>
                            <p className="text-sm text-white">Mari mulai memanagement perpustakaan ini</p>
                        </div>
                    </div>

                    <div className="flex justify-center items-center">
                        <div className="h-40">
                            <Image className="w-full h-full" src={man} alt="dashboard" />
                        </div>
                    </div>
                </div>
            </div>



            <div className="grid grid-cols-3">

            </div>
        </DefaultLayout>

    )
}

export default page