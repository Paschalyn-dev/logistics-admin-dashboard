'use client'
import image from "../../../wallpaperflare.com_wallpaper.jpg"
import Image from "next/image";
import logo from '../../../logo-icon.svg';
import Link from "next/link";
import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import TextInput from "@/app/dashboard/formik/inputtypes";
import Button from "@/app/dashboard/button";
import { Password } from "@/app/dashboard/formik/password";
import { useForgetPassword } from "@/app/dashboard/services/swr-functions/staff-swr";
import { useRouter } from "next/navigation";
import ForgotPasswordMessage from "@/app/dashboard/services/eventhandlers/forgotPasswordMessage";

export default function RecoverPassword(){
     const [forgotPassword, setForgotPassword] = useState<any>();
     const {forgotPasswordData, mutate, forgetPasswordLoggedout, forgotPasswordError, isLoading, forgotPasswordValidating
           } = useForgetPassword(forgotPassword);
     const router = useRouter();

     useEffect(() => {
        if (forgotPasswordData && !forgetPasswordLoggedout && forgotPasswordData.code === 200){
            var timer = setTimeout(() => {
                router.replace('/staff/web/login');
            }, 6000);
        }
        return () => clearTimeout(timer);
     }, [forgotPasswordData, forgetPasswordLoggedout]);


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
                        forgotPassword?.email !== undefined && 
                        <ForgotPasswordMessage
                        forgotPassword={forgotPassword} 
                        message={forgotPassword.code} 
                        isLoading={isLoading}
                        forgotPasswordData={forgotPasswordData}
                        forgotPasswordError={forgotPasswordError}
                        forgotPasswordValidating={forgotPasswordValidating}
                        />
                    }
                    <div className="mt-5 justify-center font-bold text-2xl flex gap-2 "> Recover Password</div>
                    <p className="text-center text-gray-500">Please enter the email address you created an account with.</p>
                    <div className="flex flex-col w-full mt-10">
                        <Formik
                            initialValues={{
                                email: '',
                            }}
                            validationSchema={Yup.object({
                                email: Yup.string().email('This email address seems invalid.')
                                .required('Email Address is required.')           
                            })}
                            onSubmit={async (values) => {
                                setForgotPassword(null)
                                setForgotPassword({
                                    code: Password(),
                                    ...values
                                })
                                console.log(forgotPassword, forgotPasswordData)
                                mutate();
                            }}  
                        >
                            {({handleSubmit}) => (
                                <>
                            <Form>
                                <TextInput
                                placeholder='Email address here...'
                                label = 'Email Address'
                                name = 'email'
                                type = 'email'
                                />

                                <Link
                                href="/staff/web/login" 
                                className="text-left flex gap-1 font-bold text-blue-600 mb-4"
                                >   
                                    <i className="icon ion-md-arrow-back"></i>
                                    Back to Login Page
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