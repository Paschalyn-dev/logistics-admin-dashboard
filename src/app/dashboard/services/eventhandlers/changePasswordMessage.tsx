'use client'
import Loader from "@/app/dashboard/services/Loader/spinner";
import SuccessMessage from "@/app/dashboard/successmessage";
import { useContext, useEffect, useState } from "react";
import { State_data } from "../../context/context";

export default function ChangePasswordMessage({changePasswordFormDetails, changePasswordLoading, changePasswordValidating, changePasswordError, changePasswordData, message}: any){
    const {successMessage, setSuccessMessage} = useContext(State_data);

    useEffect(() => {
        setSuccessMessage(true);
    }, [message])


    return(
        <>
            {(changePasswordLoading || changePasswordValidating) && <Loader />}
                {(changePasswordError && changePasswordFormDetails && !changePasswordData && successMessage.changePassword) &&
                    (
                    <>
                            <SuccessMessage 
                            messageTitle="Error occured! Check your network connection."
                            id="failed"
                            name="changePassword"
                            successMessageShow={successMessage.changePassword}
                            />
                        </>
                    )
                }
                {
                    (changePasswordFormDetails && changePasswordData?.code && changePasswordData?.code === 200 && successMessage.changePassword) &&
                    <>
                        <SuccessMessage 
                        messageTitle="You have successfully changed your password!"
                        name="changePassword"
                        successMessageShow={successMessage.changePassword}
                        />
                    </> 
                }

                {
                    (changePasswordFormDetails && changePasswordData?.code && changePasswordData?.code !== 200 && successMessage.changePassword) &&
                        <>
                            <SuccessMessage 
                            messageTitle="Sorry password cannot be changed!"
                            id="failed"
                            name="changePassword"
                            successMessageShow={successMessage.changePassword}
                            />
                        </>
                }
        </>
    )
}