'use client'
import { useState } from "react";
import { HANDLESUCCESSMESSAGETYPE } from "../../services/types";
import SuccessMessage from "../../successmessage";

export default function HandleSuccessMessage({code, error, successMessage, setSuccessMessage, successmessage, failedmessage, errormessage, id}: HANDLESUCCESSMESSAGETYPE){
    // const [successMessage, setSuccessMessage] = useState<boolean>(false);

    return(
        <div>
        {successMessage && code === 200 && <SuccessMessage successMessageShow={successMessage} handleShowSuccessMessage={setSuccessMessage} id={id} messageTitle={successmessage} />}
        {successMessage && code !== 200 && <SuccessMessage successMessageShow={successMessage} handleShowSuccessMessage={setSuccessMessage} id="failed" messageTitle={failedmessage} />}
        {successMessage && error && <SuccessMessage successMessageShow={successMessage} handleShowSuccessMessage={setSuccessMessage} id="failed" messageTitle={errormessage} />}
        </div>
    )
}