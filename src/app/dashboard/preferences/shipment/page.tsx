'use client'
import Holder from "../../holder";
import Input from "../../input";
import Section from "../../section";
import PreferencesNav from "../preferencesnav";
import States from "../../states";
import { useContext, useEffect } from "react";
import { useReducer } from "react";
import { State_data } from "../../context/context";
import AddItem from "./additembtn";
import OpenCalculator from "./opencalculator";
import ToggleButton from "./toggleButton";
import Hero from "../hero";
import SubHeading from "../website/subheading";
import Button from "../../button";
import ButtonAndMessage from "./buttonandmessage";
import { useBusiness } from "../../services/swr-functions/customer-swr";
import { useFetchLocations, useLocations, usePostDistancePricing } from "../../services/swr-functions/staff-swr";
import SkeletonLoading from "../../services/eventhandlers/skeleton-loading";
import HandleSuccessMessage from "./handlesuccessmessage";

type CURRENTSTATES = {
    showPriceRange: boolean,
    showCalculator: boolean,
    showStates: boolean,
    payInstantly: boolean;
    PayOnDelivery: boolean;
    PayOnPickup: boolean;
}

const initialState: CURRENTSTATES = {
    showPriceRange: true,
    showCalculator: false,
    showStates: false,
    payInstantly: false,
    PayOnDelivery: false,
    PayOnPickup: false,
}


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

export default function ShipmentPreferences(){
    const {globaldata, globalPriceList, setGlobalPriceList, setGlobalData} = useContext<any | string>(State_data);
    const [state, dispatch] = useReducer(reducer, initialState);
    let paymentMethods: string[] = [];
    const {locationsData, locationsError, locationsIsLoading, locationsIsValidating, locationsMutate} = useLocations({locations: globaldata})
    const handleShowPriceRange = () => {
       dispatch({type: "SHOWPRICERANGE", payload: !initialState.showPriceRange})
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

    console.log(globalPriceList)

    if(state.payInstantly) paymentMethods.push('PAY_NOW');
    if(state.payOnDelivery) paymentMethods.push('PAY_ON_DELIVERY');
    if(state.payOnPickup) paymentMethods.push('PAY_ON_PICKUP');
    const {postDistancePriceData,
           postDistancePriceError, 
           postDistancePriceIsLoading,
           postDistancePriceIsValidating,
           postDistancePriceMutate} = usePostDistancePricing(globalPriceList[globalPriceList?.length - 1]);
    const {businessChangeData, businessChangeError, businessChangeIsLoading, businessChangeIsValidating, businessChangeMutate} = useBusiness(paymentMethods);
    const {getLocationsData, getLocationsError, getLocationsIsLoading, getLocationsIsValidating, getLocationsMutate} = useFetchLocations()
    useEffect(()=> {
      locationsMutate();
    }, [locationsData?.data])

    return(
        <Holder>
            {
                businessChangeIsLoading || businessChangeIsValidating &&
                <SkeletonLoading title="payment methods" loadingSearching="Loading" />
            }
            {
                locationsIsValidating || locationsIsLoading || getLocationsIsLoading || getLocationsIsValidating &&
                <SkeletonLoading title="pickup and delivery locations" loadingSearching="Loading" />
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
                            {getLocationsData?.data && globaldata.length > 0 && globaldata?.map((data: string, i:number) => (
                                    <div className="animate__animated animate__bounceInDown flex bg-gray-50 py-2 px-3 phone:text-xs laptop:text-sm w-fit my-2 rounded-full justify-center items-center gap-5">
                                        <p>{data}</p>
                                        <span onClick={() => setGlobalData(globaldata.filter((item:string, index:number) => i !== index ))} 
                                        className="text-red-500 cursor-pointer font-extrabold">
                                            <i title="Delete" className="icon ion-md-close"></i>
                                        </span>
                                    </div>
                                ))
                            }
                            {/* {
                                locationsData?.data && locationsData?.data?.map((location: string, i:number) => (
                                    <div className="animate__animated animate__bounceInDown flex bg-gray-50 py-2 px-3 phone:text-xs laptop:text-sm w-fit my-2 rounded-full justify-center items-center gap-5">
                                        <p>{location}</p>
                                        <span onClick={() => setGlobalData(globaldata.filter((item:string, index:number) => i !== index ))} 
                                        className="text-red-500 cursor-pointer font-extrabold">
                                            <i title="Delete" className="icon ion-md-close"></i>
                                        </span>
                                    </div>
                                ))
                            } */}
                            </div>
                            <p className="relative text-xs text-right bottom-0 right-0">{locationsData?.data?.length} {locationsData?.data?.length > 1 ? "entries" : "entry"}</p>
                        </div>
                        <ButtonAndMessage 
                        error={locationsError}
                        mutate={locationsMutate}
                        successmessage="Your locations has been updated!" 
                        code={locationsData?.code}
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
                        <h1 className="my-2 text-lg">All Entries ({globalPriceList.length})</h1>
                    </span>
                    <h1 className="font-bold text-normal">Your business covers from  {globalPriceList.length > 0 ? globalPriceList[0]?.location : "0"}km to  {globalPriceList.length > 0 ? globalPriceList[globalPriceList.length - 1]?.destination : "0"}km.</h1>
                    <div className="mb-3">
                   { state.showPriceRange &&
                    <div className="w-full flex-wrap my-4 h-fit flex justify-start gap-2 items-center">
                        {
                            globalPriceList.length > 0 && globalPriceList.map((price: any, mainindex:number) => {
                               return( 
                                <div key={mainindex} className="flex animate__animated animate__headShake justify-start rounded-3xl items-center gap-3 shadow-sm p-3 bg-white">
                                    <p>{price.from}km - {price.to}km @  <b>₦{price.amount}</b></p>
                                    <span
                                    onClick={() => setGlobalPriceList((prev:any) => prev.filter((item:any, index:number) => index !== mainindex))}
                                     className="rounded-full text-gray-50 px-1 cursor-pointer w-5 text-center text-sm bg-red-500/90"><i className="icon ion-md-close"></i></span>
                                </div>
                            )})
                        }
                    </div>
                   }
                   </div>
                    <AddItem showCalculator={state.showCalculator} handleShowCalculator={handleShowCalculator} />
                    {state.showCalculator && <OpenCalculator handleNoShow={handleShowCalculator} />}
                </div>
             </Hero>
            </Section>
        </Holder>
    )
}