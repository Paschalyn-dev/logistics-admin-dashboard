'use client'
import image from "../../../wallpaperflare.com_wallpaper.jpg"
import Image from "next/image";
import logo from '../../../logo-icon.svg';
import Time from "@/app/time";
import Link from "next/link";
import {useState, useContext, useEffect} from "react";
import { useRouter } from "next/navigation";
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import TextInput from "@/app/dashboard/formik/inputtypes";
import Button from "@/app/dashboard/button";
import ErrorAndSucccessHandlers from "@/app/dashboard/services/eventhandlers/error-and-success-handlers";
import { Password } from "@/app/dashboard/formik/password";
import { customerAPIUrl } from "@/app/dashboard/services/api-url/customer-api-url";
import { login } from "@/app/dashboard/services/libs/staff-auth";
import { customerLogin } from "@/app/dashboard/services/libs/customer-auth";
import { State_data } from "@/app/dashboard/context/context";
import Loader from "@/app/dashboard/services/Loader/spinner";
import { useGetBusiness } from "@/app/dashboard/services/swr-functions/customer-swr";

export default function Customer(){
    const [passwordString, setPasswordString] = useState<boolean>(true)
    const router = useRouter();
    const {getBusinessData} = useGetBusiness()
    const [customer, setCustomer] = useState<any>({
        info: "",
        result: ""
    });
    const {successMessage, loading, setLoading} = useContext(State_data)
    async function handleLogin(val: any){
        const response = await fetch(customerAPIUrl.fetchCustomer, {
            method: "POST",
            body: JSON.stringify(val),
            headers: {
            "Content-Type": "application/json",
        },
    })
    const data = await response.json();
    setCustomer((prev: any) => ({...prev, result: data}));
    setLoading((prev: any) => ({...prev, customerL: false}));
    }

    useEffect(() => {
        if(customer?.result !== ""){
        const user = customer?.result?.data;
        if(customer?.result?.code === 200 && customer?.result?.data?.isDefaultPassword === false) {
            customerLogin(user.authToken)
            // staffStore.push(user);
            let timer = setTimeout(() => {
                router.replace('/dashboard/welcome');
            }, 5000);
            () => clearTimeout(timer);
        }
        if(customer?.result?.code === 200 && customer?.result?.data?.isDefaultPassword === true){
            router.replace('/customer/web/changepassword')
            // staffStore.push(user);
        }  
    }
    },[customer?.result])
    
    useEffect(() => {
        if(customer?.result === "" && customer?.info !== ""){
            setLoading((prev: any) => ({...prev, customerL: true}))
        }
        if(customer?.info !== ""){
            handleLogin(customer.info);
        }
    }, [customer?.info?.code])
     
    return(
        <div className="w-screen relative h-screen overflow-x-hidden">
                {loading.customerL && <Loader />}
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
                        customer.result !== "" && customer.info !== "" && 
                        <ErrorAndSucccessHandlers 
                        name="staffAndCustomerLogin"
                        successName={successMessage.staffAndCustomerLogin}
                        message={customer?.result?.code} 
                        code={customer?.info?.code}
                        successmessage="Login successful!"
                        failedmessage="Login parameters are incorrect"
                        staffAndCustomer={customer?.result}
                        error={customer?.result?.code !== 200}
                        data={customer?.result}
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
                                setCustomer((prev: any) => ({...prev, result: "", info: {...values, code: Password()}}));
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