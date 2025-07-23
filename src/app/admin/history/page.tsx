'use client';

import ModalDefault from '@/components/fragments/modal/modal';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import { db } from '@/lib/firebase/firebaseConfig';
import { formatDate, formatDateStr, formatRupiah } from '@/utils/helper';
import {
    getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader,
    TableRow, Input, Button, Pagination,
    useDisclosure
} from '@heroui/react';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';

import React, { useEffect, useState } from 'react';
import { BiEditAlt } from 'react-icons/bi';
import { FaTrash } from 'react-icons/fa6';
import { IoLogoWhatsapp } from 'react-icons/io5';

type Borrowing = {
    key: string;
    user_name: string;
    book_title: string;
    status: string;
    tanggal_pinjam: any;
    tanggal_kembali: any;
};

const page = () => {
    const { onOpen, onClose, isOpen } = useDisclosure();
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
        { key: 'tanggal_kembali', label: 'DEADLINE MENGEMBALIKAN' },
        { key: 'denda', label: 'DENDA BUKU' },
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

    // untuk update status peminjaman otomatis
    const updateBorrowingStatuses = async (data: Borrowing[]) => {
        const now = new Date();

        const updated = await Promise.all(
            data.map(async (item: any) => {
                if (item.status !== "dikembalikan") {
                    const tanggalPinjam = new Date(item.tanggal_pinjam.seconds * 1000);

                    // Tanggal batas pengembalian adalah 7 hari setelah tanggal pinjam
                    const batasKembali = new Date(tanggalPinjam);
                    batasKembali.setDate(batasKembali.getDate() + 7);

                    const diffMs = now.getTime() - batasKembali.getTime();
                    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

                    let newStatus = item.status;
                    let newDenda = item.denda || 0;

                    if (diffDays > 0 && diffDays <= 10) {
                        newStatus = "terlambat";
                        newDenda = diffDays * 1000;
                    } else if (diffDays > 10) {
                        newStatus = "hilang";
                        newDenda = Number(item.book_price); // user ganti rugi penuh
                    }

                    const shouldUpdate =
                        newStatus !== item.status || newDenda !== item.denda;

                    if (shouldUpdate) {
                        const docRef = doc(db, "borrowings", item.key);
                        await updateDoc(docRef, {
                            status: newStatus,
                            denda: newDenda,
                        });

                        return { ...item, status: newStatus, denda: newDenda };
                    }
                }

                return item;
            })
        );

        return updated;
    };

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, "borrowings"));
            const data = querySnapshot.docs.map((doc) => ({
                key: doc.id,
                ...doc.data(),
            })) as Borrowing[];

            const updatedData = await updateBorrowingStatuses(data);
            setBorrowings(updatedData);
            setFilteredBorrowings(updatedData);
        };

        fetchData();
    }, []);


    const openModalEdit = (item: Borrowing) => {
        console.log('modal dong');
        onOpen()
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
                            size='sm'
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
                                            <div className="flex gap-2 justify-items-center items-center">
                                                <button className='p-2 rounded-full bg-blue-900' onClick={() => openModalEdit(item)} ><BiEditAlt color='white' /></button>
                                                <button className='p-2 rounded-full bg-red-700' ><FaTrash color='white' /></button>
                                                <IoLogoWhatsapp color='green' size={28} />
                                            </div>
                                        </TableCell>
                                    ) : columnKey === 'denda' ? (
                                        <TableCell>
                                            <p>
                                                {formatRupiah(getKeyValue(item, columnKey))}
                                            </p>
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

            <ModalDefault isOpen={isOpen} onClose={onClose} >
                <h1>Edit Peminjaman</h1>
            </ModalDefault>
        </DefaultLayout>
    );
};

export default page;