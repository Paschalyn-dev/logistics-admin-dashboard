'use client'
import Heading from "../../heading";
import Holder from "../../holder";
import Input from "../../input";
import OrdersNav from "../../orders";
import Section from "../../section";
import { useState, useEffect, useContext } from "react";
import SearchFilter from "./search";
import { useAllParcelsFetcher, useSearchParcelRange } from "../../services/swr-functions/customer-swr";
import SubHeading from "../../preferences/website/subheading";
import SuccessMessage from "../../successmessage";
import SkeletonLoading from "../../services/eventhandlers/skeleton-loading";
import BoxesHolder from "../../boxesholder";
import useDateHandler from "../../date";
import { State_data } from "../../context/context";
import { useRouter } from "next/navigation"
import Popup from "../../services/eventhandlers/popup";
import Link from "next/link";

export type UIBOXES = {
    searchBox: boolean;
    popup: boolean;
    clearData?: boolean;
}

export default function Shipments(){
    const [openUIBoxes, setOpenUIBoxes] = useState<UIBOXES>(
        {
            searchBox: false,
            popup: false,
            clearData: false
        }
    )
    const [inputData, setInputData] = useState<string>('');
    const [id, setId] = useState<number>(0);
    const [successmessage, setSuccessMessage] = useState<boolean>(true)
    const {parcelAllData, parcelAllError, parcelAllIsLoading, parcelAllIsValiddating, parcelAllMutate} = useAllParcelsFetcher();
    const {parcelRange} = useContext<any | string>(State_data);
    const {parcelRangeData, parcelRangeIsLoading, parcelRangeError, parcelRangeIsValidating} = useSearchParcelRange(parcelRange);

    const handleOpenSearch = () => {
        setOpenUIBoxes((prev: any) => ({...prev, searchBox: true, clearData: true}))
    }
    const handleInputData = (e: any) => {
        setInputData(e.target.value)
    }
    const handleClearData = () => {
        setOpenUIBoxes((prev: any) => ({...prev, clearData: false}))
    }

    const handleCloseFill = () => {
        setOpenUIBoxes((prev: any) => ({...prev, popup: false}))
    }

    const lengthActive = parcelRangeData?.data?.filter((parcel: any) => !parcel.completed && !parcel.paid && !parcel.picked )

    useEffect(() => {
        parcelAllMutate(parcelAllData);
        console.log(parcelAllData);
    }, [openUIBoxes.clearData !== true]);

    return(
        <Holder>
               {
               (parcelAllIsLoading || parcelAllIsValiddating && !openUIBoxes.searchBox) &&
               <SkeletonLoading title="all active shipments." />
               }
               {
               (parcelRangeIsLoading || parcelRangeIsValidating && openUIBoxes.searchBox) &&
               <SkeletonLoading loadingSearching="Searching" title="parcels." />                
               }
            <OrdersNav />
            <Section>
               <Heading heading="Active Orders" />
               {parcelAllData?.data?.length >= 0 && !openUIBoxes.clearData && <p>You have <span className="font-bold">{parcelAllData?.data?.length || 0}</span> active shipment{parcelAllData?.data?.length > 1 && "s"}.</p>}
               {parcelRangeData !== 'undefined' && openUIBoxes.clearData && <p><span className="font-bold">{lengthActive?.length || 0}</span> active parcel match(es) found.</p>}
                <Input 
                link="/dashboard/shipments/active/create"
                phonetext="Add" 
                name="active"
                laptoptext="New Shipment" 
                handleClick={handleOpenSearch}
                placeholder="Search Shipments"
                handleChange={handleInputData}
                searchInput={inputData}
                />
                { openUIBoxes.clearData &&
                <button onClick={handleClearData} className="text-red-500 mt-3 gap-2 flex font-bold text-sm">
                    <span>
                        <i className="icon ion-md-close"></i>
                    </span>Clear Filter</button>
                }
               {openUIBoxes.searchBox && <SearchFilter inputData={inputData} closeFill={setOpenUIBoxes} />}
               {openUIBoxes.popup && <Popup text="Shipment" closeFill={handleCloseFill} popupShow={openUIBoxes.popup} id={id} />}
               {
                   parcelAllError && successmessage &&
                   <SuccessMessage
                successMessageShow={successmessage}
                handleShowSuccessMessage={setSuccessMessage}
                id="failed"
                messageTitle="Active shipments cannot be fetched. Check network connection!"
                />
            }
            {
                parcelRangeError && openUIBoxes.searchBox && successmessage &&
                <SuccessMessage
                successMessageShow={successmessage}
                handleShowSuccessMessage={setSuccessMessage}
                id="failed"
                messageTitle="Searching failed, check network connection!"
                />
            }
            <BoxesHolder>
                {parcelAllData?.data &&
                (parcelAllData.data.map((parcel: any) => {
                    let date  = new Date(parcel?.updatedAt?.slice(0, 10))
                    return(
                        <div className={!openUIBoxes.clearData ? "bg-gray-50 hover:shadow-lg rounded-xl h-fit phone:w-11/12 tablet:w-5/12 p-5" : "hidden"}>
                        <div className="flex justify-between">
                            <div>
                                <p className="text-red-600 text-xs">NOT PICKED</p>
                                <p className="laptop:text-lg my-1 phone:text-base">{parcel.name}</p>
                                <p className="text-blue-600 mb-1 text-xs uppercase">{parcel.trackId}</p>
                                <p className="text-xs">{useDateHandler(date)}</p>
                            </div>

                            <div>
                                <Link href={`/dashboard/shipments/${parcel.id}`} 
                                className="hover:text-gray-600 cursor-pointer rounded-full bg-gray-200 px-3 py-2">
                                    <i className="icon ion-md-open"></i>
                                </Link>
                                <Link href={`/dashboard/shipments/${parcel.id}/edit`} 
                                className="hover:text-gray-600 mx-2 cursor-pointer rounded-full bg-gray-200 px-3 py-2">
                                    <i className="icon ion-md-create"></i>
                                </Link>
                                <span onClick={() => {
                                    setOpenUIBoxes((prev: any) => ({...prev, popup: true}));
                                    setId(parcel.id)
                                }}
                                className="hover:text-red-400 text-red-500 cursor-pointer rounded-full bg-red-100 px-3 py-2">
                                <i className="icon ion-md-trash"></i>
                                </span>
                            </div>
                        </div>
                        <hr className="my-4" />
                        <p className="text-xs flex flex-col justify-start gap-1 my-2">FROM: <span>{parcel.pickUp.address}</span></p>
                        <p className="text-xs flex flex-col justify-start gap-1 my-2">TO:   <span>{parcel.destination.address}</span></p>
                        <hr className="my-4" />
                        <div className="flex justify-between items-center">
                            <div> 
                                <p>Customer</p>
                                <p>{parcel.pickUp.name}</p>
                            </div>
                            <span>
                                <p className="text-xs capitalize">{parcel.paymentType.replace(/_/gi, " ")}</p>
                                <p className="font-bold">₦{parcel.amount ? parcel.amount : 0}</p>
                            </span>
                        </div>
                        <hr className="my-4" />
                        <div className="flex w-full items-center justify-between gap-5">
                            <div className="flex items-center justify-start gap-5">
                                <i className="icon ion-md-person text-gray-300 px-5 py-3 bg-gray-100 rounded-full text-3xl"></i>
                                <div>
                                    <p className="-mb-1">{typeof parcel.rider === 'string' ? parcel.rider : "No Dispatcher"}</p>
                                    <button className="text-blue-600 text-sm">Change</button>
                                </div>
                            </div>
                            <button>
                                <i className="icon ion-md-call text-green-300 px-5 py-3 bg-green-100 rounded-full text-3xl"></i>
                            </button>
                        </div>
                    </div>
                )}))} 
            </BoxesHolder>
            { !parcelAllIsLoading && parcelAllData?.data?.length === 0 && (
                <div className={ !openUIBoxes.clearData ? "flex flex-col w-full justify-center items-center" : "hidden"}>
                <span className="-mb-16">
                    <i id="bigger" className="icon ion-md-cube"></i>
                </span>
                <br/>
                <SubHeading subheading=" You don't have any active shipment."/>
                {/* <p className="w-5/12 mt-1 text-sm text-center">You don't have any active Shipment.</p> */}
            </div>
            )}
                
            {openUIBoxes.clearData && <SubHeading subheading="Search Results" />}
            {parcelRangeData !== 'undefined' && openUIBoxes.clearData && <p><span className="font-bold">{parcelRangeData?.data?.length || 0}</span> parcel match(es) in total.</p>}
            <BoxesHolder>
            {  parcelRangeData?.data &&
                (parcelRangeData?.data?.map((parcelRange: any) => {
                    let date  = new Date(parcelRange?.updatedAt?.slice(0, 10))
                    return(
                        <div className={openUIBoxes.clearData  ? "bg-gray-50 hover:shadow-lg rounded-xl h-fit phone:w-11/12 tablet:w-5/12 p-5": "hidden"}>
                        <div className="flex justify-between">
                            <div>
                            <p className={parcelRange.completed || parcelRange.paid || parcelRange.picked ? "text-green-600 text-xs" :"text-red-600 text-xs"}>{parcelRange.completed && parcelRange.paid && parcelRange.picked ? 'DELIVERED' : parcelRange.completed || parcelRange.picked || parcelRange.paid ? 'NOT PICKED' : "NOT PICKED"}</p>
                            <p className="laptop:text-lg my-1 phone:text-base">{parcelRange.name}</p>
                            <p className="text-blue-600 mb-1 text-xs uppercase">{parcelRange.trackId}</p>
                                <p className="text-xs">{useDateHandler(date)}</p>
                            </div>
                            
                            <div>
                            <Link href={`/dashboard/shipments/${parcelRange.trackId}`} 
                            className="hover:text-gray-600 cursor-pointer rounded-full bg-gray-200 px-3 py-2">
                                    <i className="icon ion-md-open"></i>
                                </Link>
                                <Link href={`/dashboard/shipments/${parcelRange.trackId}/edit`} 
                                className="hover:text-gray-600 mx-2 cursor-pointer rounded-full bg-gray-200 px-3 py-2">
                                    <i className="icon ion-md-create"></i>
                                </Link>
                                <span onClick={() => {
                                    setOpenUIBoxes((prev: any) => ({...prev, popup: true}));
                                    setId(parcelRange.id)
                                }}
                                className="hover:text-red-400 text-red-500 cursor-pointer rounded-full bg-red-100 px-3 py-2">
                                <i className="icon ion-md-trash"></i>
                                </span>
                            </div>
                        </div>
                            <hr className="my-4" />
                            <p className="text-xs flex flex-col justify-start gap-1 my-2">FROM: <span>{parcelRange.pickUp.address}</span></p>
                            <p className="text-xs flex flex-col justify-start gap-1 my-2">TO:   <span>{parcelRange.destination.address}</span></p>
                            <hr className="my-4" />
                            <div className="flex justify-between items-center">
                            <div> 
                            <p>Customer</p>
                            <p>{parcelRange.pickUp.name}</p>
                            </div>
                            <span>
                            <p className="text-xs capitalize">{parcelRange.paymentType.replace(/_/gi, " ")}</p>
                            <p className="font-bold">₦{parcelRange.amount ? parcelRange.amount : 0}</p>
                            </span>
                            </div>
                            <hr className="my-4" />
                            <div className="flex w-full items-center justify-between gap-5">
                            <div className="flex items-center justify-start gap-5">
                                <i className="icon ion-md-person text-gray-300 px-5 py-3 bg-gray-100 rounded-full text-3xl"></i>
                                <div>
                                <p className="-mb-1">{typeof parcelRange.rider === 'string' ? parcelRange.rider : "No Dispatcher"}</p>
                                <button className="text-blue-600 text-sm">Change</button>
                                </div>
                            </div>
                            <button>
                            <i className="icon ion-md-call text-green-300 px-5 py-3 bg-green-100 rounded-full text-3xl"></i>
                            </button>
                            </div>
                            </div>
                        )}))}
                    </BoxesHolder>
                        
                    { (parcelRangeData?.data?.length === 0 || parcelRangeData?.data === 'undefined' || parcelRangeData?.code !== 200 && openUIBoxes.clearData) && (
                            <div className={openUIBoxes.clearData ? "flex flex-col w-full justify-center items-center" : "hidden"}>
                            <span className="-mb-16">
                                <i id="bigger" className="icon ion-md-cube"></i>
                            </span>
                            <br/>
                            <SubHeading subheading="Search Results"/>
                            <p className="w-5/12 mt-1 text-sm text-center">We found {parcelRangeData?.data?.length || 0} results in total.</p>
                        </div>
                        )}
            </Section>
        </Holder>
    )
}