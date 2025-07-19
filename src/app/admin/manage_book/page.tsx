'use client'
import { createBook, postImage } from '@/api/method'
import ButtonPrimary from '@/components/elements/buttonPrimary'
import ButtonSecondary from '@/components/elements/buttonSecondary'
import InputForm from '@/components/elements/input/InputForm'
import ModalDefault from '@/components/fragments/modal/modal'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { useDisclosure } from '@heroui/react'
import { title } from 'process'
import React, { useMemo } from 'react'
import toast from 'react-hot-toast'
import { IoCameraOutline } from 'react-icons/io5'

type Props = {}

const page = (props: Props) => {
    const { onOpen, onClose, isOpen } = useDisclosure();
    const [form, setForm] = React.useState({
        image: null as File | null,
        title: '',
        author: '',
        stock: 0,
        rak: '',
        price: 0,
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    //input gambar
    const handleFileManager = (fileName: string) => {
        if (fileName === 'add') {
            const fileInput = document.getElementById("image-input-add") as HTMLInputElement | null;
            fileInput ? fileInput.click() : null;
        } else {
            console.log('error');

        }
    };
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, InputSelect: string) => {
        if (InputSelect === 'add') {
            const selectedImage = e.target.files?.[0];
            setForm({ ...form, image: selectedImage || null });
        } else {
            console.log('error');

        }
    };

    console.log(form);



    const handleSubmit = async () => {
        try {
            // Tampilkan toast saat proses dimulai
            const toastId = toast.loading('Mengunggah buku baru...');

            let imageUrl = '';

            // 1. Upload image ke Cloudinary
            if (form.image) {
                imageUrl = await postImage({ image: form.image });
                if (!imageUrl) throw new Error('Gagal upload gambar');
            }

            // 2. Siapkan data buku
            const newBook = {
                title: form.title,
                author: form.author,
                stock: form.stock,
                rak: form.rak,
                price: form.price,
                image: imageUrl,
                createdAt: new Date(),
            };

            // 3. Simpan ke Firestore
            const bookId = await createBook(newBook);
            console.log('Book berhasil disimpan dengan ID:', bookId);

            // 4. Reset form dan tutup modal
            onClose();
            setForm({
                image: null,
                title: '',
                author: '',
                stock: 0,
                rak: '',
                price: 0,
            });

            // Ganti toast jadi sukses
            toast.success('Selesai menambah list buku baru', { id: toastId });

        } catch (err) {
            console.error('Gagal submit form:', err);
            toast.error('Gagal menambah buku!');
        }
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
            </div>
            <ModalDefault isOpen={isOpen} onClose={onClose}>

                <h1 className='text-xl font-medium mb-4' >Tambah Buku</h1>
                <div className="images">

                    {form.image && form.image instanceof Blob ? (
                        <img
                            className="h-[20px] md:h-[100px] w-[70px] mx-auto rounded-md object-cover"
                            src={URL.createObjectURL(form.image)}
                        />
                    ) : (
                        <div className="images rounded-md h-[50px] bg-gray-300 flex justify-center items-center">
                            <button
                                className="flex justify-center items-center h-full w-full"
                                type="button"
                                onClick={() => handleFileManager('add')}
                            >
                                <IoCameraOutline className="text-2xl" />
                            </button>
                        </div>
                    )}


                    <input
                        type="file"
                        className="hidden"
                        id="image-input-add"
                        onChange={(e) => handleImageChange(e, 'add')}
                    />

                    <div className="flex justify-center items-center gap-3 my-3">
                        <button className={`border-2 text-sm border-primaryGreen text-primaryGreen px-2 py-1 rounded-md ${form.image === null ? 'hidden' : ''}`} type="button" onClick={() => handleFileManager('add')}>
                            Ubah Gambar
                        </button>
                    </div>
                </div>
                <InputForm
                    className="bg-green-700/30"
                    type="text"
                    value={form.title}
                    marginDiown='mb-0'
                    htmlFor="title"
                    title="Judul Buku"
                    placeholder="Masukan Judul Buku"
                    onChange={handleChange}
                />

                <InputForm
                    className="bg-green-700/30"
                    type="text"
                    value={form.author}
                    marginDiown='mb-0'
                    htmlFor="author"
                    title="Penulis Buku"
                    placeholder="Masukan Penulis Buku"
                    onChange={handleChange}
                />

                <div className="flex gap-5">
                    <InputForm
                        className="bg-green-700/30"
                        type="number"
                        value={form.stock}
                        marginDiown='mb-0'
                        htmlFor="stock"
                        title="Stok Buku"
                        placeholder="Masukan Jumlah Stok"
                        onChange={handleChange}
                    />

                    <InputForm
                        className="bg-green-700/30"
                        type="text"
                        value={form.price}
                        marginDiown='mb-0'
                        htmlFor="price"
                        title="Harga Buku"
                        placeholder="Masukan Harga Buku"
                        onChange={handleChange}
                    />

                </div>

                <InputForm
                    className="bg-green-700/30"
                    type="text"
                    value={form.rak}
                    marginDiown='mb-0'
                    htmlFor="rak"
                    title="Lokasi Rak"
                    placeholder="Masukan Lokasi Rak"
                    onChange={handleChange}
                />



                <div className="flex justify-end">
                    <div className="flex">
                        <ButtonSecondary className='py-2 px-3 rounded-xl mr-2' onClick={onClose} >Batal</ButtonSecondary>
                        <ButtonPrimary className='py-2 px-3 rounded-xl' onClick={handleSubmit} >Tambah</ButtonPrimary>
                    </div>
                </div>

            </ModalDefault>
        </DefaultLayout>
    )
}

export default page