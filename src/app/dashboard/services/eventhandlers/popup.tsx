'use client'
import { useState } from "react";
import DarkFill from "../../darkfill";
import { useDeleteParcels, useDeleteReviews, useSearchParcelRange } from "../../services/swr-functions/customer-swr";
import { useRouter } from "next/navigation";
import { useDeleteCustomer, useDeleteDispatcher, useDeleteMessages, useDeleteStaff } from "../swr-functions/staff-swr";
type POPUP_TYPE = {
    closeFill: any;
    popupShow: boolean;
    id: number;
    text: string;
    name?: string;
}

export default function Popup({closeFill, name, popupShow, id, text}: POPUP_TYPE){
    console.log(id, "Parcel id ")
    const router = useRouter();
    const [details, setDetails] = useState({
        text: "",
        isShow: false,
    })
    const [haveClicked, setHaveClicked] = useState<any>({
        parcels: false,
        customers: false,
        dispatchers: false, 
        administrators: false,
        transactions: false,
        reviews: false,
        messages: false
    });
    const [servicesId, setServicesId] = useState<any>({
        parcelsId: 0,
        customersId: 0,
        dispatchersId: 0, 
        administratorsId: 0,
        transactionsId: 0,
        reviewsId: 0,
        messagesId: 0
    })
    
    const handleDelete = (serviceName: any) => {
        console.log(serviceName)
        setHaveClicked((prev: any) => ({...prev, [serviceName]: true}));
        
        console.log(serviceName, "edfghj")
        if(haveClicked.parcels === true){
            console.log(servicesId, "services id")
            setServicesId((prev: any) => ({...prev, parcelsId: id}))

            if(deleteParcelData?.code === 200) {
                setDetails((prev: any) => ({...prev, text: "Shipment", isShow: true}))
                // router.replace('/dashboard/shipments/active')
            }
        }
        else if(haveClicked.dispatchers === true){
            setServicesId((prev: any) => ({...prev, dispatchersId: id}))
            if(deleteDispatcherData?.code === 200) {
                setDetails((prev: any) => ({...prev, text: "Dispatcher", isShow: true}))
                // router.replace('/dashboard/dispatchers')
            }
        }
        else if(haveClicked.customers === true){
            setServicesId((prev: any) => ({...prev, customersId: id}))
            if(deleteCustomerData?.code === 200) {
                setDetails((prev: any) => ({...prev, text: "Customer", isShow: true}))
                // router.replace('/dashboard/customers')
            }
        }
        else if(haveClicked.administrators === true){
            setServicesId((prev: any) => ({...prev, administratorsId: id}))
            if(deleteStaffData?.code === 200) {
                setDetails((prev: any) => ({...prev, text: "Adminstrator", isShow: true}))
                // router.replace('/dashboard/administrators')
            }
        }
        else if(haveClicked.transactions === true){
            setServicesId((prev: any) => ({...prev, transactionsId: id}))
            // router.replace('/dashboard/transactions')
        }
        else if(haveClicked.reviews === true){
            setServicesId((prev: any) => ({...prev, reviewsId: id}))
            if(deleteReviewsData?.code === 200){
                // router.replace('/dashboard/reviews')
            }
        }
        else if(haveClicked.messages === true){
            setServicesId((prev: any) => ({...prev, messagesId: id}))
            if(deleteMessagesData?.code === 200) {
                setDetails((prev: any) => ({...prev, text: "Message", isShow: true}))
                // router.replace('/dashboard/messages')
            }
        }
        else{}
    }   
    // console.log(haveClicked, servicesId);
    const handleClose = () => {
        setDetails((prev: any) => ({...prev, isShow: false}));
        closeFill();
    }
    
    const {deleteStaffData} = useDeleteStaff(servicesId.administratorsId)
    const {deleteMessagesData} = useDeleteMessages(servicesId.messagesId);
    const {deleteReviewsData} = useDeleteReviews(servicesId.reviewsId)
    const {deleteDispatcherData} = useDeleteDispatcher(servicesId.dispatchersId)
    const {deleteParcelData} = useDeleteParcels(servicesId.parcelsId);
    const {deleteCustomerData} = useDeleteCustomer(servicesId.customersId)
    
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