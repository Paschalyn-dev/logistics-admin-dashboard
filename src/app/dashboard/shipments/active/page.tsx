'use client'
import Heading from "../../heading";
import Holder from "../../holder";
import Input from "../../input";
import OrdersNav from "../../orders";
import Section from "../../section";
import { useContext } from "react";
import SearchFilter from "./search";
import { useAllDispatchersFetcher, useAllParcelsFetcher } from "../../services/swr-functions/customer-swr";
import SubHeading from "../../preferences/website/subheading";
import SkeletonLoading from "../../services/eventhandlers/skeleton-loading";
import BoxesHolder from "../../boxesholder";
import { useDateHandler } from "../../date";
import { State_data } from "../../context/context";
import Popup from "../../services/eventhandlers/popup";
import Link from "next/link";
import SuccessMessage from "../../successmessage";
import ShowCustomers from "../showDispatchers";

export type UIBOXES = {
    shipmentSearch: boolean;
    shipmentPopup: boolean;
    shipmentClearData?: boolean;
}

export default function Shipments(){
    const {setDeleteWithId, searchData, setShowDispatcher, showDispatchers, successMessage,  inputData, setInputData, deleteWithId, openUIBoxes, setOpenUIBoxes} = useContext(State_data);
    const {parcelAllData, parcelAllError, parcelAllIsLoading, parcelAllIsValiddating, parcelAllMutate} = useAllParcelsFetcher();
    const {dispatcherAllData} = useAllDispatchersFetcher()
    const handleOpenSearch = () => {
        setOpenUIBoxes((prev: any) => ({...prev, shipmentSearch: true, shipmentClearData: true}))
    }
    
    const handleClearData = () => {
        setOpenUIBoxes((prev: any) => ({...prev, shipmentClearData: false}))
    }
    
    const handleCloseFill = () => {
        setOpenUIBoxes((prev: any) => ({...prev, shipmentPopup: false}))
    }
    const lengthActive = searchData?.parcelResult?.data?.filter((parcel: any) => !parcel.completed && !parcel.paid && !parcel.picked )
    
    const handleFetchDispatcher = (id: any) => {
        const newId = dispatcherAllData?.data?.filter((dispatcher: any) => dispatcher?.id === id);
        return newId[0]?.fullName;
    }
    
    return(
        <Holder>
            {
                (parcelAllIsLoading || parcelAllIsValiddating && !openUIBoxes?.shipmentSearch) &&
                <SkeletonLoading title="all active shipments." />
            }
            {
                ((searchData?.parcelResult === "" && searchData?.parcelCode !== "") && openUIBoxes.shipmentSearch) &&
                <SkeletonLoading loadingSearching="Searching" title="shipments" />                
            }
            <OrdersNav />
            <Section>
               <Heading heading="Active Orders" />
               {parcelAllData?.data?.length >= 0 && !openUIBoxes?.shipmentClearData && <p>You have <span className="font-bold">{parcelAllData?.data?.length || 0}</span> active shipment{parcelAllData?.data?.length > 1 && "s"}.</p>}
               {searchData?.parcelResult !== '' && openUIBoxes?.shipmentClearData && <p><span className="font-bold">{lengthActive?.length || 0}</span> active parcel match(es) found.</p>}
                <Input 
                link="/dashboard/shipments/active/create"
                phonetext="Add" 
                name="shipment"
                laptoptext="New Shipment" 
                handleClick={handleOpenSearch}
                placeholder="Search Shipments"
                searchInput={inputData.shipment}
                />
                { openUIBoxes?.shipmentClearData &&
                <button onClick={handleClearData} className="text-red-500 mt-3 gap-2 flex font-bold text-sm">
                    <span>
                        <i className="icon ion-md-close"></i>
                    </span>Clear Filter</button>
                }
               {openUIBoxes?.shipmentSearch && <SearchFilter inputData={inputData.shipment} closeFill={setOpenUIBoxes} />}
               {showDispatchers && <ShowCustomers />}
               {openUIBoxes?.shipmentPopup && <Popup text="Shipment" closeFill={handleCloseFill} mutate={parcelAllMutate} mutateSearch={searchData?.parcelResult} name='parcels' popupShow={openUIBoxes.shipmentPopup} id={deleteWithId.parcels} />}
               {
                   parcelAllError && successMessage.activeShipment &&
                   <SuccessMessage
                   successMessageShow={successMessage.activeShipment}
                   name="activeShipment"
                   id="failed"
                   messageTitle="Active shipments cannot be fetched. Check network connection!"
                   />
                }
            <BoxesHolder>
                {parcelAllData?.data &&
                (parcelAllData.data.map((parcel: any) => {
                    return(
                        <div className={!openUIBoxes?.shipmentClearData ? "bg-gray-50 hover:shadow-lg rounded-xl h-fit phone:w-11/12 tablet:w-5/12 p-5" : "hidden"}>
                        <div className="flex justify-between">
                            <div>
                                <p className="text-red-600 text-xs">NOT PICKED</p>
                                <p className="laptop:text-lg my-1 phone:text-base">{parcel.name}</p>
                                <Link title="View on Tracker" target="_blank" href={`https://radar.logistix.africa/track/${parcel?.trackId}`} className="text-blue-600 mb-1 text-xs uppercase">{parcel?.trackId}</Link>
                                <p className="text-xs">{useDateHandler(parcel?.createdAt)}</p>
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
                                    setOpenUIBoxes((prev: any) => ({...prev, shipmentPopup: true}));
                                    setDeleteWithId((prev: any) => ({...prev, parcels: parcel.id}));
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
                                    <p className="-mb-1">{ handleFetchDispatcher(parcel?.rider) || "No Dispatcher"}</p>
                                    <button onClick={() => setShowDispatcher(true)} className="text-blue-600 text-sm">Change</button>
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
                <div className={ !openUIBoxes.shipmentClearData ? "flex flex-col w-full justify-center items-center" : "hidden"}>
                <span className="-mb-16">
                    <i id="bigger" className="icon ion-md-cube"></i>
                </span>
                <br/>
                <SubHeading subheading=" You don't have any active shipment."/>
                {/* <p className="w-5/12 mt-1 text-sm text-center">You don't have any active Shipment.</p> */}
            </div>
            )}
                
            {openUIBoxes?.shipmentClearData && <SubHeading subheading="Search Results" />}
            {searchData?.parcelResult !== 'undefined' && openUIBoxes?.shipmentClearData && <p><span className="font-bold">{searchData?.parcelResult?.data?.length || 0}</span> parcel match(es) in total.</p>}
            <BoxesHolder>
            {  searchData?.parcelResult?.data &&
                (searchData?.parcelResult?.data?.map((parcelRange: any) => {
                    return(
                        <div className={openUIBoxes.shipmentClearData  ? "bg-gray-50 hover:shadow-lg rounded-xl h-fit phone:w-11/12 tablet:w-5/12 p-5": "hidden"}>
                        <div className="flex justify-between">
                            <div>
                            <p className={parcelRange.completed || parcelRange.paid || parcelRange.picked ? "text-green-600 text-xs" :"text-red-600 text-xs"}>{parcelRange.completed && parcelRange.paid && parcelRange.picked ? 'DELIVERED' : parcelRange.completed || parcelRange.picked || parcelRange.paid ? 'NOT PICKED' : "NOT PICKED"}</p>
                            <p className="laptop:text-lg my-1 phone:text-base">{parcelRange.name}</p>
                            <Link title="View on Tracker" target="_blank" href={`https://radar.logistix.africa/track/${parcelRange?.trackId}`} className="text-blue-600 mb-1 text-xs uppercase">{parcelRange?.trackId}</Link>
                                <p className="text-xs">{useDateHandler(parcelRange?.createdAt)}</p>
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
                                    setOpenUIBoxes((prev: any) => ({...prev, shipmentPopup: true}));
                                    setDeleteWithId((prev: any) => ({...prev, parcels: parcelRange.id}));
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
                                <p className="-mb-1">{ handleFetchDispatcher(parcelRange?.rider) || "No Dispatcher"}</p>
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
                        
                    { (searchData?.parcelResult?.data?.length === 0 || searchData?.parcelResult?.data === 'undefined' || searchData?.parcelResult?.code !== 200 && openUIBoxes?.shipmentClearData) && (
                            <div className={openUIBoxes.shipmentClearData ? "flex flex-col w-full justify-center items-center" : "hidden"}>
                            <span className="-mb-16">
                                <i id="bigger" className="icon ion-md-cube"></i>
                            </span>
                            <br/>
                            <SubHeading subheading="Search Results"/>
                            <p className="w-5/12 mt-1 text-sm text-center">We found {searchData?.parcelResult?.data?.length || 0} results in total.</p>
                        </div>
                        )}
            </Section>
        </Holder>
    )
}