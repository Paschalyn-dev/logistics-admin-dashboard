'use client'

import { useState, useContext, useEffect } from "react"
import { State_data } from "../../context/context";
import Button from "../../button";
import { usePostDistancePricing } from "../../services/swr-functions/staff-swr";
import HandleSuccessMessage from "./handlesuccessmessage";
import { staffAPIURL } from "../../services/api-url/staff-api-url";
import { Password } from "../../formik/password";
import ErrorAndSucccessHandlers from "../../services/eventhandlers/error-and-success-handlers";

type CALCULATOR = {
    showCalculator: boolean;
    handleShowCalculator: any;
    mutate: any;
}

export default function AddItem({showCalculator, mutate, handleShowCalculator}: CALCULATOR){
    const {globalPriceList, successMessage} = useContext<any | number[]>(State_data);
    const [checkQuantity, setCheckQuantity] = useState<any>({
        from: 0, 
        to: 0, 
        amount: 0 
    });
    const [showPriceList, setShowPriceList] = useState<boolean>(false);
    const [priceAndLocations, setPriceAndLocations] = useState<any>({
        priceInfo: "",
        priceResult: "",
        code: ""
    });

    async function handleShowPriceRangeData(distancePrice: any){
        const response = await fetch(staffAPIURL.postDistancePricing, {
            method: 'POST',
            body: JSON.stringify(distancePrice),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJyb2xlIjoic3VwZXJhZG1pbiIsImFsaWFzIjoiY2FrZW51cyJ9LCJpYXQiOjE2OTExODgzNDZ9.73G4_gAI_mexLVUYQOkaJN7XCaIj0iHqj5b2g9yYIa8"
            },
        });
        const data = await response.json();
        setPriceAndLocations((prev: any) => ({...prev, priceResult: data}));
        mutate();
    }

    useEffect(() => {
        if(priceAndLocations?.priceInfo !== ""){
            handleShowPriceRangeData(priceAndLocations.priceInfo);
        }
    }, [priceAndLocations?.code]);
    
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
            setPriceAndLocations((prev: any) => ({...prev, code: Password(), priceInfo: checkQuantity, priceResult: ""}));
        }
    }
    
    const handleSetPriceList = () => {
        setShowPriceList(true);
    }

    let entries = Object.entries(globalPriceList);
    const priceRangeIncludes = entries.filter((priceRange: any) =>  +checkQuantity?.from === priceRange[1]?.from || +checkQuantity?.to === priceRange[1]?.to)

    return(
        <div>
            <div>
                { priceAndLocations.priceInfo !== "" && priceAndLocations.priceResult !== "" &&
                    <ErrorAndSucccessHandlers
                    name="deliveryPrice"
                    successName={successMessage.deliveryPrice}
                    message={priceAndLocations?.priceResult?.code} 
                    code={priceAndLocations?.code}
                    successmessage={`Entry ${checkQuantity?.from} km - ${checkQuantity?.to} km at ₦${checkQuantity?.amount} has been added.`} 
                    failedmessage="Sorry, distance cannot be added to the list."
                    staffAndCustomer={priceAndLocations?.priceResult}
                    error={priceAndLocations?.priceResult?.code !== 200}
                    loading={priceAndLocations?.priceResult === "" && priceAndLocations?.priceInfo !== "" && priceAndLocations?.code !== ""}
                    data={priceAndLocations?.priceResult}
                    />
                }
            { showPriceList &&
            <div>
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
                    priceRangeIncludes?.length ? 
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
            </div>
}
            <div className="flex flex-wrap phone:text-sm mb-5 tablet:text-base desktop:text-lg justify-start gap-10 items-center mt-6 font-bold">
                <Button buttonName="Add Item" handleClick={handleSetPriceList} />
                <button onClick={handleShowCalculator}
                 className="text-green-500">
                    Open Calculator
                </button>
            </div>
        </div>
        </div>
    )
}