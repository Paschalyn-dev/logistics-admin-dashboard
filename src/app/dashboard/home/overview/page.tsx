'use client'
import Link from "next/link";
import HomeNav from "../homenav";
import Boxes from "../../boxes";
import { useContext, useState } from "react";
import SmallBoxes from "../smallboxes";
import Section from "../../section";
import Holder from "../../holder";
import Time from "@/app/time";
import BoxesHolder from "../../boxesholder";
import { useActiveShipmentsCount, useAllDispatchersFetcher, useCompanyRevenue, useCountParcel, useCustomerCount, useDeliveredParcels, useLateParcels, useTodayRevenue } from "../../services/swr-functions/customer-swr";
import { customerStore, staffStore } from "../../services/store/store";
import { useCountDispatcher, useCountStaff} from "../../services/swr-functions/staff-swr";
import { NumberComma } from "../../numberComma";
import { State_data } from "../../context/context";
// import { authorizationKey } from "../../services/customer-api/api";

export const colors = ['red', 'amber', 'green', 'black', 'yellow', 'blue'];
const authorizationKey = staffStore[staffStore.length - 1]?.authToken;

export default function Overview(){
    const [location, setLocation] = useState('lagos');
    const {countParcelData} = useCountParcel()
    const {companyRevenueData} = useCompanyRevenue();
    const {countCustomersData} = useCustomerCount();
    const {activeShipmentsCountData} = useActiveShipmentsCount();
    const {deliveredParcelsData} = useDeliveredParcels();
    const {parcelLatesData} = useLateParcels();
    const {countStaffData} = useCountStaff();
    const {countRidersData} = useCountDispatcher();
    const {todayRevenueData} = useTodayRevenue();
    const {globaldata} = useContext(State_data);
    const {dispatcherAllData} = useAllDispatchersFetcher();
    return(
        <>
            <head>
                <link href="https://unpkg.com/ionicons@4.5.10-0/dist/css/ionicons.min.css" rel="stylesheet" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
            </head>  

            <Holder>
                <HomeNav />
                <Section>
                    <div>
                        <div className="flex w-fit justify-start gap-3 font-bold phone:text-xl tablet:text-2xl laptop:text-3xl desktop:text-4xl bigger-desktop:text-5xl items-center">
                            <Time />
                            <Link href="/" className="text-gray-500/90">CakenUs Services</Link>
                        </div>
                        <p className="text-gray-500 ">Here's how your business is doing.</p>
                    </div>


                    <BoxesHolder>
                        <Boxes
                        icon="icon ion-md-rocket"
                        title="Active Shipments"
                        amount={activeShipmentsCountData?.data ? NumberComma(activeShipmentsCountData?.data) : 0}
                        name="Rocket"
                        />

                        <Boxes
                        icon="icon ion-md-happy"
                        title=" Delivered Shipments"
                        amount={deliveredParcelsData?.data ?  NumberComma(deliveredParcelsData?.data?.length) : 0}
                        name="Happy"
                         />

                        <Boxes
                        icon="icon ion-md-sad"
                        title="Late Deliveries"
                        amount={parcelLatesData?.data ? NumberComma(parcelLatesData?.data?.length) : 0}
                        name="Sad"
                         />
                           
                        <Boxes
                        icon="icon ion-md-contacts"
                        title="Customers"
                        amount={countCustomersData?.data ? NumberComma(countCustomersData?.data) : 0}
                        name="Customers"
                         />

                        <Boxes
                        icon="icon ion-md-cube"
                        title="Shipped Parcels"
                        amount={countParcelData?.data ? NumberComma(countParcelData?.data) : 0}
                        name="Shipped Parcel"
                         />

                        <Boxes
                        icon="icon ion-md-calendar"
                        title="Today's Revenue"
                        amount={todayRevenueData?.data ? '₦' + NumberComma(todayRevenueData?.data?.length) : "₦0"}
                        name="Today"
                         />

                        <Boxes
                        icon="icon ion-md-cash"
                        title="Total Revenue"
                        amount={companyRevenueData?.data ? '₦' + NumberComma(companyRevenueData?.data) : '₦0'}
                        name="Cash"
                         />

                        <Boxes
                        icon="icon ion-md-bicycle"
                        title="Dispatchers"
                        amount={countRidersData?.data || 0}
                        name="Dispatcher"
                         />

                        <Boxes
                        icon="icon ion-md-people"
                        title="Staff"
                        amount={countStaffData?.data ||  0}
                        name="Staff"
                         />
                    </BoxesHolder>

                    {/* <div>
                        <img src="https://charts.livegap.com/Gallery/images/Chart-10.png" alt="chart" />
                    </div> */}

                    <div className="grid my-8 phone:grid-flow-row phone:grid-rows-3 laptop:grid-rows-2 laptop:grid-flow-col gap-4">
                     <div className="laptop:col-span-2 shadow-xs bg-gray-50 p-5 rounded-3xl col-span-2">
                        <div className="flex justify-start items-center gap-2">
                            <i className="icon ion-md-locate" title="Location"></i>
                            <h1 className="text-lg">Top Delivery Locations</h1>
                        </div>
                        <div className="flex justify-start flex-wrap my-4 items-center gap-5 text-xs text-gray-500/50">
                            {globaldata?.map((state: string) => (
                                <h3 onClick={() => setLocation(state)} className={location === state ? "bg-amber-500/10 text-amber-500 p-2 text-base rounded-full cursor-pointer text-center" : "p-2 rounded-full text-base cursor-pointer text-center"}>{state}</h3>
                            ))}
                        </div>

                        <div className="flex justify-between w-full scroll-width-3 overflow-x-auto items-start gap-3">
    
                            <SmallBoxes
                            icon="icon ion-md-cash"
                            title="Revenue"
                            amount="₦0"
                            name="Cash"
                             />

                            <SmallBoxes
                            icon="icon ion-md-cube"
                            title="Parcels"
                            amount={0}
                            name="Cube"
                             />

                            <SmallBoxes
                            icon="icon ion-md-people"
                            title="Customers"
                            amount={0}
                            name="Customers"
                             />                           
                        </div>
                    </div>

                    {/* second box */}

                   <div className="laptop:row-span-2 shadow-xs bg-gray-50 p-5 rounded-3xl col-span-2">
                        <div className="flex justify-start gap-3 items-center">
                            <i className="icon ion-md-laptop" title="Laptop"></i>
                            <h1 className="text-lg">Activities</h1>
                        </div>
                        <div className="text-center phone:relative phone:top-20  laptop:relative laptop:top-16">
                            <i id="bigger" className="icon ion-md-laptop" title="Laptop"></i>
                            <h1 className="text-base">Coming Soon</h1>
                            <p 
                            className="text-gray-500/50 phone:text-xs tablet:text-xs laptop:text-sm before-desktop:text-base after-laptop:text-base desktop:text-lg bigger-desktop:text-xl">
                                Have more control over what happens with your account.
                            </p>
                        </div>
                    </div>

                   <div className="laptop:row-span-3 shadow-xs col-span-2 flex flex-col justify-between bg-gray-50 rounded-3xl p-5">
                    <div>
                        <div className="flex justify-start gap-3 items-center">
                          <i className="icon ion-md-bicycle"></i>
                          <h1 className="text-lg">Parcels By Dispatchers</h1>
                        </div>
                        <p 
                        className="text-sm mt-3 text-gray-500">
                            Helps you know the Dispatchers that have delivered the most parcels
                        </p>
                    </div>

                    <div className="flex gap-8">
                        { dispatcherAllData?.data?.map((dispatcher: any, index: any) => (
                            <div>
                                <div className="flex justify-start text-gray-500 text-sm items-center gap-1">
                                    <span className="w-2 rounded-sm h-2 bg-green-600"></span>
                                    <p>{dispatcher.fullName}</p>
                                </div>
                                <h1>{dispatcher?.parcels || 0}%</h1>
                            </div>
                        ))
                        }
                    </div>
                   </div>
                  </div>
                </Section>
            </Holder>
        </>
    )
}