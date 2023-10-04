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
import { useDateHandler } from "../date";
import { UIBOXES } from "../shipments/active/page";
import { State_data } from "../context/context";
import { useMessagesSearchRange } from "../services/swr-functions/customer-swr";
import SearchFilter from "./search";
import Popup from "../services/eventhandlers/popup";
import Input from "../input";

export default function Message(){
    const [inputData, setInputData] = useState<string>('');
    const {setDeleteWithId, openUIBoxes, setOpenUIBoxes, messagesRange, deleteWithId, successMessage, setSuccessMessage} = useContext(State_data);
    const {messagesRangeData, messagesRangeError, messagesRangeIsLoading, messagesRangeIsValidating, messagesRangeMutate} = useMessagesSearchRange(messagesRange)
    const {fetchMessagesData, fetchMessagesError, fetchMessagesIsLoading, fetchMessagesIsValidating, fetchMessagesMutate} = useFetchMessages();
    const handleOpenSearch = () => {
        setOpenUIBoxes((prev: any) => ({...prev, messageSearch: true, messageClearData: true}))
    }
    const handleInputData = (e: any) => {
        setInputData(e.target.value)
    }
    const handleClearData = () => {
        setOpenUIBoxes((prev: any) => ({...prev, messageClearData: false}))
    }

    const handleCloseFill = () => {
        setOpenUIBoxes((prev: any) => ({...prev, messagePopup: false}))
    }

    useEffect(() => {
        fetchMessagesMutate(fetchMessagesData);
    }, [openUIBoxes.messageClearData !== true]);  
    
    return(
        <Holder>
               {
               (fetchMessagesIsLoading || fetchMessagesIsValidating && !openUIBoxes.messageSearch) &&
               <SkeletonLoading title="all messages." />
               }
               {
               (messagesRangeIsLoading || messagesRangeIsValidating && openUIBoxes.messageSearch) &&
               <SkeletonLoading loadingSearching="Searching" title="messages." />                
               }
            <ConstantNav />
            <Section>
                <Heading heading="Messages" />
                {fetchMessagesData?.data?.length >= 0 && !openUIBoxes.messageClearData && <p>You have <span className="font-bold">{fetchMessagesData?.data?.length || 0}</span> message {fetchMessagesData?.data?.length > 1 && "s"}.</p>}
               {messagesRangeData !== 'undefined' && openUIBoxes.messageClearData && <p><span className="font-bold">{messagesRangeData?.data?.length || 0}</span> message match(es) found.</p>}
               <Input
               name="messages"
                handleClick={handleOpenSearch}
                placeholder="Search Shipments"
                handleChange={handleInputData}
                searchInput={inputData}
                />
                { openUIBoxes.messageClearData &&
                <button onClick={handleClearData} className="text-red-500 mt-3 gap-2 flex font-bold text-sm">
                    <span>
                        <i className="icon ion-md-close"></i>
                    </span>Clear Filter</button>
                }
               {openUIBoxes.messageSearch && <SearchFilter inputData={inputData} closeFill={setOpenUIBoxes} />}
               {openUIBoxes.messagePopup && <Popup text="Message" closeFill={handleCloseFill} name="messages" popupShow={openUIBoxes.messagePopup} id={deleteWithId.messages} />}
               {
                fetchMessagesError && successMessage.messages &&
                <SuccessMessage
                name="messages"
                successMessageShow={successMessage.messages}
                id="failed"
                messageTitle="Messages cannot be fetched. Check network connection!"
                />
            }
               {
                   messagesRangeError && openUIBoxes.messageSearch && successMessage.messages &&
                   <SuccessMessage
                   successMessageShow={successMessage.messages}
                   name="messages"
                   id="failed"
                   messageTitle="Searching failed, check network connection!"
                   />
                }

                <div className="h-full flex flex-wrap tablet:justify-start phone:justify-start m-auto items-start tablet:gap-5 phone:gap-3 mt-5 w-full p-1">
                    {fetchMessagesData?.data && !openUIBoxes.messageClearData &&
                    fetchMessagesData?.data?.map((message: any) => {
                        return(
                        <div className="h-fit desktop:text-2xl text-left w-10/12 px-5 pt-2">
                            <div className="phone:text-xs laptop:text-sm desktop:text-xl tablet:flex phone:bg-transparent phone:gap-0 mb-3 justify-start tablet:rounded-full tablet:bg-amber-200/50 w-fit tablet:px-3 tablet:py-2 tablet:gap-2 items-center">
                                <h3 className="font-bold">{message.name}</h3>
                                <p className="flex justify-start gap-2 items-center">{useDateHandler(message?.createdAt)} </p>
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
                                            setOpenUIBoxes((prev: any) => ({...prev, messagePopup: true}));
                                            setDeleteWithId((prev: any) => ({...prev, messages: message?.id}));
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
                    { !fetchMessagesIsLoading && fetchMessagesData?.data?.length === 0 && !openUIBoxes.messageClearData && (
                        <div className="flex flex-col w-full justify-center items-center">
                        <span className="-mb-16">
                            <i id="bigger" className="icon ion-md-chat"></i>
                        </span>
                        <br/>
                        <SubHeading subheading=" You don't have any message yet."/>
                        {/* <p className="w-5/12 mt-1 text-sm text-center">You don't have any active Shipment.</p> */}
                    </div>
                    )}

                    {  messagesRangeData?.data && openUIBoxes.messageClearData &&
                       messagesRangeData?.data?.map((message: any) => {
                        return(
                        <div className="h-fit desktop:text-2xl text-left w-10/12 px-5 pt-2">
                            <div className="phone:text-xs laptop:text-sm desktop:text-xl tablet:flex phone:bg-transparent phone:gap-0 mb-3 justify-start tablet:rounded-full tablet:bg-amber-200/50 w-fit tablet:px-3 tablet:py-2 tablet:gap-2 items-center">
                                <h3 className="font-bold">{message.name}</h3>
                                <p className="flex justify-start gap-2 items-center">{useDateHandler(message?.createdAt)} </p>
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
                                        setOpenUIBoxes((prev: any) => ({...prev, messagePopup: true}));
                                        setDeleteWithId((prev: any) => ({...prev, messages: message?.id}));
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
                    { (messagesRangeData?.data?.length === 0 || messagesRangeData?.data === 'undefined' || messagesRangeData?.code !== 200 && openUIBoxes.messageClearData) && (
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