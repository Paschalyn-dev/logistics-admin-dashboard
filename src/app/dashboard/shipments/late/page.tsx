'use client'
import { useContext } from "react";
import Heading from "../../heading";
import Holder from "../../holder";
import OrdersNav from "../../orders";
import SubHeading from "../../preferences/website/subheading";
import Section from "../../section";
import SkeletonLoading from "../../services/eventhandlers/skeleton-loading";
import { useAllDispatchersFetcher, useLateParcels } from "../../services/swr-functions/customer-swr";
import SuccessMessage from "../../successmessage";
import { State_data } from "../../context/context";
import BoxesHolder from "../../boxesholder";
import Link from "next/link";
import Popup from "../../services/eventhandlers/popup";
import { useDateHandler } from "../../date";

export default function Late(){
    const {parcelLatesData, parcelLatesError, parcelLatesIsLoading, parcelLatesIsValiddating} = useLateParcels();
    const {successMessage, setSuccessMessage, openUIBoxes, setOpenUIBoxes, setDeleteWithId, deleteWithId} = useContext(State_data);
    const handleCloseFill = () => {
        setOpenUIBoxes((prev: any) => ({...prev, shipmentPopup: false}))
    }
    const {dispatcherAllData} = useAllDispatchersFetcher();
    const handleFetchDispatcher = (id: any) => {
        const newId = dispatcherAllData?.data?.filter((dispatcher: any) => dispatcher?.id === id);
        return newId[0]?.fullName;
    }
    return(
        <Holder>
            {
            (parcelLatesIsLoading || parcelLatesIsValiddating) && 
            <SkeletonLoading title="all late shipments." />
            }
            <OrdersNav />
            <Section>
               <Heading heading="Late Deliveries" />
               {
                parcelLatesError && successMessage.lateShipment &&
                <SuccessMessage
                name="lateShipment"
                successMessageShow={successMessage.lateShipment}
                id="failed"
                messageTitle="Error occured! Check network connection!"
                />
               }
               {openUIBoxes.shipmentPopup && <Popup closeFill={handleCloseFill} text="Shipment" name="parcels" popupShow={openUIBoxes.shipmentPopup} id={deleteWithId.parcels} />}
                <BoxesHolder>
                {parcelLatesData?.data?.length && 
                        (parcelLatesData.data.map((parcel: any) => {
                            return(
                            <div className="bg-gray-50 hover:shadow-lg rounded-xl h-fit phone:w-11/12 tablet:w-5/12 p-5">
                                <div className="flex justify-between">
                                    <div>
                                        <p className="text-green-600 text-xs">LATE</p>
                                        <p className="capitalize text-lg mt-2">{parcel.name}</p>
                                        <p className="text-blue-600 text-xs my-2 uppercase">{parcel.trackId}</p>
                                        <p className="text-xs">{useDateHandler(parcel?.createdAt)}</p>
                                    </div>

                                    <div>
                                    <Link href={`/dashboard/shipments/${parcel.id}`} 
                                     className="hover:text-gray-600 mx-3 cursor-pointer rounded-full bg-gray-200 px-3 py-2">
                                       <i className="icon ion-md-open"></i>
                                    </Link>
                                    <span 
                                    onClick={() => {
                                        setOpenUIBoxes((prev: any) => ({...prev, shipmentPopup: true}));
                                        setDeleteWithId((prev: any) => ({...prev, parcels: parcel.id}));
                                    }}
                                    className="hover:text-red-400 text-red-500 cursor-pointer rounded-full bg-red-100 px-3 py-2">
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
                                <p className="-mb-1">{ handleFetchDispatcher(parcel?.rider) || "No Dispatcher"}</p>
                            </div>
                        </div>
                    )}))}
                    { !parcelLatesIsLoading && parcelLatesData?.data?.length === 0 || !parcelLatesData?.data && (
                        <div className="flex flex-col w-full justify-center items-center">
                            <span className="-mb-16">
                                <i id="bigger" className="icon ion-md-cube"></i>
                            </span>
                            <br/>
                            <SubHeading subheading="You're all Caught Up."/>
                            <p className="w-5/12 mt-1 text-sm text-center">
                                Nice! You're doing well. If for any reason you're running late on a delivery, those parcels will show up here.
                            </p>
                        </div>
                    )}
               </BoxesHolder>
            </Section>
        </Holder>
    )
}