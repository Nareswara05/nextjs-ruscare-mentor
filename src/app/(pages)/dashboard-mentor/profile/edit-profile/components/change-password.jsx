"use client";

import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import ButtonSubmit from './button-submit';
import EditForm from './edit-form';
import getMentor from '@/app/lib/service/endpoint/mentor/get-mentor';
import editPassword from '@/app/lib/service/endpoint/mentor/edit-password';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await getMentor();
                console.log("Fetched user:", user);
                if (user) {
                    setUserId(user.id);
                }
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };

        fetchUserData();
    }, []);

    const handleCheckboxChange = () => {
        setShowPassword(!showPassword);
    };

    const handlePopup = () => {
        Swal.fire({
            title: "Apakah kamu yakin ingin mengganti kata sandi ?",
            text: "Pastikan kata sandi yang kamu isi sudah benar",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Iya, ganti kata sandi!",
        }).then((result) => {
            if (result.isConfirmed) {
                handleChangePassword();
            };
        })
    }

    const handleChangePassword = async () => {
        if (newPassword !== confirmNewPassword) {
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
                icon: "error",
                title: "Kata sandi baru dan konfirmasi kata sandi tidak cocok!"
            });
            return;
        }

        if (!userId || !oldPassword || !newPassword) {
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
                icon: "error",
                title: "Kata sandi lama, dan kata sandi baru harus diisi!"
            });
            return;
        }

        try {
            const response = await editPassword({ password: newPassword });
            console.log("Response from changePassword:", response);
            if (response && response.message === 'Password Mentor berhasil diubah') {
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
                    title: "Berhasil mengubah kata sandi"
                });
            } else {
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
                    icon: "error",
                    title: response.message || "Gagal mengubah kata sandi!"
                });
            }
        } catch (error) {
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
                icon: "error",
                title: "Gagal mengubah kata sandi!, silahkan coba lagi"
            });
        }
    };

    return (
        <div>
            <div>
                <h1 className='text-[24px] font-bold text-textPrimary'>Ganti Password</h1>
                <div className='flex flex-col gap-4 pt-6'>
                    <EditForm
                        placeholder="Masukkan Kata Sandi Lama"
                        label="Kata Sandi Lama"
                        type={showPassword ? "text" : "password"}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                    <EditForm
                        placeholder="Masukkan Kata Sandi Baru"
                        label="Kata Sandi Baru"
                        type={showPassword ? "text" : "password"}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <EditForm
                        placeholder="Ulangi Kata Sandi Baru"
                        label="Konfirmasi Kata Sandi Baru"
                        type={showPassword ? "text" : "password"}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                </div>
                <div className='flex justify-between'>
                    <div className='flex items-center pt-4'>
                        <input
                            type="checkbox"
                            id="showPassword"
                            checked={showPassword}
                            onChange={handleCheckboxChange}
                            className='mr-2'
                        />
                        <label htmlFor="showPassword" className='text-textPrimary text-lg'>Perlihatkan kata sandi</label>
                    </div>
                    <ButtonSubmit
                        title="Ganti Kata Sandi"
                        onClick={handlePopup}
                    />
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
