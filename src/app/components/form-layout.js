"use client";

import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
import { logoPurple } from "@/app/lib/utils/svg";
import { useRouter } from "next/navigation";
import login from "@/app/lib/service/endpoint/auth/login";
import Swal from "sweetalert2";

function LoginMentor() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Semua input harus diisi!");
      return;
    }

    setIsLoading(true);

    try {
      const response = await login({ username, password });

      if (response.status === 422) {
        if (response.message === "Email atau password salah") {
          setPasswordError("Terjadi kesalahan pada saat login.");
        } 
      } else if (response.token) {
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
          title: "Login berhasil"
      });
        localStorage.setItem("token", (response.token));
        document.cookie = `token=${response.token}; path=/;`;
        setTimeout(() => {
          router.push("/dashboard-mentor");
        });
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat login:", error);
      setPasswordError("Terjadi kesalahan saat login. Silakan coba lagi.");
    }

    setIsLoading(false);
  };

  return (
    <div className="w-full px-5 lg:px-12 flex flex-row">
      <div className="w-full flex flex-col">
        <Image src={logoPurple} width={115} height={50} alt="Logo" />
        <div className="mt-6 font-montserrat text-textPrimary">
          <div className="font-bold text-3xl">Masuk sebagai mentor</div>
          <div className="mt-4">Masukkan username dan password Anda untuk masuk</div>
        </div>
        <div className="flex flex-col font-montserrat w-full mt-16">
          <h2 className="text-gray-800 font-semibold text-md mb-1">Username</h2>
          <input
            className="w-[95%] border-b border-black focus:outline-none text-textPrimary pb-2"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            // placeholder="Masukkan username"
          />
        </div>
        <div className="flex flex-col font-montserrat w-full mt-12">
          <h2 className="text-gray-800  text-md  font-semibold mb-1">Password</h2>
          <div className="flex flex-row font-montserrat w-full relative">
            <input
              className="w-[95%] border-b border-black focus:outline-none text-textPrimary pb-2"
              type={showPassword ? "text" : "password"}
              // placeholder="Masukkan password" 
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
            />
            <div
              className="flex mb-2 items-end cursor-pointer text-textPrimary absolute right-8"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
            </div>
          </div>
          {passwordError && <div className="text-red-500">{passwordError}</div>}
        </div>
        <div className="w-full flex flex-col mt-10 font-montserrat text-sm sm:text-xl gap-6">
          <button
            type="submit"
            onClick={handleLogin}
            className="w-full py-3 flex items-center justify-center rounded-2xl hover:bg-purple-700 bg-primary relative"
            disabled={isLoading}
          >
            {isLoading ? <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div> : "Masuk"}
          </button>
          <h4 className="text-black text-xs sm:text-[16px] flex justify-center gap-3">
            Kamu adalah siswa?
            <Link href="https://ruscare.vercel.app/" className="text-primary text-xs sm:text-[16px] font-semibold">
              Masuk
            </Link>
          </h4>
        </div>
      </div>
    </div>
  );
}

export default LoginMentor;
