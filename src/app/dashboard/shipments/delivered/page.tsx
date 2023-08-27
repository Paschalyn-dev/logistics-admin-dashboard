'use client'
import { useState } from "react";
import Heading from "../../heading";
import Holder from "../../holder";
import OrdersNav from "../../orders";
import SubHeading from "../../preferences/website/subheading";
import Section from "../../section";
import { useDeliveredParcels } from "../../services/swr-functions/customer-swr";
import SuccessMessage from "../../successmessage";
import Loader from "../../services/Loader/spinner";
import SkeletonLoading from "../../services/eventhandlers/skeleton-loading";
import { parcelsDeliveredFetcher } from "../../services/customer-api/api";
import BoxesHolder from "../../boxesholder";
import Popup from "../../services/eventhandlers/popup";
import {useRouter} from "next/navigation"
// import { handleEditParcel, handleViewParcel } from "../../functions";
export default function Delivered(){
    const [id, setId] = useState<number>(0);
    const [openUIBoxes, setOpenUIBoxes] = useState(false);
    const [successmessage, setSuccessMessage] = useState<boolean>(true);
    const router =  useRouter();
    const {deliveredParcelsData, 
        deliveredParcelsError, 
        deliveredParcelsIsLoading, 
        deliveredParcelsIsValiddating, 
        deliveredParcelsMutate} = useDeliveredParcels();
    const handleCloseFill = () => {
        setOpenUIBoxes(false)
    }
    const handleViewParcel = (id: any) => {
        console.log('dfghjk')
        router.replace(`/dashboard/shipments/${id}`);
    }

    const handleEditParcel = (id: any) => {
        console.log('dfghjk')
        router.replace(`/dashboard/shipments/${id}/edit`);
    }
    return(
        <Holder>
            {
            (deliveredParcelsIsLoading || deliveredParcelsIsValiddating) && 
            <SkeletonLoading title="all delivered shipments." />
            }
            <OrdersNav />
            <Section>
               <Heading heading="Delivered Parcels" />
               <p>You have <span className="font-bold">{deliveredParcelsData?.data?.length || 0}</span> delivered shipment{deliveredParcelsData?.data?.length > 1 && "s"}.</p>
               <BoxesHolder>
               {
                deliveredParcelsError && successmessage &&
                <SuccessMessage
                successMessageShow={successmessage}
                handleShowSuccessMessage={setSuccessMessage}
                id="failed"
                messageTitle="Delivered shipments cannot be fetched. Check network connection!"
                />
               }
               {openUIBoxes && <Popup closeFill={handleCloseFill} popupShow={openUIBoxes} id={id} />}

               {deliveredParcelsData?.data && 
                    (deliveredParcelsData.data.map((parcel: any) => {
                        return(
                        <div className="bg-gray-50 hover:shadow-lg rounded-xl h-fit phone:w-11/12 tablet:w-5/12 p-5">
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-green-600 text-xs">DELIVERED</p>
                                    <p className="capitalize text-lg mt-2">{parcel.name}</p>
                                    <p className="text-blue-600 text-xs my-2 uppercase">{parcel.trackId}</p>
                                    <p className="text-xs">{parcel.updatedAt}</p>
                                </div>

                                <div>
                                    <span onClick={() => handleViewParcel(parcel.id)} className="hover:text-gray-600 cursor-pointer rounded-full bg-gray-200 p-2">
                                       <i className="icon ion-md-open"></i>
                                    </span>
                                    <span onClick={() => handleEditParcel(parcel.id)} className="hover:text-gray-600 mx-1 cursor-pointer rounded-full bg-gray-200 p-2">
                                        <i className="icon ion-md-create"></i>
                                    </span>
                                    <span 
                                    onClick={() => {
                                        setOpenUIBoxes(true);
                                        setId(parcel.id)
                                    }}
                                    className="hover:text-red-400 text-red-500 cursor-pointer rounded-full bg-red-100 p-2">
                                       <i className="icon ion-md-trash"></i>
                                    </span>
                                </div>
                            </div>
                            <hr className="my-4" />
                            <p className="text-xs mb-2 text-amber-600">FROM: {parcel.pickUp.address}</p>
                            <p className="text-xs text-amber-600">TO:   {parcel.destination.address}</p>
                            <hr className="my-4" />
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-xs mb-1">Customer</p>
                                    <p>{parcel.pickUp.name}</p>
                                </div>
                                <span>
                                    <p className="capitalize mb-1 text-xs">Paid</p>
                                    <p className="font-bold">₦{parcel.amount ? parcel.amount : 0}</p>
                                </span>
                            </div>
                            <hr className="my-4" />
                            <div className="flex justify-start gap-2 items-center">
                                <span className="px-2 border-2 border-gray-200 rounded-full">
                                    <i id="icon" className="icon ion-md-person"></i>
                                </span>
                                <p>{parcel.rider ? parcel.rider : "No Dispatcher"}</p>
                            </div>
                        </div>
                    )}))}
                    { !deliveredParcelsIsLoading && deliveredParcelsData?.data?.length === 0 && (
                        <div className="flex flex-col w-full justify-center items-center">
                            <span className="-mb-16">
                                <i id="bigger" className="icon ion-md-cube"></i>
                            </span>
                            <br/>
                            <SubHeading subheading="No delivered parcel yet."/>
                            {/* <p className="w-5/12 mt-1 text-sm text-center">You have no delivered parcel yet.</p> */}
                        </div>
                    )}
               </BoxesHolder>
            </Section>
        </Holder>
    )
}