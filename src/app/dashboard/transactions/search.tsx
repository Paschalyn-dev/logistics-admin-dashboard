'use client'
import { useEffect, useState } from "react";
import ToggleButton from "../preferences/shipment/toggleButton";
import { useTransactionsSearchRange } from "../services/swr-functions/customer-swr";
import { State_data } from "../context/context";
import { useContext} from "react";
import { Password } from "../formik/password";
import { customerAPIUrl } from "../services/api-url/customer-api-url";
import { authorizationKeyCustomer } from "../services/customer-api/api";


export default function SearchFilter({inputData, closeFill}: any){
    const {inputField, setInputField, searchFields, setSearchFields, createdAtEnd, setCreatedAtEnd, searchData, setSearchData, setCreatedAtStart, createdAtStart, setAmountEnd, setAmountStart, amountStart, amountEnd, transactionsRange, setTransactionsRange} = useContext<any | string>(State_data);
    const [searchToggleButtons, setSearchToggleButtons] = useState({
        trackId: true,
        parcel: true,
        amount: true
    })
    
    const [formData, setFormData] =  useState({
        startdate: '',
        enddate: '',
        startprice: '',
        endprice: ''
    })
    
    const filtered = () => {
        const values = Object.entries(searchToggleButtons)
        const val = values.filter((v: any) => {
            return v.includes(true)
        })
        return(val.map(v => v[0]))
    }
        
    
    function handleTrackId(){
        setSearchToggleButtons((prev: any) => ({
            ...prev, trackId: !searchToggleButtons.trackId
        }))
    }
    
    function handleParcel(){
        setSearchToggleButtons((prev: any) => ({
            ...prev, parcel: !searchToggleButtons.parcel
        }))
    }
        
    function handleAmount(){
        setSearchToggleButtons((prev: any) => ({
            ...prev, amount: !searchToggleButtons.amount
        }))
    }
    const handleInput = () => {
        setInputField((prev: any) => ({
            ...prev, transactionsRange: inputData,
        }))
    }
    
    const handleSearchField = () => {
        setSearchFields((prev: any) => ({
            ...prev, transactionsRange: filtered(),
        }))
    }
    
    const handleSetCreatedAtStart = () => {
        setCreatedAtStart((prev: any) => ({
            ...prev, transactionsRange: formData.startdate
        }))
    }
    
    const handleSetCreatedAtEnd = () => {
        setCreatedAtEnd((prev: any) => ({
            ...prev, transactionsRange: formData.enddate
        }))
    }
    
    const handleSetAmountStart = () => {
        setAmountStart((prev: any) => ({
            ...prev, transactionsRange: formData.startprice
        }))
    }
    
    const handleSetAmountEnd = () => {
        setAmountEnd((prev: any) => ({
            ...prev, transactionsRange: formData.endprice
        }))
    }

    async function handleSearch(transactionsRangeQuery: any){
        const response = await fetch(customerAPIUrl.searchTransactions(transactionsRangeQuery), {
            method: 'GET',
            headers: {
                'Authorization': authorizationKeyCustomer
            }
        });
        const data = await response.json();
        setSearchData((prev: any) => ({...prev, transactionResult: data}));
    }

    useEffect(() => {
        handleInput();
    }, [inputData]);

    useEffect(() => {
        if(transactionsRange !== null){
            handleSearch(transactionsRange);
        }
    }, [searchData?.transactionCode])

    function handleSearchSubmit(e: any){
        e.preventDefault();
        handleSearchField();
        handleSetAmountEnd();
        handleSetCreatedAtEnd();
        handleSetAmountStart();
        handleSetCreatedAtStart();
        setTransactionsRange({inputField, searchFields, amountStart, amountEnd, createdAtStart, createdAtEnd})
        setSearchData((prev: any) => ({...prev, transactionResult: "", transactionCode: Password()}));
        setTimeout(() => {closeFill((prev: any) => ({...prev, transactionSearch: false}));}, 500)    
    }

    return(
        <div>
    <div className="cursor-pointer z-20 bottom-0 fixed h-screen w-screen " onClick={() => closeFill((prev: any) => ({...prev, transactionSearch: false}))}/>
        <div className="flex justify-center items-start laptop:w-3/4 after-tablet:w-10/12 tablet:w-full phone:w-full"> 
        <div className="relative animate__animated animate__headShake z-30 bg-gray-50 p-6 phone:h-4/6 tablet:h-4/6 mt-10 w-3/4 rounded-lg">
            <div className="flex justify-start gap-2 items-center">
                <i id="icon" className="icon ion-md-funnel"></i>
                <h3>Filter</h3>
            </div>
            <div className="flex flex-wrap justify-between items-center">
            <ToggleButton
            title="ID"  
            onOff={searchToggleButtons.trackId}
            handleOnOff={handleTrackId}               
            />

            <ToggleButton
            title="Parcel"                 
            onOff={searchToggleButtons.parcel} 
            handleOnOff={handleParcel}              
            />

            <ToggleButton
            title="Amount"
            onOff={searchToggleButtons.amount}   
            handleOnOff={handleAmount}            
            />
        </div>
        <hr className="mt-1"/>
        <form className="mt-5" autoComplete="on">
            <label htmlFor="startdate">Date Range</label>
            <div className="flex gap-5 mb-5 justify-between">
                <input value={formData.startdate} onChange={(e) => setFormData((prev) => ({...prev, startdate: e.target.value }))} className="p-4 outline-0 text-gray-800 w-full" type="date" id="startdate" name="startdate" /> - 
                <input value={formData.enddate} onChange={(e) => setFormData((prev) => ({...prev, enddate: e.target.value}))} className="p-4 outline-0 w-full" type="date" id="enddate" name="enddate" />
            </div>

            <label htmlFor="price">Price Range</label>
            <div className="flex gap-5 mb-5 justify-between">
                <input value={formData.startprice}  onChange={(e) => setFormData((prev) => ({...prev, startprice: e.target.value}))}  className="p-4 outline-0 w-full" placeholder="₦1000" type="number" id="startprice" name="startprice" /> - 
                <input value={formData.endprice}  onChange={(e) => setFormData((prev) => ({...prev, endprice: e.target.value}))}  type="number" placeholder="₦4500" className="p-4 outline-0 w-full" id="endprice" name="endprice" />
            </div>
            <button onClick={handleSearchSubmit} type="submit" className="bg-gray-800 w-full text-gray-50 p-2 rounded-3xl">Search</button>
        </form>
        </div>
        </div>
        </div>
)
}