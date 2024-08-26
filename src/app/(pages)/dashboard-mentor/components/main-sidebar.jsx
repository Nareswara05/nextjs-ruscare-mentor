"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSidebar } from "./SidebarContext";
import { logoPurple } from "@/app/lib/utils/svg";
import { RiServiceLine } from "react-icons/ri";
import { VscHistory } from "react-icons/vsc";
import { PiStudent } from "react-icons/pi";
import { RxDashboard } from "react-icons/rx";
import { FaUser } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { BsMailbox } from "react-icons/bs";
import { CiMail } from "react-icons/ci";



export default function MainSideBar() {
  const [isSideBarOpen, setIsSideBarOpen] = useSidebar();

  const toggleSidebar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const menuItems = [
    {
      href: "/dashboard-mentor",
      icon: <RxDashboard className="mr-4" size={25} />,
      label: "Dashboard",
    },
    {
      href: "/dashboard-mentor/student-list",
      icon: <PiStudent className="mr-4" size={25} />,
      label: "List Murid",
    },
    {
      href: "/dashboard-mentor/history",
      icon: <VscHistory className="mr-4" size={25} />,
      label: "Riwayat",
    },
    {
      href: "/dashboard-mentor/mailbox",
      icon: <CiMail className="mr-4" size={25} />,
      label: "Mailbox",
    },
    {
      href: "/dashboard-mentor/profile",
      icon: <FiUser className="mr-4" size={25} />,
      label: "Profil Saya",
    },
  ];



  return (
    <>
      <div
        className={`lg:w-[30%] sticky top-0 h-screen  bg-white flex flex-col border-r-2  ${isSideBarOpen ? "flex" : "hidden"
          }`}
      >
        <div className="w-full h-[13%] flex flex-row px-8 justify-between items-center">
          <div className="flex-row h-auto items-center justify-start flex ">
            <Link href="/">
              <Image src={logoPurple}
                alt=""
                width={120}
              />
            </Link>
          </div>


        </div>

        <div className="w-full flex flex-col px-8 mt-5">
          <div className="w-full flex flex-col">
            <h2 className="text-sm font-medium text-textPrimary">MENU UTAMA</h2>
            <ul className="w-full mt-3">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-start items-center text-textPrimary hover:bg-primary hover:text-white rounded-xl p-4 cursor-pointer"
                >
                  {item.icon}
                  <Link href={item.href} className="text-base font-normal">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
