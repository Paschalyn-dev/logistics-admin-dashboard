'use client'
import { useState, useEffect, useContext } from "react";
import ConstantNav from "../constantNav";
import Heading from "../heading";
import Holder from "../holder";
import SubHeading from "../preferences/website/subheading";
import Section from "../section";
import { useFetchMessages } from "../services/swr-functions/staff-swr";
import SuccessMessage from "../successmessage";
import SkeletonLoading from "../services/eventhandlers/skeleton-loading";
import useDateHandler from "../date";
import { UIBOXES } from "../shipments/active/page";
import { State_data } from "../context/context";
import { useMessagesSearchRange } from "../services/swr-functions/customer-swr";
import SearchFilter from "./search";
import Popup from "../services/eventhandlers/popup";
import Input from "../input";

export default function Message(){
    const [openUIBoxes, setOpenUIBoxes] = useState<UIBOXES>(
        {
            searchBox: false,
            popup: false,
            clearData: false
        }
    )
    const [inputData, setInputData] = useState<string>('');
    const [id, setId] = useState<number>(0);
    const {messagesRange} = useContext<any | string>(State_data);
    const {messagesRangeData, messagesRangeError, messagesRangeIsLoading, messagesRangeIsValidating, messagesRangeMutate} = useMessagesSearchRange(messagesRange)
    const {fetchMessagesData, fetchMessagesError, fetchMessagesIsLoading, fetchMessagesIsValidating, fetchMessagesMutate} = useFetchMessages();
    const [successmessage,setSuccessMessage] = useState<boolean>(true);  
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
        fetchMessagesMutate(fetchMessagesData);
    }, [openUIBoxes.clearData !== true]);  
    
    return(
        <Holder>
               {
               (fetchMessagesIsLoading || fetchMessagesIsValidating && !openUIBoxes.searchBox) &&
               <SkeletonLoading title="all messages." />
               }
               {
               (messagesRangeIsLoading || messagesRangeIsValidating && openUIBoxes.searchBox) &&
               <SkeletonLoading loadingSearching="Searching" title="messages." />                
               }
            <ConstantNav />
            <Section>
                <Heading heading="Messages" />
                {fetchMessagesData?.data?.length >= 0 && !openUIBoxes.clearData && <p>You have <span className="font-bold">{fetchMessagesData?.data?.length || 0}</span> message {fetchMessagesData?.data?.length > 1 && "s"}.</p>}
               {messagesRangeData !== 'undefined' && openUIBoxes.clearData && <p><span className="font-bold">{messagesRangeData?.data?.length || 0}</span> message match(es) found.</p>}
               <Input
               name="messages"
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
               {openUIBoxes.popup && <Popup text="Message" closeFill={handleCloseFill} popupShow={openUIBoxes.popup} id={id} />}
               {
                fetchMessagesError && successmessage &&
                <SuccessMessage
                successMessageShow={successmessage}
                handleShowSuccessMessage={setSuccessMessage}
                id="failed"
                messageTitle="Messages cannot be fetched. Check network connection!"
                />
            }
               {
                   messagesRangeError && openUIBoxes.searchBox && successmessage &&
                   <SuccessMessage
                   successMessageShow={successmessage}
                   handleShowSuccessMessage={setSuccessMessage}
                   id="failed"
                   messageTitle="Searching failed, check network connection!"
                   />
                }

                <div className="h-full flex flex-wrap tablet:justify-start phone:justify-start m-auto items-start tablet:gap-5 phone:gap-3 mt-5 w-full p-1">
                    {fetchMessagesData?.data && !openUIBoxes.clearData &&
                    fetchMessagesData?.data?.map((message: any) => {
                        const mydate = new Date(message?.updatedAt?.slice(0, 10));
                        return(
                        <div className="h-fit desktop:text-2xl text-left w-10/12 px-5 pt-2">
                            <div className="phone:text-xs laptop:text-sm desktop:text-xl tablet:flex phone:bg-transparent phone:gap-0 mb-3 justify-start tablet:rounded-full tablet:bg-amber-200/50 w-fit tablet:px-3 tablet:py-2 tablet:gap-2 items-center">
                                <h3 className="font-bold">{message.name}</h3>
                                <p className="flex justify-start gap-2 items-center">{useDateHandler(mydate)} {message?.updatedAt?.slice(0, 10)}</p>
                            </div>
                            <p></p>
                            <div>
                                <p className="phone:text-base laptop:text-lg desktop:text-2xl">{message.message}</p>
                                <div className="flex phone:text-sm laptop:text-lg desktop:text-2xl justify-start gap-5 items-center mt-2">
                                    <a href={`mailto:${message.email}`} className="text-blue-500 flex gap-1 justify-start items-center">
                                        Reply
                                        <span>
                                            <i title="Reply" className="icon ion-md-redo"></i>
                                        </span>
                                    </a>
                                    <button 
                                        onClick={() => {
                                            setOpenUIBoxes((prev: any) => ({...prev, popup: true}));
                                            setId(message.id)
                                        }}  
                                     className="text-red-500 flex gap-1 justify-start items-center">
                                        Delete
                                        <span>
                                            <i title="Delete" className="icon ion-md-trash"></i>
                                        </span>
                                    </button>
                                </div>
                            </div>
                            <hr className="mt-2 h-4" />
                        </div>
                        )
                    })
                    }
                    { !fetchMessagesIsLoading && fetchMessagesData?.data?.length === 0 && !openUIBoxes.clearData && (
                        <div className="flex flex-col w-full justify-center items-center">
                        <span className="-mb-16">
                            <i id="bigger" className="icon ion-md-chat"></i>
                        </span>
                        <br/>
                        <SubHeading subheading=" You don't have any message yet."/>
                        {/* <p className="w-5/12 mt-1 text-sm text-center">You don't have any active Shipment.</p> */}
                    </div>
                    )}

                    {  messagesRangeData?.data && openUIBoxes.clearData &&
                       messagesRangeData?.data?.map((message: any) => {
                        const mydate = new Date(message?.updatedAt?.slice(0, 10));
                        return(
                        <div className="h-fit desktop:text-2xl text-left w-10/12 px-5 pt-2">
                            <div className="phone:text-xs laptop:text-sm desktop:text-xl tablet:flex phone:bg-transparent phone:gap-0 mb-3 justify-start tablet:rounded-full tablet:bg-amber-200/50 w-fit tablet:px-3 tablet:py-2 tablet:gap-2 items-center">
                                <h3 className="font-bold">{message.name}</h3>
                                <p className="flex justify-start gap-2 items-center">{useDateHandler(mydate)} {message?.updatedAt?.slice(0, 10)}</p>
                            </div>
                            <p></p>
                            <div>
                                <p className="phone:text-base laptop:text-lg desktop:text-2xl">{message.message}</p>
                                <div className="flex phone:text-sm laptop:text-lg desktop:text-2xl justify-start gap-5 items-center mt-2">
                                    <a href={`mailto:${message.email}`} className="text-blue-500 flex gap-1 justify-start items-center">
                                        Reply
                                        <span>
                                            <i title="Reply" className="icon ion-md-redo"></i>
                                        </span>
                                    </a>
                                    <button className="text-red-500 flex gap-1 justify-start items-center">
                                        Delete
                                        <span>
                                            <i title="Delete" className="icon ion-md-trash"></i>
                                        </span>
                                    </button>
                                </div>
                            </div>
                            <hr className="mt-2 h-4" />
                        </div>
                        )
                    })
                    }
                    { (messagesRangeData?.data?.length === 0 || messagesRangeData?.data === 'undefined' || messagesRangeData?.code !== 200 && openUIBoxes.clearData) && (
                        <div className="flex flex-col w-full justify-center items-center">
                        <span className="-mb-16">
                            <i id="bigger" className="icon ion-md-chatboxes"></i>
                        </span>
                        <br/>
                        <SubHeading subheading="No search result found."/>
                        {/* <p className="w-5/12 mt-1 text-sm text-center">You don't have any active Shipment.</p> */}
                    </div>
                    )}
                </div>
            </Section>
        </Holder>
    )
}