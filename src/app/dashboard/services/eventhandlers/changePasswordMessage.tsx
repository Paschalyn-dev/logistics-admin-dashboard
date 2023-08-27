'use client'
import Loader from "@/app/dashboard/services/Loader/spinner";
import SuccessMessage from "@/app/dashboard/successmessage";
import { useEffect, useState } from "react";

export default function ChangePasswordMessage({changePasswordFormDetails, changePasswordLoading, changePasswordValidating, changePasswordError, changePasswordData, message}: any){
    const [successMessage, setSuccessMessage] = useState<boolean>(false);

    useEffect(() => {
        setSuccessMessage(true);
    }, [message])


    return(
        <>
            {(changePasswordLoading || changePasswordValidating) && <Loader />}
                {(changePasswordError && changePasswordFormDetails && !changePasswordData && successMessage) &&
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
                    (changePasswordFormDetails && changePasswordData?.code && changePasswordData?.code === 200 && successMessage) &&
                    <>
                        <SuccessMessage 
                        messageTitle="You have successfully changed your password!"
                        handleShowSuccessMessage={setSuccessMessage}
                        successMessageShow={successMessage}
                        />
                    </> 
                }

                {
                    (changePasswordFormDetails && changePasswordData?.code && changePasswordData?.code !== 200 && successMessage) &&
                        <>
                            <SuccessMessage 
                            messageTitle="Sorry password cannot be changed!"
                            id="failed"
                            handleShowSuccessMessage={setSuccessMessage}
                            successMessageShow={successMessage}
                            />
                        </>
                }
        </>
    )
}