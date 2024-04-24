import React, { useState } from "react";

import { useAuth } from "../../hooks/AuthProvider";


export default function Login() {
    const [input, setInput] = useState({
        username: "",
        password: "",
    });
    const auth = useAuth();

    const handleSubmitEvent = (e) => {
        e.preventDefault();
        if (input.username !== "" && input.password !== "") {
            auth.loginAction(input);
            return;
        }
        alert("please provide a valid input");
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className=" h-screen ">

            <div className=" text-center font-bold text-4xl text-[#0b6176] mt-16 mb-8">SETAREH</div>
            <div className=" border border-[#0b6176] px-4 py-6 w-2/6 mx-auto bg-gray-100">
                <div className=" text-center font-bold mb-10 ">
                    ورود به پنل مدیریت
                </div>
                <form onSubmit={handleSubmitEvent}>
                    <div className="">
                        <label>
                            نام کاربری
                        </label>
                        <input className=" outline-none w-full py-2 px-3 rounded-sm border border-gray-300" onChange={handleInput} name="username" autoComplete="setar" type="text" placeholder="setare" />
                    </div>
                    <div className=" my-6">
                        <label>
                            رمز عبور
                        </label>
                        <input className=" outline-none w-full py-2 px-3 rounded-sm border border-gray-300" onChange={handleInput} name="password" autoComplete="pLo" type="password" placeholder="12345678" />
                    </div>
                    
                    <div className=" text-center">
                        <button className=" rounded-sm border border-gray-300 px-12 py-2 bg-gray-300">
                            ورود
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}