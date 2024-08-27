"use client";
import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import React from 'react';
import listService from '@/app/lib/service/endpoint/api/list-service';
import listCategory from '@/app/lib/service/endpoint/api/list-category';
import getHistoryMentor from '@/app/lib/service/endpoint/dashboard/history-mentor';
import ListStatus from '@/app/lib/service/endpoint/api/list-counseling';
import listStudent from '@/app/lib/service/endpoint/api/list-student';
import Skeleton from 'react-loading-skeleton';
import { IoMdEye } from 'react-icons/io';
import { PiClockCountdownLight } from 'react-icons/pi';
import { BsCalendar2Week } from 'react-icons/bs';
import { VscLocation } from 'react-icons/vsc';


const TableHistory = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchName, setSearchName] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [filterService, setFilterService] = useState('');
    const [services, setServices] = useState([]);
    const [categories, setCategories] = useState([]);
    const [historyData, setHistoryData] = useState([]);
    const [statusList, setStatusList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [studentData, setStudentData] = useState([]);
    const [studentList, setStudentList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const pageSize = 8;

    useEffect(() => {
        const fetchServicesAndCategories = async () => {
            const servicesData = await listService();
            const categoriesData = await listCategory();
            setServices(servicesData);
            setCategories(categoriesData);
        };

        fetchServicesAndCategories();
    }, []);

    const openModal = (data) => {
        setSelectedData(data);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedData(null);
    };


    useEffect(() => {
        const fetchDataStudent = async () => {
            try {
                const data = await listStudent();
                setStudentData(data);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };

        fetchDataStudent();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [historyResponse, statusResponse] = await Promise.all([
                    getHistoryMentor(),
                    ListStatus()
                ]);

                setHistoryData(historyResponse);
                setStatusList(statusResponse);
                setLoading(false);
            } catch (err) {
                setError('Gagal memuat data');
                setLoading(false);
                Swal.fire({
                    title: 'Gagal!',
                    text: 'Terjadi kesalahan saat memuat data.',
                    icon: 'error',
                    confirmButtonText: 'Oke'
                });
            }
        };

        fetchData();
    }, []);

    const getStatusName = (statusId) => {
        const status = statusList.find(item => item.id === statusId);
        return status ? status.status : 'Unknown';
    };

    const tableHead = [
        { menu: 'Nama' },
        { menu: 'Layanan' },
        { menu: 'Kategori' },
        { menu: 'Status' },
        { menu: 'Tanggal' },
        { menu: 'Aksi' }
    ];

    const getStatusStyles = (statusName) => {
        switch (statusName) {
            case 'Akan Datang':
                return 'bg-[#F4C918] text-[#F4C918] bg-opacity-30 font-medium';
            case 'Dibatalkan':
                return 'bg-[#FF3797] text-[#FF3797] bg-opacity-30 font-medium';
            case 'Selesai':
                return 'bg-[#3AAC75] text-[#3AAC75] bg-opacity-30 font-medium';
            case 'Menunggu Konfirmasi':
                return 'bg-[#8280FF] text-[#8280FF] bg-opacity-30 font-medium';
            case 'Jadwal Ulang':
                return 'bg-[#9F41EA] text-[#9F41EA] bg-opacity-30 font-medium';
            case 'Tidak Hadir':
                return 'bg-[#808080] text-[#808080] bg-opacity-30 font-medium';
            default:
                return 'bg-gray-200 text-gray-500';
        }
    };

    const getFilteredData = () => {
        return historyData.filter((item) => {
            return (
                (filterCategory === '' || item.category === filterCategory) &&
                (filterStatus === '' || item.status === filterStatus) &&
                (filterDate === '' || item.date === filterDate) &&
                (filterService === '' || item.service === filterService)
            );
        });
    };

    const getPaginatedData = (filteredData) => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return filteredData.slice(startIndex, endIndex);
    };

    const getStudentName = (student_id) => {
        const student = studentData.find(student => student.id === student_id);
        return student ? student.name : 'Unknown';
    };

    let major = "";
    switch (selectedData?.grade_id) {
        case 1:
            major = "PPLG";
            break;
        case 2:
            major = "Animasi 3D";
            break;
        case 3:
            major = "Animasi 2D";
            break;
        case 4:
            major = "Design Grafis";
            break;
        case 5:
            major = "Teknik Grafika";
            break;
        default:
            major = "Unknown";
    }



    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const filteredData = getFilteredData();

    if (loading) {
        return (
            <div className="p-4 min-h-[520px] rounded-lg ">
                <table className="min-w-full bg-white rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr>
                            {tableHead.map((item, index) => (
                                <th
                                    key={index}
                                    className="py-3 px-4 text-gray-700 font-semibold text-left"
                                >
                                    {item.menu}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: pageSize }).map((_, index) => (
                            <tr key={index} className="border-b border-gray-200">
                                {tableHead.map((_, i) => (
                                    <td key={i} className="py-3 px-4 bg-transparent">
                                        <Skeleton width="100%" height="20px" />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }


    return (
        <div>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        {tableHead.map((item, index) => (
                            <th
                                key={index}
                                className={`py-4 ${item.menu === 'Status' ? 'px-0' : 'px-4'} text-textPrimary text-left border-b border-gray-300`}
                            >
                                {item.menu}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {getPaginatedData(filteredData).map((item, index) => (
                        <tr key={index} className="border-b border-gray-200 text-sm py-5 text-textPrimary">
                            <td className="py-4 px-4">{getStudentName(item.student_id)}</td>
                            <td className="py-4 px-4">{item.service}</td>
                            <td className="py-4 px-4">{item.subject}</td>
                            <td className={`px-4 py-4 font-semibold rounded-xl text-center ${getStatusStyles(getStatusName(item.counseling_status_id))}`}>
                                {getStatusName(item.counseling_status_id)}
                            </td>
                            <td className="py-4 px-4">{item.counseling_date}</td>
                            <td className="py-3 px-4">
                                <button
                                    className="text-secondary hover:text-yellow-500 bg-yellow-500 bg-opacity-20 hover:bg-yellow-700 hover:bg-opacity-20 p-2 rounded-lg"
                                    onClick={() => openModal(item)}
                                    title="View Detail"
                                >
                                    <IoMdEye size={24} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-between mt-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="bg-primary hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-l"
                >
                    <FaChevronLeft />
                </button>
                <span className="text-gray-700 py-2 px-4">
                    Halaman {currentPage} dari {Math.ceil(filteredData.length / pageSize)}
                </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === Math.ceil(filteredData.length / pageSize)}
                    className="bg-primary hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-r"
                >
                    <FaChevronRight />
                </button>
            </div>
            {isModalOpen && selectedData && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black bg-opacity-50 text-textPrimary">
                    <div className="bg-white p-8 rounded-lg w-fit">
                        <h2 className="text-2xl font-semibold mb-4">Detail Konsultasi</h2>
                        <div className="flex flex-row gap-6 items-center">
                            <div className="flex gap-2 text-textPrimary">
                                <div className="text-2xl">
                                    <PiClockCountdownLight />
                                </div>
                                <h2 className="font-semibold text-[16px]">{selectedData.time}</h2>
                            </div>
                            <hr className="border-textPrimary border-1 w-4 rotate-90" />
                            <div className="flex gap-2 text-textPrimary">
                                <div className="text-2xl">
                                    <BsCalendar2Week />
                                </div>
                                <h2 className="font-semibold text-[16px]">{selectedData.counseling_date}</h2>
                            </div>
                            <hr className="border-textPrimary border-1 w-4 rotate-90" />
                            <div className="flex gap-2 text-textPrimary">
                                <div className="text-3xl">
                                    <VscLocation />
                                </div>
                                <h2 className="font-semibold text-[16px]">{selectedData.place ?? 'belum ditentukan'}</h2>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 pt-4">
                            <p><strong>Nama :</strong> {getStudentName(selectedData.student_id)}</p>
                            <p><strong>Jurusan :</strong> {major}</p>
                            <p><strong>Layanan :</strong> {selectedData.service}</p>
                            <p><strong>Kategori :</strong> {selectedData.subject}</p>
                        </div>
                        <h1 className='text-xl font-bold text-textPrimary pt-4'>Catatan </h1>
                        <p className='text-sm'>{selectedData.note ?? 'Tidak ada catatan'}</p>
                        <button
                            className="mt-8 w-full py-4 font-bold bg-primary text-white rounded-lg hover:bg-purple-600"
                            onClick={closeModal}
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TableHistory;
