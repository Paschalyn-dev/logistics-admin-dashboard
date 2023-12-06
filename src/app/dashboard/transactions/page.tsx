'use client'
import { useState, useEffect, useContext } from "react";
import Boxes from "../boxes";
import BoxesHolder from "../boxesholder";
import ConstantNav from "../constantNav";
import Heading from "../heading";
import Holder from "../holder";
import Section from "../section";
import { useAllFetchTransactions, useCompanyRevenue, useGetMonthlyRevenue, useTodayRevenue, useTransactionsSearchRange, useWeekRevenue } from "../services/swr-functions/customer-swr";
import SuccessMessage from "../successmessage";
import SkeletonLoading from "../services/eventhandlers/skeleton-loading";
import { State_data } from "../context/context";
import SearchFilter from "./search";
import Popup from "../services/eventhandlers/popup";
import Input from "../input";
import { NumberComma } from "../numberComma";
import { useDateHandler } from "../date";
import Link from "next/link";

export default function Transactions(){
    const { fetchTransactionsData, fetchTransactionsError, fetchTransactionsIsLoading, fetchTransactionsIsValidating, fetchTransactionsMutate } = useAllFetchTransactions();
    const {openUIBoxes, setInputData, inputData, setOpenUIBoxes, successMessage, searchData} = useContext<any | string>(State_data);
    const [formData, setFormData] = useState({
        numberShown: 0,
        pageInTotal: 0,
        searchNumberShown: 0,
        searchPageInTotal: 0
    });
    const [code, setCode] = useState(1);
    const [sliceNum, setSliceNum] = useState(0);
    const [searchCode, setSearchCode] = useState(1);
    const [searchSliceNum, setSearchSliceNum] = useState(0);

    const handleNextPage = () => {
        if(fetchTransactionsData?.data && !openUIBoxes.transactionClearData){
            setCode((prev: any) => prev + 1)
            setSliceNum(formData?.numberShown * code)
        }

        if(searchData?.transactionResult !== '' && openUIBoxes.transactionClearData){
            setSearchCode((prev: any) => prev + 1)
            setSearchSliceNum(formData?.searchNumberShown * searchCode)
        }
    }

    const [disabled, setDisabled] = useState({
        code: false,
        pageInTotal: false,
    });

    useEffect(() => {
        if(fetchTransactionsData?.data && !openUIBoxes.transactionClearData){
            if(code === 1){
                setDisabled((prev: any) => ({...prev, code: true}))
            }
            else{
                setDisabled((prev: any) => ({...prev, code: false}))
            }
        }
        if( searchData?.transactionResult?.data && openUIBoxes.transactionClearData ){
            if(searchCode === 1){
                setDisabled((prev: any) => ({...prev, code: true}))
            }
            else{
                setDisabled((prev: any) => ({...prev, code: false}))
            }
        }
        if(fetchTransactionsData?.data && !openUIBoxes.transactionClearData){
            if(code === formData?.pageInTotal){
                setDisabled((prev: any) => ({...prev, pageInTotal: true}))
            }
            else{
                setDisabled((prev: any) => ({...prev, pageInTotal: false}))
            }
        }
        if( searchData?.transactionResult?.data && openUIBoxes.transactionClearData ){
            if(searchCode === formData?.searchPageInTotal){
                setDisabled((prev: any) => ({...prev, pageInTotal: true}))
            }
            else{
                setDisabled((prev: any) => ({...prev, pageInTotal: false}))
            }
        }
    }, [formData?.pageInTotal, formData?.searchPageInTotal, code, searchCode])

    const handlePrevPage = () => {
        if(fetchTransactionsData?.data && !openUIBoxes.transactionClearData){
            setCode((prev: any) => prev - 1)
            setSliceNum(sliceNum - formData?.numberShown) 
        }
        if(searchData?.transactionResult !== '' && openUIBoxes.transactionClearData){
            setSearchCode((prev: any) => prev - 1)
            setSearchSliceNum(searchSliceNum - formData?.searchNumberShown)  
        }
    }
    useEffect(() => {
        setFormData((prev: any) => ({...prev, numberShown: Number(fetchTransactionsData?.data?.length / 3)}))
    }, [fetchTransactionsData?.data?.length])

    useEffect(() => {
        const divide = searchData?.transactionResult?.data?.length / 3;
        if(searchData?.transactionResult?.data?.length < 20){
            setFormData((prev: any) => ({...prev, searchNumberShown: Number(searchData?.transactionResult?.data?.length / 3)}))
        }
        else{
            setFormData((prev: any) => ({...prev, searchNumberShown: Number(searchData?.transactionResult?.data?.length / divide)}))
        }
    }, [searchData?.transactionResult?.data?.length])

    useEffect(() => {
        const ans = Math.ceil(Number(fetchTransactionsData?.data?.length/formData?.numberShown));
        if(formData?.numberShown > 0){
        setFormData((prev: any) => ({...prev, pageInTotal: ans > fetchTransactionsData?.data?.length ? fetchTransactionsData?.data?.length : ans}))
        }
        else{
            setFormData((prev: any) => ({...prev, pageInTotal: 0}))
        }
    }, [formData?.numberShown])

    useEffect(() => {
        const ans = Math.ceil(Number(searchData?.transactionResult?.data?.length/formData?.searchNumberShown));
        if(formData?.searchNumberShown > 0){
        setFormData((prev: any) => ({...prev, searchPageInTotal: ans > searchData?.transactionResult?.data?.length ? searchData?.transactionResult?.data?.length : ans}))
        }
        else{
            setFormData((prev: any) => ({...prev, searchPageInTotal: 0}))
        }
    }, [formData?.searchNumberShown])

    const handleNumberShown = (e: any) => {
        if(fetchTransactionsData?.data && !openUIBoxes.transactionClearData){
            if(e.target.value < 1){
                setFormData((prev: any) => ({...prev, numberShown: 1}))
            }
            else{
                setFormData((prev: any) => ({...prev, numberShown: e.target.value > fetchTransactionsData?.data?.length ? 
                fetchTransactionsData?.data?.length  : e.target.value}))
            }
            setCode(1)
            setSliceNum(0)
        }
        if(searchData?.transactionResult !== '' && openUIBoxes.transactionClearData){
            if(e.target.value < 1){
                setFormData((prev: any) => ({...prev, searchNumberShown: 1}))
            }
            else{
                setFormData((prev: any) => ({...prev, searchNumberShown: e.target.value > searchData?.transactionResult?.data?.length ? 
                    searchData?.transactionResult?.data?.length  : e.target.value}))
            }
            setSearchCode(1)
            setSearchSliceNum(0)
        }
    }

    const handleOpenSearch = () => {
        setOpenUIBoxes((prev: any) => ({...prev, transactionSearch: true, transactionClearData: true}))
    }
    const handleClearData = () => {
        setOpenUIBoxes((prev: any) => ({...prev, transactionClearData: false}))
    }
    const {fetchMonthlyRevenueData} = useGetMonthlyRevenue();
    const {weekRevenueData} = useWeekRevenue()
    const {todayRevenueData} = useTodayRevenue();
    useEffect(() => {
        fetchTransactionsMutate(fetchTransactionsData);
    }, [openUIBoxes.transactionClearData !== true]);
    const todayRevenueTotal = todayRevenueData?.data?.reduce((prevAmount: any, currAmount: any) => {return prevAmount + currAmount.amount}, 0)
    const weekRevenueTotal = weekRevenueData?.data?.reduce((prevAmount: any, currAmount: any) => {return prevAmount + currAmount.amount}, 0)
    const monthlyRevenueTotal = fetchMonthlyRevenueData?.data?.reduce((prevAmount: any, currAmount: any) => {return prevAmount + currAmount.amount}, 0)
    return(
        <Holder>
               {
                   (fetchTransactionsIsLoading || fetchTransactionsIsValidating && !openUIBoxes.transactionSearch) &&
                   <SkeletonLoading title="all transactions" />
                }
               {
                    ((searchData?.transactionResult === "" && searchData?.transactionCode !== "") && openUIBoxes.transactionSearch) &&
                    <SkeletonLoading loadingSearching="Searching" title="transactions" />                
                }
            <ConstantNav />
            <Section>
              <Heading heading="Transactions" />  
                {
                    fetchTransactionsError && successMessage.transaction &&
                    <SuccessMessage
                    successMessageShow={successMessage.transaction}
                    name="transaction"
                    id="failed"
                    messageTitle="Past transactions cannot be fetched. Check network connection!"
                    />
                }

               <BoxesHolder>
                    <Boxes
                    icon="icon ion-md-calendar"
                    title="Today"
                    amount={NumberComma(todayRevenueData?.data?.length) || '0'}
                    name="Today"
                    />

                    <Boxes
                    icon="icon ion-md-browsers"
                    title="This Week"
                    amount={NumberComma(weekRevenueData?.data?.length) || '0'}
                    name="Calendar"
                    />

                    <Boxes
                    icon="icon ion-md-square-outline"
                    title="This Month"
                    amount={ NumberComma(fetchMonthlyRevenueData?.data?.length) || "0"} 
                    name="Calendar Number"
                    />

                    <Boxes
                    icon="icon ion-md-cash"
                    title="Today's Revenue"
                    amount={'₦' + (todayRevenueTotal >= 1000 ? NumberComma(todayRevenueTotal) : todayRevenueTotal || '0')}
                    name="Today"
                    />

                    <Boxes
                    icon="icon ion-md-card"
                    title="This Week's Revenue"
                    amount={'₦' + (weekRevenueTotal >= 1000 ? NumberComma(weekRevenueTotal) : weekRevenueTotal || '0')}
                    name="Calendar"
                    />

                    <Boxes
                    icon="icon ion-md-wallet"
                    title="This Month's Revenue"
                    amount={'₦' + (monthlyRevenueTotal >= 1000 ? NumberComma(monthlyRevenueTotal) : monthlyRevenueTotal || "0")} 
                    name="Calendar Number"
                    />                    
               </BoxesHolder>
                 <Input 
                 name="transaction"
                 handleClick={handleOpenSearch}
                 placeholder="Search Transactions"
                 searchInput={inputData.transaction}
                 />
                 { openUIBoxes.transactionClearData &&
                 <button onClick={handleClearData} className="text-red-500 mt-3 gap-2 flex font-bold text-sm">
                     <span>
                         <i className="icon ion-md-close"></i>
                     </span>Clear Filter</button>
                 }
                 {openUIBoxes.transactionSearch && <SearchFilter inputData={inputData.transaction} closeFill={setOpenUIBoxes} />}
                 {fetchTransactionsData?.data?.length >= 0 && !openUIBoxes.transactionClearData && !searchData?.transactionResult?.data && <p>You have <span className="font-bold">{fetchTransactionsData?.data?.length || 0}</span> transaction{fetchTransactionsData?.data?.length > 1 && "s"}.</p>}
                 {searchData?.transactionResult !== '' && openUIBoxes.transactionClearData && <p><span className="font-bold">{searchData?.transactionResult?.data?.length || 0}</span> transaction match(es) found.</p>}
               <div className="px-5 mt-10">
                 <div className="font-bold tablet:text-base phone:text-xs grid grid-cols-7 gap-6">
                    <h3>#</h3>
                    <h3>ID</h3>
                    <h3 className="col-span-2">Parcel</h3>
                    <h3 title="Amount">Amt (₦)</h3>
                    <h3>Paid</h3>
                    <h3>Date</h3>
                 </div>
                 <hr className="my-4" />

                 {
                     fetchTransactionsData?.data && !openUIBoxes.transactionClearData &&
                     fetchTransactionsData?.data?.slice(sliceNum, formData?.numberShown * code)?.map((record: any, index: any) => {
                         return (
                             <div key={record?.id}>
                                <Link title="Click to view" href={`/dashboard/shipments/${record.id}`} key={index} className="grid tablet:text-base phone:text-xs grid-cols-7 gap-6">
                                    <p className="col-span-1 text-left">{fetchTransactionsData?.data?.indexOf(record) + 1}</p>
                                    {/* <p className="col-span-1 text-left">{index + 1}</p> */}
                                    <p className="col-span-1 text-left">{record.trackId.slice(12, 16)}</p>
                                    <p className="col-span-2 text-left">{record.name}</p>
                                    <p className="col-span-1 text-left">{NumberComma(record.amount)}</p>
                                    <p className="col-span-1 text-left">{record.paid ? 'Yes' : 'No'}</p>
                                    <p className="col-span-1 text-left">{useDateHandler(record?.createdAt)}</p>
                                </Link>
                                <hr className="my-4" />
                            </div>
                         )
                        })
                    }
                 {
                    !fetchTransactionsIsLoading && fetchTransactionsData?.data?.length === 0 &&
                    <p className={!openUIBoxes.transactionClearData ? "text-center text-gray-500 mt-8" : "hidden"}>No data to show.</p>
                 }
                 
                {
                     searchData?.transactionResult?.data && openUIBoxes.transactionClearData &&
                     searchData?.transactionResult?.data?.slice(searchSliceNum, formData?.searchNumberShown * searchCode)?.map((record: any, index: any) => {
                         return (
                             <div key={record?.id}>
                                <Link title="Click to view" href={`/dashboard/shipments/${record.id}`} key={index} className="grid tablet:text-base phone:text-xs grid-cols-7 gap-6">
                                    <p className="col-span-1 text-left">{searchData?.transactionResult?.data?.indexOf(record) + 1}</p>
                                    <p className="col-span-1 text-left">{record.trackId.slice(12, 16)}</p>
                                    <p className="col-span-2 text-left">{record.name}</p>
                                    <p className="col-span-1 text-left">{NumberComma(record.amount)}</p>
                                    <p className="col-span-1 text-left">{record.paid ? 'Yes' : 'No'}</p>
                                    <p className="col-span-1 text-left">{useDateHandler(record?.createdAt)}</p>
                                </Link>
                                <hr className="my-4" />
                            </div>
                         )
                        })
                    }
                 {
                    (searchData?.transactionResult?.data?.length === 0 || searchData?.transactionResult?.data === '' || searchData?.transactionResult?.code !== 200 && openUIBoxes.transactionClearData) && 
                    <p className={openUIBoxes.transactionClearData ? "text-center text-gray-500 mt-8" : "hidden"}>No search found.</p>
                 }

                 <div className="flex mt-10 justify-between flex-wrap gap-4">
                    <div className="flex justify-start items-center gap-5">
                        <button onClick={handlePrevPage} disabled={disabled.code} className="px-3 cursor-pointer py-1 bg-gray-300 rounded-full text-gray-50">
                            <i className="icon ion-md-arrow-back"></i>
                        </button>
                        <p><span className="font-bold">{!openUIBoxes.transactionClearData ? code : searchCode}</span> of {!openUIBoxes.transactionClearData ? formData?.pageInTotal : formData?.searchPageInTotal}</p>
                        <button onClick={handleNextPage} disabled={disabled.pageInTotal} className="px-3 py-1 bg-gray-300 rounded-full text-gray-50">
                            <i className="icon ion-md-arrow-forward"></i>
                        </button>
                        <input className="font-bold w-10 outline-none border-none" max={!openUIBoxes.transactionClearData ? fetchTransactionsData?.data?.length : searchData?.transactionResult?.data?.length} min="1" type="number" name="numberShown" value={!openUIBoxes.transactionClearData ? formData?.numberShown || "" : formData?.searchNumberShown || ""} onChange={handleNumberShown} />           
                    </div>
                    <div>
                        <p className="p-2 text-sm font-bold rounded-full bg-amber-200/50 text-amber-500">{!openUIBoxes.transactionClearData ? fetchTransactionsData?.data?.length || '0' : searchData?.transactionResult?.data?.length || '0' } total records</p>
                    </div>
                 </div>
               </div>
            </Section>
        </Holder>
    )
}