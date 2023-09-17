'use client'
import ConstantNav from "../constantNav";
import Heading from "../heading";
import Holder from "../holder";
import Input from "../input";
import Section from "../section";
import { useState, useContext, useEffect } from "react";
import SearchFilter from "./search";
import { useFetchCustomers } from "../services/swr-functions/staff-swr";
import SubHeading from "../preferences/website/subheading";
import SuccessMessage from "../successmessage";
import SkeletonLoading from "../services/eventhandlers/skeleton-loading";
import BoxesHolder from "../boxesholder";
import { State_data } from "../context/context";
import { useCustomerSearchRange } from "../services/swr-functions/customer-swr";
import useDateHandler from "../date";
import Link from "next/link";

export default function Customers(){
    const [inputData, setInputData] = useState<string>('');
    const {fetchCustomersData, fetchCustomersError, fetchCustomersIsLoading, fetchCustomersIsValidating, fetchCustomersMutate} = useFetchCustomers();
    const {customersRange, openUIBoxes, setOpenUIBoxes, successMessage, setSuccessMessage} = useContext<any | string>(State_data);
    const {customerRangeData, customerRangeError, customerRangeIsLoading, customerRangeMutate, customerRangeIsValidating} = useCustomerSearchRange(customersRange);
    const handleOpenSearch = () => {
        setOpenUIBoxes((prev: any) => ({...prev, customerSearch: true, customerClearData: true}))
    }

    const handleInputData = (e: any) => {
        setInputData(e.target.value)
    }

    const handleClearData = () => {
        setOpenUIBoxes((prev: any) => ({...prev, customerClearData: false}));
    }

    useEffect(() => {
        fetchCustomersMutate();
        console.log(customerRangeData);
    }, [openUIBoxes.customerClearData !== true]);

    useEffect(() => {
        customerRangeMutate()
    }, [openUIBoxes.customerSearch === true]);

    return(
        <Holder>
            {
                (fetchCustomersIsLoading || fetchCustomersIsValidating) &&
                <SkeletonLoading title="all customers."/>
            }
            {
               (customerRangeIsLoading || customerRangeIsValidating && openUIBoxes.customerSearch) &&
               <SkeletonLoading loadingSearching="Searching" title="customers." />                
            }
            <ConstantNav />
            <Section>
                    <Heading heading="My Customers" />
                    {fetchCustomersData?.data?.length && !openUIBoxes.customerClearData && !customerRangeData?.data && <p>You have <span className="font-bold">{fetchCustomersData?.data?.length || 0}</span> customer{fetchCustomersData?.data?.length > 1 && "s"}.</p>}
                    {customerRangeData !== 'undefined' && openUIBoxes.customerClearData && <p><span className="font-bold">{customerRangeData?.data?.length || 0}</span> customers match(es) found.</p>}
                    <Input
                    link="/dashboard/customers/create"
                    phonetext="Add"
                    name="customer"
                    laptoptext="New Customer"
                    placeholder="Search Customers"
                    handleClick={handleOpenSearch}
                    handleChange={handleInputData}
                    searchInput={inputData}
                    />
                    { openUIBoxes.customerClearData &&
                        <button onClick={handleClearData} className="text-red-500 mt-3 gap-2 flex font-bold text-sm">
                        <span>
                            <i className="icon ion-md-close"></i>
                        </span>Clear Filter</button>
                    }
                    {openUIBoxes.customerSearch && <SearchFilter inputData={inputData} closeFill={setOpenUIBoxes} /> }  
                        {
                            fetchCustomersError && successMessage.customer &&
                            <SuccessMessage
                            successMessageShow={successMessage.customer}
                            name="customer"
                            id="failed"
                            messageTitle="Customers cannot be fetched. Check network connection!"
                            />
                        }
                        {/* {
                            customerRangeError && !customerRangeData?.data && openUIBoxes.customerSearch && successMessage.customer &&
                            <SuccessMessage
                            successMessageShow={successMessage.customer}
                            handleShowSuccessMessage={setSuccessMessage}
                            id="failed"
                            messageTitle="Searching failed, check network connection!"
                            />
                        } */}
                    <BoxesHolder>
                    {
                        fetchCustomersData?.data && !openUIBoxes.customerClearData &&
                         fetchCustomersData.data.map((customer: any) => {
                            let date  = new Date(customer?.user?.createdAt?.slice(0, 10))
                            return (
                                <div className="bg-gray-50 hover:shadow-lg rounded-xl h-fit phone:w-11/12 tablet:w-5/12 p-5">
                                    <p className="text-xs">{useDateHandler(date)}</p>
                                    <h3 className="text-lg">{customer?.user?.name}</h3>
                                    <p>{customer?.id || 0} parcels shipped</p>
                                    <hr className="my-2" />

                                    <div className="flex text-gray-500 justify-start gap-3 items-center">
                                        <span>
                                            <i className="icon ion-md-mail"></i>
                                        </span>
                                        <p>{customer?.user?.email || 'No email provided'}</p>
                                    </div>

                                    <div className="flex text-gray-500 justify-start gap-3 items-center">
                                        <span>
                                            <i className="icon ion-md-call"></i>
                                        </span>
                                        <p>{customer?.user?.phone || 'No phone number provided'}</p>
                                    </div>

                                    <div className="flex text-gray-500 justify-start gap-3 items-center">
                                        <span>
                                            <i className="icon ion-md-pin"></i>
                                        </span>
                                        <p>{customer?.user?.address || 'No address provided'}</p>
                                    </div>
                                    <div className="text-right text-lg my-2 mr-5">
                                        <Link href={`/dashboard/customers/${customer?.user?.id}`} className="hover:bg-gray-300 text-gray-800 cursor-pointer rounded-full px-3 py-2 bg-gray-200">
                                            <i className="icon ion-md-open"></i>
                                        </Link>                                    
                                    </div>
                                </div>
                            )                   
                        })
                    }

                    { !fetchCustomersIsLoading && fetchCustomersData?.data?.length === 0 && (
                        <div className="flex flex-col w-full justify-center items-center">
                        <span className="-mb-16">
                            <i id="bigger" className="icon ion-md-cube"></i>
                        </span>
                        <br/>
                        <SubHeading subheading=" You don't have any customer yet."/>
                        {/* <p className="w-5/12 mt-1 text-sm text-center">You don't have any active Shipment.</p> */}
                    </div>
                    )}
                    </BoxesHolder>

                    <BoxesHolder>
                    {  customerRangeData?.data && !fetchCustomersData?.data &&
                        (customerRangeData?.data?.map((customer: any) => {
                            let date  = new Date(customer?.user?.createdAt?.slice(0, 10))
                            return (
                            <div className="bg-gray-50 hover:shadow-lg rounded-xl h-fit phone:w-11/12 tablet:w-5/12 p-5">
                                <p className="text-xs">{useDateHandler(date)}</p>
                                <h3 className="text-lg">{customer?.user?.name}</h3>
                                <p>{customer?.id || 0} parcels shipped</p>
                                <hr className="my-2" />

                                <div className="flex text-gray-500 justify-start gap-3 items-center">
                                    <span>
                                        <i className="icon ion-md-mail"></i>
                                    </span>
                                    <p>{customer?.user?.email || 'No email provided'}</p>
                                </div>

                                <div className="flex text-gray-500 justify-start gap-3 items-center">
                                    <span>
                                        <i className="icon ion-md-call"></i>
                                    </span>
                                    <p>{customer?.user?.phone || 'No phone number provided'}</p>
                                </div>

                                <div className="flex text-gray-500 justify-start gap-3 items-center">
                                    <span>
                                        <i className="icon ion-md-pin"></i>
                                    </span>
                                    <p>{customer?.user?.address || 'No address provided'}</p>
                                </div>
                                <div className="text-right text-lg my-2 mr-5">
                                    <span className="hover:text-gray-600 cursor-pointer rounded-full bg-gray-200 p-2">
                                    <i className="icon ion-md-open"></i>
                                    </span>                                    
                                </div>
                            </div>
                            )}))}
                                </BoxesHolder>
                                
                                { (customerRangeData?.data?.length === 0 || customerRangeData?.data === 'undefined' || customerRangeData?.code !== 200 && openUIBoxes.customerClearData) && (
                                    <div className={openUIBoxes.customerClearData ? "flex flex-col w-full justify-center items-center" : "hidden"}>
                                    <span className="-mb-16">
                                        <i id="bigger" className="icon ion-md-cube"></i>
                                    </span>
                                    <br/>
                                    <SubHeading subheading="Search Results"/>
                                    <p className="w-5/12 mt-1 text-sm text-center">We found {customerRangeData?.data?.length || 0} results in total.</p>
                                </div>
                                )}
                </Section>
        </Holder>
    )
}