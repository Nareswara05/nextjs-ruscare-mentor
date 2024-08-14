import React from 'react'
import Link from 'next/link'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'
import Image from 'next/image'
import { AvatarTes } from '@/app/lib/utils/image'
import { FiEdit } from 'react-icons/fi'

const EditInformationMentor = () => {
    const title = [
        { id: 1, title: "Nama" },
        { id: 2, title: "Jurusan" },
        { id: 3, title: "Tanggal Lahir" },
        { id: 4, title: "Berapa Tahun Pengalamanmu" },
        { id: 5, title: "Asal Universitas" },
        { id: 6, title: "Pendidikan Terakhir" },
        { id: 7, title: "Umur" },
    ]

    return (
        <div className='w-full mx-auto'>
            <div className='border-2 border-gray-200 rounded-xl p-6'>
                <div className='flex items-center gap-4 pb-4'>
                    <Image
                        src={AvatarTes}
                        alt="profile"
                        className="rounded-full w-32 h-32 object-cover"
                    />
                    <Link href="profile/edit-profile">
                        <button className='bg-white py-3 px-4 border-2 flex h-fit items-center gap-2 font-medium text-primary border-primary rounded-lg hover:bg-primary hover:text-white'>
                            <FiEdit />
                            Edit Profil Image
                        </button>
                    </Link>
                </div>
                <h1 className='font-bold text-2xl text-textPrimary pb-6'>Edit Detail Informasi Saya</h1>
                <div className='flex flex-col gap-6'>
                    {title.map((item) => (
                        <div key={item.id} className='flex items-center gap-4'>
                            <label className='text-textPrimary font-semibold w-1/4'>
                                {item.title}
                            </label>
                            <span className='text-textPrimary font-semibold'>:</span>
                            <input
                                type="text"
                                placeholder={`Masukkan ${item.title.toLowerCase()}`}
                                className='w-2/3 border outline-none focus:outline-primary border-gray-200 py-2 px-3 rounded-lg text-textPrimary'
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default EditInformationMentor
