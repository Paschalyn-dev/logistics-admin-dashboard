'use client'
import Loader from "@/app/dashboard/services/Loader/spinner";
import SuccessMessage from "@/app/dashboard/successmessage";
import { useContext, useEffect } from "react";
import { State_data } from "../../context/context";


export default function ErrorAndSucccessHandlers({staffAndCustomer, error, loading, data,  message}: any){
    const {successMessage, setSuccessMessage} = useContext(State_data);

    useEffect(() => {
        setSuccessMessage((prev: any) => ({...prev, staffAndCustomerlogin: true}));
    }, [message])


    return(
        <>
            {(loading) && <Loader />}
                {(error && staffAndCustomer && !data && successMessage) &&
                    (
                    <>
                            <SuccessMessage 
                            messageTitle="Error occured! Check your network connection."
                            id="failed"
                            name="staffAndCustomerlogin"
                            successMessageShow={successMessage.staffAndCustomerlogin}
                            />
                        </>
                    )
                }
                {
                    (staffAndCustomer && data?.code && data?.code === 200 && successMessage.staffAndCustomerlogin) &&
                    <>
                        <SuccessMessage 
                        messageTitle="You are logged in successfully!"
                        name="staffAndCustomerlogin"
                        successMessageShow={successMessage.staffAndCustomerlogin}
                        />
                    </> 
                }

                {
                    (staffAndCustomer && data?.code && data?.code !== 200 && successMessage.staffAndCustomerlogin) &&
                        <>
                            <SuccessMessage 
                            messageTitle="Your login parameters are incorrect!"
                            id="failed"
                            name="staffAndCustomerlogin"
                            successMessageShow={successMessage.staffAndCustomerlogin}
                            />
                        </>
                }
        </>
    )
}