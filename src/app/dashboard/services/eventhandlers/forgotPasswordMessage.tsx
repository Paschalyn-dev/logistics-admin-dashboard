'use client'
import Loader from "@/app/dashboard/services/Loader/spinner";
import SuccessMessage from "@/app/dashboard/successmessage";
import { useEffect, useState } from "react";


export default function ForgotPasswordMessage({forgotPassword, forgotPasswordValidating, isLoading, forgotPasswordError, forgotPasswordData,  message}: any){
    const [successMessage, setSuccessMessage] = useState<boolean>(false);

    useEffect(() => {
        setSuccessMessage(true);
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
                            handleShowSuccessMessage={setSuccessMessage}
                            successMessageShow={successMessage}
                            />
                        </>
                    )
                }
                {
                    (forgotPassword && forgotPasswordData?.code && forgotPasswordData?.code === 200 && successMessage) &&
                    <>
                        <SuccessMessage 
                        messageTitle="An email has been sent to this email address!"
                        handleShowSuccessMessage={setSuccessMessage}
                        successMessageShow={successMessage}
                        />
                    </> 
                }

                {
                    (forgotPassword && forgotPasswordData?.code && forgotPasswordData?.code !== 200 && successMessage) &&
                        <>
                            <SuccessMessage 
                            messageTitle="This email address is not registered with us!"
                            id="failed"
                            handleShowSuccessMessage={setSuccessMessage}
                            successMessageShow={successMessage}
                            />
                        </>
                }
        </>
    )
}