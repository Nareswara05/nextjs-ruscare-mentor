"use client"

import React, { useState, useEffect } from 'react';
import { MdHourglassEmpty } from 'react-icons/md';
import { IoCheckmarkDone } from 'react-icons/io5';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { RiCalendarScheduleLine } from 'react-icons/ri';
import { RxCross2 } from 'react-icons/rx';
import { BsCalendarX } from "react-icons/bs";
import getStatusCounseling from '@/app/lib/service/endpoint/dashboard/status-counseling';
import { getConsultationByStatus } from '@/app/lib/service/endpoint/dashboard/counseling-by-status';
import TableConsultation from './table-consultation';
import Link from 'next/link';
import { RiServiceLine } from 'react-icons/ri';
import instance from '@/app/lib/service/instance/instance';
import getCountDashboard from '@/app/lib/service/endpoint/dashboard/count-dashboard';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const statusIcons = {
    'Menunggu Konfirmasi': <MdHourglassEmpty color='#8280FF' />,
    'Selesai': <IoCheckmarkDone color='#3AAC75' />,
    'Akan Datang': <AiOutlineClockCircle color='#F4C918' />,
    'Jadwal Ulang': <RiCalendarScheduleLine color='#9F41EA' />,
    'Dibatalkan': <RxCross2 color='#FF3797'/>,
    'Tidak Hadir': <BsCalendarX color='#808080'/>,
};

const statusKeyMapping = {
    'Menunggu Konfirmasi': 'pending',
    'Selesai': 'complete',
    'Akan Datang': 'coming_soon',
    'Jadwal Ulang': 'reschedule',
    'Dibatalkan': 'cancel',
    'Tidak Hadir': 'not_attending',
};

const ConsultationDashboard = () => {
    const [statusList, setStatusList] = useState([]);
    const [statusCounts, setStatusCounts] = useState({});
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [consultations, setConsultations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStatusList = async () => {
            try {
                const statuses = await getStatusCounseling();
                if (statuses.data && statuses.data.length > 0) {
                    setStatusList(statuses.data);
                    setSelectedStatus(statuses.data[0].id);
                }
            } catch (error) {
                console.error("Failed to fetch status list:", error);
            }
        };

        const fetchStatusCounts = async () => {
            try {
                const count = await getCountDashboard();
                setStatusCounts(count);
            } catch (error) {
                console.error("Failed to fetch status counts:", error);
            }
        };

        fetchStatusList();
        fetchStatusCounts();
    }, []);

    useEffect(() => {
        if (selectedStatus) {
            const fetchConsultations = async () => {
                try {
                    const data = await getConsultationByStatus(selectedStatus);
                    setConsultations(data);
                } catch (error) {
                    console.error("Failed to fetch consultations:", error);
                    setConsultations([]); 
                } finally {
                    setLoading(false);
                }
            };

            fetchConsultations();
        }
    }, [selectedStatus]);

    return (
        <div>
            <div className='flex justify-between items-center'>
                <h1 className='text-[24px] text-textPrimary font-bold'>Statistik Mentor</h1>
            </div>
            <div className='grid grid-cols-3 gap-3 pt-8'>
                {statusList.length === 0 ? (
                    Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="flex flex-col gap-4 p-4 bg-white shadow-custom rounded-lg">
                            <Skeleton width="100%" height="20px" />
                            <Skeleton width="60%" height="32px" />
                        </div>
                    ))
                ) : (
                    statusList.map(status => {
                        const statusKey = statusKeyMapping[status.status];
                        const count = statusCounts[statusKey] || 0; 
                        const iconColor = statusIcons[status.status].props.color; 
                        const bgColor = `${iconColor}33`;

                        return (
                            <div
                                key={status.id}
                                className={`flex w-full justify-between hover:scale-110 transition-transform duration-400 p-4 bg-white shadow-custom rounded-lg cursor-pointer ${selectedStatus === status.id ? 'ring-2 ring-primary' : ''}`}
                                onClick={() => setSelectedStatus(status.id)}
                            >
                                <div className='flex flex-col gap-4'>
                                    <h2 className='text-[16px] text-textPrimary font-semibold'>{status.status}</h2>
                                    <h1 className='text-textPrimary text-[32px] font-bold'>{count}</h1>
                                </div>
                                <div className={`p-4 text-3xl h-fit rounded-2xl`} style={{ color: iconColor, backgroundColor: bgColor }}>
                                    {statusIcons[status.status]}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
            {selectedStatus && <TableConsultation status={selectedStatus} title={statusList.find(s => s.id === selectedStatus)?.status || 'Konsultasi'} consultations={consultations} loading={loading} />}
        </div>
    );
};

export default ConsultationDashboard;
