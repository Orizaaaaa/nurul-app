"use client"; // Pastikan seluruh komponen ini dirender di sisi klien

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import InputForm from '@/components/elements/input/InputForm';
import ButtonPrimary from '@/components/elements/buttonPrimary';
import { FaEyeSlash } from 'react-icons/fa6';
import { IoEye } from 'react-icons/io5';

import Link from 'next/link';
import { IoIosArrowBack } from 'react-icons/io';
import { loginService } from '@/api/auth';

import { Spinner } from '@heroui/react';
import { realLogo } from '../../image';
import { loginUser } from '@/lib/firebase/firestore';

const Login = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(true);
    const [errorLogin, setErrorLogin] = useState('');
    const [typePassword, setTypePassword] = useState("password");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState({
        email: '',
        password: ''
    })
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const togglePassword = () => {
        setShowPassword(!showPassword);
        setTypePassword(showPassword ? "text" : "password");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        let isValid = true;
        let errors = { email: '', password: '' };

        // Validasi email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!form.email) {
            errors.email = '*Email tidak boleh kosong';
            isValid = false;
        } else if (!emailRegex.test(form.email)) {
            errors.email = '*Email tidak sesuai format';
            isValid = false;
        }

        // Validasi password
        if (!form.password) {
            errors.password = '*Password tidak boleh kosong';
            isValid = false;
        } else if (form.password.length < 8) {
            errors.password = '*Password harus lebih dari 8 karakter';
            isValid = false;
        }

        if (!isValid) {
            setErrorMsg(errors);
            setLoading(false);
            return;
        }

        setErrorMsg({ email: '', password: '' });

        try {
            const userData = await loginUser(form.email, form.password);

            console.log("User berhasil login:", userData);

            // ✅ Simpan data user ke localStorage / context jika dibutuhkan
            localStorage.setItem('user', JSON.stringify(userData));

            // Redirect ke dashboard atau halaman utama
            router.push("/user/dashboard");

        } catch (error: any) {
            setErrorMsg((prev) => ({
                ...prev,
                password: error.message || "Gagal login",
            }));
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="login bg-primary">
            <div className="container mx-auto">
                <div className="flex items-center py-3 cursor-pointer " onClick={() => router.back()}>
                    <IoIosArrowBack size={20} color='white' />
                    <p className='text-white' >Kembali</p>
                </div>

            </div>
            <div className="container bg-primary mx-auto flex flex-col justify-center items-center  h-[99vh] ">
                <form className='p-6 bg-[#e9e9e9] w-full md:w-96 rounded-lg m-3 lg:m-0' onSubmit={handleLogin}>
                    <div className="logo flex justify-center my-5">
                        <Image src={realLogo} alt="logo" width={180} height={130} />
                    </div>

                    <InputForm className='bg-slate-100' errorMsg={errorMsg.email} placeholder='Masukkan Email' type='email' htmlFor={'email'} value={form.email} onChange={handleChange} />
                    <div className="relative">
                        <button onClick={togglePassword} type='button' className={`icon-password h-full bg-transparent flex absolute right-0 justify-center items-center pe-4 ${errorMsg.password ? 'pb-7' : ''}`}>
                            {showPassword ? <FaEyeSlash size={20} color='#636363' /> : <IoEye size={20} color='#636363' />}
                        </button>
                        <InputForm errorMsg={errorMsg.password} className='form-input-login mb-2 bg-slate-100' htmlFor="password" onChange={handleChange} type={typePassword} value={form.password} placeholder="Masukkan Kata Sandi" />
                    </div>
                    <p className='text-red-800 my-3 text-sm'>{errorLogin}</p>
                    <ButtonPrimary typeButon={"submit"} className={`rounded-lg w-full mb-3 font-medium py-2 flex justify-center items-center`}>
                        {loading ? <Spinner className={`w-5 h-5`} size="sm" color="white" /> : 'Masuk'}
                    </ButtonPrimary>
                    <p className='text-sm'>Belum punya akun ? <Link className='text-primary font-medium ' href={'/register'} > Daftar</Link></p>

                </form>
            </div>

        </div>

    );
};

export default Login;
