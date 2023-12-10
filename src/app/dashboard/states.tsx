'use client'
import { useContext, useEffect } from "react";
import { State_data } from "././context/context"
import { useState } from "react";
import DarkFill from "./darkfill";
import Button from "./button";
import { useFetchLocations, useLocations } from "./services/swr-functions/staff-swr";
import { array } from "yup";
import { Password } from "./formik/password";
type States = {
    handleShow: any;
    show: boolean;
}

export default function States({handleShow, show}: States){
 const statesInNig: string[] = [
"Abia", "Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa",
"Benue","Borno","Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT - Abuja","Gombe","Imo",
"Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo",
"Osun","Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara"
];
const {setGlobalData, globaldata, setPriceAndLocationsDelete} = useContext<any | string>(State_data);
const [search, setSearch] = useState<string>('');
const [searched, setSearched] = useState<string[]>([]);
const [check, setCheck] = useState<string[]>([]);
const [checkIt, setCheckIt] = useState<string[]>([]);
function handleCheckAll(event:any){
    if(event.target.checked){
        setCheck([...statesInNig]);
        setCheckIt([...statesInNig])
    }
    else {
        setCheck([])
        setCheckIt([])
    }
}
function handleStateChange(event:any, state:string){
    if(event.target.checked){
        setCheck([...check, state])
        setCheckIt((prev: any) => [...prev, state].filter((val: string, id: number, array: any) => array.indexOf(val) === id));
    }
    else{
        setCheck(item => item.filter(value => value !== state))
        setCheckIt((prev: any) => [...prev]?.filter((data: string) => data !== state));
    }
}

function handleSearch(event: any){
    setSearch(event.target.value);
}

useEffect(() => {
    setSearched(statesInNig.filter((states:string) => {
        return states.toString().toLowerCase().includes(search.toString().toLowerCase())
    }))
}, [search])

const handleDone = () => {
    // if(getLocationsData?.data?.length !== 0){
        // setGlobalData([])
        // setGlobalData((prev: string[]) => [...prev, ...check].filter((val,id,array) => array.indexOf(val) == id));
    // }
    // if(getLocationsData?.data?.length > 0){
        // handleShow(false)        
        // setGlobalData(() => [ ...getLocationsData?.data, ...check].filter((val,id,array) => array.indexOf(val) == id));
        // }
    setGlobalData(() => [ ...check, ...checkIt].filter((val,id,array) => array.indexOf(val) == id));
    setCheckIt(() => [...globaldata])
    setPriceAndLocationsDelete((prev: any) => ({...prev, locationsAdded: false}))
    handleShow(false)
}

function handleClose(){
    handleShow(false)
}

const {getLocationsMutate} = useFetchLocations();

useEffect(() => {
    handleShow(true)
},[])

useEffect(() => {
    getLocationsMutate();
    setCheckIt((prev: string[]) => [...globaldata, ...prev].filter((val: string, id: number, array: any) => array.indexOf(val) === id))
}, [globaldata])

    return(
        <div>
        <DarkFill handleNoShow={handleShow} />
        <div> 
            <div className={ show ? "fixed z-30 animate__animated animate__zoomIn flex justify-center items-center phone:h-screen laptop:h-screen top-0 bottom-0 phone:-ml-10  laptop:w-3/4 after-tablet:w-10/12 after-tablet:ml-5 laptop:ml-0 tablet:w-full phone:w-full" : 
             "animate__animated animate__zoomOut h-0 hidden"}>
                <div className="relative bg-gray-50 p-6 phone:h-4/6 tablet:h-4/6 mt-10 w-3/4 rounded-lg">
                <h1 className="font-bold relative text-center text-lg">Select States</h1>
               

                <div className="flex items-center bg-gray-200 gap-3 rounded-xl w-full justify-start p-4">
                    <i id="search-box" className="icon ion-md-search"></i>
                    <input type="text" className="text-green-700 bg-gray-200 outline-0 h-fit w-full" placeholder="Search State" value={search} onChange={handleSearch} />
                </div>

                 <span className="flex text-sm mt-3 text-gray-500 justify-between items-center">
                 <div className="flex justify-start gap-3 items-center">
                    <input 
                        id="selectAll" 
                        type="checkbox" 
                        onChange={handleCheckAll}
                        className="accent-green-500"
                        checked={statesInNig.length === check.length} 
                    />
                    <label htmlFor="selectAll">{check.length === statesInNig.length ? "Unselect All" : "Select All"}</label>
                   </div>
                   <p>{checkIt.length || '0'} selected</p>
                 </span>

                 <hr className="my-2" />

                <form className="relative phone:h-3/6 laptop:h-3/6 after-tablet:h-2/6 tablet:h-4/6 w-full mt-5 overflow-x-hidden overflow-y-auto">

                    <div>
                    {
                       !search.length && statesInNig.map((state: string) => (
                        <div key={Password()} className="flex justify-start gap-2 items-center">
                            <input 
                            type="checkbox" 
                            id={state}   
                            name={state} 
                            className="accent-green-500"
                            checked={!checkIt?.includes(state) ? check.includes(state) : checkIt?.includes(state)}
                            onChange={event => handleStateChange(event, state)}
                            value={state}
                            />
                            <label className={check.includes(state) ? "p-2 rounded-lg" : "text-gray-500 w-full p-2 rounded-lg"} 
                            htmlFor={state}>{state}</label>
                            <br/>
                        </div>
                    ))}

                    {
                        search.length > 0 && searched.length &&
                            searched?.map((state: string) => (
                                <div key={Password()} className="flex justify-start gap-2 items-center">
                                    <input 
                                    type="checkbox" 
                                    id={state}   
                                    name={state} 
                                    className="accent-green-500"
                                    checked={!checkIt?.includes(state) ? check.includes(state) : checkIt?.includes(state)}
                                    onChange={event => handleStateChange(event, state)}
                                    value={state}
                                    />
                                    <label className={check.includes(state) ? "p-2 rounded-lg" : "text-gray-500 w-full p-2 rounded-lg"} 
                                    htmlFor={state}>{state}</label>
                                    <br/>
                                </div>                            
                        ))}

                        {
                            search.length > 0 && !searched.length && <h1 className="text-red-600 animate__animated animate__headShake">Not Found</h1>
                        }

                    </div>
                </form>

                 <span className="font-bold mt-3 w-full laptop:text-base desktop:text-lg phone:text-sm w-fit flex justify-between items-center relative">
                    <Button buttonName="Done" handleClick={handleDone}/>
                    <button onClick={handleClose} className="font-bold mt-2 text-red-600">Cancel</button>
                 </span>
                </div>
            </div>
        </div>
        </div>
    )
}