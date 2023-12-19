'use client'
import Link from "next/link";
import Button from "../dashboard/button";
import Heading from "../dashboard/heading";
import ToggleButton from "../dashboard/preferences/shipment/toggleButton";
import Label from "../dashboard/preferences/website/label";
import SubHeading from "../dashboard/preferences/website/subheading";
import DefaultInput from "../dashboard/profile/input";
import { useState } from "react";
import MiniText from "../dashboard/minitext";
import PayStackHookExample from "../dashboard/preferences/payments/paystack";

export default function ShipParcel(){
    const [pages, setPage] = useState<string[]>(['parcel'])
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const [currentPage, setCurrentPage] = useState<string>('parcel')
    const [formData, setFormData] = useState<any>({
        ship: "",
        isFragile: false,
        additionalInfo: "",
        sender: {
            name: "",
            address: "",
            email: "",
            phone: ""
        },
        receiver: {
            name: "",
            address: "",
            email: "",
            phone: ""
        },
    })
    const handleIsFragile = () => {
        setFormData((prev: any) => ({...prev, isFragile: !formData.isFragile}))
    }
    const handleFormDataChange = (event: any) => {
        const e = event.target;
        setFormData((prev: any) => ({...prev, [e?.name]: e?.value}))
    }
    const handleParcelNext = () => {
        if(formData.ship?.length > 0){
            setPage((prev: string[]) => [...prev, 'address']);
            setCurrentPage('address')
        }
        else{
            alert('You have not filled all the required fields correctly.')
        }
    }

    const handleFormDataSender = (event: any) => {
        const e = event.target;
        setFormData((prev: any) => ({...prev, sender: {...formData.sender, [e?.name]: e?.value}}))
    }

    const handleFormDataReceiver = (event: any) => {
        const e = event.target;
        setFormData((prev: any) => ({...prev, receiver: {...formData.receiver, [e?.name]: e?.value}}))
    }

    const handleAddressNext = () => {
        if(Object.values(formData?.sender)?.filter((val: any) => val !== "").length === 4 && emailRegex.test(formData.sender.email) 
        && emailRegex.test(formData.receiver.email) && Object.values(formData?.receiver)?.filter((val: any) => val !== "").length === 4){
            setPage((prev: string[]) => [...prev, 'payment']);
            setCurrentPage('payment')
        }
        else{
            alert('You have not filled all the required fields correctly.')
        }
    }
    const handleParcel = () => {
        setCurrentPage('parcel')
    }

    const handleAddress = () => {
        setCurrentPage('address')
    }

    const handlePayment = () => {
        setCurrentPage('payment')
    }
    return(
        <div className="flex phone:px-5 laptop:px-7 phone:py-10 laptop:py-20 flex-col justify-center items-center w-full">
            <div className="rounded-3xl phone:w-full tablet:w-11/12 laptop:w-9/12 h-fit bg-gray-50 px-5 py-8">
                    <Link href="/" className="cursor-pointer rounded-full bg-gray-100 w-fit py-1 px-3 text-2xl">
                        <i className="icon ion-md-arrow-back" />
                    </Link>

                    <Heading heading="Ship Parcel"/>
                    <p className="font-thin text-gray-500 -mt-5">Help us with the details of your parcel.</p>

                    <div className="flex mt-10 mb-2 overflow-x-auto w-full justify-start gap-7 items-center">
                        <button onClick={handleParcel} className={pages.includes('parcel') && currentPage === 'parcel' ? "flex cursor-pointer gap-2 items-center justify-center" : pages.includes('parcel') && currentPage !== 'parcel' ? "flex cursor-pointer text-gray-500 gap-2 items-center justify-center" : "flex gap-2 cursor-not-allowed items-center justify-center text-gray-400"} disabled={!pages.includes('parcel')}>
                            <i className="icon ion-md-cube" />
                            <span>Parcel</span>
                        </button>

                        <button onClick={handleAddress} className={pages.includes('address') && currentPage === 'address' ? "flex gap-2 cursor-pointer items-center justify-center" : pages.includes('address') && currentPage !== 'address' ? "flex cursor-pointer text-gray-500 gap-2 items-center justify-center" : "flex gap-2 cursor-not-allowed items-center justify-center text-gray-400"} disabled={!pages.includes('address')}>
                            <i className="icon ion-md-pin" />
                            <span>Address</span>
                        </button>

                        <button onClick={handlePayment} className={pages.includes('payment') && currentPage === 'payment' ? "flex gap-2 cursor-pointer  items-center justify-center" : pages.includes('payment') && currentPage !== 'payment' ? "flex cursor-pointer text-gray-500 gap-2 items-center justify-center" : "flex gap-2 cursor-not-allowed items-center justify-center text-gray-400"} disabled={!pages.includes('payment')}>
                            <i className="icon ion-md-card" />
                            <span>Payment</span>
                        </button>
                    </div>
                    <hr className="mb-5"/>

                    { currentPage === "parcel" && <div>
                        <Label htmlFor="ship" text="What do you want to ship?*  (0/40)" />
                        <DefaultInput name="ship" onChange={handleFormDataChange} value={formData.ship} type="text"/>

                        <Label text="Is this parcel fragile?" />
                        <ToggleButton 
                        handleOnOff={handleIsFragile}
                        onOff={formData?.isFragile}
                        title={formData?.isFragile ? 'Yes' : 'No'}
                        />

                        <Label text="Additional Info (optional)" />
                        <textarea className="w-full mt-2 mb-10 bg-gray-100 p-3 rounded-lg outline-0" onChange={handleFormDataChange} value={formData?.additionalInfo}  name="additionalInfo" />
                    
                        <Button
                        handleClick={handleParcelNext}
                        buttonName="Next"
                        />
                    </div>}

                    {currentPage === "address" && <div>
                        <div className="flex phone:flex-wrap tablet:flex-nowrap gap-5 justify-center w-full items-center">
                        <div className="phone:w-full tablet:w-1/2">
                                <SubHeading subheading="Pickup" />
                                <br/>

                                <Label text="Sender Name*" />
                                <DefaultInput onChange={handleFormDataSender} type="text" name="name" value={formData?.sender?.name} />

                                <Label text="Sender Address*" />
                                <DefaultInput onChange={handleFormDataSender} type="text" name="address" value={formData?.sender?.address} />

                                <Label text="Sender Email*" />
                                <DefaultInput onChange={handleFormDataSender} type="email" name="email" value={formData?.sender?.email} />

                                <Label text="Sender Phone*" />
                                <DefaultInput onChange={handleFormDataSender} type="tel" name="phone" value={formData?.sender?.phone} />
                            </div>
                                
                            <div className="phone:w-full tablet:w-1/2">
                                <SubHeading subheading="Drop-off" />
                                <br />

                                <Label text="Receiver Name*" />
                                <DefaultInput onChange={handleFormDataReceiver} type="text" name="name" value={formData?.receiver?.name} />

                                <Label text="Receiver Address*" />
                                <DefaultInput onChange={handleFormDataReceiver} type="text" name="address" value={formData?.receiver?.address} />

                                <Label text="Receiver Email*" />
                                <DefaultInput onChange={handleFormDataReceiver} type="email" name="email" value={formData?.receiver?.email} />

                                <Label text="Receiver Phone*" />
                                <DefaultInput onChange={handleFormDataReceiver} type="phone" name="phone" value={formData?.receiver?.phone} />
                            </div>

                        </div>
                        <div className="float-right flex justify-start items-center gap-5">
                            <Button
                            handleClick={handleParcel}
                            buttonName="Previous"
                            id="failed"
                            />

                            <Button 
                            handleClick={handleAddressNext}
                            buttonName="Next"
                            />
                        </div>

                    </div>}



                {currentPage === 'payment' && <div>
                    <p className="text-gray-600/90 font-thin">Kindly confirm the details of your Shipping before proceeding to payment.</p>
                    <div className="px-5 py-3 mt-6 mb-4 rounded-xl bg-gray-100/50">
                        <Heading heading={formData.ship} />
                        <hr className="my-4 border-dashed"/>
                        <div className="my-5 overflow-x-auto">
                            <h2 className="rounded-lg w-fit p-3 bg-gray-200/50 text-sm">Shipping From</h2>
                            <p className="font-thin my-1 mx-2 text-sm">{formData.sender.address}</p>
                            <p className="font-thin text-gray-600/90 my-1 mx-2 text-sm">{formData.sender.name}</p>
                            <p className="font-thin text-gray-600/90 my-1 mx-2 text-sm">{formData.sender.email}</p>
                            <p className="font-thin text-gray-600/90 my-1 mx-2 text-sm">{formData.sender.phone}</p>
                        </div>
                        <hr className="border-dashed"/>
                        <div className="my-5">
                            <h2 className="rounded-lg w-fit p-3 bg-gray-200/50 text-sm">Shipping To</h2>
                            <p className="font-thin my-1 mx-2 text-sm">{formData.receiver.address}</p>
                            <p className="font-thin text-gray-600/90 my-1 mx-2 text-sm">{formData.receiver.name}</p>
                            <p className="font-thin text-gray-600/90 my-1 mx-2 text-sm">{formData.receiver.email}</p>
                            <p className="font-thin text-gray-600/90 my-1 mx-2 text-sm">{formData.receiver.phone}</p>
                        </div>
                    </div>
                    <p className="font-thin text-gray-600/80">Payment Option</p>
                    <div className="flex my-5 flex-wrap w-full justify-between items-center gap-5">
                        <img className="w-64 float-center" src="https://149626172.v2.pressablecdn.com/wp-content/uploads/2021/09/TransparentSecuredbyPaystackBadge-SA.png" alt="paystack" />
                            
                            <div className="flex justify-start gap-5 items-center">
                                <Button
                                handleClick={handleAddress}
                                buttonName="Previous"
                                id="failed"
                                />

                                <PayStackHookExample text="Next" amount={1000000} style="cursor-pointer float-right font-bold text-gray-50 bg-green-600/80 shadow-lg px-7 py-2 rounded-3xl select-none active:translate-y-1 active:[box-shadow:0_0px_0_0_#16a34a,0_0px_0_0_#16a34a] active:border-b-[0px] transition-all duration-150 [box-shadow:0_5px_0_0_#16a34a,0_2px_0_0_#16a34a] border-[1px] border-green-600" />
                            </div>
                    </div>
                </div>}
            </div>
        </div>
    )
}