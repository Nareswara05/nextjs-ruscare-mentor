"use client"


import React, { useEffect, useState } from 'react';
import { IoMdCheckmark, IoMdEye, IoMdMail } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';
import Swal from 'sweetalert2';
import Link from 'next/link';
import { VscLocation } from 'react-icons/vsc';
import { PiClockCountdownLight } from "react-icons/pi";
import { BsCalendar2Week } from 'react-icons/bs';
import { HiCalendarDays } from "react-icons/hi2";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import listStudent from '@/app/lib/service/endpoint/api/list-student';
import acceptCounseling from '@/app/lib/service/endpoint/dashboard/accept-counseling';
import { IoCheckmarkDone } from 'react-icons/io5';
import rescheduleCounseling from '@/app/lib/service/endpoint/dashboard/reschedule-counseling';
import completeCounseling from '@/app/lib/service/endpoint/dashboard/complete-counseling';
import { formatDate } from '@/app/lib/utils/formatDate';

const TableConsultation = ({ consultations = [], title, loading }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [userData, setUserData] = useState(null);
    const [studentList, setStudentList] = useState([]);
    const tableHead = ["Nama", "Layanan", "Tanggal", "Waktu", "Aksi"];
    const [selectedCounseling, setSelectedCounseling] = useState(null);

    const [studentNames, setStudentNames] = useState({});

    useEffect(() => {
        const fetchStudents = async () => {
            const students = await listStudent();
            setStudentList(students);
        };

        fetchStudents();
    }, []);

    const getStudentName = (student_id) => {
        const student = studentList.find(student => student.id === student_id);
        return student ? student.name : 'Unknown';
    };

    const openModal = (item) => {
        const student = studentList.find(student => student.id === item.student_id);
        setSelectedData({
            ...item,
            studentName: student ? student.name : 'Unknown'
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedData(null);
    };


    const handleAccept = async (item) => {
        Swal.fire({
            title: "Apakah kamu yakin akan menerima?",
            text: "Pastikan kamu memiliki jadwal untuk konsultasi ini",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Terima",
            cancelButtonText: "Batalkan",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { value: place } = await Swal.fire({
                    input: "textarea",
                    inputLabel: "Tentukan lokasi berkonsultasi",
                    inputPlaceholder: "Masukkan lokasi yang aman untuk berkonsultasi ",
                    inputAttributes: {
                        "aria-label": "Type your message here"
                    },
                    showCancelButton: true
                });

                if (place) {
                    try {
                        const response = await acceptCounseling({ counseling_id: item.id, place: place });
                        if (response.message === "Status Counseling berhasil diubah") {
                            Swal.fire({
                                title: "Diterima!",
                                text: "Kamu berhasil menerima konsultasi ini",
                                icon: "success",
                                willClose: () => {
                                    window.location.reload();
                                }

                            });
                        } else {
                            Swal.fire({
                                title: "Gagal",
                                text: "Terjadi kesalahan saat menerima konsultasi.",
                                icon: "error",
                                willClose: () => {
                                    window.location.reload();
                                }
                            });
                        }
                    } catch (error) {
                        Swal.fire({
                            title: "Gagal",
                            text: "Terjadi kesalahan saat menerima konsultasi.",
                            icon: "error",
                            willClose: () => {
                                window.location.reload();
                            }
                        });
                    }
                }
            }
        });
    };


    const handleDone = async (item) => {
        try {
            const { value: text } = await Swal.fire({
                input: 'textarea',
                inputLabel: 'Kirim Catatan ke Murid',
                inputPlaceholder: 'Masukkan pesan kamu disini',
                inputAttributes: {
                    'aria-label': 'Type your message here'
                },
                showCancelButton: true
            });

            if (text) {
                const result = await Swal.fire({
                    title: 'Apakah kamu ingin menyelesaikan konsultasi ini?',
                    text: 'Pastikan kamu sudah selesai memberikan pelayanan terbaik untuk muridmu',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ya, Selesai',
                    cancelButtonText: 'Batalkan'
                });

                if (result.isConfirmed) {
                    const response = await completeCounseling({ counseling_id: item.id, note: text });

                    console.log('API Response:', response);

                    if (response.message === 'Data Counseling berhasil diubah') {
                        await Swal.fire({
                            title: 'Selesai!',
                            text: 'Konsultasi ini telah selesai, terima kasih telah memberikan pelayanan terbaik untuk muridmu',
                            icon: 'success',
                            willClose: () => {
                                window.location.reload();
                            }
                        });
                    } else if (response.message === 'Konseling belum dilakukan') {
                        Swal.fire({
                            title: "Belum Saatnya",
                            text: "Konseling dapat di selesaikan ketika waktu konseling telah tiba",
                            icon: "warning",
                            willClose: () => {
                                window.location.reload();
                            }
                        });
                    } else {
                        await Swal.fire({
                            title: 'Error!',
                            text: response.message || 'Terjadi kesalahan saat menyelesaikan konsultasi',
                            icon: 'error'
                        });
                    }
                }
            }
        } catch (error) {
            console.error('Error in handleDone:', error);
            await Swal.fire({
                title: 'Error!',
                text: error.response?.data?.message || 'Terjadi kesalahan saat memproses permintaan',
                icon: 'error'
            });
        }
    };


    const handleReschedule = async (item) => {
        const { value: formValues } = await Swal.fire({
            title: "Reschedule Counseling",
            html: `
                <div style="width:400px;">
                    <div style="text-align: left; margin-bottom: 10px;">
                        <label for="swal-input1" style="display: block; font-weight: bold;">New Date:</label>
                        <input style="margin-left :0; margin-right:0; width:450px;" type="date" id="swal-input1" class="swal2-input" placeholder="Enter new date">
                    </div>
                    <div style="width:450px; text-align: left; margin-bottom: 10px;">
                        <label for="timepicker" style="display: block; font-weight: bold;">New Time:</label>
                        <select id="timepicker" class="swal2-input" style="width: 100%;">
                            <option value="08.00 - 09.00">08.00 - 09.00</option>
                            <option value="10.00 - 11.00">10.00 - 11.00</option>
                            <option value="12.00 - 13.00">12.00 - 13.00</option>
                            <option value="14.00 - 15.00">14.00 - 15.00</option>
                        </select>
                    </div>
                    <div style="text-align: left;">
                        <label for="swal-input3" style="display: block; font-weight: bold;">New Place:</label>
                        <input style="margin-left :0; margin-right:0; width:450px;" type="text" id="swal-input3" class="swal2-input" placeholder="Enter new place">
                    </div>
                </div>`,
            focusConfirm: false,
            preConfirm: () => {
                return {
                    date: document.getElementById('swal-input1').value,
                    time: document.getElementById('timepicker').value,
                    place: document.getElementById('swal-input3').value,
                };
            },
            showCancelButton: true,
            confirmButtonText: "Reschedule",
            cancelButtonText: "Cancel",
        });

        if (formValues) {
            try {
                console.log("Rescheduling with values:", formValues);

                const response = await rescheduleCounseling({
                    counseling_id: item.id,
                    date: formValues.date,
                    time: formValues.time,
                    place: formValues.place,
                });

                if (response.message === 'Data Counseling berhasil diubah') {
                    Swal.fire({
                        title: 'Berhasil!',
                        text: 'Jadwal konsultasi berhasil diubah',
                        icon: 'success',
                        confirmButtonText: 'Oke',
                        willClose: () => {
                            window.location.reload();
                        }
                    });
                    console.log('Rescheduled Counseling Data:', response.data);
                } else if (response.message === 'Tanggal dan waktu konseling tidak tersedia') {
                    Swal.fire({
                        title: 'Peringatan!',
                        text: 'Tanggal dan waktu konseling tidak tersedia',
                        icon: 'warning',
                        confirmButtonText: 'Oke'
                    });
                } else if (response.message === 'Tanggal konseling tidak boleh kurang dari hari ini') {
                    Swal.fire({
                        title: 'Peringatan!',
                        text: 'Tanggal konseling tidak boleh kurang dari hari ini',
                        icon: 'warning',
                        confirmButtonText: 'Oke'
                    });
                } else {
                    Swal.fire({
                        title: 'Gagal!',
                        text: response.message || 'Terjadi kesalahan saat mereschedule konsultasi',
                        icon: 'error',
                        confirmButtonText: 'Oke'
                    });
                }
            } catch (error) {
                const errorMessage = error.message || 'Terjadi kesalahan saat mereschedule konsultasi';
                Swal.fire({
                    title: 'Gagal!',
                    text: errorMessage,
                    icon: 'error',
                    confirmButtonText: 'Oke',
                    willClose: () => {
                        window.location.reload();
                    }
                });
            }
        }
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

    return (
        <div className="pt-12">
            <div className="flex justify-between">
                <h1 className="font-semibold text-2xl text-textPrimary mb-4">{title}</h1>
                <Link href="/dashboard/history" className="text-primary underline">Lihat Selengkapnya</Link>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            {tableHead.map((headTitle, index) => (
                                <th key={index} className="py-2 px-4 text-textPrimary text-left border-b border-gray-300">
                                    {headTitle}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            Array.from({ length: 5 }).map((_, index) => (
                                <tr key={index} className="border-b border-gray-200">
                                    {tableHead.map((_, i) => (
                                        <td key={i} className="py-4 px-4">
                                            <Skeleton width="100%" height="20px" />
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : consultations.length > 0 ? (
                            consultations.map((item, index) => (
                                <tr key={index} className="border-b border-gray-200 text-textPrimary">
                                    <td className="py-4 px-4">{getStudentName(item.student_id)}</td>
                                    <td className="py-4 px-4">{item.service}</td>
                                    <td className="py-4 px-4">{formatDate(item.counseling_date)}</td>
                                    <td className="py-4 px-4">{item.time}</td>
                                    <td className="py-4 px-4 flex gap-2">
                                        <button
                                            className="text-secondary hover:text-yellow-500 bg-yellow-500 bg-opacity-20 hover:bg-yellow-700 hover:bg-opacity-20 p-2 rounded-lg"
                                            onClick={() => openModal(item)}
                                            title="View Detail"
                                        >
                                            <IoMdEye size={24} />
                                        </button>
                                        {item.counseling_status_id === 1 && (
                                            <>
                                                <button
                                                    className="text-green-500 bg-green-500 bg-opacity-20 rounded-lg p-2 hover:bg-green-700 hover:bg-opacity-20 hover:text-green-700"
                                                    title="Accept"
                                                    onClick={() => handleAccept(item)}
                                                >
                                                    <IoMdCheckmark size={24} />
                                                </button>
                                            </>
                                        )}
                                        {(item.counseling_status_id === 2 || item.counseling_status_id === 1) && (
                                            <button
                                                className="text-purple-500 bg-purple-500 rounded-lg hover:text-purple-700 hover:bg-purple-700 hover:bg-opacity-20 p-2 bg-opacity-20"
                                                title="Reschedule"
                                                onClick={() => handleReschedule(item)}                                            >
                                                <HiCalendarDays size={24} />
                                            </button>
                                        )}
                                        {(item.counseling_status_id === 2) && (
                                            <button
                                                className="text-cyan-500 bg-cyan-500 rounded-lg hover:text-cyan-700 hover:bg-cyan-700 hover:bg-opacity-20 p-2 bg-opacity-20"
                                                title="Schedule"
                                                onClick={() => handleDone(item)}
                                            >
                                                <IoCheckmarkDone size={24} />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={tableHead.length} className="py-4 px-4 text-center text-textPrimary">
                                    Tidak ada data konsultasi
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
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
                                <h2 className="font-semibold text-[16px]">{formatDate(selectedData.counseling_date)}</h2>
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
                            <p><strong>Nama :</strong> {selectedData.studentName}</p>
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

export default TableConsultation;
