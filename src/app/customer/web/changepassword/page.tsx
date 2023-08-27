'use client'
import image from "../../../wallpaperflare.com_wallpaper.jpg"
import Image from "next/image";
import logo from '../../../logo-icon.svg';
import Link from "next/link";
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import TextInput from "@/app/dashboard/formik/inputtypes";
import Button from "@/app/dashboard/button";
import { useState } from "react";
import { useCustomerChangePassword } from "@/app/dashboard/services/swr-functions/customer-swr";
import { Password } from "@/app/dashboard/formik/password";
import ChangePasswordMessage from "@/app/dashboard/services/eventhandlers/changePasswordMessage";

export default function     CustomerChangePassword(){
    const [passwordString, setPasswordString] = useState<boolean>(true);
    const [changePassword, setChangePassword] = useState<any>();
    const {customerChangePasswordError,
        customerChangePasswordData,
        customerChangePasswordIsLoading,
        customerChangePasswordIsValidating,
        customerChangePasswordMutate
    } = useCustomerChangePassword(changePassword);

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
                {(
                    changePassword?.oldpassword !== undefined && changePassword?.newpassword !== undefined) && (
                    <ChangePasswordMessage
                    changePasswordFormDetails={changePassword} 
                    changePasswordData={customerChangePasswordData} 
                    changePasswordError={customerChangePasswordError} 
                    changePasswordLoading={customerChangePasswordIsLoading}
                    changePasswordValidating={customerChangePasswordIsValidating}
                    message={changePassword?.code}
                    />
                )}
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
                            setChangePassword(null)
                            setChangePassword({
                                code: Password(),
                                ...values
                            })
                            console.log(customerChangePasswordData, customerChangePasswordError, changePassword)
                            customerChangePasswordMutate()
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