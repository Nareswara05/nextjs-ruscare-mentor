import React from 'react'
import Link from 'next/link'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'
import Image from 'next/image'
import { AvatarTes } from '@/app/lib/utils/image'
import { FiEdit } from 'react-icons/fi'

const EditInformationSkill = () => {
    const title = [
        { id: 1, title: "Tentang Saya" },
        { id: 2, title: "Pengalaman dan Sertifikasi" },
    ]

    return (
        <div className='w-full mx-auto '>
            <div className='border-2 border-gray-200 rounded-xl p-6'>
                <div className='flex flex-col gap-6'>
                    {title.map((item) => (
                        <div key={item.id} className='flex gap-4'>
                            <label className='text-textPrimary font-semibold w-1/4'>
                                {item.title}
                            </label>
                            <span className='text-textPrimary font-semibold'>:</span>
                            <textarea
                                type="text"
                                placeholder={`Masukkan link ${item.title.toLowerCase()}`}
                                className='w-2/3 border outline-none focus:outline-primary  border-gray-200 py-2 px-3 rounded-lg text-textPrimary'
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default EditInformationSkill
