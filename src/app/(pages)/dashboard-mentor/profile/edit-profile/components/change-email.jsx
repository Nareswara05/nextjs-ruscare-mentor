"use client";

import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import ButtonSubmit from './button-submit';
import EditForm from './edit-form';
import getMentor from '@/app/lib/service/endpoint/mentor/get-mentor';
import editEmail from '@/app/lib/service/endpoint/mentor/edit-email';

const ChangeEmail = () => {
    const [newEmail, setNewEmail] = useState("");
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await getMentor();
                if (user) {
                    setUserId(user.id);
                }
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };

        fetchUserData();
    }, []);

    const handlePopup = () => {
        Swal.fire({
            title: "Apakah kamu yakin ingin mengganti email?",
            text: "Pastikan email yang kamu isi sudah benar",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Iya, ganti email!",
        }).then((result) => {
            if (result.isConfirmed) {
                handleEdit();
            }
        });
    };

    const handleEdit = async () => {
        console.log("handleEdit called");
        console.log("New Email:", newEmail);
        console.log("User ID:", userId);

        if (!userId || !newEmail) {
            Swal.fire({
                icon: "error",
                title: "Email baru wajib diisi!",
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
            return;
        }

        try {
            const response = await editEmail({ email: newEmail });
            console.log("Response from edit:", response);
            if (response && response.message === 'Email Mentor berhasil diubah') {
                Swal.fire({
                    icon: "success",
                    title: "Email berhasil diubah!",
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });
                const updatedUser = { ...response.data, email: newEmail };
                localStorage.setItem('user', JSON.stringify(updatedUser));
            }
        } catch (error) {
            console.error("Error during email update:", error);
            Swal.fire({
                icon: "error",
                title: "Email gagal diubah, silahkan coba lagi",
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
        }
    };

    return (
        <div>
            <h1 className='text-[24px] font-bold text-textPrimary'>Ganti Email</h1>
            <div className='flex flex-col gap-4 pt-6'>
                <EditForm
                    placeholder="Masukkan Email Baru"
                    label="Email Baru"
                    type="email"
                    onChange={(e) => setNewEmail(e.target.value)}
                />
            </div>
            <div className='flex items-end justify-end'>
                <ButtonSubmit
                    title="Ganti Email"
                    onClick={handlePopup}
                />
            </div>
        </div>
    );
}

export default ChangeEmail;
