'use client'
import SuccessMessage from "../../successmessage";
import { BUTTON } from "../../services/types";


export default function ButtonAndMessage({buttonName, title, handleClick, successmessage, failedmessage, mutate, errormessage, name, code, error}: BUTTON) {
    return(
        <div>
            {title && code === 200 && <SuccessMessage successMessageShow={title} messageTitle={successmessage} name={name} />}
            {title && code !== 200 && <SuccessMessage successMessageShow={title} id="failed" messageTitle={failedmessage} name={name} />}
            {title && error && <SuccessMessage  successMessageShow={title} id="failed" messageTitle={errormessage} name={name}/>}
            <button 
            onClick={() => handleClick()}
            className="cursor-pointer font-bold text-gray-50 bg-green-600/80 shadow-lg px-7 py-2 rounded-3xl select-none
            active:translate-y-1 active:[box-shadow:0_0px_0_0_#16a34a,0_0px_0_0_#16a34a]
            active:border-b-[0px]
            transition-all duration-150 [box-shadow:0_5px_0_0_#16a34a,0_2px_0_0_#16a34a]
            border-[1px] border-green-600">
                {buttonName}
            </button>
        </div>
    )
}