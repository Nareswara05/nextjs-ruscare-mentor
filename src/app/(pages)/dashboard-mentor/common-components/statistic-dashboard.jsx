"use client"

import React, { useState } from 'react';
import { HiOutlineUserGroup } from "react-icons/hi2";
import { IoMdCheckmark } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';
import TableConsultation from './table-consultation';
import data from './data';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { IoCalendarClearOutline, IoCheckmarkDone } from 'react-icons/io5';
import { TbCalendarClock } from "react-icons/tb";
import { MdHourglassEmpty } from 'react-icons/md';
import { RiCalendarScheduleLine, RiProgress2Line } from 'react-icons/ri';
import { BsCalendarX } from 'react-icons/bs';


const getCountByStatus = (status) => {
  return data.filter(item => item.status === status).length;
};

const statsData = [
  {
    id: 1,
    title: 'Menunggu Konfirmasi',
    count: getCountByStatus('pending'),
    color: '#8280FF',
    icon: <MdHourglassEmpty />,
    status: 'pending',
  },
  {
    id: 2,
    title: 'Telah Selesai',
    count: getCountByStatus('done'),
    color: '#3AAC75',
    icon: <IoCheckmarkDone />,
    status: 'done',
  },
  {
    id: 3,
    title: 'Akan Datang',
    count: getCountByStatus('upcoming'),
    color: '#F4C918',
    icon: <AiOutlineClockCircle />,
    status: 'upcoming',
  },
  {
    id: 4,
    title: 'Sedang Berlangsung',
    count: getCountByStatus('ongoing'),
    color: '#FF6827',
    icon: <RiProgress2Line  />,
    status: 'ongoing',
  },
  {
    id: 5,
    title: 'Jadwal Ulang',
    count: getCountByStatus('reschedule'),
    color: '#9F41EA',
    icon: <RiCalendarScheduleLine />,
    status: 'reschedule',
  },
  {
    id: 7,
    title: 'Kadaluarsa',
    count: getCountByStatus('expired'),
    color: '#808080',
    icon: <BsCalendarX />,
    status: 'expired',
  },
];

const DashboardStats = () => {
  const [selectedStat, setSelectedStat] = useState(statsData[0]);

  const handleChipClick = (stat) => {
    setSelectedStat(stat);
  };

  return (
    <div>
      <h1 className='text-[24px] text-textPrimary font-bold'>Statistik Mentor</h1>
      <div className='grid grid-cols-3 gap-3 pt-8'>
        {statsData.map((stat) => (
          <div
            key={stat.id}
            className={`flex w-full justify-between hover:scale-110 transition-transform duration-400 p-4 bg-white shadow-custom rounded-lg cursor-pointer ${selectedStat?.id === stat.id ? 'ring-2 ring-primary' : ''}`}
            onClick={() => handleChipClick(stat)}
          >
            <div className='flex flex-col gap-4'>
              <h2 className='text-[16px] text-textPrimary font-semibold'>{stat.title}</h2>
              <h1 className='text-textPrimary text-[32px] font-bold'>{stat.count}</h1>
            </div>
            <div className={`p-4 text-3xl h-fit rounded-2xl`} style={{ color: stat.color, backgroundColor: `${stat.color}33` }}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>
      {selectedStat && <TableConsultation status={selectedStat.status} title={selectedStat.title} />}
    </div>
  );
};

export default DashboardStats;