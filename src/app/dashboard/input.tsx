'use client'
import { useState, useEffect, useContext } from "react";
import SuccessMessage from "./successmessage";
import Link from "next/link";
import { State_data } from "./context/context";

type Btn = {
    phonetext?: string;
    laptoptext?:string;
    placeholder?: string;
    handleChange?: any;
    link?: string;
    searchInput?: string;
    name?: string;
    message?: string;
    handleClick?: any;
    justify?: string;
    mt?: number;
}

export default function Input({phonetext, handleClick, mt, justify, laptoptext, placeholder, name, link, message, handleChange, searchInput}: Btn){
    const [windowWidth, setWindowWidth]= useState<number>(0);
    const {successMessage, setSuccessMessage} = useContext(State_data);

    useEffect(function onFirstMount() {
        function checkWidth(){
          setWindowWidth(window.innerWidth);
        }
        window.addEventListener("resize", checkWidth);
        return () => window.removeEventListener('resize', checkWidth);
    }, []);

    return(
        <>
        {successMessage.input && <SuccessMessage successMessageShow={successMessage.input} name="input" messageTitle={message} />}

        <div className={`flex mt-${mt === 0 ?  mt : 5} justify-${justify || 'start'} w-full gap-2 items-center`}>
        { (phonetext || laptoptext) && 
         <div className="font-bold w-fit laptop:text-base desktop:text-lg phone:text-sm text-gray-50 flex justify-start items-center">
              { link && <Link href={link} 
                className="cursor-pointer bg-green-600/80 shadow-lg px-7 py-2 rounded-3xl select-none
                active:translate-y-1 active:[box-shadow:0_0px_0_0_#16a34a,0_0px_0_0_#16a34a]
                active:border-b-[0px]
                transition-all duration-150 [box-shadow:0_5px_0_0_#16a34a,0_2px_0_0_#16a34a]
                border-[1px] border-green-600">
                    {windowWidth <= 1025 ? phonetext : laptoptext}
                </Link>}
            </div>
            }

            { name &&
                <div className="flex items-center bg-gray-200 gap-3 rounded-xl w-fit justify-start p-3">
                    <i id="icon" className="icon ion-md-search"></i>
                    <input name={name} type="text" onClick={handleClick} onChange={handleChange} value={searchInput} className="text-green-700 bg-gray-200 outline-0 h-fit w-full" placeholder={placeholder} />
                </div>
            }
        </div>
        </>
    )
}