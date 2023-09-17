'use client'

import { useState, useContext, useEffect } from "react"
import { State_data } from "../../context/context";
import Button from "../../button";
import { usePostDistancePricing } from "../../services/swr-functions/staff-swr";
import HandleSuccessMessage from "./handlesuccessmessage";

type CALCULATOR = {
    showCalculator: boolean;
    handleShowCalculator: any;
}

export default function AddItem({showCalculator, handleShowCalculator}: CALCULATOR){
    const {globalPriceList, setGlobalPriceList} = useContext<any | number[]>(State_data);
    
    const [checkQuantity, setCheckQuantity] = useState<any>({
        from: 0, 
        to: 0, 
        amount: 0 });
        const [showPriceList, setShowPriceList] = useState<boolean>(false);
        const {successMessage, setSuccessMessage} = useContext(State_data)
        const {postDistancePriceData,
            postDistancePriceError, 
            postDistancePriceIsLoading,
            postDistancePriceIsValidating,
            postDistancePriceMutate} = usePostDistancePricing(globalPriceList[globalPriceList?.length - 1]);
            
            function handleQuantity(event:any){
                const {name, value} = event.target;
                if(name === 'to' || name === "amount"){
                    setCheckQuantity((prev:any) => ({...prev, [name]: value.toString()}))
                }
                else{
                    setCheckQuantity((prev:any) => ({...prev, [name]: +value}))
                }
            }
            
            function handleSavePriceList(){
                if(+checkQuantity.from >= +checkQuantity.to){}
                else if(+checkQuantity.from === 0 && +checkQuantity.to === 0 && +checkQuantity.amount === 0){}
                else if(+checkQuantity.from <= +globalPriceList[globalPriceList.length - 1]?.to){}     
                else{
        setGlobalPriceList((prev: number[]) => [...prev, {...checkQuantity}].sort((a:any, b:any) => a.from  - b.from));
        setSuccessMessage((prev: any) => ({...prev, deliveryPrice: true}))
    }
}

    const handleSetPriceList = () => {
        setShowPriceList(true)
    }
    
    useEffect(() => {
        postDistancePriceMutate();
    }, [globalPriceList.length])
    
    return(
        <>
            <head>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
                />
            </head>

            <div>
                { successMessage.deliveryPrice &&
                    <HandleSuccessMessage
                    code={postDistancePriceData?.code}
                    name="deliveryPrice"
                    title={successMessage.deliveryPrice}
                    failedmessage="Sorry, distance cannot be added to the list"
                    error={postDistancePriceError}
                    mutate={postDistancePriceMutate}
                    errormessage="Error occured. Check your network connection."
                    successmessage={`Entry ${globalPriceList[globalPriceList.length - 1]?.from} kilometer - ${globalPriceList[globalPriceList.length - 1]?.to} kilometer at ₦${globalPriceList[globalPriceList.length - 1]?.amount} has been added.`} 
                    />
                }
            { showPriceList &&
            <>
            <div className="flex mt-6 bg-gray-100/50 p-4 text-base gap-2 justify-between w-full items-center">
                    <div>
                        <label htmlFor="from" className="text-gray-500">From (KM)</label>
                        <input min="0" type="number" onChange={handleQuantity} value={checkQuantity.from.toString().replace(/^0+(?!$)/, "")} id="from" name="from" className="rounded-xl my-2 p-3 bg-gray-200/60 w-11/12 animate__animated animate__fadeIn outline-0" />
                    </div>

                    <div>
                        <label htmlFor="to" className="text-gray-500">To (KM)</label>
                        <input min="0" type="number" onChange={handleQuantity} value={checkQuantity.to.toString().replace(/^0+(?!$)/, "")} id="to" name="to" className="rounded-xl my-2 p-3 bg-gray-200/60 w-11/12 animate__animated animate__fadeIn outline-0" />
                    </div>

                    <div>
                        <label htmlFor="amount" className="text-gray-500">Cost (₦)</label>
                        <input min="0" type="number" onChange={handleQuantity} value={checkQuantity.amount.toString().replace(/^0+(?!$)/, "")} id="amount" name="amount" className="rounded-xl my-2 p-3 bg-gray-200/60 w-11/12 animate__animated animate__fadeIn outline-0" />
                    </div>
                </div>

                {
                    +checkQuantity.from > 0 && +checkQuantity.to <= +checkQuantity.from &&
                    <p 
                    className="text-red-500 animate__animated animate__shakeX text-sm ">
                    "Something doesn't look right: <b className="underline decoration-dotted">Start distance</b> must be greater than <b className="underline decoration-dotted">Destination distance</b>."</p>
                }

                {
                    +checkQuantity.from <= globalPriceList[globalPriceList.length - 1]?.to ? 
                    <p 
                    className="text-red-500 animate__animated animate__shakeX text-sm">
                    This Location has already been covered. Please pick another <b className="underline decoration-dotted">Start distance.</b></p>: ""
                }

                <div className="flex phone:text-sm tablet:text-base desktop:text-lg justify-between mt-2">
                        <button
                        onClick={handleSavePriceList}
                        className="py-1 px-3 rounded-2xl bg-blue-500/90 text-gray-50">Save</button>
                        <button
                        onClick={() => setShowPriceList(false)}
                        className="py-1 px-3 rounded-2xl bg-red-500/90 text-gray-50">Cancel</button>
                </div>
            </>
}
            <div className="flex flex-wrap phone:text-sm mb-5 tablet:text-base desktop:text-lg justify-start gap-10 items-center mt-6 font-bold">
                <Button buttonName="Add Item" handleClick={handleSetPriceList} />

                <button onClick={handleShowCalculator}
                 className="text-green-500">
                    Open Calculator
                </button>
            </div>
        </div>
        </>
    )
}