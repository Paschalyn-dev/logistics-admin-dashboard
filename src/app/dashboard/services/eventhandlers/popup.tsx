'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DarkFill from "../../darkfill";
import { customerAPIUrl } from "../api-url/customer-api-url";
import { staffAPIURL } from "../api-url/staff-api-url";
import { authorizationKey } from "../staff-api/api";
import { authorizationKeyCustomer } from "../customer-api/api";
type POPUP_TYPE = {
    closeFill: any;
    popupShow: boolean;
    id: number;
    text: string;
    name?: string;
    viewDelete?: boolean;
    mutate?: any;
    mutateSearch?: any;
}

export default function Popup({closeFill, mutateSearch, mutate, name, popupShow, viewDelete, id, text}: POPUP_TYPE){
    const [details, setDetails] = useState({
        text: "",
        isShow: false,
    });

    const [haveClicked, setHaveClicked] = useState<any>({
        parcels: false,
        customers: false,
        dispatchers: false, 
        administrators: false,
        messages: false
    });

    const [servicesId, setServicesId] = useState<any>({
        parcelsId: 0,
        parcelsResult: "",
        customersId: 0,
        customersResult: "",
        dispatchersId: 0, 
        dispatchersResult: "",
        administratorsId: 0,
        administratorsResult: "",
        messagesId: 0,
        messagesResult: "",
    });

    const router = useRouter();
    
    const handleDelete = (serviceName: any) => {
        setHaveClicked((prev: any) => ({...prev, [serviceName]: true}));
    }   
    
    const handleClose = () => {
        setDetails((prev: any) => ({...prev, isShow: false}));
        closeFill();
        if(viewDelete === true){
            router.back();
        }
        else{
            mutate();
            mutateSearch();
        }
    }
    
    async function handleDeleteParcel(parcel: any){
        const response = await fetch(customerAPIUrl.deleteParcels(parcel), {
            method: 'DELETE',
            headers: {
                'Authorization': authorizationKeyCustomer
            }
        });
        const data = await response.json();
        setServicesId((prev: any) => ({...prev, parcelsResult: data}));
    }

    async function handleDeleteCustomers(customer: any){
        const response = await fetch(staffAPIURL.deleteCustomer(customer), {
            method: 'DELETE',
            headers: {
                'Authorization': authorizationKey
            }
        });
        const data = await response.json();
         setServicesId((prev: any) => ({...prev, customersResult: data}));
    }

    async function handleDeleteAdministrators(admin: any){
        const response = await fetch(staffAPIURL.deleteStaff(admin), {
            method: 'DELETE',
            headers: {
                'Authorization': authorizationKey
            }
        });
        const data = await response.json();
        setServicesId((prev: any) => ({...prev, administratorsResult: data}));
    }
    
    async function handleDeleteDispatchers(dispatcher: any) {
        const response = await fetch(staffAPIURL.deleteDispatcher(dispatcher), {
            method: 'DELETE',
            headers: {
                'Authorization': authorizationKey
            }
        });
        const data = await response.json();
        setServicesId((prev: any) => ({...prev, dispatchersResult: data}));
    }

    async function handleDeleteMessages(message: any){
        const response = await fetch(staffAPIURL.deleteMessages(message), {
            method: 'DELETE',
            headers: {
                'Authorization': authorizationKey
            }
        });
        const data = await response.json();
        setServicesId((prev: any) => ({...prev, messagesResult: data}));
    }

    useEffect(() => {
        setServicesId((prev: any) => ({...prev, parcelsId: id}));
        handleDeleteParcel(servicesId.parcelsId);
    }, [haveClicked.parcels === true]);
    
    useEffect(() => {
        setServicesId((prev: any) => ({...prev, customersId: id}));
        handleDeleteCustomers(servicesId.customersId);
    }, [haveClicked.customers === true]);
    
    useEffect(() => {
        setServicesId((prev: any) => ({...prev, dispatchersId: id}));
        handleDeleteDispatchers(servicesId.dispatchersId);
    }, [haveClicked.dispatchers === true]);
    
    useEffect(() => {
        setServicesId((prev: any) => ({...prev, administratorsId: id}));
        handleDeleteAdministrators(servicesId.administratorsId);
    }, [haveClicked.administrators === true]);

    useEffect(() => {
        setServicesId((prev: any) => ({...prev, messagesId: id}));
        handleDeleteMessages(servicesId.messagesId)
    }, [haveClicked.messages === true]);

    useEffect(() => {
        if(servicesId.parcelsResult !== ""){
            if(servicesId?.parcelsResult?.code === 200) {
                setDetails((prev: any) => ({...prev, text: "Shipment", isShow: true}));
            }
        }
    }, [servicesId.parcelsResult]);
    
    // Share your business' website address(https://cakenus.logistix.africa) on Social Media to get Customers to visit your website and Ship their parcels.
    useEffect(() => {
        if(servicesId.customersResult !== ""){
            if(servicesId?.customerResult?.code === 200) {
                setDetails((prev: any) => ({...prev, text: "Customer", isShow: true}))
            }
        }
    }, [servicesId.customersResult]);


    useEffect(() => {
        if(servicesId.dispatchersResult !== ""){
            if(servicesId?.dispatchersResult?.code === 200) {
                setDetails((prev: any) => ({...prev, text: "Dispatcher", isShow: true}))
                setTimeout(() => {router.replace('/dashboard/dispatchers')}, 3000);
            }
        }
    }, [servicesId.dispatchersResult]);

    useEffect(() => {
        if(servicesId.administratorsResult !== ""){
            if(servicesId?.administratorsResult?.code === 200) {
                setDetails((prev: any) => ({...prev, text: "Administrator", isShow: true}));          
            }
        }
    }, [servicesId.administratorsResult]);

    useEffect(() => {
        if(servicesId.messagesResult !== ""){
            if(servicesId?.messagesResult?.code === 200) {
                setDetails((prev: any) => ({...prev, text: "Message", isShow: true}));
            }
        }
    }, [servicesId.messagesResult]);
    
    return (
            <div>
                <DarkFill />
            { !details.isShow &&
                    <div className={ popupShow ? "fixed z-30 animate__animated animate__bounceIn flex justify-center items-center phone:h-screen laptop:h-screen top-0 bottom-0 phone:-ml-10  laptop:w-3/4 after-tablet:w-10/12 after-tablet:ml-5 laptop:ml-0 tablet:w-full phone:w-full" : 
                    "animate__animated animate__zoomOut h-0 hidden"}>
                        <div className="relative animate__animated text-center animate__headShake z-30 bg-gray-50 p-6 phone:h-fit tablet:h-3/6 mt-10 phone:w-3/4 tablet:w-3/6 rounded-lg">
                            <i id="bigger" className="icon ion-md-help px-6 py-1 border-solid border-4 border-gray-300 rounded-full"></i>
                            <h1 className="laptop:text-4xl phone:text-2xl font-bold pt-5">Delete {text}?</h1>
                            <p>This action cannot be undone. Do you still wish to continue?</p>
                            <div className="flex justify-center gap-2 items-center w-full my-4">
                                <button onClick={() => handleDelete(name)} className="bg-green-500 border-4 hover:bg-green-600 py-2 text-gray-50 px-3 text-lg rounded-lg">Yes</button>
                                <button onClick={closeFill} className="bg-red-500 border-4 hover:bg-red-600 py-2 text-gray-50 px-3 rounded-lg text-lg">No</button>
                            </div>
                        </div>   
                    </div>
            }
            {details.isShow && 
                    <div className={"fixed z-30 animate__animated animate__bounceIn flex justify-center items-center phone:h-screen laptop:h-screen top-0 bottom-0 phone:-ml-10  laptop:w-3/4 after-tablet:w-10/12 after-tablet:ml-5 laptop:ml-0 tablet:w-full phone:w-full"}>
                    <div className="relative animate__animated text-center animate__headShake z-30 bg-gray-50 p-6 phone:h-fit tablet:h-3/6 mt-10 phone:w-3/4 tablet:w-3/6 rounded-lg">
                        <i id="bigger" className="icon ion-md-checkmark-circle-outline px-6 py-1 rounded-full"></i>
                        <h1 className="laptop:text-4xl phone:text-2xl font-bold pt-5">Done</h1>
                        <p>{text} has been deleted.</p>
                        <div className="flex justify-center gap-2 items-center w-full my-4">
                            <button onClick={handleClose} className="bg-green-500 border-4 hover:bg-green-600 py-2 text-gray-50 px-3 text-lg rounded-lg">Yes</button>
                        </div>
                    </div>   
                </div>
            }
        </div>
    )}