'use client'
import { useState, useContext } from "react";
import SuccessMessage from "../../successmessage";
import { State_data } from "../../context/context";

type Btn = {
    value?: any;
    message?: string;
    text: string;
}

export default function DoneStatesBtn({value, text, message}: Btn){
    const {successMessage, setSuccessMessage} = useContext(State_data);


    return(
        <>
        {successMessage.saveLocations && <SuccessMessage name="saveLocations" successMessageShow={successMessage.saveLocations} messageTitle={message} />}

        <div className="flex mt-2 justify-start w-full items-center">
       <div className="font-bold w-full laptop:text-base desktop:text-lg phone:text-sm text-gray-50 w-fit flex justify-start items-center">
                <button 
                className="cursor-pointer bg-green-600/80 shadow-lg px-7 py-2 rounded-3xl select-none
                active:translate-y-1 active:[box-shadow:0_0px_0_0_#16a34a,0_0px_0_0_#16a34a]
                active:border-b-[0px]
                transition-all duration-150 [box-shadow:0_5px_0_0_#16a34a,0_2px_0_0_#16a34a]
                border-[1px] border-blue-400">
                    {text}
                </button>
            </div>
         </div>
        </>
    )
}