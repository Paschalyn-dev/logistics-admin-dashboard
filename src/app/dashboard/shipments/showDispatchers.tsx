import { useContext, useEffect, useState } from "react";
import DarkFill from "../darkfill";
import { useFetchCustomers } from "../services/swr-functions/staff-swr";
import { State_data } from "../context/context";
import Button from "../button";
import { useAllDispatchersFetcher } from "../services/swr-functions/customer-swr";
type SEARCH = {
    text: string;
    objects: any;
}
export default function ShowDispatchers ({show, setShow}: any){
    const {dispatcherAllData} = useAllDispatchersFetcher()
    const {setId, id} = useContext(State_data);
    const [search, setSearch] = useState<SEARCH>({
        text: "",
        objects: []
    });
    
    function handleSearch(event: any){
        const searched = dispatcherAllData?.data?.filter((customer: any) => {
            return customer.user.name.toString().toLowerCase().includes(search.text.toString().toLowerCase());
        })
        setSearch((prev: any) => ({...prev, text: event.target.value, objects: searched}));
    }

    function handleClick(number: any){
        setId((prev: any) => ({...prev, [show]: number}))
    }

    function handleDone(){
        setShow((prev: any) => ({...prev, [show]: false}));
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
            <div className="fixed z-30 animate__animated animate__zoomIn flex justify-center items-center phone:h-screen laptop:h-screen top-0 bottom-0 phone:-ml-10  laptop:w-3/4 after-tablet:w-10/12 after-tablet:ml-5 laptop:ml-0 tablet:w-full phone:w-full">
                <div className="relative bg-gray-50 p-6 phone:h-4/6 mt-10 w-2/4 rounded-lg">
                    <h1 className="font-bold relative text-center text-lg">Select Customer</h1>

                    <div className="flex items-center bg-gray-200 gap-3 rounded-xl w-full justify-start p-4 my-5">
                        <i id="search-box" className="icon ion-md-search"></i>
                        <input type="text" className="text-gray-500 bg-gray-200 outline-0 h-fit w-full" placeholder="Search State" value={search.text} onChange={handleSearch} />
                    </div>
                    <div className="overflow-y-auto overflow-x-hidden h-3/5">
                        {  search.text === "" ?
                            dispatcherAllData?.data?.map((customer: any, i: number) => (
                                <div  onClick={() => handleClick(customer.id)} className={customer.id === id.customer || customer.id === id.destination ? "p-2 rounded-lg flex gap-3 bg-amber-100 mr-2 my-2 cursor-pointer":"p-2 rounded-lg flex gap-3 mr-2 my-2 hover:bg-gray-200 cursor-pointer"}>
                                    <p>{i + 1}</p>
                                    <p>{customer.fullName}</p>
                                </div>
                            ))
                            :
                            search.objects.map((searches: any, i: number) => (
                                <div  onClick={() => handleClick(searches.id)} className={searches.id === id.customer || searches.id === id.destination ? "p-2 rounded-lg flex gap-3 bg-amber-100 mr-2 my-2 cursor-pointer":"p-2 rounded-lg flex gap-3 mr-2 my-2 hover:bg-gray-200 cursor-pointer"}>
                                    <p>{i + 1}</p>
                                    <p>{searches.fullName}</p>
                                </div>
                            ))
                        }
                    </div>

                    <span className="font-bold mt-3 w-full laptop:text-base desktop:text-lg phone:text-sm w-fit flex justify-between items-center relative">
                        <Button buttonName="Done" handleClick={handleDone}/>
                        <button onClick={handleDone} className="font-bold mt-2 text-red-600">Cancel</button>
                    </span>

                </div>
                </div>
            </div>
    )
}