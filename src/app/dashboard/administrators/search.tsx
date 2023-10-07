'use client'
import { useState, useContext, useEffect } from "react";
import ToggleButton from "../preferences/shipment/toggleButton";
import { State_data } from "../context/context";
import { useAdministratorsSearchRange } from "../services/swr-functions/customer-swr";
import { customerAPIUrl } from "../services/api-url/customer-api-url";
import { authorizationKeyCustomer } from "../services/customer-api/api";
import { Password } from "../formik/password";

export default function SearchFilter({inputData, closeFill}: any){
    const {inputField, setInputField, searchFields, setSearchFields, createdAtEnd,  setSearchData, searchData, setCreatedAtEnd, setCreatedAtStart, createdAtStart, administratorsRange, setAdministratorsRange} = useContext<any | string>(State_data);
    const {administratorsRangeMutate} = useAdministratorsSearchRange('')

    const [searchToggleButtons, setSearchToggleButtons] = useState({
        fullName: true,
        email: true,
        phone: true
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
                ...prev, fullName: !searchToggleButtons.fullName
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
            ...prev, administratorsRange: inputData,
        }))
    }
    
    const handleSearchField = () => {
        setSearchFields((prev: any) => ({
            ...prev, administratorsRange: filtered(),
        }))
    }
    
    const handleSetCreatedAtStart = () => {
        setCreatedAtStart((prev: any) => ({
            ...prev, administratorsRange: formData.startdate
        }))
    }
    
    const handleSetCreatedAtEnd = () => {
        setCreatedAtEnd((prev: any) => ({
            ...prev, administratorsRange: formData.enddate
        }))
    }

    async function handleSearch(administratorsRangeQuery: any){
        const response = await fetch(customerAPIUrl.searchAdminisrators(administratorsRangeQuery), {
            method: 'GET',
            headers: {
                'Authorization': authorizationKeyCustomer
            }
        });
        const data = await response.json();
        setSearchData((prev: any) => ({...prev, administratorResult: data}));
    }

    useEffect(() => {
        handleInput();
    }, [inputData]);

    useEffect(() => {
        if(administratorsRange !== null){
            handleSearch(administratorsRange);
        }
    }, [searchData?.administratorCode])

    function handleSearchSubmit(e: any){
        e.preventDefault();
        handleSearchField();
        handleSetCreatedAtEnd();
        handleSetCreatedAtStart();
        administratorsRangeMutate(administratorsRange);
        setAdministratorsRange({inputField, searchFields})
        setSearchData((prev: any) => ({...prev, administratorResult: "", administratorCode: Password()}));
        setTimeout(() => {closeFill((prev: any) => ({...prev, administratorSearch: false}));}, 500)
    }
    return(
        <div>
        <div className="cursor-pointer z-20 bottom-0 fixed h-screen w-screen " onClick={() => closeFill((prev: any) => ({...prev, administratorSearch: false}))}/>
            <div className="flex justify-center items-start laptop:w-3/4 after-tablet:w-10/12 tablet:w-full phone:w-full"> 
            <div className="relative animate__animated animate__headShake z-30 bg-gray-50 p-6 phone:h-4/6 tablet:h-4/6 mt-10 w-3/4 rounded-lg">
                <div className="flex justify-start gap-2 items-center">
                    <i id="icon" className="icon ion-md-funnel"></i>
                    <h3>Filter</h3>
                </div>
                <div className="flex flex-wrap justify-between items-center">
                
                <ToggleButton
                title="Name"                 
                onOff={searchToggleButtons.fullName} 
                handleOnOff={handleName}              
                />

                <ToggleButton
                title="Email"
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
            </div>
    )
}