import React from 'react';
import { CiLogout } from 'react-icons/ci';
import Swal from 'sweetalert2';
import logout from '@/app/lib/service/endpoint/auth/logout';

const MenuProfileDashboard = () => {
    const handleLogout = async () => {
        try {
            await logout();
            window.location.href = '/';
        } catch (error) {
            console.error('Gagal logout:', error);
        }
    };

    const confirmLogout = () => {
        Swal.fire({
            title: 'Apakah kamu yakin?',
            text: "Setelah keluar, Anda harus masuk lagi untuk mengakses akun Anda.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Iya, Keluar'
        }).then((result) => {
            if (result.isConfirmed) {
                handleLogout();
            }
        });
    };

    return (
        <div className='text-3xl text-red-600 cursor-pointer hover:bg-red-600 p-2 hover:bg-opacity-20 hover:rounded-lg' onClick={confirmLogout}>
            <CiLogout />
        </div>
    );
};

export default MenuProfileDashboard;
