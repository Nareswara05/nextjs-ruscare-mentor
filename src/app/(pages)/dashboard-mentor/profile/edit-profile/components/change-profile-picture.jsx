import React, { useState } from 'react';
import Image from 'next/image';
import { TbEdit } from 'react-icons/tb';

const ChangeProfilePicture = ({ image, onImageChange }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
                onImageChange(file); // Pass the file to the parent component
            };
            reader.readAsDataURL(file);
        }
    };

    const imageUrl = `https://api.ruscarestudent.com/${image}`;

    return (
        <div className='relative w-fit h-fit'>
            <div className='w-48 h-48 rounded-full border border-primary'>
                <Image
                    src={imageUrl}
                    alt="Profile Picture"
                    className=" rounded-full object-cover w-full h-full "
                    width={500}
                    height={500}
                />
            </div>
            <label className='p-3 text-xl hover:bg-purple-700 bg-primary text-white absolute right-0 bottom-0 rounded-full cursor-pointer'>
                <TbEdit />
                <input
                    type='file'
                    accept='image/*'
                    className='hidden'
                    onChange={handleImageUpload}
                />
            </label>
        </div>
    );
};

export default ChangeProfilePicture;
