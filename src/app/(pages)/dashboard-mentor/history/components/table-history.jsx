"use client";
import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import React from 'react';
import data from '../../common-components/data';
import listService from '@/app/lib/service/endpoint/api/list-service';
import listCategory from '@/app/lib/service/endpoint/api/list-category';


const TableHistory = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchName, setSearchName] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [filterService, setFilterService] = useState('');
    const [services, setServices] = useState([]);
    const [categories, setCategories] = useState([]);
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

    const tableHead = [
        { menu: 'Nama' },
        { menu: 'Layanan' },
        { menu: 'Kategori' },
        { menu: 'Status' },
        { menu: 'Tanggal' },
    ];

    const getStatusStyles = (status) => {
        switch (status) {
            case 'upcoming':
                return 'bg-[#F4C918] text-center text-[#F4C918] bg-opacity-30 font-medium';
            case 'rejected':
                return 'bg-[#FF3797] text-center text-[#FF3797] bg-opacity-30 font-medium';
            case 'done':
                return 'bg-[#3AAC75] text-center text-[#3AAC75] bg-opacity-30 font-medium';
            case 'pending':
                return 'bg-[#8280FF] text-center text-[#8280FF] bg-opacity-30 font-medium';
            case 'reschedule':
                return 'bg-[#9F41EA] text-center text-[#9F41EA] bg-opacity-30 font-medium';
            case 'ongoing':
                return 'bg-[#FF6827] text-center text-[#FF6827] bg-opacity-30 font-medium';
            default:
                return '';
        }
    };

    const getFilteredData = () => {
        return data.filter((item) => {
            return (
                item.name.toLowerCase().includes(searchName.toLowerCase()) &&
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

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const filteredData = getFilteredData();

    return (
        <div>
            <input
                type="text"
                placeholder="Cari Nama"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="border p-2 my-3 rounded w-full text-textPrimary"
            />
            <div className="flex gap-4 mb-4">
                <select
                    value={filterService}
                    onChange={(e) => setFilterService(e.target.value)}
                    className="border p-2 rounded w-full text-textPrimary"
                >
                    <option value="">Semua Layanan</option>
                    {services.map((service) => (
                        <option key={service.id} value={service.name} >
                            {service.name}
                        </option>
                    ))}
                </select>
                <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="border p-2 rounded w-full text-textPrimary"
                >
                    <option value="">Semua Kategori</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.name}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="border p-2 rounded w-full text-textPrimary"
                >
                    <option value="">Semua Status</option>
                    <option value="akanDatang">Akan Datang</option>
                    <option value="ditolak">Ditolak</option>
                    <option value="diterima">Diterima</option>
                    <option value="pending">Pending</option>
                    <option value="reschedule">Reschedule</option>
                </select>
                <input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="border p-2 rounded w-full text-textPrimary"
                />
            </div>
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
                            <td className="py-4 px-4">{item.name}</td>
                            <td className="py-4 px-4">{item.service}</td>
                            <td className="py-4 px-4">{item.category}</td>
                            <td className={`px-4 py-4 font-semibold rounded-xl ${getStatusStyles(item.status)}`}>{item.status}</td>
                            <td className="py-4 px-4">{item.date}</td>
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
        </div>
    );
};

export default TableHistory;
