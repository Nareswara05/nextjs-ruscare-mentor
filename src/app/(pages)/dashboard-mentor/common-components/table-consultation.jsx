"use client"

import React, { useState } from 'react';
import { PiClockCountdownLight } from "react-icons/pi";
import { BsCalendar2Week } from "react-icons/bs";
import { VscLocation } from "react-icons/vsc";
import { IoMdCheckmark, IoMdMail, IoMdEye } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';
import Link from "next/link";
import { HiCalendarDays } from "react-icons/hi2";
import data from './data';
import Swal from 'sweetalert2';

const TableConsultation = ({ status, title }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(null);

    const filteredData = data.filter(item => item.status === status);

    const tableHead = [
        { title: "Nama" },
        { title: "Layanan" },
        { title: "Kategori" },
        { title: "Tanggal" },
        { title: "Waktu" },
        { title: "Aksi" },
    ];

    const openModal = (item) => {
        setSelectedData(item);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedData(null);
    };

    const handleCancel = (item) => {
        Swal.fire({
            title: 'Apakah kamu yakin ingin membatalkan konsultasi ini?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, batalkan',
            cancelButtonText: 'Tidak'
        }).then((result) => {
            if (result.isConfirmed) {
                console.log('Konsultasi dibatalkan:', item);

                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });

                Toast.fire({
                    icon: "success",
                    title: "Konsultasi berhasil dibatalkan"
                });
            }
        });
    };

    async function handleMailbox (item) {
        const { value: text } = await Swal.fire({
            input: "textarea",
            inputLabel: "Kirim Pesan ke Murid",
            inputPlaceholder: "Masukkan pesan kamu disini", 
            inputAttributes: {
              "aria-label": "Type your message here"
            },
            showCancelButton: true
          });
          if (text) {
            Swal.fire(text);
          }
    }

    async function handleReschedule (item) {
        const { value: text } = await Swal.fire({
            input: "date",
            inputLabel: "Masukkan penjadwalan baru",
            inputPlaceholder: "Masukkan pesan kamu disini", 
            inputAttributes: {
              "aria-label": "Type your message here"
            },
            showCancelButton: true
          });
          if (text) {
            Swal.fire(text);
          }
    }



    return (
        <div className="pt-12">
            <div className="flex justify-between">
                <h1 className="font-semibold text-2xl text-textPrimary mb-4">{title}</h1>
                <Link href="/dashboard-teacher/history" className="text-primary underline">Lihat Selengkapnya</Link>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            {tableHead.map((item, index) => (
                                <th key={index} className="py-2 px-4 text-textPrimary text-left border-b border-gray-300">
                                    {item.title}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item, index) => (
                            <tr key={index} className="border-b border-gray-200 text-textPrimary">
                                <td className="py-4 px-4">{item.name}</td>
                                <td className="py-4 px-4">{item.service}</td>
                                <td className="py-4 px-4">{item.category}</td>
                                <td className="py-4 px-4">{item.date}</td>
                                <td className="py-4 px-4">{item.time}</td>
                                <td className="py-4 px-4 flex gap-2">
                                    <button
                                        className="text-secondary hover:text-yellow-500 bg-yellow-500 bg-opacity-20 hover:bg-yellow-700 hover:bg-opacity-20 p-2 rounded-lg"
                                        onClick={() => openModal(item)}
                                        title="View Details"
                                    >
                                        <IoMdEye size={24} />
                                    </button>
                                    {item.status === 'pending' && (
                                        <>
                                            <button
                                                className="text-green-500 bg-green-500 bg-opacity-20 rounded-lg p-2 hover:bg-green-700 hover:bg-opacity-20 hover:text-green-700"
                                                title="Accept"
                                            >
                                                <IoMdCheckmark size={24} />
                                            </button>
                                            <button
                                                className="text-red-500 p-2 bg-red-500 bg-opacity-20 hover:bg-red-700 hover:bg-opacity-20 hover:text-red-700 rounded-lg"
                                                title="Reject"
                                                onClick={() => handleCancel(item)}
                                            >
                                                <RxCross2 size={24} />
                                            </button>
                                        </>
                                    )}
                                    {(item.status === 'pending' || item.status === 'done' || item.status === 'upcoming' || item.status === 'reschedule') && (
                                        <button
                                            className="text-blue-500 p-2 bg-blue-500 bg-opacity-20 rounded-lg hover:bg-blue-700 hover:bg-opacity-20 hover:text-blue-700"
                                            title="Send Email"
                                            onClick={() => handleMailbox(item)}
                                        >
                                            <IoMdMail size={24} />
                                        </button>
                                    )}
                                    {( item.status === 'upcoming' || item.status === 'reschedule') && (
                                        <button
                                            className="text-purple-500 bg-purple-500 rounded-lg hover:text-purple-700 hover:bg-purple-700 hover:bg-opacity-20 p-2 bg-opacity-20"
                                            title="Schedule"
                                            onClick={() => handleReschedule(item)}
                                        >
                                            <HiCalendarDays size={24} />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && selectedData && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black bg-opacity-50 text-textPrimary">
                    <div className="bg-white p-8 rounded-lg w-fit">
                        <h2 className="text-2xl font-semibold mb-4">Detail Konsultasi</h2>
                        <div className="flex flex-row gap-6 items-center ">
                            <div className="flex gap-2 text-textPrimary">
                                <div className="text-2xl">
                                    <PiClockCountdownLight />
                                </div>
                                <h2 className="font-semibold text-[16px] ">{selectedData.time}</h2>
                            </div>
                            <hr className="border-textPrimary border-1 w-4 rotate-90" />
                            <div className="flex gap-2 text-textPrimary">
                                <div className="text-2xl">
                                    <BsCalendar2Week />
                                </div>
                                <h2 className="font-semibold text-[16px] ">{selectedData.date}</h2>
                            </div>
                            <hr className="border-textPrimary border-1 w-4 rotate-90" />
                            <div className="flex gap-2 text-textPrimary">
                                <div className="text-3xl">
                                    <VscLocation />
                                </div>
                                <h2 className="font-semibold text-[16px] ">{selectedData.location}</h2>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 pt-4">
                            <p><strong>Nama :</strong> {selectedData.name}</p>
                            <p><strong>Jurusan : </strong> {selectedData.jurusan}</p>
                            <p><strong>Layanan : </strong> {selectedData.service}</p>
                            <p><strong>Kategori : </strong> {selectedData.category}</p>
                            <p><strong>Mentor : </strong> {selectedData.mentor}</p>
                        </div>
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

export default TableConsultation;
