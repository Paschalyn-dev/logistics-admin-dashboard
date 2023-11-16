import { useContext, useEffect, useState } from "react";
import DarkFill from "../darkfill";
import Button from "../button";
import { useAllDispatchersFetcher, useAllParcelsFetcher } from "../services/swr-functions/customer-swr";
import { State_data } from "../context/context";
import { mutate } from "swr";
import { useRouter } from "next/navigation";
type SEARCH = {
    text: string;
    objects: any;
}
export default function ShowDispatchers ({show, mutate, setShow}: any){
    const {dispatcherAllData} = useAllDispatchersFetcher()
    const [search, setSearch] = useState<SEARCH>({
        text: "",
        objects: []
    });
    const {setDispatcher, setMyKey, setStoredName} = useContext(State_data);
    const [fullName, setFullName] = useState<string>('');

    function handleSearch(event: any){
        setSearch((prev: any) => ({...prev, text: event.target.value}));
    }
    
    useEffect(() => {
        const searched = dispatcherAllData?.data?.filter((dispatcher: any) => {
            return dispatcher.fullName.toString().toLowerCase().includes(search.text.toString().toLowerCase());
        });
        setSearch((prev: any) => ({...prev, objects: searched}))
    },[search.text])

    function handleClick(name: string){
        setFullName(name);
    }
    
    function handleDone(){
        setDispatcher((prev: any) => ({...prev, name: fullName}));
        setStoredName(((prev: any) => ({...prev, dispatcher: fullName})));
        setMyKey();
        setShow(false);
    }
    
    function handleCancel(){
        if(fullName){
            setDispatcher((prev: any) => ({...prev, name: ""}))
        }
        setShow(false)
    }
    
    return(
        <div>
            <DarkFill />
            <div className="fixed z-30 animate__animated animate__zoomIn flex justify-center items-center phone:h-screen laptop:h-screen top-0 bottom-0 phone:-ml-10 laptop:w-3/4 after-tablet:w-10/12 after-tablet:ml-5 laptop:ml-0 tablet:w-full phone:w-full">
                <div className="relative bg-gray-50 p-6 phone:h-4/6 tablet:h-3/6 after-tablet:h-5/6 laptop:h-4/6 mt-10 laptop:w-2/4 phone:w-3/4 py-10 rounded-lg">
                    <h1 className="font-bold relative text-center text-lg">Select Dispatcher</h1>

                    <div className="flex items-center bg-gray-200 gap-3 rounded-xl w-full justify-start p-4 my-5">
                        <i id="search-box" className="icon ion-md-search"></i>
                        <input type="text" className="text-gray-500 bg-gray-200 outline-0 h-fit w-full" placeholder="Search Dispatcher" value={search.text} onChange={handleSearch} />
                    </div>
                    <div className="overflow-y-auto overflow-x-hidden h-3/5">
                        {  search.text === "" ?
                            dispatcherAllData?.data?.map((dispatcher: any, i: number) => (
                                <div  onClick={() => handleClick(dispatcher.fullName)} className={fullName === dispatcher?.fullName  ? "p-2 rounded-lg flex gap-3 bg-amber-100 mr-2 my-2 cursor-pointer":"p-2 rounded-lg flex gap-3 mr-2 my-2 hover:bg-gray-200 cursor-pointer"}>
                                    <p>{i + 1}</p>
                                    <p>{dispatcher.fullName}</p>
                                </div>
                            ))
                            :
                            search.objects.map((searches: any, i: number) => (
                                <div  onClick={() => handleClick(searches.fullName)} className={searches.fullName === fullName ? "p-2 rounded-lg flex gap-3 bg-amber-100 mr-2 my-2 cursor-pointer":"p-2 rounded-lg flex gap-3 mr-2 my-2 hover:bg-gray-200 cursor-pointer"}>
                                    <p>{i + 1}</p>
                                    <p>{searches.fullName}</p>
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