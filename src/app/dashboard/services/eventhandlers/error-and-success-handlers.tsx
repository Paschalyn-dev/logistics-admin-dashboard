'use client'
import Loader from "@/app/dashboard/services/Loader/spinner";
import SuccessMessage from "@/app/dashboard/successmessage";
import { useEffect, useState } from "react";


export default function ErrorAndSucccessHandlers({staffAndCustomer, error, loading, data,  message}: any){
    const [successMessage, setSuccessMessage] = useState<boolean>(false);

    useEffect(() => {
        setSuccessMessage(true);
    }, [message])


    return(
        <>
            {(loading) && <Loader />}
                {(error && staffAndCustomer && !data && successMessage) &&
                    (
                    <>
                            <SuccessMessage 
                            // messageTitle="These login parameters are incorrect!"
                            messageTitle="Error occured! Check your network connection."
                            id="failed"
                            handleShowSuccessMessage={setSuccessMessage}
                            successMessageShow={successMessage}
                            />
                        </>
                    )
                }
                {
                    (staffAndCustomer && data?.code && data?.code === 200 && successMessage) &&
                    <>
                        <SuccessMessage 
                        messageTitle="You are logged in successfully!"
                        handleShowSuccessMessage={setSuccessMessage}
                        successMessageShow={successMessage}
                        />
                    </> 
                }

                {
                    (staffAndCustomer && data?.code && data?.code !== 200 && successMessage) &&
                        <>
                            <SuccessMessage 
                            messageTitle="Your login parameters are incorrect!"
                            id="failed"
                            handleShowSuccessMessage={setSuccessMessage}
                            successMessageShow={successMessage}
                            />
                        </>
                }
        </>
    )
}