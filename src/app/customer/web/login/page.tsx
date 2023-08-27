'use client'
import image from "../../../wallpaperflare.com_wallpaper.jpg"
import Image from "next/image";
import logo from '../../../logo-icon.svg';
import Time from "@/app/time";
import Link from "next/link";
import {useState} from "react";
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import TextInput from "@/app/dashboard/formik/inputtypes";
import Button from "@/app/dashboard/button";
import ErrorAndSucccessHandlers from "@/app/dashboard/services/eventhandlers/error-and-success-handlers";
import { useCustomerLogin } from "@/app/dashboard/services/swr-functions/customer-swr";
import { Password } from "@/app/dashboard/formik/password";

export default function Customer(){
     const [passwordString, setPasswordString] = useState<boolean>(true)
     const [customer, setCustomer] = useState<any>();
     const { customerData, loading, mutate, error } = useCustomerLogin(customer);
     
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
                        (customer?.id !== undefined && customer?.password !== undefined) &&
                        <ErrorAndSucccessHandlers 
                        message={customer?.code} 
                        staffAndCustomer={customer}
                        error={error}
                        loading={loading}
                        data={customerData}
                        />
                    }
                    <div className="mt-5 justify-center font-bold text-2xl flex gap-2 "><Time /> Customer</div>
                    <p className="text-center text-gray-500">Let's get to work!</p>
                    <div className="flex mt-6 text-sm w-full text-center gap-5">
                        <Link className="bg-yellow-500 text-gray-50 rounded-2xl p-2 w-full" href="/customer/web/login">CUSTOMER</Link>
                        <Link className="bg-gray-50 border text-gray-500 rounded-2xl p-2 w-full" href="/staff/web/login">STAFF</Link>
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
                                setCustomer(null)
                                setCustomer({
                                    ...values,
                                    code: Password()
                                });
                                console.log(error, customerData, loading)
                                mutate();
                            }}    
                        >
                    {      ({handleSubmit}) => ( 
  
                            <Form autoComplete="on">
                                <TextInput
                                label = 'Email Address'
                                name = 'id'
                                type = 'email'
                                placeholder='Email address here...'
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
                                
                                <Link href="/customer/web/recover-password" 
                                className="text-left flex font-bold text-blue-600 mb-4"
                                >
                                    Forgot Password?
                                </Link>

                                <Button 
                                type="submit" 
                                handleClick={handleSubmit} 
                                buttonName="Continue" 
                                />
                        </Form>
                        )}
                    </Formik>
                    </div>
                </div>
            </div>
        </div>
    )   
}