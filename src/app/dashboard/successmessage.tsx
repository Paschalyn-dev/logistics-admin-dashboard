'use client'
import {useEffect, useRef} from "react";
import { useContext } from "react";
import { State_data } from "./context/context";

type SuccessType = {
    messageTitle: string | undefined;
    successMessageShow: boolean;
    id?: string;
    name: any;
    top?: number;
}

export default function SuccessMessage({messageTitle, top, id, name, successMessageShow}: SuccessType){
    const ref = useRef<null | number | any>(null);
    const {setSuccessMessage} = useContext(State_data);
    useEffect(() => {
        const timer = setTimeout(() => setSuccessMessage((prev: any) => ({...prev, [name]: false})), 6000);
        return() => clearTimeout(timer);
    }, [successMessageShow === true]);

    var width = 0;  

    useEffect(() => {
        const bar = ref.current;
		var idVar = setInterval(change, 100);  
		function change() {  
            if(width <= 100){  
            width+=2;        
            bar.style.width = width + '%';
            }       
		}
    return() => clearInterval(idVar);
},[width]);


    return(
    // <div className="h-screen w-fit right-5 z-20 top-20 fixed flex flex-col justify-between items-start">
        <div className={id === 'failed' ? 
        `animate__animated animate__slideInRight z-20 flex flex-col bg-red-500 shadow-sm laptop:text-lg phone:text-base h-16 fixed justify-center items-center text-white rounded-xl px-2 py-3 right-5 top-${top || "24"}`
        : `animate__animated animate__slideInRight z-20 flex flex-col bg-green-600 shadow-sm laptop:text-lg phone:text-base h-16 fixed justify-center items-center text-white rounded-xl px-2 py-3 right-5 top-${top || "24"}`}>
            <div className="flex px-3 justify-between gap-5 items-center">
                <span className={ id === "failed" ? "rounded-full text-sm bg-gray-50 text-red-500 px-3 py-1 font-extrabold" : "rounded-full text-sm bg-gray-50 text-green-600 px-3 py-1 font-extrabold"}>   
                {                 
                        id !== "failed" ? <i className="icon ion-md-checkmark"></i> : 
                        <i className="icon ion-md-close"></i>
                }                
                </span>
                <p>{messageTitle}</p>
                <span onClick={() => setSuccessMessage((prev: any) => ({...prev, [name]: false}))} className="text-gray-300 cursor-pointer hover:text-gray-50"><i className="icon ion-md-close"></i></span>
            </div>
            <div ref={ref} className="bg-gray-300 shadow-lg h-1 -bottom-5 relative"></div>
        </div>
    // </div>
    )
}