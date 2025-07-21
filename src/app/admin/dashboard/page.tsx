'use client';

import { man } from '@/app/image';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import { db } from '@/lib/firebase/firebaseConfig';
import { formatDate, formatRupiah } from '@/utils/helper';
import {
    getKeyValue,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from '@heroui/react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaMoneyBillTransfer } from 'react-icons/fa6';
import { ImBook } from 'react-icons/im';
import { IoPeople } from 'react-icons/io5';

type Row = {
    key: string;
    name: string;
    status: string;
    tanggalPinjam: string;
    tanggalKembali: string;
    denda: string;
};

const columns = [
    { key: 'name', label: 'Judul Buku' },
    { key: 'status', label: 'Status' },
    { key: 'tanggalPinjam', label: 'Tanggal Pinjam' },
    { key: 'tanggalKembali', label: 'Tanggal Kembali' },
    { key: 'denda', label: 'Denda' },
];

function Page() {
    const [jumlahPeminjam, setJumlahPeminjam] = useState(0);
    const [jumlahBuku, setJumlahBuku] = useState(0);
    const [totalDenda, setTotalDenda] = useState(0);
    const [rows, setRows] = useState<Row[]>([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Jumlah peminjam aktif (status: dipinjam)
                const borrowingsQuery = query(
                    collection(db, 'borrowings'),
                    where('status', '==', 'dipinjam')
                );
                const borrowingsSnapshot = await getDocs(borrowingsQuery);
                setJumlahPeminjam(borrowingsSnapshot.size);

                // Jumlah buku
                const booksSnapshot = await getDocs(collection(db, 'books'));
                setJumlahBuku(booksSnapshot.size);

                // Semua peminjaman (untuk denda dan list pengembalian)
                const allBorrowings = await getDocs(collection(db, 'borrowings'));

                let total = 0;
                const filteredRows: Row[] = [];

                allBorrowings.forEach((docSnap) => {
                    const data = docSnap.data();
                    const status = data.status;
                    const tanggalPinjam = data.tanggal_pinjam?.toDate();
                    const tanggalKembali = data.tanggal_kembali?.toDate();

                    // Tambahkan denda ke total jika ada
                    total += data.denda || 0;

                    // Filter hanya status yang sudah dikembalikan, terlambat, atau hilang
                    if (['dikembalikan', 'terlambat', 'hilang'].includes(status)) {
                        filteredRows.push({
                            key: docSnap.id,
                            name: data.book_title || '-',
                            status,
                            tanggalPinjam: formatDate(tanggalPinjam),
                            tanggalKembali: formatDate(tanggalKembali),
                            denda: formatRupiah(data.denda || 0),
                        });
                    }
                });

                // Set hasilnya ke state
                setTotalDenda(total);
                setRows(filteredRows);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchDashboardData();
    }, []);


    return (
        <DefaultLayout>
            <div className="relative bg-primaryGreen w-full p-3 rounded-xl overflow-hidden">
                {/* Decorative Circles */}
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/35 opacity-30 rounded-full z-0"></div>
                <div className="absolute top-1/2 left-10 w-16 h-16 bg-white/35 opacity-30 rounded-full z-0"></div>
                <div className="absolute bottom-0 right-5 w-24 h-24 bg-white/35 opacity-30 rounded-full z-0"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/35 opacity-20 rounded-full z-0"></div>

                {/* Header Content */}
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

            {/* Statistik */}
            <div className="grid grid-cols-1 md:grid-cols-3 my-5 gap-5">
                <div className="bg-primaryGreen rounded-xl p-2">
                    <div className="flex gap-3 items-center">
                        <IoPeople size={25} color="white" />
                        <h1 className="text-white">Jumlah Peminjam saat ini</h1>
                    </div>
                    <h1 className="text-white text-xl font-bold mt-3">{jumlahPeminjam}</h1>
                </div>

                <div className="bg-primaryGreen rounded-xl p-2">
                    <div className="flex gap-3 items-center">
                        <ImBook size={20} color="white" />
                        <h1 className="text-white">Jumlah Buku saat ini</h1>
                    </div>
                    <h1 className="text-white text-xl font-bold mt-3">{jumlahBuku}</h1>
                </div>

                <div className="bg-primaryGreen rounded-xl p-2">
                    <div className="flex gap-3 items-center">
                        <FaMoneyBillTransfer size={22} color="white" />
                        <h1 className="text-white">Total Semua Denda</h1>
                    </div>
                    <h1 className="text-white text-xl font-bold mt-3">{formatRupiah(totalDenda)}</h1>
                </div>
            </div>

            {/* Tabel terakhir dikembalikan */}
            <div className="mt-5 mb-4">
                <h1 className="text-xl font-bold text-primaryGreen italic mb-2">
                    Terakhir Dikembalikan
                </h1>
                <Table>
                    <TableHeader columns={columns}>
                        {(column) => (
                            <TableColumn key={column.key}>{column.label}</TableColumn>
                        )}
                    </TableHeader>
                    <TableBody items={rows}>
                        {(item) => (
                            <TableRow key={item.key}>
                                {(columnKey) => (
                                    <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                                )}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </DefaultLayout>
    );
}

export default Page;
