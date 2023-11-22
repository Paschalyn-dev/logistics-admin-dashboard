'use client'
import ConstantNav from "../constantNav";
import Heading from "../heading";
import Holder from "../holder";
import Input from "../input";
import Section from "../section";
import { useState, useContext, useEffect } from "react";
import SearchFilter from "./search";
import { useAllDispatchersFetcher } from "../services/swr-functions/customer-swr";
import SubHeading from "../preferences/website/subheading";
import SkeletonLoading from "../services/eventhandlers/skeleton-loading";
import SuccessMessage from "../successmessage";
import BoxesHolder from "../boxesholder";
import Link from "next/link";
import { State_data } from "../context/context";
import Popup from "../services/eventhandlers/popup";
import { useDateHandler } from "../date";

export default function Dispatcher(){
    const {dispatcherAllData, dispatcherAllError, dispatcherAllIsLoading, dispatcherAllIsValiddating, dispatcherAllMutate} = useAllDispatchersFetcher();
    const [menu, setMenu] = useState<string>('card');
    const {setDeleteWithId, inputData, deleteWithId, openUIBoxes, setOpenUIBoxes, successMessage, searchData} = useContext<any | string>(State_data);
    const handleOpenSearch = () => {
        setOpenUIBoxes((prev: any) => ({...prev, dispatcherSearch: true, dispatcherClearData: true}))
    }
    const handleClearData = () => {
        setOpenUIBoxes((prev: any) => ({...prev, dispatcherClearData: false}))
    }

    const handleCloseFill = () => {
        setOpenUIBoxes((prev: any) => ({...prev, dispatcherPopup: false}))
    }
    useEffect(() => {
        dispatcherAllMutate(dispatcherAllData);
    }, [openUIBoxes.dispatcherClearData !== true]);
    return(
        <Holder>
            {
                (dispatcherAllIsLoading || dispatcherAllIsValiddating && !openUIBoxes.dispatcherSearch) &&
                <SkeletonLoading title="all dispatchers" />
            }
            {
                ((searchData?.dispatcherResult === "" && searchData?.dispatcherCode !== "") && openUIBoxes.dispatcherSearch) &&
                <SkeletonLoading loadingSearching="Searching" title="dispatchers" />                
            }
            <ConstantNav />
            <Section>
                    <Heading heading="My Dispatchers" />
                    {dispatcherAllData?.data?.length >= 0 && !openUIBoxes.dispatcherClearData && searchData?.dispatcherResult?.data !== 'undefined' && <p>You have <span className="font-bold">{dispatcherAllData?.data?.length || 0}</span> dispatcher{dispatcherAllData?.data?.length > 1 && "s"}.</p>}
                    {searchData?.dispatcherResult !== '' && openUIBoxes.dispatcherClearData && <p><span className="font-bold">{searchData?.dispatcherResult?.data?.length || 0}</span> dispatcher match(es) found.</p>}              
                    <Input 
                    link="/dashboard/dispatchers/create" 
                    placeholder="Search Dispatchers" 
                    name="dispatcher" 
                    phonetext="Add" 
                    laptoptext="New Dispatcher" 
                    handleClick={handleOpenSearch}
                    searchInput={inputData.dispatcher}
                    />
                    { openUIBoxes.dispatcherClearData &&
                        <button onClick={handleClearData} className="text-red-500 mt-3 gap-2 flex font-bold text-sm">
                            <span>
                                <i className="icon ion-md-close"></i>
                            </span>Clear Filter</button>
                        }
                    {openUIBoxes.dispatcherSearch && <SearchFilter inputData={inputData.dispatcher} closeFill={setOpenUIBoxes} />}
                    {openUIBoxes.dispatcherPopup && <Popup text="Rider" name="dispatchers" closeFill={handleCloseFill} popupShow={openUIBoxes.dispatcherPopup} mutate={dispatcherAllMutate} mutateSearch={searchData?.dispatcherResult?.data} id={deleteWithId.dispatchers} />}
                    
                    {
                        dispatcherAllError && successMessage.dispatcher &&
                        <SuccessMessage
                        successMessageShow={successMessage.dispatcher}
                        name="dispatcher"
                        id="failed"
                        messageTitle="Dispatchers cannot be fetched. Check network connection!"
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
                    {dispatcherAllData?.data &&  !openUIBoxes.dispatcherClearData &&
                    (dispatcherAllData.data.map((dispatcher: any) => {
                        return(
                            <div key={dispatcher?.id} className="bg-gray-50 hover:shadow-lg rounded-xl h-fit phone:w-11/12 tablet:w-5/12 p-5">
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-lg">{dispatcher.fullName}</p>
                                    <p className="text-base">{dispatcher.parcels ? dispatcher.parcels : "0"} Parcel{dispatcher.parcels > 1 && "s"}</p>
                                    <p className="text-xs">{useDateHandler(dispatcher?.createdAt)}</p>
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
                                        setOpenUIBoxes((prev: any) => ({...prev, dispatcherPopup: true}));
                                        setDeleteWithId((prev: any) => ({...prev, dispatchers: dispatcher?.id}));
                                    }}  
                                    className="hover:text-red-400 text-red-500 cursor-pointer rounded-full bg-red-100 px-3 py-2">
                                    <i className="icon ion-md-trash"></i>
                                    </span>
                                </div>
                            </div>
                            <hr className="my-4" />
                            <p className="text-xs p-2 rounded-xl text-amber-600 bg-amber-200/30 w-fit">CURRENT LOCATON</p>
                            <p className="px-3 py-1">N/A</p>
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
                    <div className={ !openUIBoxes.dispatcherClearData ? "flex flex-col w-full justify-center items-center" : "hidden"}>
                    <span className="-mb-16">
                        <i id="bigger" className="icon ion-md-bicycle"></i>
                    </span>
                    <br/>
                    <SubHeading subheading=" You don't have any dispatcher yet."/>
                    {/* <p className="w-5/12 mt-1 text-sm text-center">You don't have any active Shipment.</p> */}
                </div>
                )}
                {openUIBoxes.dispatcherClearData && <SubHeading subheading="Search Results" />}

                <BoxesHolder>
                {searchData?.dispatcherResult?.data && openUIBoxes.dispatcherClearData &&
                    (searchData?.dispatcherResult.data.map((dispatcher: any) => {
                        return(
                        <div key={dispatcher?.id} className="bg-gray-50 hover:shadow-lg rounded-xl h-fit phone:w-11/12 tablet:w-5/12 p-5">
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-lg">{dispatcher.fullName}</p>
                                    <p className="text-base">{dispatcher.parcels ? dispatcher.parcels : "0"} Parcel{dispatcher.parcels > 1 && "s"}</p>
                                    <p className="text-xs">{useDateHandler(dispatcher?.createdAt)}</p>
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
                                        setOpenUIBoxes((prev: any) => ({...prev, dispatcherPopup: true}));
                                        setDeleteWithId((prev: any) => ({...prev, dispatchers: dispatcher?.id}));
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
                    { (searchData?.dispatcherResult?.data?.length === 0 || searchData?.dispatcherResult?.data === '' || searchData?.dispatcherResult?.code !== 200 && openUIBoxes.dispatcherClearData) && (
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
                <div className="p-2 text-sm bg-green-100 text-green-600 w-fit mt-2 rounded-lg">COMING SOON</div>
            </div>
            )
        }       
    </Section>
        </Holder>
    )
}