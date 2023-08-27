'use client'
import image from "../../../wallpaperflare.com_wallpaper.jpg"
import Image from "next/image";
import logo from '../../../logo-icon.svg';
import Time from "@/app/time";
import Link from "next/link";
import {useState} from "react";
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import { useStaffLogin } from "@/app/dashboard/services/swr-functions/staff-swr";
import TextInput from "@/app/dashboard/formik/inputtypes";
import Button from "@/app/dashboard/button";
import ErrorAndSucccessHandlers from "@/app/dashboard/services/eventhandlers/error-and-success-handlers";
import { Password } from "@/app/dashboard/formik/password";


export default function Staff(){
     const [passwordString, setPasswordString] = useState<boolean>(true)
     const [staff, setStaff] = useState<any>();
     const { staffData, loading, mutate, error, loggedOut } = useStaffLogin(staff);


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
                        (staff?.id !== undefined && staff?.password !== undefined) && 
                        <ErrorAndSucccessHandlers 
                        message={staff?.code} 
                        staffAndCustomer={staff}
                        error={error}
                        loading={loading}
                        data={staffData}
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
                                setStaff(null)
                                setStaff({
                                    ...values,
                                    code: Password()
                                });
                                console.log(error, staffData, loading)
                                mutate();
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
