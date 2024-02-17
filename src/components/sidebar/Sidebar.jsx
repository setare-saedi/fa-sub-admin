import React from "react";
import { Link, NavLink } from 'react-router-dom';

import { FaComments } from "react-icons/fa";
import { FaUsers } from 'react-icons/fa';
import { BiSolidCategory } from "react-icons/bi";
import { FaUsersGear } from "react-icons/fa6";
import { FaFileSignature } from 'react-icons/fa';
import { MdTypeSpecimen } from 'react-icons/md';
import { PiFilesFill } from "react-icons/pi";
import { MdManageAccounts } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";

export default function Sidebar() {

    return (
        <div className=" px-2 sticky min-h-screen  bg-gray-50  border-l border-gray-200 flex flex-col justify-between ">

            <div className="  ">

                <div className="pt-2 mb-7 pr-6 font-bold text-2xl  text-[#0b6170]">
                    SETAREH
                </div>


                {/* category */}
                <div className=" mb-6 relative pt-2 border-t  border-[#0b6170]">
                    {/* title */}
                    <div className="absolute -top-3 bg-gray-50 flex items-center text-[#0b6170] ">
                        <FaFileSignature className="  " />
                        <span className=" mr-1">
                            نوشته ها
                        </span>
                    </div>
                    {/* sub title */}
                    <div className=" pt-1 flex flex-col pr-4 text-sm">
                        <NavLink className=' font-bold border-r-2 bg-[#e1f9f9] p-1  border-[#0b6170]  pr-1'>
                            مدیریت نوشته ها
                        </NavLink>
                        <NavLink className="  hover:bg-[#f0ffff] p-1 ">
                            ایجاد نوشته جدید
                        </NavLink>
                    </div>
                </div>


                {/* category */}
                <div className=" mb-6 relative pt-2 border-t  border-[#0b6170]">
                    {/* title */}
                    <div className="absolute -top-3 bg-gray-50 flex items-center text-[#0b6170] ">
                        <FaUsers />
                        <span className=" mr-1">
                            بازیگران
                        </span>
                    </div>
                    {/* sub title */}
                    <div className="pt-1 flex flex-col pr-4 text-sm ">
                        <NavLink className="  hover:bg-[#f0ffff] p-1 ">
                            مدیریت بازیگرها
                        </NavLink>
                        <NavLink className="  hover:bg-[#f0ffff] p-1 ">
                            ایجاد بازیگر جدید
                        </NavLink>
                    </div>
                </div>


                {/* category */}
                <div className=" mb-6 relative pt-2 border-t border-dashed  border-[#0b6170]">
                    {/* title */}
                    <div className="absolute -top-3 bg-gray-50 flex items-center text-[#0b6170] ">
                        <BiSolidCategory />
                        <span className=" mr-1">
                            دسته بندی ها
                        </span>
                    </div>
                    {/* sub title */}
                    <div className="pt-1 flex flex-col pr-4 text-sm ">
                        <NavLink className=' hover:bg-[#f0ffff] p-1 '>
                            مدیریت دسته ها
                        </NavLink>
                        <NavLink className="  hover:bg-[#f0ffff] p-1 ">
                            ایجاد دسته جدید
                        </NavLink>
                    </div>
                </div>


                {/* category */}
                <div className=" mb-6 relative pt-2 border-t border-dotted  border-[#0b6170]">
                    {/* title */}
                    <div className="absolute -top-3 bg-gray-50 flex items-center text-[#0b6170] ">
                        <MdTypeSpecimen />
                        <span className=" mr-1">
                            ژانر
                        </span>
                    </div>
                    {/* sub title */}
                    <div className="pt-1 flex flex-col pr-4 text-sm ">
                        <NavLink className="  hover:bg-[#f0ffff] p-1 ">
                            مدیریت ژانرها
                        </NavLink>
                        <NavLink className="  hover:bg-[#f0ffff] p-1 ">
                            ایجاد ژانر جدید
                        </NavLink>
                    </div>
                </div>

                {/* category */}
                <div className=" mb-6 relative pt-2 border-t border-[#0b6170]">
                    {/* title */}
                    <div className="absolute -top-3 bg-gray-50 flex items-center text-[#0b6170] ">
                        <FaComments />
                        <span className=" mr-1">
                            نظرات
                        </span>
                    </div>
                    {/* sub title */}
                    <div className="pt-1 flex justify-between items-center  pr-4 text-sm hover:bg-[#f0ffff] p-1 ">
                        <NavLink className="  ">
                            مدیریت نظرات
                        </NavLink>
                        <span className=" border border-gray-300  bg-red-600 rounded-full text-white px-2 py-0.5 text-xs">25</span>
                    </div>
                </div>

                {/* category */}
                <div className=" mb-6 relative pt-2 border-t  border-[#0b6170]">
                    {/* title */}
                    <div className="absolute -top-3 bg-gray-50 flex items-center text-[#0b6170] ">
                        <FaUsersGear />
                        <span className=" mr-1">
                            کاربران
                        </span>
                    </div>
                    {/* sub title */}
                    <div className="pt-1 flex flex-col pr-4 text-sm ">
                        <div className=" flex justify-between items-center text-sm hover:bg-[#f0ffff] p-1">
                        <NavLink className="   ">
                            مدیریت کاربرها
                        </NavLink>
                        <span className=" border border-gray-300  bg-red-600 rounded-full text-white px-2 py-0.5 text-xs">95</span>
                        </div>
                        
                        <NavLink className="  hover:bg-[#f0ffff] p-1 ">
                            ایجاد کاربر جدید
                        </NavLink>
                    </div>
                </div>



                {/* category */}
                <div className=" relative pt-2 border-t  border-[#0b6170]">
                    {/* title */}
                    <div className="absolute -top-3 bg-gray-50 flex items-center text-[#0b6170] ">
                        <PiFilesFill />
                        <span className=" mr-1">
                            مدیریت فایل
                        </span>
                    </div>
                    {/* sub title */}
                    <div className="pt-1 flex flex-col pr-4 text-sm ">
                        <NavLink className="  hover:bg-[#f0ffff] p-1 ">
                            مدیریت فایل
                        </NavLink>
                    </div>
                </div>
            </div>

            {/* setting */}
            <div className=" pb-2 space-y-3 text-[#184a53]">
                <div >
                    {/* title */}
                    <NavLink className=" flex items-center">
                        <MdManageAccounts />
                        <span className=" mr-1 text-sm">
                            مدیریت اکانت
                        </span>
                    </NavLink>
                </div>
                <div>
                    <NavLink className=" flex items-center">
                        <IoMdSettings />
                        <span className=" mr-1 text-sm">
                            تنظیمات
                        </span>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}