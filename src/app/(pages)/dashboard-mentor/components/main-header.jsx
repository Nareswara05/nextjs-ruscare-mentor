"use client";

import React from "react";
import Image from "next/image";
import { FiMenu, FiX } from "react-icons/fi"; 
import { MdArrowBackIosNew } from "react-icons/md";
import { useSidebar } from "./SidebarContext";
import { IoIosArrowDown } from "react-icons/io";
import { usePathname } from "next/navigation";
import MenuProfileDashboard from "./main-profile";
import { FiMail } from "react-icons/fi";

export default function MainHeader() {
  const [isSideBarOpen, toggleSidebar] = useSidebar();

  const handleMenuClick = () => {
    toggleSidebar();
  };

  const pathname = usePathname();
  const getPageTitle = () => {
    switch (pathname) {
      case "/dashboard-mentor":
        return "Dashboard";
      case "/dashboard-mentor/student-list":
        return "List Siswa";
      case "/dashboard-mentor/history":
        return "Riwayat Konsultasi";
        case "/dashboard-mentor/profile":
        return "Profil Saya";
      default:
        return "";
    }
  };

  return (
    <div className="w-full py-6 bg-white flex flex-row justify-between items-center border-b-2 pr-8 sticky top-0">
      <div className="w-full flex flex-row items-center">
        <div
          className={`flex ml-8 cursor-pointer text-textPrimary`}
          onClick={handleMenuClick}
        >
          {isSideBarOpen ? <MdArrowBackIosNew size={30} /> : <FiMenu size={30} />}
        </div>

        <h2 className="font-bold font-montserrat text-lg lg:text-2xl pl-5 text-textPrimary ">
          {getPageTitle()}
        </h2>
      </div>
      <div className="flex items-center gap-8">
        <MenuProfileDashboard />
      </div>
    </div>
  );
}
