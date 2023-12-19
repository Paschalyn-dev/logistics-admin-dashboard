import Link from "next/link";
import Button from "../dashboard/button";
import Heading from "../dashboard/heading";
import ToggleButton from "../dashboard/preferences/shipment/toggleButton";
import Label from "../dashboard/preferences/website/label";
import SubHeading from "../dashboard/preferences/website/subheading";
import DefaultInput from "../dashboard/profile/input";

export default function ShipParcel(){
    return(
        <div className="flex phone:px-5 laptop:px-7 phone:py-10 laptop:py-20 flex-col justify-center items-center w-full">
            <div className="rounded-3xl phone:w-full tablet:w-11/12 laptop:w-9/12 h-fit bg-gray-50 px-5 py-8">
                    <Link href="/" className="cursor-pointer rounded-full bg-gray-100 w-fit py-1 px-3 text-2xl">
                        <i className="icon ion-md-arrow-back" />
                    </Link>

                    <Heading heading="Ship Parcel"/>
                    <p className="font-thin text-gray-500 -mt-5">Help us with the details of your parcel.</p>

                    <div className="flex mt-10 mb-2 overflow-x-auto w-full justify-start gap-7 items-center">
                        <div className="flex gap-2 items-center justify-center">
                            <i className="icon ion-md-cube" />
                            <p>Parcel</p>
                        </div>

                        <div className="flex gap-2 items-center justify-center">
                            <i className="icon ion-md-pin" />
                            <p>Address</p>
                        </div>

                        <div className="flex gap-2 items-center justify-center">
                            <i className="icon ion-md-card" />
                            <p>Payment</p>
                        </div>
                    </div>
                    <hr className="mb-5"/>

                <div>
                    <Label htmlFor="ship" text="What do you want to ship?*  (0/40)" />
                    <DefaultInput name="ship" type="text"/>

                    <Label text="Is this parcel fragile?" />
                    <ToggleButton 
                    title="No"
                    />

                    <Label text="Additional Info (optional)" />
                    <textarea className="w-full mt-2 mb-10 bg-gray-100 p-3 rounded-lg outline-0"  name="message" />

                    <Button
                    buttonName="Next"
                    />
                </div>





                <div>
                    <div className="flex phone:flex-wrap tablet:flex-nowrap gap-5 justify-center w-full items-center">
                    <div className="phone:w-full tablet:w-1/2">
                            <SubHeading subheading="Pickup" />
                            <br/>

                            <Label text="Sender Name" />
                            <DefaultInput />

                            <Label text="Sender Address" />
                            <DefaultInput />

                            <Label text="Sender Email" />
                            <DefaultInput />

                            <Label text="Sender Phone" />
                            <DefaultInput />
                        </div>
                            
                        <div className="phone:w-full tablet:w-1/2">
                            <SubHeading subheading="Drop-off" />
                            <br />

                            <Label text="Receiver Name" />
                            <DefaultInput />

                            <Label text="Receiver Address" />
                            <DefaultInput />

                            <Label text="Receiver Email" />
                            <DefaultInput />

                            <Label text="Receiver Phone" />
                            <DefaultInput />
                        </div>

                    </div>
                    <div className="float-right flex justify-start items-center gap-5">
                        <Button
                        buttonName="Previous"
                        id="failed"
                        />

                        <Button 
                        buttonName="Next"
                        />
                    </div>

                </div>



                <div>
                    <p>Kindly confirm the details of your Shipping before proceeding to payment.</p>
                </div>
            </div>
        </div>
    )
}