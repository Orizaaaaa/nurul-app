'use client'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { db } from '@/lib/firebase/firebaseConfig';
import { formatDateFirebase, formatRupiah } from '@/utils/helper';
import { getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'

type Props = {}

type Row = {
    key: string;
    name: string;
    status: string;
    tanggal_pinjam: string;
    tanggal_kembali: string;
    denda: string;
};

const columns = [
    { key: 'name', label: 'JUDUL BUKU' },
    { key: 'status', label: 'STATUS' },
    { key: 'tanggal_pinjam', label: 'TANGGAL PINJAM' },
    { key: 'tanggal_kembali', label: 'TANGGAL KEMBALI' },
    { key: 'denda', label: 'Denda' },
];
const page = (props: Props) => {
    const [rows, setRows] = useState<Row[]>([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const allBorrowings = await getDocs(collection(db, 'borrowings'));

                let total = 0;
                const filteredRows: Row[] = [];

                allBorrowings.forEach((docSnap) => {
                    const data = docSnap.data();
                    const tanggalPinjam = data.tanggal_pinjam;
                    const tanggalKembali = data.tanggal_kembali;
                    const denda = data.denda || 0;

                    // Hanya ambil data yang memiliki denda > 0
                    if (denda > 0) {
                        total += denda;

                        filteredRows.push({
                            key: docSnap.id,
                            name: data.book_title || '-',
                            status: data.status || '-',
                            tanggal_pinjam: formatDateFirebase(tanggalPinjam),
                            tanggal_kembali: formatDateFirebase(tanggalKembali),
                            denda: formatRupiah(denda),
                        });
                    }
                });

                setRows(filteredRows);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchDashboardData();
    }, []);


    return (
        <DefaultLayout>
            <div className="mt-5 mb-4">
                <h1 className='text-xl font-bold text-primaryGreen italic mb-2' >Semua denda</h1>
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
    )
}

export default page