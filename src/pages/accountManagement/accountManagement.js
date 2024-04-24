import { useState, useEffect } from "react";
import { Tab, Tabs } from "../../components/tabs/Tabs";
import Button from "../../components/form/Button";
import Input from "../../components/form/Input";
import axios from "../../axios";
import Loading from "../../components/loading/Loading";
import { requiredValidator } from "../../validators/rules";
import { useForm } from "../../hooks/useForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function AccountManagement() {
    const notify = (e) => toast(e);

    const [isLoading, setIsLoading] = useState(false)

    const [formState, onInputHandler] = useForm({
        pass: {
            value: '',
            isValid: false
        },
        newPass: {
            value: '',
            isValid: false
        },
        rePass:{
            value: '',
            isValid: false 
        }
    }, false)


    const changePass=(e)=>{
        e.preventDefault()
        axios
            .put('/users/change-password', {
                password: formState.inputs.pass.value,
                password_current: formState.inputs.newPass.value,
                password_confirmation: formState.inputs.rePass.value,
            }).then(response => {
                // console.log(response)
                setIsLoading(false)
                notify('دسته جدید اضافه شد.')
            })
            .catch(error => {
                console.log(error)
                console.log(error.response.data.errors.password);
                notify(error.response.data.errors.password[0])
            })
    }

    return (
        <>
         {
                isLoading && <Loading />
            }
        <div className=" bg-gray-100 border border-gray-100 p-6 ml-6">
        <ToastContainer />

            <Tabs>
                <Tab label='تغییر رمز عبور'>
                   <div className=" w-2/6 mx-auto">
                    <form onSubmit={changePass}>
                        <div className=" flex flex-col mb-6">
                            <label>
                                رمز عبور فعلی
                            </label>
                            <Input
                                id='pass'
                                type='password'
                                element='input'
                                className='w-full py-1 px-4 rounded-sm outline-none border border-gray-200 mt-2'
                                placeholder=''
                                validations={[
                                    requiredValidator()
                                ]}
                                onInputHandler={onInputHandler}
                            />
                        </div>
                        <div  className=" flex flex-col mb-6">
                            <label>
                                رمز عبور جدید
                            </label>
                            <Input
                                id='newPass'
                                type='password'
                                element='input'
                                className='w-full py-1 px-4 rounded-sm outline-none border border-gray-200 mt-2'
                                placeholder=''
                                validations={[
                                    requiredValidator()
                                ]}
                                onInputHandler={onInputHandler}
                            />
                        </div>
                        <div  className=" flex flex-col mb-6">
                            <label>
                                تکرار رمز عبور جدید
                            </label>
                            <Input
                                id='rePass'
                                type='password'
                                element='input'
                                className='w-full py-1 px-4 rounded-sm outline-none border border-gray-200 mt-2'
                                placeholder=''
                                validations={[
                                    requiredValidator()
                                ]}
                                onInputHandler={onInputHandler}
                            />
                        </div>
                        <Button className="w-full bg-gray-300 py-3 rounded-sm border border-gray-400">
                            تغییر رمز عبور
                        </Button>
                    </form>
                   </div>
                </Tab>
                <Tab label='تغییر اطلاعات شخصی'>
                    <h2>
                        تغییر اطلاعات شخصی'
                    </h2>
                </Tab>
            </Tabs>
        </div>
        </>
    )
}