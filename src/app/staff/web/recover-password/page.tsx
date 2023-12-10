'use client'
import image from "../../../wallpaperflare.com_wallpaper.jpg"
import Image from "next/image";
import logo from '../../../logo-icon.svg';
import Link from "next/link";
import { useEffect, useContext, useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import TextInput from "@/app/dashboard/formik/inputtypes";
import Button from "@/app/dashboard/button";
import { Password } from "@/app/dashboard/formik/password";
import { useRouter } from "next/navigation";
import { State_data } from "@/app/dashboard/context/context";
import { staffAPIURL } from "@/app/dashboard/services/api-url/staff-api-url";
import ErrorAndSucccessHandlers from "@/app/dashboard/services/eventhandlers/error-and-success-handlers";
import Loader from "@/app/dashboard/services/Loader/spinner";
import { useGetBusiness } from "@/app/dashboard/services/swr-functions/customer-swr";

export default function RecoverPassword(){
    const {getBusinessData} = useGetBusiness()
     const [forgotPassword, setForgotPassword] = useState<any>({
        info: "",
        result: ""
     });
     const router = useRouter();
     const {successMessage, loading, setLoading} = useContext(State_data)
     async function handleRecoverPassword(val: any){
        const response = await fetch(staffAPIURL.forgetStaffPassword,{
            method: 'PUT',
            body: JSON.stringify(val),
            headers: {
                "Content-Type": "application/json",
            },
        })
        const data = await response.json();
        setForgotPassword((prev: any) => ({...prev, result: data}));
        setLoading((prev: any) => ({...prev, staffL: false}));
     }

     useEffect(() => {
        if(forgotPassword?.result !== ""){
           if(forgotPassword?.result?.code === 200){
               let timer = setTimeout(() => {
                   router.replace('/staff/web/login');
               }, 6000);
               () => clearTimeout(timer);
           }
       }
   }, [forgotPassword?.result])

     useEffect(() => {
        if(forgotPassword?.result === "" && forgotPassword?.info !== ""){
            setLoading((prev: any) => ({...prev, staffL: true}))
        }
        if(forgotPassword?.info !== ""){
            handleRecoverPassword(forgotPassword?.info)
        }
    }, [forgotPassword?.info])

    return(
        <div className="w-screen relative h-screen overflow-x-hidden">
            {loading.staffL && <Loader />}
            <Image  
            alt="background" 
            src={image} 
            className="brightness-50 w-screen h-screen"
            />
            
            <div className="w-full absolute phone:top-0 after-tablet:top-10 laptop:top-0 flex justify-center items-center h-full">
                <div className="tablet:w-2/4 after-tablet:w-1/3 laptop:w-2/4 phone:w-11/12 p-5 rounded-3xl" id="transparent">
                    <div className="flex flex-col justify-center items-center">
                        <Image className="w-10 mb-2" src={getBusinessData?.data?.image} alt="logo" />
                        <h5 className="text-sm text-gray-800">{getBusinessData?.data?.title}</h5>
                    </div>
                    {
                        forgotPassword.result !== "" && forgotPassword.info !== "" && 
                        <ErrorAndSucccessHandlers
                        name="staffAndCustomerForgotPassword"
                        successName={successMessage.staffAndCustomerForgotPassword}
                        staffAndCustomer={forgotPassword?.result} 
                        error={forgotPassword?.result?.code !== 200}
                        data={forgotPassword?.result}
                        code={forgotPassword?.info?.code}
                        failedmessage ="This email is not registered."
                        successmessage="Check your email, an email has been sent to you."
                        message={forgotPassword?.result?.code} 
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
                                setForgotPassword((prev: any) => ({...prev,
                                    info: {
                                        code: Password(),
                                        ...values
                                    },
                                    result: ""
                                }))
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