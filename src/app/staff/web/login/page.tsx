'use client'
import image from "../../../wallpaperflare.com_wallpaper.jpg"
import Image from "next/image";
import logo from '../../../logo-icon.svg';
import Time from "@/app/time";
import Link from "next/link";
import {useEffect, useContext, useState} from "react";
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import { useRouter } from "next/navigation";
import TextInput from "@/app/dashboard/formik/inputtypes";
import Button from "@/app/dashboard/button";
import ErrorAndSucccessHandlers from "@/app/dashboard/services/eventhandlers/error-and-success-handlers";
import { Password } from "@/app/dashboard/formik/password";
import { login } from "@/app/dashboard/services/libs/staff-auth";
import { staffAPIURL } from "@/app/dashboard/services/api-url/staff-api-url";
import { State_data } from "@/app/dashboard/context/context";


export default function Staff(){
    const router = useRouter();
    const [passwordString, setPasswordString] = useState<boolean>(true)
    const [staff, setStaff] = useState<any>({
        info: '',
        result: ''
    });
    const {successMessage} = useContext(State_data)

    async function handleLogin(val: any){
        const response = await fetch(staffAPIURL.stafflogin, {
            method: "POST",
            body: JSON.stringify(val),
            headers: {
            "Content-Type": "application/json",
        },
    })
    const data = await response.json();
    setStaff((prev: any) => ({...prev, result: data}));
    }

useEffect(() => {
    if(staff?.result !== ""){
    const user = staff?.result?.data;
    if(staff?.result?.code === 200 && staff?.result?.data?.isDefaultPassword === false) {
        login(user.authToken)
        // staffStore.push(user);
        let timer = setTimeout(() => {
            router.replace('/dashboard/welcome');
        }, 5000);
        () => clearTimeout(timer);
    }
    if(staff?.result?.code === 200 && staff?.result?.data?.isDefaultPassword === true){
        router.replace('/staff/web/changepassword')
        // staffStore.push(user);
    }  
}
},[staff?.result])

useEffect(() => {
    if(staff?.info !== ""){
        handleLogin(staff.info);
    }
}, [staff?.info?.code])

return(
        <div className="w-screen relative h-screen overflow-x-hidden">
            <Image  
            alt="background" 
            src={image} 
            className="brightness-50 w-screen h-screen"
            />
            
            <div className="w-full absolute phone:top-0 after-tablet:top-10 laptop:top-0 flex justify-center items-center h-full">
                <div className="tablet:w-2/4 after-tablet:w-1/3 laptop:w-2/4 phone:w-11/12 p-5 rounded-3xl" id="transparent">
                    <div className="flex flex-col justify-center items-center">
                        <Image className="w-10 mb-2" src={logo} alt="logo" />
                        <h5 className="text-sm text-gray-800">CakenUs Services</h5>
                    </div>
                    {
                        staff.result !== "" && staff.info !== "" && 
                        <ErrorAndSucccessHandlers 
                        name="staffAndCustomerLogin"
                        successName={successMessage.staffAndCustomerLogin}
                        message={staff?.result?.code} 
                        code={staff?.info?.code}
                        successmessage="Login successful!"
                        failedmessage="Login parameters are incorrect"
                        staffAndCustomer={staff?.result}
                        error={staff?.result?.code !== 200}
                        loading={staff?.result === "undefined" && staff?.info !== ""}
                        data={staff?.result}
                        />
                    }
                    <div className="mt-5 justify-center font-bold text-2xl flex gap-2 "><Time /> Staff</div>
                    <p className="text-center text-gray-500">Let's get to work!</p>
                    <div className="flex mt-6 text-sm w-full text-center gap-5">
                        <Link className="bg-gray-50 border text-gray-500 rounded-2xl p-2 w-full" href="/customer/web/login">CUSTOMER</Link>
                        <Link className="bg-yellow-500 text-gray-50 rounded-2xl p-2 w-full" href="/staff/web/login">STAFF</Link>
                    </div>
                    <div className="flex flex-col w-full mt-10">
                        <Formik
                            initialValues={{
                                id: '',
                                password: '',
                            }}
                            validationSchema={Yup.object({
                                id: Yup.string().email('This email address seems invalid.')
                                .required('Email Address is required.'),
                                password: Yup.string()
                                .required('Password is required.')
                                .min(8, 'Password is too short. It should be 8 characters or more')
                                .matches(/[a-zaA-z0-9]/, 'Password can only contain letters and numbers.')                    
                            })}
                            onSubmit={async (values) => {
                                setStaff((prev: any) => ({...prev, result: "", info: {...values, code: Password()}}));
                            }}   
                        >
                            {({handleSubmit}) => (
                                <>
                            <Form autoComplete="on">
                                <TextInput
                                placeholder='Email address here...'
                                label = 'Email Address'
                                name = 'id'
                                type = 'email'
                                />

                                <TextInput
                                label = 'Password'
                                name = 'password'
                                id= "password"    
                                placeholder='Password here...'                        
                                type={passwordString ? "password" : "text"}
                                handlePasswordString={setPasswordString}
                                stringPassword={passwordString} 
                                />

                                <Link 
                                href="/staff/web/recover-password" 
                                className="text-left flex font-bold text-blue-600 mb-4"
                                >
                                    Forgot Password?
                                </Link>

                                <Button
                                type="submit"
                                buttonName="Continue"
                                handleClick={handleSubmit}
                                />
                        </Form>
                        </>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    )
}
