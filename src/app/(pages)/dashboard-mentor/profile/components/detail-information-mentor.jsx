"use client"

import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'
import Image from 'next/image'
import { AvatarTes, unknownProfile } from '@/app/lib/utils/image'
import { FiEdit } from 'react-icons/fi'
import getMentor from '@/app/lib/service/endpoint/mentor/get-mentor'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'



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
       return <Skeleton height={500}/>
    }

    if (!userData) {
        return <div>Error loading user data</div>;
    }

    const imageUrl = userData.image ? `https://api.ruscarestudent.com/${userData.image}` : unknownProfile;

    const getMajorName = (grade_id) => {
        switch (grade_id) {
          case 1:
            return "PPLG";
          case 2:
            return "Animasi 3D";
          case 3:
            return "Animasi 2D";
          case 4:
            return "Desain Grafis";
          case 5:
            return "Teknik Grafika";
          default:
            return "Unknown";
        }
      };

    return (
        <div className='border-2 border-gray-200 rounded-xl p-6'>
            <div className='flex justify-between pb-4'>
                <Image
                    src={imageUrl}
                    className="rounded-full w-32 h-32 object-cover"
                    alt={userData.name}
                    width={500}
                    height={500}
                />
                <Link href="/dashboard-mentor/profile/edit-profile">
                    <button className="px-6 py-3 bg-primary text-white flex items-center gap-2 rounded-lg hover:bg-purple-700">
                        <FiEdit className='text text-[24px]'/>
                        Edit Profil
                    </button>
                </Link>
            </div>
            <h1 className='font-bold text-[22px] text-textPrimary pb-6'>Detail Informasi Saya</h1>
            <div className='flex gap-6'>
                <div className='flex flex-col gap-2'>
                    {title.map((item) => (
                        <h1 className='text-textPrimary font-semibold ' key={item.id}>{item.title} </h1>
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
                    <h1 className='text-textPrimary font-medium'>{getMajorName(userData.grade_id) ?? 'Belum Diketahui'}</h1>
                    <h1 className='text-textPrimary font-medium'>{userData.birth_date ?? 'Belum Diketahui'}</h1>
                    <h1 className='text-textPrimary font-medium'>{userData.experience ?? 'Belum Diketahui'} Tahun</h1>
                    <h1 className='text-textPrimary font-medium'>{userData.last_university ?? 'Belum Diketahui'} </h1>
                    <h1 className='text-textPrimary font-medium'>{userData.last_education ?? 'Belum Diketahui'}</h1>
                    <h1 className='text-textPrimary font-medium'>{userData.age ?? 'Belum Diketahui'}</h1>
                    <div className='flex'>
                        <div className='flex gap-1'>
                            <Link href="www.instagram.com" className="p-2 text-textPrimary rounded-full hover:bg-primary hover:text-white">
                                <FaInstagram />
                            </Link>
                        </div>
                        <div className='flex gap-1'>
                            <Link href="www.facebook.com" className="p-2 text-textPrimary rounded-full   hover:bg-primary hover:text-white">
                                <FaFacebook />
                            </Link>
                        </div>
                        <div className='flex gap-1'>
                            <Link href="www.twitter.com" className="p-2 text-textPrimary rounded-full hover:bg-primary hover:text-white">
                                <FaTwitter />
                            </Link>
                        </div>
                        <div className='flex gap-1'>
                            <Link href="www.linkedin.com" className="p-2 text-textPrimary rounded-full hover:bg-primary hover:text-white">
                                <FaLinkedin />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

