import React, { useState } from "react";
import Input from "../../components/form/Input";
import Button from "../../components/form/Button";
import { useForm } from "../../hooks/useForm";
import { requiredValidator } from "../../validators/rules";
import axios from "../../axios";
import Loading from "../../components/loading/Loading";

export default function AddForm({ sendForm }) {
    const [formState, onInputHandler] = useForm({
        name: {
            value: '',
            isValid: false
        },
        nameEn: {
            value: '',
            isValid: false
        },
    }, false)

    const send = (e) => {
        e.preventDefault()
        sendForm([formState.inputs.name.value, formState.inputs.nameEn.value])
    }
    return (
        <>
            <div className="absolute -bottom-[65%] right-[3%] border border-gray-1F00 rounded-sm text-sm w-[95%] bg-gray-100">
                <form onSubmit={send}>
                    <div className=" grid grid-cols-5 gap-6 items-center px-4 py-2 ">
                        <div className=" col-span-2">
                            <Input
                                id='name'
                                type='text'
                                element='input'
                                className='  outline-none  w-full py-1 px-3 text-black rounded-sm border-b border-gray-800 bg-transparent placeholder:text-black'
                                placeholder='نام فارسی...'
                                validations={[
                                    requiredValidator()
                                ]}
                                onInputHandler={onInputHandler}
                            />
                        </div>
                        <div className=" col-span-2">
                            <Input
                                id='nameEn'
                                type='text'
                                element='input'
                                className='  outline-none  w-full py-1 px-3 text-black rounded-sm border-b border-gray-800 bg-transparent placeholder:text-black'
                                placeholder='نام لاتین ...'
                                onInputHandler={onInputHandler}
                                validations={[
                                    requiredValidator()
                                ]}
                            />
                        </div>

                        <div className=" col-span-1">
                            {
                                formState.inputs.name.isValid && formState.inputs.nameEn.isValid ?
                                    <Button
                                        className='text-black border border-gray-300 px-8 py-1 w-full bg-green-400'
                                        type='submit'
                                    > افزودن دسته جدید</Button>
                                    :
                                    <Button disabled
                                        className='text-black border border-gray-300 px-8 py-1 w-full bg-gray-300'
                                        type='submit'
                                    > افزودن دسته جدید</Button>
                            }

                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}