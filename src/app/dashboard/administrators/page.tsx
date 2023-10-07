'use client'
import ConstantNav from "../constantNav";
import Heading from "../heading";
import Holder from "../holder";
import Input from "../input";
import Section from "../section";
import { useContext, useEffect } from "react";
import SearchFilter from "./search";
import SubHeading from "../preferences/website/subheading";
import { useFetchStaff } from "../services/swr-functions/staff-swr";
import SuccessMessage from "../successmessage";
import SkeletonLoading from "../services/eventhandlers/skeleton-loading";
import BoxesHolder from "../boxesholder";
import { State_data } from "../context/context";
import Link from "next/link";
import Popup from "../services/eventhandlers/popup";
import { useDateHandler } from "../date";

export default function Administrators(){
    const {fetchStaffData, fetchStaffError, fetchStaffIsLoading, fetchStaffIsValidating, fetchStaffMutate} = useFetchStaff();
    const {setDeleteWithId, inputData, administratorsRange, deleteWithId, openUIBoxes, setOpenUIBoxes, successMessage,setSearchData, searchData, setSuccessMessage} = useContext(State_data);
    const handleOpenSearch = () => {
        setOpenUIBoxes((prev: any) => ({...prev, administratorSearch: true, administratorClearData: true}))
    }
    
    const handleClearData = () => {
        setOpenUIBoxes((prev: any) => ({...prev, administratorClearData: false}))
    }

    const handleCloseFill = () => {
        setOpenUIBoxes((prev: any) => ({...prev, administratorPopup: false}))
    }

    useEffect(() => {
        fetchStaffMutate();
    }, [openUIBoxes.administratorClearData !== true]);

    return(
    <Holder>
        {
            (fetchStaffIsLoading || fetchStaffIsValidating) && 
            <SkeletonLoading title="all administrators" />
        }
        {
            ((searchData?.administratorResult === "" && searchData?.administratorCode !== "") && openUIBoxes.administratorSearch) &&
            <SkeletonLoading loadingSearching="Searching" title="administrators" />                
        }
        <ConstantNav />
        <Section>
            <Heading heading="My Administrators" />
                {fetchStaffData?.data?.length >= 0 && !openUIBoxes.administratorClearData && <p>You have <span className="font-bold">{fetchStaffData?.data?.length || 0}</span> administrator{fetchStaffData?.data?.length > 1 && "s"}.</p>}
                {searchData?.administratorResult !== "" && openUIBoxes.administratorClearData && <p><span className="font-bold">{searchData?.administratorResult?.data?.length || 0}</span> administrators match(es) found.</p>}
                <Input 
                link="/dashboard/administrators/create"
                placeholder="Search Administrator" 
                name="administrator" 
                handleClick={handleOpenSearch}
                phonetext="Add" 
                laptoptext="New Administrator" 
                searchInput={inputData.administrator}
                />

                { openUIBoxes.administratorClearData &&
                    <button onClick={handleClearData} className="text-red-500 mt-3 gap-2 flex font-bold text-sm">
                    <span>
                        <i className="icon ion-md-close"></i>
                    </span>Clear Filter</button>
                }
                
                {openUIBoxes.administratorSearch && <SearchFilter inputData={inputData.administrator} closeFill={setOpenUIBoxes} /> }   
                {openUIBoxes.administratorPopup && <Popup text="Administrator" closeFill={handleCloseFill} popupShow={openUIBoxes.administratorPopup} mutateSearch={searchData?.administratorResult?.data} mutate={fetchStaffMutate} name="administrators" id={deleteWithId.administrators} />}

                {
                    fetchStaffError && successMessage.administrator &&
                    <SuccessMessage
                    successMessageShow={successMessage.administrator}
                    name="administrator"
                    id="failed"
                    messageTitle="Administrators cannot be fetched. Check network connection!"
                    />
                }
                <BoxesHolder>
                {fetchStaffData?.data && !openUIBoxes.administratorClearData && 
                (fetchStaffData?.data?.map((staff: any) => {
                    return(
                    <div className="bg-gray-50 hover:shadow-lg rounded-xl h-fit phone:w-11/12 tablet:w-5/12 p-5">
                            <div>
                                <p className="capitalize text-lg mt-2">{staff?.fullName}</p>
                                <p className="text-sm my-2 capitalize">{staff?.role}</p>
                                <p className="text-xs">{useDateHandler(staff?.createdAt)}</p>
                            </div>

                            <hr className="my-4" />

                            <div className="flex my-2 text-gray-500 justify-start gap-3 items-center">
                                <span>
                                    <i className="icon ion-md-mail"></i>
                                </span>
                                <p>{staff?.email || 'No email provided'}</p>
                            </div>

                            <div className="flex my-2 text-gray-500 justify-start gap-3 items-center">
                                <span>
                                    <i className="icon ion-md-call"></i>
                                </span>
                                <p>{staff?.phone || 'No phone number provided'}</p>
                            </div>

                            <div className="flex my-2 text-gray-500 justify-start gap-3 items-center">
                                <span>
                                    <i className="icon ion-md-pin"></i>
                                </span>
                                <p>{staff?.address?.street + staff?.address?.city + '...'
                                || 'No address provided'}</p>
                            </div>

                            <div className="text-right mt-10 mb-5">
                                <Link href={`/dashboard/administrators/${staff?.id}`} 
                                className="hover:text-gray-600 cursor-pointer rounded-full bg-gray-200 px-3 py-2">
                                    <i className="icon ion-md-open"></i>
                                </Link>
                                <Link href={`/dashboard/administrators/${staff?.id}/edit`} 
                                className="hover:text-gray-600 mx-2 cursor-pointer rounded-full bg-gray-200 px-3 py-2">
                                    <i className="icon ion-md-create"></i>
                                </Link>
                                <span  onClick={() => {
                                        setOpenUIBoxes((prev: any) => ({...prev, administratorPopup: true}));
                                        setDeleteWithId((prev: any) => ({...prev, administrators: staff?.id}));
                                }}  
                                 className="hover:text-red-400 text-red-500 cursor-pointer rounded-full bg-red-100 px-3 py-2">
                                <i className="icon ion-md-trash"></i>
                                </span>
                            </div>
                    </div>
                )}))}
                </BoxesHolder>        
                        
                { !fetchStaffIsLoading && fetchStaffData?.data?.length === 0 && !openUIBoxes.administratorClearData && (
                    <div className="flex flex-col w-full justify-center items-center">
                        <span className="-mb-16">
                            <i id="bigger" className="icon ion-md-person"></i>
                        </span>
                        <br/>
                        <SubHeading subheading="No Staff found."/>
                        {/* <p className="w-5/12 mt-1 text-sm text-center">You have no delivered parcel yet.</p> */}
                    </div>
                )}

                {openUIBoxes.administratorClearData && <SubHeading subheading="Search Results" />}

                <BoxesHolder>    
                    {  searchData?.administratorResult?.data && openUIBoxes.administratorClearData &&
                            (searchData?.administratorResult?.data.map((staff: any) => {
                                return(
                                <div className="bg-gray-50 hover:shadow-lg rounded-xl h-fit phone:w-11/12 tablet:w-5/12 p-5">
                                        <div>
                                            <p className="capitalize text-lg mt-2">{staff?.fullName}</p>
                                            <p className="text-sm my-2 capitalize">{staff?.role}</p>
                                            <p className="text-xs">{useDateHandler(staff?.createdAt)}</p>
                                        </div>
            
                                <hr className="my-4" />
    
                                <div className="flex my-2 text-gray-500 justify-start gap-3 items-center">
                                    <span>
                                        <i className="icon ion-md-mail"></i>
                                    </span>
                                    <p>{staff?.email || 'No email provided'}</p>
                                </div>
    
                                <div className="flex my-2 text-gray-500 justify-start gap-3 items-center">
                                    <span>
                                        <i className="icon ion-md-call"></i>
                                    </span>
                                    <p>{staff?.phone || 'No phone number provided'}</p>
                                </div>
    
                                <div className="flex my-2 text-gray-500 justify-start gap-3 items-center">
                                    <span>
                                        <i className="icon ion-md-pin"></i>
                                    </span>
                                    <p>{staff?.address?.street + staff?.address?.city + '...'
                                    || 'No address provided'}</p>
                                </div>
    
                                <div className="text-right mt-10 mb-5">
                                    <Link href={`/dashboard/administrators/${staff?.id}`} className="hover:text-gray-600 cursor-pointer rounded-full bg-gray-200 p-2">
                                        <i className="icon ion-md-open"></i>
                                    </Link>
                                    <Link href={`/dashboard/administrators/${staff?.id}/edit`} 
                                    className="hover:text-gray-600 mx-3 cursor-pointer rounded-full bg-gray-200 p-2">
                                        <i className="icon ion-md-create"></i>
                                    </Link>
                                    <span onClick={() => {
                                        setOpenUIBoxes((prev: any) => ({...prev, administratorPopup: true}));
                                        setDeleteWithId((prev: any) => ({...prev, administrators: staff?.id}));
                                    }}                                       
                                    className="hover:text-red-400 text-red-500 cursor-pointer rounded-full bg-red-100 p-2">
                                    <i className="icon ion-md-trash"></i>
                                    </span>
                                </div>
                        </div>
                    )}))}
                    </BoxesHolder>        
    
                    { (searchData?.administratorResult?.data?.length === 0 || searchData?.administratorResult?.data === 'undefined' || searchData?.administratorResult?.code !== 200 && openUIBoxes.administratorClearData) && (
                        <div className="flex flex-col w-full justify-center items-center">
                            <span className="-mb-16">
                                <i id="bigger" className="icon ion-md-person"></i>
                            </span>
                            <br/>
                            <SubHeading subheading="No search result found."/>
                        </div>
                    )}
            </Section>
        </Holder>
    )
}