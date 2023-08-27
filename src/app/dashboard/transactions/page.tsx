'use client'
import { useState, useEffect, useContext } from "react";
import Boxes from "../boxes";
import BoxesHolder from "../boxesholder";
import ConstantNav from "../constantNav";
import Heading from "../heading";
import Holder from "../holder";
import Section from "../section";
import { useAllFetchTransactions, useCompanyRevenue, useTransactionsSearchRange } from "../services/swr-functions/customer-swr";
import SuccessMessage from "../successmessage";
import SkeletonLoading from "../services/eventhandlers/skeleton-loading";
import { UIBOXES } from "../shipments/active/page";
import { State_data } from "../context/context";
import SearchFilter from "./search";
import Popup from "../services/eventhandlers/popup";
import Input from "../input";
import { NumberComma } from "../numberComma";
import useDateHandler from "../date";
import Link from "next/link";

export default function Transactions(){
    // const {companyRevenueData} = useCompanyRevenue();
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
    const { fetchTransactionsData, fetchTransactionsError, fetchTransactionsIsLoading, fetchTransactionsIsValidating, fetchTransactionsMutate } = useAllFetchTransactions();
    const {transactionsRange,setTransactionsRange} = useContext<any | string>(State_data);
    const {transactionsRangeData, transactionsRangeError, transactionsRangeIsLoading, transactionsRangeIsValidating, transactionsRangeMutate} = useTransactionsSearchRange(transactionsRange);
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
        fetchTransactionsMutate(fetchTransactionsData);
    }, [openUIBoxes.clearData !== true]);

    console.log("sdgyujikuhgfds",fetchTransactionsData)
    
    return(
        <Holder>
               {
                   (fetchTransactionsIsLoading || fetchTransactionsIsValidating && !openUIBoxes.searchBox) &&
                   <SkeletonLoading title="all transactions." />
                }
               {
                   (transactionsRangeIsLoading || transactionsRangeIsValidating && openUIBoxes.searchBox) &&
                   <SkeletonLoading loadingSearching="Searching" title="transactions." />                
                }
            <ConstantNav />
            <Section>
              <Heading heading="Transactions" />  
              {fetchTransactionsData?.data?.length >= 0 && !openUIBoxes.clearData && !transactionsRangeData?.data && <p>You have <span className="font-bold">{fetchTransactionsData?.data?.length || 0}</span> transaction{fetchTransactionsData?.data?.length > 1 && "s"}.</p>}
               {transactionsRangeData !== 'undefined' && openUIBoxes.clearData && <p><span className="font-bold">{transactionsRangeData?.data?.length || 0}</span> transaction match(es) found.</p>}
                { openUIBoxes.clearData &&
                <button onClick={handleClearData} className="text-red-500 mt-3 gap-2 flex font-bold text-sm">
                    <span>
                        <i className="icon ion-md-close"></i>
                    </span>Clear Filter</button>
                }
               {openUIBoxes.searchBox && <SearchFilter inputData={inputData} closeFill={setOpenUIBoxes} />}
               {openUIBoxes.popup && <Popup text="Transaction" closeFill={handleCloseFill} popupShow={openUIBoxes.popup} id={id} />}
               {
                   fetchTransactionsError && successmessage &&
                   <SuccessMessage
                   successMessageShow={successmessage}
                   handleShowSuccessMessage={setSuccessMessage}
                   id="failed"
                   messageTitle="Past transactions cannot be fetched. Check network connection!"
                   />
                }
               {
                   transactionsRangeError && !transactionsRangeData?.data && openUIBoxes.searchBox && successmessage &&
                   <SuccessMessage
                   successMessageShow={successmessage}
                   handleShowSuccessMessage={setSuccessMessage}
                   id="failed"
                   messageTitle="Searching failed, check network connection!"
                   />
                }
               <BoxesHolder>
                    <Boxes
                    icon="icon ion-md-calendar"
                    title="Today"
                    amount={0}
                    name="Today"
                    />

                    <Boxes
                    icon="icon ion-md-browsers"
                    title="This Week"
                    amount={0}
                    name="Calendar"
                    />

                    <Boxes
                    icon="icon ion-md-square-outline"
                    title="This Month"
                    amount={0}
                    name="Calendar Number"
                    />

                    <Boxes
                    icon="icon ion-md-cash"
                    title="Today's Revenue"
                    amount="₦0"
                    name="Today"
                    />

                    <Boxes
                    icon="icon ion-md-card"
                    title="This Week's Revenue"
                    amount="₦0"
                    name="Calendar"
                    />

                    <Boxes
                    icon="icon ion-md-wallet"
                    title="This Month's Revenue"
                    amount="₦0"
                    name="Calendar Number"
                    />                    
               </BoxesHolder>
                 <Input 
                 name="transactions"
                 handleClick={handleOpenSearch}
                 placeholder="Search Transactions"
                 handleChange={handleInputData}
                 searchInput={inputData}
                 />
               <div className="px-5 mt-10">
                 <div className="font-bold grid grid-cols-6 gap-4">
                    <h3>#</h3>
                    <h3>ID</h3>
                    <h3>Parcel</h3>
                    <h3>Amount</h3>
                    <h3>Paid</h3>
                    <h3>Date</h3>
                 </div>
                 <hr className="my-4" />

                 {
                     fetchTransactionsData?.data &&
                     fetchTransactionsData?.data?.map((record: any, index: any) => {
                         const myDate = new Date(record?.createdAt?.slice(0, 10))
                         return (
                            <div>
                                <Link href={`/dashboard/shipments/${record.id}`} key={index} className="grid grid-cols-6 gap-4">
                                    <p className="col-span-1 text-left">{index + 1}</p>
                                    <p className="col-span-1 text-left">{record.trackId.slice(12)}</p>
                                    <p className="col-span-1 text-left">{record.name}</p>
                                    <p className="col-span-1 text-left">₦{NumberComma(record.amount)}</p>
                                    <p className="col-span-1 text-left">{record.paid ? 'Yes' : 'No'}</p>
                                    <p className="col-span-1 text-left">{useDateHandler(myDate)}</p>
                                </Link>
                                <hr className="my-4" />
                            </div>
                         )
                        })
                }
                 {
                    fetchTransactionsData?.data?.length === 0 &&
                    <p className="text-center text-gray-500 mt-8">No data to show.</p>
                 }

                 <div className="flex mt-10 justify-between">
                    <div className="flex justify-start items-center gap-5">
                        <button className="px-3 cursor-pointer py-1 bg-gray-300 rounded-full text-gray-50">
                            <i className="icon ion-md-arrow-back"></i>
                        </button>
                        <p><span className="font-bold">{}</span> of {}</p>
                        <button className="px-3 py-1 bg-gray-300 rounded-full text-gray-50">
                            <i className="icon ion-md-arrow-forward"></i>
                        </button>
                        {/* add input/ section box here */}
                    </div>
                    <div>
                        <p className="p-2 text-sm font-bold rounded-full bg-amber-200/50 text-amber-500">{fetchTransactionsData?.data?.length || '0'} total records</p>
                    </div>
                 </div>
               </div>
            </Section>
        </Holder>
    )
}