'use client'
import { useState } from "react";
import ToggleButton from "../preferences/shipment/toggleButton";
import { useTransactionsSearchRange } from "../services/swr-functions/customer-swr";
import { State_data } from "../context/context";
import { useContext} from "react";


export default function SearchFilter({inputData, closeFill}: any){
    const {inputField, setInputField, searchFields, setSearchFields, createdAtEnd, setCreatedAtEnd, setCreatedAtStart, createdAtStart, setAmountEnd, setAmountStart, amountStart, amountEnd, transactionsRange, setTransactionsRange} = useContext<any | string>(State_data);
    const {transactionsRangeMutate} = useTransactionsSearchRange(transactionsRange);
    const [searchToggleButtons, setSearchToggleButtons] = useState({
        name: false,
        email: false,
        message: false
    })
    
    const [formData, setFormData] =  useState({
        startdate: '',
        enddate: '',
    })
    
    const filtered = () => {
        const values = Object.entries(searchToggleButtons)
        const val = values.filter((v: any) => {
            return v.includes(true)
        })
        return(val.map(v => v[0]))
    }
        
    
    function handleName(){
        setSearchToggleButtons((prev: any) => ({
            ...prev, name: !searchToggleButtons.name
        }))
    }
    
    function handleEmail(){
        setSearchToggleButtons((prev: any) => ({
            ...prev, email: !searchToggleButtons.email
        }))
    }
        
    function handleMessage(){
        setSearchToggleButtons((prev: any) => ({
            ...prev, message: !searchToggleButtons.message
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
    
    function handleSearchSubmit(e: any){
        e.preventDefault();
        handleInput();
        handleSearchField();
        handleSetCreatedAtEnd();
        handleSetCreatedAtStart();
        transactionsRangeMutate();
        setTransactionsRange({inputField, searchFields, amountStart, amountEnd, createdAtStart, createdAtEnd})
    // if(parcelRangeData !== 'undefined' && !parcelRangeIsLoading && !parcelRangeIsValidating) closeFill(false)
    }
    return(
        <>
    <div className="cursor-pointer z-20 bottom-0 fixed h-screen w-screen " onClick={() => closeFill((prev: any) => ({...prev, searchBox: false}))}/>
        <div className="flex justify-center items-start laptop:w-3/4 after-tablet:w-10/12 tablet:w-full phone:w-full"> 
        <div className="relative animate__animated animate__headShake z-30 bg-gray-50 p-6 phone:h-4/6 tablet:h-4/6 mt-10 w-3/4 rounded-lg">
            <div className="flex justify-start gap-2 items-center">
                <i id="icon" className="icon ion-md-funnel"></i>
                <h3>Filter</h3>
            </div>
            <div className="flex flex-wrap justify-between items-center">
            <ToggleButton
            title="ID"  
            onOff={searchToggleButtons.name}
            handleOnOff={handleName}               
            />

            <ToggleButton
            title="Parcel"                 
            onOff={searchToggleButtons.email} 
            handleOnOff={handleEmail}              
            />

            <ToggleButton
            title="Amount"
            onOff={searchToggleButtons.message}   
            handleOnOff={handleMessage}            
            />
        </div>
        <hr className="mt-1"/>
        <form onSubmit={handleSearchSubmit} className="mt-5" autoComplete="on">
            <label htmlFor="price">Date Range</label>
            <div className="flex gap-5 mb-5 justify-between">
                <input value={formData.startdate}  onChange={(e) => setFormData((prev) => ({...prev, startprice: e.target.value}))}  className="p-4 outline-0 w-full" placeholder="₦1000" type="number" id="startprice" name="startprice" /> - 
                <input value={formData.enddate}  onChange={(e) => setFormData((prev) => ({...prev, endprice: e.target.value}))}  type="number" placeholder="₦4500" className="p-4 outline-0 w-full" id="endprice" name="endprice" />
            </div>
            <button type="submit" className="bg-gray-800 w-full text-gray-50 p-2 rounded-3xl">Search</button>
        </form>
        </div>
        </div>
        </>
)
}