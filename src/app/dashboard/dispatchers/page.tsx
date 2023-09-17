'use client'
import ConstantNav from "../constantNav";
import Heading from "../heading";
import Holder from "../holder";
import Input from "../input";
import Section from "../section";
import { useState, useContext, useEffect } from "react";
import SearchFilter from "./search";
import { useAllDispatchersFetcher, useDispatcherSearchRange } from "../services/swr-functions/customer-swr";
import SubHeading from "../preferences/website/subheading";
import SkeletonLoading from "../services/eventhandlers/skeleton-loading";
import SuccessMessage from "../successmessage";
import BoxesHolder from "../boxesholder";
import Link from "next/link";
import { UIBOXES } from "../shipments/active/page";
import { State_data } from "../context/context";
import Popup from "../services/eventhandlers/popup";

export default function Dispatcher(){
    const [openUIBoxes, setOpenUIBoxes] = useState<UIBOXES>(
        {
            searchBox: false,
            popup: false,
            clearData: false,
        }
    )
    const [inputData, setInputData] = useState('');
    const [id, setId] = useState<number>(0);
    const {dispatcherAllData, dispatcherAllError, dispatcherAllIsLoading, dispatcherAllIsValiddating, dispatcherAllMutate} = useAllDispatchersFetcher();
    const [menu, setMenu] = useState<string>('card');
    const {dispatchersRange} = useContext<any | string>(State_data);
    const [successmessage, setSuccessMessage] = useState<boolean>(true);
    const {dispatchersRangeData, dispatchersRangeError, dispatchersRangeIsLoading, dispatchersRangeIsValidating, dispatchersRangeMutate} = useDispatcherSearchRange(dispatchersRange);
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
    useEffect(() => {
        dispatcherAllMutate(dispatcherAllData);
        console.log(dispatcherAllData);
    }, [openUIBoxes.clearData !== true]);
    return(
        <Holder>
            {
                (dispatcherAllIsLoading || dispatcherAllIsValiddating && !openUIBoxes.searchBox) &&
                <SkeletonLoading title="all dispatchers." />
            }
            {
                ((dispatchersRangeIsLoading || dispatchersRangeIsValidating) && openUIBoxes.searchBox) &&
                <SkeletonLoading loadingSearching="Searching" title="dispatchers." />                
            }
            <ConstantNav />
            <Section>
                    <Heading heading="My Dispatchers" />
                    {dispatcherAllData?.data?.length >= 0 && !openUIBoxes.clearData && dispatchersRangeData?.data !== 'undefined' && <p>You have <span className="font-bold">{dispatcherAllData?.data?.length || 0}</span> dispatcher{dispatcherAllData?.data?.length > 1 && "s"}.</p>}
                    {dispatchersRangeData !== 'undefined' && openUIBoxes.clearData && <p><span className="font-bold">{dispatchersRangeData?.data?.length || 0}</span> dispatcher match(es) found.</p>}              
                    <Input 
                    link="/dashboard/dispatchers/create" 
                    placeholder="Search Dispatchers" 
                    name="dispatcher" 
                    phonetext="Add" 
                    laptoptext="New Dispatcher" 
                    handleClick={handleOpenSearch}
                    handleChange={handleInputData}
                    searchInput={inputData}
                    />
                    { openUIBoxes.clearData &&
                        <button onClick={handleClearData} className="text-red-500 mt-3 gap-2 flex font-bold text-sm">
                            <span>
                                <i className="icon ion-md-close"></i>
                            </span>Clear Filter</button>
                        }
                    {openUIBoxes.searchBox && <SearchFilter inputData={inputData} closeFill={handleCloseFill} />}
                    {openUIBoxes.popup && <Popup text="Rider" closeFill={handleCloseFill} popupShow={openUIBoxes.popup} id={id} />}
                    
                    {
                        dispatcherAllError && successmessage &&
                        <SuccessMessage
                        successMessageShow={successmessage}
                        handleShowSuccessMessage={setSuccessMessage}
                        id="failed"
                        messageTitle="Dispatchers cannot be fetched. Check network connection!"
                        />
                    }
                    {
                        dispatchersRangeError && openUIBoxes.searchBox && successmessage &&
                        <SuccessMessage
                        successMessageShow={successmessage}
                        handleShowSuccessMessage={setSuccessMessage}
                        id="failed"
                        messageTitle="Searching failed, check network connection!"
                        />
                    }
                    <div className="flex mt-5 justify-start gap-10">
                        <div className={menu === "card" ? 'text-xl flex justify-start gap-1 items-center cursor-pointer text-gray-600 underline' : "text-gray-400 text-xl gap-1 cursor-pointer flex justify-start items-center"} onClick={() => setMenu('card')}>
                          <i className="icon ion-md-grid"></i>
                          <p className="text-sm">Card view</p>
                        </div>

                        <div className={menu === "card" ? "text-gray-400 text-xl cursor-pointer gap-1 flex justify-start items-center" : 'flex justify-start gap-1 cursor-pointer text-xl items-center text-gray-600 underline'} onClick={() => setMenu('map')}>
                          <i className="icon ion-md-map"></i>
                          <p className="text-sm">Map view</p>
                        </div>
                    </div>
                    <hr className="h-2 w-full"/>
                {menu === "card" &&
                <>
                    <BoxesHolder>
                    {dispatcherAllData?.data &&  !openUIBoxes.clearData &&
                    (dispatcherAllData.data.map((dispatcher: any) => {
                        return(
                            <div className="bg-gray-50 hover:shadow-lg rounded-xl h-fit phone:w-11/12 tablet:w-5/12 p-5">
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-lg">{dispatcher.fullName}</p>
                                    <p className="text-base">{dispatcher.parcels ? dispatcher.parcels : "0"} Parcel{dispatcher.parcels > 1 && "s"}</p>
                                </div>

                                <div>
                                    <Link href={`/dashboard/dispatchers/${dispatcher?.id}`} 
                                    className="hover:text-gray-600 cursor-pointer rounded-full bg-gray-200 px-3 py-2">
                                        <i className="icon ion-md-open"></i>
                                    </Link>
                                    <Link href={`/dashboard/dispatchers/${dispatcher?.id}/edit`} 
                                    className="hover:text-gray-600 mx-2 cursor-pointer rounded-full bg-gray-200 px-3 py-2">
                                        <i className="icon ion-md-create"></i>
                                    </Link>
                                    <span onClick={() => {
                                        setOpenUIBoxes((prev: any) => ({...prev, popup: true}));
                                        setId(dispatcher.id)
                                    }}  
                                    className="hover:text-red-400 text-red-500 cursor-pointer rounded-full bg-red-100 px-3 py-2">
                                    <i className="icon ion-md-trash"></i>
                                    </span>
                                </div>
                            </div>
                            <hr className="my-4" />
                            <p className="text-xs p-2 rounded-xl text-amber-600 bg-amber-200/30 w-fit">CURRENT LOCATON</p>
                            <p>{}</p>
                            <hr className="my-4" />
                            <div className="flex text-gray-500 justify-start gap-3 items-center">
                                <span>
                                    <i className="icon ion-md-mail"></i>
                                </span>
                                <p>{dispatcher.email || 'No email'}</p>
                            </div>

                            <div className="flex text-gray-500 justify-start gap-3 items-center">
                                <span>
                                    <i className="icon ion-md-call"></i>
                                </span>
                                <p>{dispatcher.phone || 'No contact'}</p>
                            </div>

                            <div className="flex text-gray-500 justify-start gap-3 items-center">
                                <span>
                                    <i className="icon ion-md-pin"></i>
                                </span>
                                <p>{dispatcher?.address?.street + ' ' + dispatcher?.address?.state + ' ' + dispatcher?.address?.country}</p>
                            </div>
                        </div>
                    )}))}
                    </BoxesHolder>
                { !dispatcherAllIsLoading && dispatcherAllData?.data?.length === 0 && (
                    <div className={ !openUIBoxes.clearData ? "flex flex-col w-full justify-center items-center" : "hidden"}>
                    <span className="-mb-16">
                        <i id="bigger" className="icon ion-md-bicycle"></i>
                    </span>
                    <br/>
                    <SubHeading subheading=" You don't have any dispatcher yet."/>
                    {/* <p className="w-5/12 mt-1 text-sm text-center">You don't have any active Shipment.</p> */}
                </div>
                )}
                {openUIBoxes.clearData && <SubHeading subheading="Search Results" />}

                <BoxesHolder>
                {dispatchersRangeData?.data && openUIBoxes.clearData &&
                    (dispatchersRangeData.data.map((dispatcher: any) => {
                        return(
                        <div className="bg-gray-50 hover:shadow-lg rounded-xl h-fit phone:w-11/12 tablet:w-5/12 p-5">
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-lg">{dispatcher.fullName}</p>
                                    <p className="text-base">{dispatcher.parcels ? dispatcher.parcels : "0"} Parcel{dispatcher.parcels > 1 && "s"}</p>
                                </div>

                                <div>
                                    <Link href={`/dashboard/dispatchers/${dispatcher?.id}`} 
                                    className="hover:text-gray-600 cursor-pointer rounded-full bg-gray-200 px-3 py-2">
                                        <i className="icon ion-md-open"></i>
                                    </Link>
                                    <Link href={`/dashboard/dispatchers/${dispatcher?.id}/edit`} 
                                    className="hover:text-gray-600 mx-2 cursor-pointer rounded-full bg-gray-200 px-3 py-2">
                                        <i className="icon ion-md-create"></i>
                                    </Link>
                                    <span onClick={() => {
                                        setOpenUIBoxes((prev: any) => ({...prev, popup: true}));
                                        setId(dispatcher.id)
                                    }} 
                                    className="hover:text-red-400 text-red-500 cursor-pointer rounded-full bg-red-100 px-3 py-2">
                                    <i className="icon ion-md-trash"></i>
                                    </span>
                                </div>
                            </div>
                            <hr className="my-4" />
                            <p className="text-xs p-2 rounded-xl text-amber-600 bg-amber-200/30 w-fit">CURRENT LOCATON</p>
                            <p>{}</p>
                            <hr className="my-4" />
                            <div className="flex text-gray-500 justify-start gap-3 items-center">
                                <span>
                                    <i className="icon ion-md-mail"></i>
                                </span>
                                <p>{dispatcher.email || 'No email'}</p>
                            </div>

                            <div className="flex text-gray-500 justify-start gap-3 items-center">
                                <span>
                                    <i className="icon ion-md-call"></i>
                                </span>
                                <p>{dispatcher.phone || 'No contact'}</p>
                            </div>

                            <div className="flex text-gray-500 justify-start gap-3 items-center">
                                <span>
                                    <i className="icon ion-md-pin"></i>
                                </span>
                                <p>{dispatcher?.address?.street + ' ' + dispatcher?.address?.state + ' ' + dispatcher?.address?.country}</p>
                            </div>
                        </div>
                    )}))}
                        </BoxesHolder>
                    { (dispatchersRangeData?.data?.length === 0 || dispatchersRangeData?.data === 'undefined' || dispatchersRangeData?.code !== 200 && openUIBoxes.clearData) && (
                        <div className="flex flex-col w-full justify-center items-center">
                        <span className="-mb-16">
                            <i id="bigger" className="icon ion-md-bicycle"></i>
                        </span>
                        <br/>
                        <SubHeading subheading=" No search result found."/>
                        {/* <p className="w-5/12 mt-1 text-sm text-center">You don't have any active Shipment.</p> */}
                        </div>
                    )}

            </>
        }

        {
            menu === "map" && (
                <div className="flex flex-col w-full justify-center h-fit p-10 items-center">
                <span className="-mb-16">
                    <i id="bigger" className="icon ion-md-map"></i>
                </span>
                <br/>
                <SubHeading subheading="Map"/>
                <p className="w-9/12 mt-1 text-sm text-center">You will be able to view the current location of your dispatchers on the map in real-time.</p>
                <div className="p-2 text-sm bg-green-100 text-green-600 w-fit rounded-lg">COMING SOON</div>
            </div>
            )
        }       
    </Section>
        </Holder>
    )
}