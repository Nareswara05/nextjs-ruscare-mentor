import React from "react";
import { FaStar } from "react-icons/fa";

export default function MailList({ data, onClick }) {
    return (
        <div className="flex items-center w-full h-20 px-5 py-3 bg-white border-b border-[#D5D5D5] cursor-pointer">
            <div className="flex items-center gap-5 w-full">
                {/* <input
                    type="checkbox"
                    className="w-6 h-6 cursor-pointer text-primary bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 checked:bg-primary"
                /> */}
                <div onClick={onClick} className="flex justify-between items-center w-full">
                    <div className="flex gap-4 items-center">
                        <div className="text-secondary">
                            <FaStar />
                        </div>
                        <div>
                            <h1 className="text-[14px] text-textPrimary font-semibold">
                                {data.title}
                            </h1>
                            <h1 className="text-[10px] text-textPrimary font-normal truncate w-28">
                                {data.message}
                            </h1>
                        </div>
                    </div>
                    <h1 className="text-[14px] text-textPrimary font-normal">{data.created_at}</h1>
                </div>
            </div>
        </div>
    );
}
