import React from 'react'
import Link from 'next/link'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'
import Image from 'next/image'
import { AvatarTes } from '@/app/lib/utils/image'
import { FiEdit } from 'react-icons/fi'
const DetailInformationMentor = () => {
    const title = [
        {
            id: 1,
            title: "Nama"
        },
        {
            id: 2,
            title: "Jurusan"
        },
        {
            id: 3,
            title: "Tanggal Lahir"
        },
        {
            id: 4,
            title: "Pengalaman"
        },
        {
            id: 5,
            title: "Asal Universitas"
        },
        {
            id: 6,
            title: "Pendidikan Terakhir"
        },
        {
            id: 7,
            title: "Umur"
        },
        {
            id: 8,
            title: "Sosial Media"
        },
    ]
    return (
        <div className='border-2 border-gray-200 rounded-xl p-6'>
            <div className='flex justify-between pb-4'>
                <Image
                    src={AvatarTes}
                    className="rounded-full w-32 object-cover"
                />
                <Link href="profile/edit-profile">
                    <button className='bg-white py-3 px-4 border-2 flex h-fit items-center gap-2 font-medium text-primary border-primary rounded-lg hover:bg-primary hover:text-white'>
                        <FiEdit />
                        Edit Profil
                    </button>
                </Link>
            </div>
            <h1 className='font-bold text-[22px] text-textPrimary pb-6'>Detail Informasi Saya</h1>
            <div className='flex gap-6'>
                <div className='flex flex-col gap-2'>
                    {title.map((item) => (
                        <h1 className='text-textPrimary font-semibold ' >{item.title} </h1>
                    ))}
                </div>
                <div className='flex flex-col gap-2'>
                    <h1 className='text-textPrimary font-semibold'>:</h1>
                    <h1 className='text-textPrimary font-semibold'>:</h1>
                    <h1 className='text-textPrimary font-semibold'>:</h1>
                    <h1 className='text-textPrimary font-semibold'>:</h1>
                    <h1 className='text-textPrimary font-semibold'>:</h1>
                    <h1 className='text-textPrimary font-semibold'>:</h1>
                    <h1 className='text-textPrimary font-semibold'>:</h1>
                    <h1 className='text-textPrimary font-semibold'>:</h1>
                </div>
                <div className='flex flex-col gap-2'>
                    <h1 className='text-textPrimary font-medium'>Udin</h1>
                    <h1 className='text-textPrimary font-medium'>PPLG</h1>
                    <h1 className='text-textPrimary font-medium'>8 Januari 1945</h1>
                    <h1 className='text-textPrimary font-medium'>10 Tahun</h1>
                    <h1 className='text-textPrimary font-medium'>Universitas Ngawi</h1>
                    <h1 className='text-textPrimary font-medium'>S1 (Sarjana)</h1>
                    <h1 className='text-textPrimary font-medium'>20</h1>
                    <div className='flex'>
                        <div className='flex gap-1'>
                            <Link href="" className="p-2 text-textPrimary rounded-full hover:bg-primary hover:text-white">
                                <FaInstagram />
                            </Link>
                        </div>
                        <div className='flex gap-1'>
                            <Link href="" className="p-2 text-textPrimary rounded-full hover:bg-primary hover:text-white">
                                <FaFacebook />
                            </Link>
                        </div>
                        <div className='flex gap-1'>
                            <Link href="" className="p-2 text-textPrimary rounded-full hover:bg-primary hover:text-white">
                                <FaTwitter />
                            </Link>
                        </div>
                        <div className='flex gap-1'>
                            <Link href="" className="p-2 text-textPrimary rounded-full hover:bg-primary hover:text-white">
                                <FaLinkedin />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailInformationMentor