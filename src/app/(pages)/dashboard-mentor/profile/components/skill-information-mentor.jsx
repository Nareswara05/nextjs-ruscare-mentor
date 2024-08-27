"use client"

import getMentor from '@/app/lib/service/endpoint/mentor/get-mentor';
import React, {useState, useEffect} from 'react'
import Skeleton from 'react-loading-skeleton';

const SkillInformationMentor = () => {
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
        return <Skeleton height={50}/>;
    }

    if (!userData) {
        return <div>Error loading user data</div>;
    }
    return (
        <div className='border-2 border-gray-200 rounded-xl p-6 flex flex-col gap-8'>
            <div>
                <h1 className='font-bold text-xl text-textPrimary pb-2'>Tentang Saya</h1>
                <p className='text-textPrimary text-justify'>{userData.about_me ?? 'Belum Diketahui'}</p>
            </div>
        </div>
    )
}

export default SkillInformationMentor