'use client'
import { useState } from "react";
import { HANDLESUCCESSMESSAGETYPE } from "../../services/types";
import SuccessMessage from "../../successmessage";

export default function HandleSuccessMessage({code, error, title, successmessage, failedmessage, name, errormessage, id}: HANDLESUCCESSMESSAGETYPE){

    return(
        <div>
        {title && code === 200 && <SuccessMessage successMessageShow={title} messageTitle={successmessage} name={name} />}
        {title && code !== 200 && <SuccessMessage successMessageShow={title} id="failed" messageTitle={failedmessage} name={name} />}
        {title && error && <SuccessMessage successMessageShow={title} id="failed" messageTitle={errormessage} name={name} />}
        </div>
    )
}