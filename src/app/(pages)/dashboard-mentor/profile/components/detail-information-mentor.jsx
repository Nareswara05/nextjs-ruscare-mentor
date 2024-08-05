"use client"

import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'
import Image from 'next/image'
import { AvatarTes } from '@/app/lib/utils/image'
import { FiEdit } from 'react-icons/fi'
import getMentor from '@/app/lib/service/endpoint/mentor/get-mentor'


export default function DetailInformationMentor () {
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

    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await getMentor();
                setUserData(data);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!userData) {
        return <div>Error loading user data</div>;
    }

    const imageUrl = `https://api.ruscarestudent.com/${userData.image}`;

    return (
        <div className='border-2 border-gray-200 rounded-xl p-6'>
            <div className='flex justify-between pb-4'>
                <Image
                    src={imageUrl}
                    className="rounded-full w-32 object-cover"
                    width={500}
                    height={500}
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
                    <h1 className='text-textPrimary font-medium'>{userData.name}</h1>
                    <h1 className='text-textPrimary font-medium'>{userData.grade_id}</h1>
                    <h1 className='text-textPrimary font-medium'>{userData.birth_date}</h1>
                    <h1 className='text-textPrimary font-medium'>{userData.experience} Tahun</h1>
                    <h1 className='text-textPrimary font-medium'>{userData.last_university}</h1>
                    <h1 className='text-textPrimary font-medium'>{userData.last_education}</h1>
                    <h1 className='text-textPrimary font-medium'>{userData.age}</h1>
                    <div className='flex'>
                        <div className='flex gap-1'>
                            <Link href={userData.instagram} className="p-2 text-textPrimary rounded-full hover:bg-primary hover:text-white">
                                <FaInstagram />
                            </Link>
                        </div>
                        <div className='flex gap-1'>
                            <Link href={userData.facebook} className="p-2 text-textPrimary rounded-full hover:bg-primary hover:text-white">
                                <FaFacebook />
                            </Link>
                        </div>
                        <div className='flex gap-1'>
                            <Link href={userData.twitter} className="p-2 text-textPrimary rounded-full hover:bg-primary hover:text-white">
                                <FaTwitter />
                            </Link>
                        </div>
                        <div className='flex gap-1'>
                            <Link href={userData.linkedin} className="p-2 text-textPrimary rounded-full hover:bg-primary hover:text-white">
                                <FaLinkedin />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

