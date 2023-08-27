import { useState } from "react";
import SuccessMessage from "../../successmessage";
import { BUTTON } from "../../services/types";



export default function ButtonAndMessage({buttonName, mutate, id, successmessage, failedmessage, errormessage, code, error, handleClick}: BUTTON) {
    const [successMessage, setSuccessMessage] = useState<boolean>(false);
    
    const handleMyClick = () => {
        setSuccessMessage(true)
        mutate();
        // handleClick
    }

    return(
        <>
        {successMessage && code === 200 && <SuccessMessage successMessageShow={successMessage} handleShowSuccessMessage={setSuccessMessage} id={id} messageTitle={successmessage} />}
        {successMessage && code !== 200 && <SuccessMessage successMessageShow={successMessage} handleShowSuccessMessage={setSuccessMessage} id="failed" messageTitle={failedmessage} />}
        {successMessage && error && <SuccessMessage successMessageShow={successMessage} handleShowSuccessMessage={setSuccessMessage} id="failed" messageTitle={errormessage} />}
        <button 
        onClick={handleMyClick}
        className="cursor-pointer font-bold text-gray-50 bg-green-600/80 shadow-lg px-7 py-2 rounded-3xl select-none
        active:translate-y-1 active:[box-shadow:0_0px_0_0_#16a34a,0_0px_0_0_#16a34a]
        active:border-b-[0px]
        transition-all duration-150 [box-shadow:0_5px_0_0_#16a34a,0_2px_0_0_#16a34a]
        border-[1px] border-green-600">
            {buttonName}
        </button>
        </>
    )
}