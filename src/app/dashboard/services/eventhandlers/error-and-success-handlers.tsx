'use client'
import Loader from "@/app/dashboard/services/Loader/spinner";
import SuccessMessage from "@/app/dashboard/successmessage";
import { useContext, useEffect } from "react";
import { State_data } from "../../context/context";


export default function ErrorAndSucccessHandlers({staffAndCustomer, successmessage, failedmessage, error, successName, name, loading, data, code, message}: any){
    const {setSuccessMessage} = useContext(State_data);

    useEffect(() => {
        setSuccessMessage((prev: any) => ({...prev, [name]: true}));
    }, [code])

    return(
        <>
            {(loading) && <Loader />}
                {(error && staffAndCustomer && !data && successName) &&
                    (
                    <>
                            <SuccessMessage 
                            messageTitle="Error occured! Check your network connection."
                            id="failed"
                            name={name}
                            successMessageShow={successName}
                            />
                        </>
                    )
                }
                {
                    (staffAndCustomer && data?.code && data?.code === 200 && successName) &&
                    <>
                        <SuccessMessage 
                        messageTitle={successmessage}
                        name={name}
                        successMessageShow={successName}
                        />
                    </> 
                }

                {
                    (staffAndCustomer && data?.code && data?.data && data?.code !== 200 && successName) &&
                        <>
                            <SuccessMessage 
                            messageTitle={failedmessage}
                            id="failed"
                            name={name}
                            successMessageShow={successName}
                            />
                        </>
                }
        </>
    )
}