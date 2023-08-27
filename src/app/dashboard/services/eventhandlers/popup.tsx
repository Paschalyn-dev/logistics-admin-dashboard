'use client'
import { State_data } from "../../context/context";
import { useContext } from "react";
import DarkFill from "../../darkfill";
import { useAllParcelsFetcher, useDeleteParcels, useSearchParcelRange } from "../../services/swr-functions/customer-swr";

type POPUP_TYPE = {
    closeFill: any;
    popupShow: boolean;
    id: number;
    text: string;
}

export default function Popup({closeFill, popupShow, id, text}: POPUP_TYPE){
    const {parcelRange} = useContext<any | string>(State_data);
    const {parcelRangeMutate} = useSearchParcelRange(parcelRange);
    const {parcelAllMutate} = useAllParcelsFetcher();

    const handleDelete = () => {
        const {} = useDeleteParcels(id);
        parcelAllMutate();
        parcelRangeMutate();
    }   
    
    return (
        <>
            <DarkFill />
            <>
                <div className={ popupShow ? "fixed z-30 animate__animated animate__bounceIn flex justify-center items-center phone:h-screen laptop:h-screen top-0 bottom-0 phone:-ml-10  laptop:w-3/4 after-tablet:w-10/12 after-tablet:ml-5 laptop:ml-0 tablet:w-full phone:w-full" : 
                "animate__animated animate__zoomOut h-0 hidden"}>
                    <div className="relative animate__animated text-center animate__headShake z-30 bg-gray-50 p-6 phone:h-fit tablet:h-3/6 mt-10 phone:w-2/4 laptop:w-3/6 rounded-lg">
                        <i id="bigger" className="icon ion-md-help px-6 py-1 border-solid border-4 border-gray-300 rounded-full"></i>
                        <h1 className="laptop:text-4xl phone:text-2xl font-bold pt-5">Delete {text}?</h1>
                        <p>This action cannot be undone. Do you still wish to continue?</p>
                        <div className="flex justify-center gap-2 items-center w-full my-4">
                            <button onClick={handleDelete} className="bg-green-500 border-4 hover:bg-green-600 py-2 text-gray-50 px-3 text-lg rounded-lg">Yes</button>
                            <button onClick={closeFill} className="bg-red-500 border-4 hover:bg-red-600 py-2 text-gray-50 px-3 rounded-lg text-lg">No</button>
                        </div>
                    </div>   
                </div>
            </>    
        </>
    )}