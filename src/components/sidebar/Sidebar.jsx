import React, { useState } from "react";
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from "../../hooks/AuthProvider";

import { FaComments } from "react-icons/fa";
import { FaUsers } from 'react-icons/fa';
import { BiSolidCategory } from "react-icons/bi";
import { FaUsersGear } from "react-icons/fa6";
import { FaFileSignature } from 'react-icons/fa';
import { MdTypeSpecimen } from 'react-icons/md';
import { PiFilesFill } from "react-icons/pi";
import { MdManageAccounts } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { TbLogout } from "react-icons/tb";

export default function Sidebar() {
    const auth = useAuth();

    return (
        <div className=" px-2 fixed min-h-screen bg-gray-50  border-l border-gray-200 flex flex-col justify-between ">

            <div className="">

                <div className="pt-2 pl-14 mb-7 pr-12 font-bold text-2xl  text-[#0b6170]">
                    <Link to='/dashboard'>SETAREH</Link>
                </div>


                {/* posts */}
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
                        <NavLink to='/posts' className={link => link.isActive ? 'font-bold border-r-2 bg-[#e1f9f9] p-1  border-[#0b6170]' : ' p-1 hover:bg-[#f0ffff] '}>
                            مدیریت نوشته ها
                        </NavLink>
                        <NavLink to='/create-post' className={link => link.isActive ? 'font-bold border-r-2 bg-[#e1f9f9] p-1  border-[#0b6170]' : ' p-1 hover:bg-[#f0ffff] '}>
                            ایجاد نوشته جدید
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
                        <NavLink to='/cats' className={link => link.isActive ? 'font-bold border-r-2 bg-[#e1f9f9] p-1  border-[#0b6170]' : ' p-1 hover:bg-[#f0ffff] '}>
                            مدیریت دسته ها
                        </NavLink>
                    </div>
                </div>


                {/* genre */}
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
                        <NavLink to='/genre' className={link => link.isActive ? 'font-bold border-r-2 bg-[#e1f9f9] p-1  border-[#0b6170]' : ' p-1 hover:bg-[#f0ffff] '}>
                            مدیریت ژانرها
                        </NavLink>
                    </div>
                </div>

                {/* comment */}
                <div className=" mb-6 relative pt-2 border-t border-[#0b6170]">
                    {/* title */}
                    <div className="absolute -top-3 bg-gray-50 flex items-center text-[#0b6170] ">
                        <FaComments />
                        <span className=" mr-1">
                            نظرات
                        </span>
                    </div>
                    {/* sub title */}
                    <div className="  pr-4 text-sm hover:bg-[#f0ffff] p-1 ">
                        <NavLink to='/comments' className={link => link.isActive ? 'flex justify-between items-center font-bold border-r-2 bg-[#e1f9f9] p-1  border-[#0b6170]' : 'flex justify-between items-center p-1 hover:bg-[#f0ffff] '}>
                            <span>مدیریت نظرات</span>
                            <span className=" border border-gray-300  bg-red-600 rounded-sm text-white px-1.5 py-0.5 text-xs">25</span>
                        </NavLink>
                    </div>
                </div>

              
            </div>

            {/* setting */}
            <div className=" pb-2 space-y-3 text-[#184a53]">
                <div >
                    {/* title */}
                    <NavLink to='/account' className=" flex items-center">
                        <MdManageAccounts />
                        <span className=" mr-1 text-sm">
                            مدیریت اکانت
                        </span>
                    </NavLink>
                </div>
                <div>
                    <button className=" flex items-center" onClick={() => auth.logOut()}>
                        <TbLogout />
                        <span className=" mr-1 text-sm">
                            خروج
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}