'use client'
import { useContext, useEffect, useState } from "react";
import DarkFill from "./darkfill";
import { useFetchCustomers } from "./services/swr-functions/staff-swr";
import { State_data } from "./context/context";
import States from "./states";
import Button from "./button";

type SEARCH = {
    text: string;
    objects: any;
}
export default function ShowCustomers({show, setShow}: any){
    const {fetchCustomersData} = useFetchCustomers();
    const {setId, id} = useContext(State_data);
    const [search, setSearch] = useState<SEARCH>({
        text: "",
        objects: []
    });
    
    function handleSearch(event: any){
        setSearch((prev: any) => ({...prev, text: event.target.value}));
    }

    useEffect(() => {
        const searched = fetchCustomersData?.data?.filter((customer: any) => {
            return customer.user.name.toString().toLowerCase().includes(search.text.toString().toLowerCase());
        })
        setSearch((prev: any) => ({...prev, objects: searched}));  
    }, [search.text])

    const [myId, setMyId] = useState<number>(0)

    function handleClick(number: number){
        setMyId(number)
    }
    
    function handleDone(){
        setId((prev: any) => ({...prev, [show]: myId}))
        setShow((prev: any) => ({...prev, [show]: false}));
    }
    
    function handleCancel(){
        setShow((prev: any) => ({...prev, [show]: false}))
    }

    useEffect(() => {
        if(show === 'customer'){
            setId((prev: any) => ({...prev, customer: 0}) )
        }
        else{
            setId((prev: any) => ({...prev, destination: 0}) )
        }
    }, [show])

    return(
        <div>
            <DarkFill />
            <div className="fixed z-30 animate__animated animate__zoomIn flex justify-center items-center phone:h-screen laptop:h-screen top-0 bottom-0 phone:-ml-10 laptop:w-3/4 after-tablet:w-10/12 after-tablet:ml-5 laptop:ml-0 tablet:w-full phone:w-full">
                <div className="relative bg-gray-50 p-6 phone:h-4/6 tablet:h-3/6 after-tablet:h-5/6 laptop:h-4/6 mt-10 laptop:w-2/4 phone:w-3/4 py-10 rounded-lg">
                    <h1 className="font-bold relative text-center text-lg">Select Customer</h1>

                    <div className="flex items-center bg-gray-200 gap-3 rounded-xl w-full justify-start p-4 my-5">
                        <i id="search-box" className="icon ion-md-search"></i>
                        <input type="text" className="text-gray-500 bg-gray-200 outline-0 h-fit w-full" placeholder="Search Customers" value={search.text} onChange={handleSearch} />
                    </div>
                    <div className="overflow-y-auto overflow-x-hidden h-3/5">
                        {  search.text === "" ?
                            fetchCustomersData?.data?.map((customer: any, i: number) => (
                                <div  onClick={() => handleClick(customer.id)} className={customer.id === myId || customer.id === id.customer || customer.id === id.destination ? "p-2 rounded-lg flex justify-between bg-amber-100 mr-2 my-2 cursor-pointer":"p-2 rounded-lg flex justify-between mr-2 my-2 hover:bg-gray-200 cursor-pointer"}>
                                    <div className="flex gap-3">
                                        <p>{i + 1}</p>
                                        <p>{customer.user.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-red-500">{id.customer === customer.id || (myId === customer?.id && show === 'customer') ? 'Pickup'  : "" }</p>
                                        <p className="text-blue-500">{id.destination === customer.id || (myId === customer?.id  && show === 'destination') ? 'Destination' : "" }</p>
                                    </div>
                                </div>
                            ))
                            :
                            search.objects.map((searches: any, i: number) => (
                                <div  onClick={() => handleClick(searches.id)} className={searches.id === id.customer || searches.id === myId  || searches.id === id.destination ? "p-2 rounded-lg flex gap-3 bg-amber-100 mr-2 my-2 cursor-pointer":"p-2 rounded-lg flex gap-3 mr-2 my-2 hover:bg-gray-200 cursor-pointer"}>
                                    <p>{i + 1}</p>
                                    <p>{searches.user.name}</p>
                                </div>
                            ))
                        }
                    </div>

                    <span className="font-bold mt-3 w-full laptop:text-base desktop:text-lg phone:text-sm w-fit flex justify-between items-center relative">
                        <Button buttonName="Done" handleClick={handleDone}/>
                        <button onClick={handleCancel} className="font-bold mt-2 text-red-600">Cancel</button>
                    </span>

                </div>
                </div>
            </div>
    )
}