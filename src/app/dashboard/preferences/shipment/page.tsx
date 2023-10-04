'use client'
import Holder from "../../holder";
import Section from "../../section";
import PreferencesNav from "../preferencesnav";
import States from "../../states";
import { useContext, useState, useEffect } from "react";
import { useReducer } from "react";
import { State_data } from "../../context/context";
import AddItem from "./additembtn";
import OpenCalculator from "./opencalculator";
import ToggleButton from "./toggleButton";
import Hero from "../hero";
import SubHeading from "../website/subheading";
import ButtonAndMessage from "./buttonandmessage";
import { useBusiness, useGetBusiness } from "../../services/swr-functions/customer-swr";
import { useFetchLocations, useGetDistancePricing } from "../../services/swr-functions/staff-swr";
import SkeletonLoading from "../../services/eventhandlers/skeleton-loading";
import { staffAPIURL } from "../../services/api-url/staff-api-url";
import { authorizationKey } from "../../services/staff-api/api";
import { Password } from "../../formik/password";
import ErrorAndSucccessHandlers from "../../services/eventhandlers/error-and-success-handlers";

type CURRENTSTATES = {
    showPriceRange: boolean,
    showCalculator: boolean,
    showStates: boolean,
    payInstantly: boolean;
    PayOnDelivery: boolean;
    PayOnPickup: boolean;
}
export default function ShipmentPreferences(){   
const {getBusinessData, getBusinessError, getBusinessIsLoading, getBusinessIsValidating, getBusinessMutate} = useGetBusiness();
const payment = getBusinessData?.data?.paymentMethods;
const initialState: CURRENTSTATES = {
    showPriceRange: true,
    showCalculator: false,
    showStates: false,
    payInstantly: payment?.includes('PAY_NOW') ? true : false,
    PayOnDelivery: payment?.includes('PAY_ON_DELIVERY') ? true : false,
    PayOnPickup: payment?.includes('PAY_ON_PICKUP') ? true : false,
}
useEffect(() => {
    getBusinessMutate();
}, [])

const reducer = (state: any, action: any) => {
    switch(action.type){
        case "SHOWPRICERANGE":
            return {...state, showPriceRange: !state.showPriceRange};
        
        case "SHOWSTATES":
            return {...state, showStates: !state.showStates};
        
        case "SHOWCALCULATOR":
            return {...state, showCalculator: !state.showCalculator};

        case "PAYINSTANTLY":
            return {...state, payInstantly: !state.payInstantly};                

        case "PAYONDELIVERY":
            return {...state, payOnDelivery: !state.payOnDelivery};   
                
        case "PAYONPICKUP":
            return {...state, payOnPickup: !state.payOnPickup};                   
        default:
            return state;
    }
}

    const {globaldata, setGlobalPriceList, setGlobalData, setSuccessMessage, successMessage} = useContext<any | string>(State_data);
    const [state, dispatch] = useReducer(reducer, initialState);
    let paymentMethods: string[] = [];
    const [priceAndLocationsDelete, setPriceAndLocationsDelete] = useState<any>({
        priceInfo: "",
        priceResult: "",
        priceCode: "",
        locationsInfo: "",
        locationsResult: "",
        locationsDeleteInfo: "",
        locationsDeleteResult: "",
        locationsDeleteCode: "",
    })
    const handleShowPriceRange = () => {
       dispatch({type: "SHOWPRICERANGE", payload: !initialState.showPriceRange})
    }

    const handlePaymentOptions2 = () => {
        setSuccessMessage((prev: any) => ({...prev, paymentOptions: true}))
    }

    const handleShowStates = () => {
        dispatch({type: "SHOWSTATES", payload: !initialState.showStates})
    } 

    const handleShowCalculator = () => {
        dispatch({type: "SHOWCALCULATOR", payload: !initialState.showCalculator})
    }

    const handlePayInstantly = () => {
        dispatch({type: "PAYINSTANTLY", payload: !initialState.payInstantly})
    }
    
    const handlePayOnDelivery = () => {
        dispatch({type: "PAYONDELIVERY", payload: !initialState.PayOnDelivery})
    }
    
    const handlePayOnPickup = () => {
        dispatch({type: "PAYONPICKUP", payload: !initialState.PayOnPickup})
    }

    const handleSaveStates = () => {
        setPriceAndLocationsDelete((prev: any) => ({...prev, locationsInfo: [...globaldata], locationsCode: Password()}))
        setSuccessMessage((prev: any) => ({...prev, deliveryLocations: true}))
    }

    if(state.payInstantly) paymentMethods.push('PAY_NOW');
    if(state.payOnDelivery) paymentMethods.push('PAY_ON_DELIVERY');
    if(state.payOnPickup) paymentMethods.push('PAY_ON_PICKUP');

    const {businessChangeData, businessChangeError, businessChangeIsLoading, businessChangeIsValidating, businessChangeMutate} = useBusiness(paymentMethods);
    const {getLocationsData, getLocationsError, getLocationsIsLoading, getLocationsIsValidating, getLocationsMutate} = useFetchLocations();
    const {getDistancePriceData, getDistancePriceError, getDistancePriceIsLoading, getDistancePriceIsValidating, getDistancePriceMutate} = useGetDistancePricing();

    async function handleAddStates(locations: any){
        const response = await fetch(staffAPIURL.locations, {
            method: 'PUT', 
            body: JSON.stringify(locations),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJyb2xlIjoic3VwZXJhZG1pbiIsImFsaWFzIjoiY2FrZW51cyJ9LCJpYXQiOjE2OTExODgzNDZ9.73G4_gAI_mexLVUYQOkaJN7XCaIj0iHqj5b2g9yYIa8"
            },
        });
        const data = await response.json();
        setPriceAndLocationsDelete((prev: any) => ({...prev, locationsResult: data}));
        getLocationsMutate();
    }

    async function handleLocationsDelete(id: any){
        const response = await fetch(staffAPIURL.deleteLocations(id), {
            method: 'DELETE',
            headers: {
                'Authorization': authorizationKey
            }
        });
        const data = await response.json();
        setPriceAndLocationsDelete((prev: any) => ({...prev, locationsDeleteResult: data}));
        getLocationsMutate();
    }

    async function handleDeleteDistancePricing(id: number){
        const response = await fetch(staffAPIURL.deleteDistancePricing(id), {
            method: 'DELETE',
            headers: {
                'Authorization': authorizationKey
            }
        });
        const data = await response.json();
        setPriceAndLocationsDelete((prev: any) => ({...prev, priceResult: data}));
        getDistancePriceMutate();
    }

    useEffect(() => {
        if(priceAndLocationsDelete.locationsInfo !== ""){
            handleAddStates(priceAndLocationsDelete.locationsInfo)
        }
    }, [priceAndLocationsDelete?.locationsCode]);

    useEffect(() => {
        if(priceAndLocationsDelete.locationsDeleteInfo !== ""){
            handleLocationsDelete(priceAndLocationsDelete.locationsDeleteInfo)
        }
    }, [priceAndLocationsDelete?.locationsDeleteCode]);

    useEffect(() => {
        if(priceAndLocationsDelete.priceInfo !== ""){
            handleDeleteDistancePricing(priceAndLocationsDelete.priceInfo)
        }
    }, [priceAndLocationsDelete.priceCode]);

    const filteredPriceRange = getDistancePriceData?.data?.filter((price: any) => price?.from !== null && price?.to !== null).sort((a: any, b: any) => a.from - b.from);
    const highestPriceRangeTo = getDistancePriceData?.data?.filter((price: any) => price?.from !== null && price?.to !== null)?.sort((a: any, b: any) => a.to - b.to);
    useEffect(() => {
        setGlobalPriceList((prev: any) => ({...prev, ...filteredPriceRange}));
    },[filteredPriceRange?.length]);

    console.log(globaldata)

    return(
        <Holder>
            {
                businessChangeIsLoading || businessChangeIsValidating &&
                <SkeletonLoading title="payment methods" loadingSearching="Loading" />
            }
            {
                getLocationsIsValidating || getLocationsIsLoading  || getLocationsIsLoading || getLocationsIsValidating &&
                <SkeletonLoading title="pickup and delivery locations" loadingSearching="Loading" />
            }
            {
                getDistancePriceIsLoading && 
                <SkeletonLoading title="distance price" loadingSearching="Loading" />
            }
            {  priceAndLocationsDelete.priceInfo !== "" && priceAndLocationsDelete.priceResult !== "" &&
                <ErrorAndSucccessHandlers
                name="deliveryPriceDelete"
                successName={successMessage.deliveryPriceDelete}
                message={priceAndLocationsDelete?.priceResult?.code} 
                code={priceAndLocationsDelete?.code}
                successmessage="Distance entry successfully deleted"
                failedmessage="Sorry, cannot delete distance parameters"
                staffAndCustomer={priceAndLocationsDelete?.priceResult}
                error={priceAndLocationsDelete?.priceResult?.code !== 200}
                loading={priceAndLocationsDelete?.priceResult === "" && priceAndLocationsDelete?.priceInfo !== "" && priceAndLocationsDelete?.priceCode !== ""}
                data={priceAndLocationsDelete?.priceResult}
                />
            }
            <PreferencesNav />
            <Section>
             <Hero icon="icon ion-md-cube" heading="Shipment Preferences" description="Customize your shipment preferences by mapping Parcel size against Distance and Price">
                <div className="text-left">
                    <SubHeading subheading="Payment Options" />
                    <p className="text-base mt-2 text-gray-500 font-thin">Select your Accepted Payment options.</p>
                </div>
                <div className="my-6">
                    <ToggleButton onOff={state.payInstantly} handleOnOff={handlePayInstantly} title="Pay Instantly" />
                    <ToggleButton onOff={state.payOnDelivery} handleOnOff={handlePayOnDelivery} title="Pay On Delivery" />
                    <ToggleButton onOff={state.payOnPickup} handleOnOff={handlePayOnPickup} title="Pay On Pickup" />
                </div>

                <div>
                    <ButtonAndMessage
                    buttonName="Save"
                    name="paymentOptions"
                    title={successMessage.paymentOptions}
                    handleClick={handlePaymentOptions2}
                    mutate={businessChangeMutate}
                    code={businessChangeData?.code}
                    error={businessChangeError}
                    successmessage="You have successfully updated your payment method!"
                    errormessage="Error occured. Check network connection."
                    failedmessage="Sorry, payment methods cannot be updated!"
                    />
                </div>
                <div className="mt-20 text-left">
                    <SubHeading subheading="Pickup & Delivery Locations" />
                    <p className="text-base mt-2 text-gray-500 font-thin">Enter ALL the locations your business delivers to.</p>

                    {state.showStates && <States show={state.showStates} handleShow={handleShowStates} />}
                    <div>
                        <span className="flex justify-between mb-2 items-center">
                            <button onClick={handleShowStates} title="Select States" className="text-green-400 my-4 font-bold">Select States</button>
                            <button onClick={() => setGlobalData([])} className="text-red-500 text-xs font-bold">CLEAR</button>
                        </span>
                        
                        <div className="mb-3 rounded-lg bg-gray-200 h-fit w-full p-5">
                            <div className="animate__animated animate__bounceInDown flex justify-start items-center gap-1 flex-wrap">
                                {globaldata?.length > 0 && globaldata?.map((data: any, i:number) => {
                                        return(
                                            <div key={i} className="flex bg-gray-50 py-2 px-3 phone:text-xs laptop:text-sm w-fit my-2 rounded-full justify-center items-center gap-5">
                                            <p>{data}</p>
                                            <span onClick={() => setPriceAndLocationsDelete((prev: any) => ({...prev, locationsDeleteInfo: data?.id, locationsDeleteCode: Password()}))} 
                                            className="text-red-500 cursor-pointer font-extrabold">
                                                <i title="Delete" className="icon ion-md-close"></i>
                                            </span>
                                        </div>
                                        )
                                    })
                                }
                            </div>
                            <p className="relative text-xs text-right bottom-0 right-0">{globaldata?.length} {globaldata?.length > 1 ? "entries" : "entry"}</p>
                        </div>
                        <ButtonAndMessage 
                        error={priceAndLocationsDelete?.locationsResult === "" && priceAndLocationsDelete?.locationsInfo !== "" }
                        title={successMessage.deliveryLocations}                  
                        name="deliveryLocations"
                        handleClick={handleSaveStates}
                        successmessage="Your locations has been updated!" 
                        code={priceAndLocationsDelete?.locationsResult?.code}
                        failedmessage="Sorry, locations cannot be updated!"
                        errormessage="Error occured, Check your network!"
                        buttonName="Save Locations"
                         />
                    </div>
                </div>


                <div className="mt-20 text-left">
                     <SubHeading subheading="Price List"/>
                     <div className="py-2 font-thin my-2 px-3 bg-red-100 rounded-lg text-red-600">
                        <p>
                        Please note that your customers will not be able to make shipments outside the <b className="font-bold underline">maximum kilometre distance</b> you specify.
                        </p>
                     </div>
                </div>
                <div>   
                    <span className="flex mb-1 justify-start gap-2 items-center text-blue-500 ">
                       <div 
                       onClick={handleShowPriceRange} 
                       className="rounded-full border-2 text-xs border-blue-500 px-1"> 
                        { state.showPriceRange ? 
                            <i className="icon ion-md-remove"></i> :
                            <i className="icon ion-md-add"></i>
                        }
                        </div>
                        <h1 className="my-2 text-lg">All Entries ({filteredPriceRange?.length})</h1>
                    </span>
                    <h1 className="font-bold text-normal">Your business covers from {filteredPriceRange?.length ? filteredPriceRange[0]?.from  : "0"}km to {highestPriceRangeTo?.length ? highestPriceRangeTo[highestPriceRangeTo?.length - 1]?.to : "0"}km.</h1>
                    <div className="mb-3">
                   { state.showPriceRange &&
                    <div className="w-full flex-wrap my-4 h-fit flex justify-start gap-2 items-center">
                        {
                            filteredPriceRange?.length > 0 && filteredPriceRange?.map((price: any, mainindex:number) => {
                               return(
                                <div key={mainindex} className="flex animate__animated animate__headShake justify-start rounded-3xl items-center gap-3 shadow-sm p-3 bg-white">
                                    <p>{price?.from || "0"}km - {price?.to || "0"}km @  <b>₦{price?.amount || "0"}</b></p>
                                    <span
                                     onClick={() => {
                                        setPriceAndLocationsDelete((prev: any) => ({...prev, priceCode: Password(), priceInfo: price?.id, priceResult: ""}))
                                    }}
                                     className="rounded-full text-gray-50 px-1 cursor-pointer w-5 text-center text-sm bg-red-500/90"><i className="icon ion-md-close"></i></span>
                                </div>
                            )})
                        }
                    </div>
                   }
                   </div>
                    <AddItem showCalculator={state.showCalculator} mutate={getDistancePriceMutate()} handleShowCalculator={handleShowCalculator} />
                    {state.showCalculator && <OpenCalculator handleNoShow={handleShowCalculator} />}
                </div>
             </Hero>
            </Section>
        </Holder>
    )
}