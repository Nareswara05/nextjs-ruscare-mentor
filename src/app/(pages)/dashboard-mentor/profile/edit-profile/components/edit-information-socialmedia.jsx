import React from 'react'
import Link from 'next/link'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'
import Image from 'next/image'
import { AvatarTes } from '@/app/lib/utils/image'
import { FiEdit } from 'react-icons/fi'

const EditInformationSocialMedia = () => {
    const title = [
        { id: 1, title: "Instagram" },
        { id: 2, title: "LinkedIn" },
        { id: 3, title: "Twitter" },
        { id: 4, title: "Facebook" },
    ]

    return (
        <div className='w-full mx-auto '>
            <div className='border-2 border-gray-200 rounded-xl p-6'>
                <h1 className='font-bold text-2xl text-textPrimary pb-6'>Edit Sosial Media Saya</h1>
                <div className='flex flex-col gap-6'>
                    {title.map((item) => (
                        <div key={item.id} className='flex items-center gap-4'>
                            <label className='text-textPrimary font-semibold w-1/4'>
                                {item.title}
                            </label>
                            <span className='text-textPrimary font-semibold'>:</span>
                            <input
                                type="text"
                                placeholder={`Masukkan link ${item.title.toLowerCase()}`}
                                className='w-2/3 border outline-none focus:outline-primary border-gray-200 py-2 px-3 rounded-lg text-textPrimary'
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default EditInformationSocialMedia
