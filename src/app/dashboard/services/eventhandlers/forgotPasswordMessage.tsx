'use client'
import Loader from "@/app/dashboard/services/Loader/spinner";
import SuccessMessage from "@/app/dashboard/successmessage";
import { useContext, useEffect, useState } from "react";
import { State_data } from "../../context/context";


export default function ForgotPasswordMessage({forgotPassword, forgotPasswordValidating, isLoading, forgotPasswordError, forgotPasswordData,  message}: any){
    const {successMessage, setSuccessMessage} = useContext(State_data);

    useEffect(() => {
        setSuccessMessage((prev: any) => ({...prev, staffAndCustomerForgotPassword: true}));
    }, [message])


    return(
        <>
            {(isLoading || forgotPasswordValidating) && <Loader />}
                {(forgotPasswordError && forgotPassword && !forgotPasswordData && successMessage) &&
                    (
                    <>
                            <SuccessMessage 
                            messageTitle="Error occured! Check your network connection."
                            id="failed"
                            name="staffAndCustomerForgotPassword"
                            successMessageShow={successMessage.staffAndCustomerForgotPassword}
                            />
                        </>
                    )
                }
                {
                    (forgotPassword && forgotPasswordData?.code && forgotPasswordData?.code === 200 && successMessage.staffAndCustomerForgotPassword) &&
                    <>
                        <SuccessMessage 
                        messageTitle="An email has been sent to this email address!"
                        name="staffAndCustomerForgotPassword"
                        successMessageShow={successMessage.staffAndCustomerForgotPassword}
                        />
                    </> 
                }

                {
                    (forgotPassword && forgotPasswordData?.code && forgotPasswordData?.code !== 200 && successMessage.staffAndCustomerForgotPassword) &&
                    <>
                            <SuccessMessage 
                            messageTitle="This email address is not registered with us!"
                            id="failed"
                            name="staffAndCustomerForgotPassword"
                            successMessageShow={successMessage.staffAndCustomerForgotPassword}
                            />
                        </>
                }
        </>
    )
}