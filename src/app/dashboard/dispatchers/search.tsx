'use client'
import { useState } from "react";
import ToggleButton from "../preferences/shipment/toggleButton";
import { State_data } from "./../context/context"
import {useContext} from "react";
import { useDispatcherSearchRange } from "../services/swr-functions/customer-swr";


export default function SearchFilter({inputData, closeFill}: any){
    const {inputField, 
        setInputField, 
        searchFields, 
        setSearchFields, 
        createdAtEnd, 
        setCreatedAtEnd, 
        setCreatedAtStart, 
        createdAtStart, 
        dispatchersRange,
        setDispatchersRange} = useContext<any | string>(State_data);
    const {dispatchersRangeMutate} = useDispatcherSearchRange(dispatchersRange)
    const [searchToggleButtons, setSearchToggleButtons] = useState({
        name: false,
        email: false,
        phone: false
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
    
    function handlePhone(){
        setSearchToggleButtons((prev: any) => ({
            ...prev, phone: !searchToggleButtons.phone
        }))
    }

    const handleInput = () => {
        setInputField((prev: any) => ({
            ...prev, dispatchersRange: inputData,
        }))
    }
    
    const handleSearchField = () => {
        setSearchFields((prev: any) => ({
            ...prev, dispatchersRange: filtered(),
        }))
    }

    const handleSetCreatedAtStart = () => {
        setCreatedAtStart((prev: any) => ({
            ...prev, dispatchersRange: formData.startdate
        }))
    }
    
    const handleSetCreatedAtEnd = () => {
        setCreatedAtEnd((prev: any) => ({
            ...prev, dispatchersRange: formData.enddate
        }))
    }

    function handleSearchSubmit(e: any){
        e.preventDefault();
        handleInput();
        handleSearchField();
        handleSetCreatedAtEnd();
        handleSetCreatedAtStart();
        dispatchersRangeMutate()
        setDispatchersRange({inputField, searchFields})        
    }
    return(
        <>
        <div className="cursor-pointer z-20 top-0 fixed h-screen w-screen " onClick={() => closeFill(false)}/>
            <div className="flex justify-center items-start laptop:w-3/4 after-tablet:w-10/12 tablet:w-full phone:w-full"> 
            <div className="relative animate__animated animate__headShake z-30 bg-gray-50 p-6 phone:h-4/6 tablet:h-4/6 mt-10 w-3/4 rounded-lg">
                <div className="flex justify-start gap-2 items-center">
                    <i id="icon" className="icon ion-md-funnel"></i>
                    <h3>Filter</h3>
                </div>
                <div className="flex flex-wrap justify-between items-center">
                
                <ToggleButton
                title="Name"                 
                onOff={searchToggleButtons.name} 
                handleOnOff={handleName}              
                />

                <ToggleButton
                title="Paid"
                onOff={searchToggleButtons.email} 
                handleOnOff={handleEmail}              
                />

                <ToggleButton
                title="Phone"
                onOff={searchToggleButtons.phone}   
                handleOnOff={handlePhone}            
                />
            </div>
            <hr className="mt-1"/>
            <form className="mt-5">
                <label htmlFor="startdate">Date Range</label>
                <div className="flex gap-5 mb-5 justify-between">
                    <input value={formData.startdate} onChange={(e) => setFormData((prev) => ({...prev, startdate: e.target.value }))} className="p-4 outline-0 text-gray-800 w-full" type="date" id="startdate" name="startdate" /> - 
                    <input value={formData.enddate} onChange={(e) => setFormData((prev) => ({...prev, enddate: e.target.value}))} className="p-4 outline-0 w-full" type="date" id="enddate" name="enddate" />
                </div>

                <button onClick={handleSearchSubmit} className="bg-gray-800 w-full text-gray-50 p-2 rounded-3xl">Search</button>
            </form>
            </div>
            </div>
            </>
    )
}