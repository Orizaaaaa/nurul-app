'use client';

import DefaultLayout from '@/components/layouts/DefaultLayout';
import { db } from '@/lib/firebase/firebaseConfig';
import { formatDate, formatDateStr } from '@/utils/helper';
import {
    getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader,
    TableRow, Input, Button, Pagination
} from '@heroui/react';
import { collection, getDocs } from 'firebase/firestore';

import React, { useEffect, useState } from 'react';

type Borrowing = {
    key: string;
    user_name: string;
    book_title: string;
    status: string;
    tanggal_pinjam: any;
    tanggal_kembali: any;
};

const page = () => {
    const [borrowings, setBorrowings] = useState<Borrowing[]>([]);
    const [filteredBorrowings, setFilteredBorrowings] = useState<Borrowing[]>([]);
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [nameFilter, setNameFilter] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    // Reordered columns: peminjaman first, then pengembalian
    const columns = [
        { key: 'user_name', label: 'NAMA SISWA' },
        { key: 'book_title', label: 'JUDUL BUKU' },
        { key: 'status', label: 'STATUS' },
        { key: 'tanggal_pinjam', label: 'TANGGAL PINJAM' },
        { key: 'tanggal_kembali', label: 'TANGGAL MENGEMBALIKAN' },
        { key: 'actions', label: 'ACTIONS' },
    ];

    // Status options for filter buttons
    const statusOptions = [
        { value: 'all', label: 'Semua' },
        { value: 'dipinjam', label: 'Dipinjam' },
        { value: 'belum diambil', label: 'Belum diambil' },
        { value: 'dikembalikan', label: 'Dikembalikan' },
        { value: 'terlambat', label: 'Terlambat' },
        { value: 'hilang', label: 'Hilang' }
    ];

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, 'borrowings'));
            const data = querySnapshot.docs.map((doc) => ({
                key: doc.id,
                ...doc.data(),
            })) as Borrowing[];

            setBorrowings(data);
            setFilteredBorrowings(data);
        };

        fetchData();
    }, []);

    useEffect(() => {
        let filtered = [...borrowings];

        if (statusFilter !== 'all') {
            filtered = filtered.filter((item) => item.status === statusFilter);
        }

        if (nameFilter.trim() !== '') {
            filtered = filtered.filter((item) =>
                item.user_name.toLowerCase().includes(nameFilter.toLowerCase())
            );
        }

        setFilteredBorrowings(filtered);
        setCurrentPage(1); // Reset to first page when filters change
    }, [statusFilter, nameFilter, borrowings]);

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredBorrowings.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredBorrowings.length / itemsPerPage);

    function formatDate(value: any): string {
        if (value && typeof value === 'object' && value.seconds) {
            const date = new Date(value.seconds * 1000);
            return date.toLocaleDateString('id-ID', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
            });
        }
        return value?.toString?.() ?? '-';
    }

    return (
        <DefaultLayout>
            <div className="mt-5 mb-4">
                <h1 className="text-xl font-bold text-primaryGreen italic mb-4">
                    Riwayat Peminjaman
                </h1>

                {/* Filter Controls */}
                <div className="flex flex-col gap-4 mb-4">
                    <div className="w-full">
                        <Input
                            label="Cari Nama Siswa"
                            value={nameFilter}
                            onChange={(e) => setNameFilter(e.target.value)}
                        />
                    </div>

                    {/* Status Filter Buttons */}
                    <div className="flex flex-wrap gap-2">
                        {statusOptions.map((option) => (
                            <Button
                                key={option.value}
                                size="sm"
                                color={statusFilter === option.value ? 'primary' : 'default'}
                                onClick={() => setStatusFilter(option.value)}
                                className="capitalize"
                            >
                                {option.label}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Tabel Peminjaman */}
                <Table aria-label="Tabel Riwayat Peminjaman">
                    <TableHeader columns={columns}>
                        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                    </TableHeader>
                    <TableBody items={currentItems}>
                        {(item) => (
                            <TableRow key={item.key}>
                                {(columnKey) =>
                                    columnKey === 'actions' ? (
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button color="primary" size="sm">Edit</Button>
                                                <Button color="danger" size="sm">Hapus</Button>
                                            </div>
                                        </TableCell>
                                    ) : (
                                        <TableCell>
                                            {['tanggal_pinjam', 'tanggal_kembali'].includes(columnKey as string)
                                                ? formatDate(getKeyValue(item, columnKey))
                                                : getKeyValue(item, columnKey)}
                                        </TableCell>
                                    )
                                }
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                {/* Pagination */}
                {filteredBorrowings.length > itemsPerPage && (
                    <div className="flex justify-center mt-4">
                        <Pagination
                            total={totalPages}
                            initialPage={currentPage}
                            onChange={setCurrentPage}
                            showControls
                            showShadow
                        />
                    </div>
                )}
            </div>
        </DefaultLayout>
    );
};

export default page;