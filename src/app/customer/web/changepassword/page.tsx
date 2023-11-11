'use client'
import image from "../../../wallpaperflare.com_wallpaper.jpg"
import Image from "next/image";
import logo from '../../../logo-icon.svg';
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import { useRouter } from "next/navigation";
import TextInput from "@/app/dashboard/formik/inputtypes";
import Button from "@/app/dashboard/button";
import { useState, useEffect, useContext } from "react";
import { Password } from "@/app/dashboard/formik/password";
import { State_data } from "@/app/dashboard/context/context";
import { customerAPIUrl } from "@/app/dashboard/services/api-url/customer-api-url";
import { authorizationKeyCustomer } from "@/app/dashboard/services/customer-api/api";
import ErrorAndSucccessHandlers from "@/app/dashboard/services/eventhandlers/error-and-success-handlers";
import Loader from "@/app/dashboard/services/Loader/spinner";

export default function     CustomerChangePassword(){
    const [passwordString, setPasswordString] = useState<boolean>(true);
    const [changePassword, setChangePassword] = useState<any>({
        info: "",
        result: ""
    });
    const router =   useRouter();
    const {successMessage, loading, setLoading} = useContext(State_data)

    async function handleChangePassword(passwordDetails: any){
        const response = await fetch(customerAPIUrl.changePassword,{
            method: 'PUT',
            body: JSON.stringify(passwordDetails),
            headers:{
                "Content-Type": "application/json",
                'Authorization': authorizationKeyCustomer
            },
        })
        const data = await response.json();
        setChangePassword((prev: any) => ({...prev, result: data}));
        setLoading((prev: any) => ({...prev, customerL: false}))
    }

    useEffect(() => {
        if(changePassword?.result !== ""){
           if(changePassword?.result?.code === 200){
                let timer = setTimeout(() => {
                    router.replace('/dashboard/welcome');
                }, 6000);
                () => clearTimeout(timer);
            }
        }
   }, [changePassword?.result])

     useEffect(() => {
        if(changePassword?.result === "" && changePassword?.info !== ""){
            setLoading((prev: any) => ({...prev, customerL: true}))
        }
        if(changePassword?.info !== ""){
            handleChangePassword(changePassword?.info)
        }
    }, [changePassword?.info])

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
                    <Image className="w-10 mb-2" src={logo} alt="logo" />
                    <h5 className="text-sm text-gray-800">CakenUs Services</h5>
                </div>
                {
                    changePassword.result !== "" && changePassword.info !== "" && 
                    <ErrorAndSucccessHandlers
                    name="staffAndCustomerChangePassword"
                    successName={successMessage.staffAndCustomerChangePassword}
                    message={changePassword?.result?.code} 
                    code={changePassword?.info?.code}
                    successmessage="Password change was successful!"
                    failedmessage="Sorry, password cannot be changed!"
                    staffAndCustomer={changePassword?.result}
                    error={changePassword?.result?.code !== 200}
                    data={changePassword?.result}
                    />
                }
                <div className="mt-5 justify-center font-bold text-2xl flex gap-2 "> Change Password</div>
                <p className="text-center text-gray-500">Please enter your old(default password) and new passwords to change password.</p>
                <div className="flex flex-col w-full mt-10">
                    <Formik
                        initialValues={{
                            oldpassword: '',
                            newpassword: '',
                        }}
                        validationSchema={Yup.object({    
                            oldpassword: Yup.string()
                            .required('Old password is required.')
                            .min(8, 'Password is too short. It should be 8 characters or more')
                            .matches(/[a-zaA-z0-9]/, 'Password can only contain letters and numbers.'),
                            newpassword: Yup.string()
                            .required('New password is required.')
                            .min(8, 'Password is too short. It should be 8 characters or more')
                            .matches(/[a-zaA-z0-9]/, 'Password can only contain letters and numbers.')        
                        })}
                        onSubmit={async (values) => {
                            setChangePassword((prev: any) => ({
                                ...prev, 
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
                            placeholder='The old password...'
                            label = 'Old password'
                            name = 'oldpassword'
                            id="password"
                            type={passwordString ? "password" : "text"}
                            handlePasswordString={setPasswordString}
                            stringPassword={passwordString} 
                            />

                            <TextInput
                            placeholder='The new password...'
                            label = 'New password'
                            name = 'newpassword'
                            id="password"
                            type={passwordString ? "password" : "text"}
                            handlePasswordString={setPasswordString}
                            stringPassword={passwordString} 
                            />
                                                                           
                            <Button
                            type="submit"
                            buttonName="Change Password"
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