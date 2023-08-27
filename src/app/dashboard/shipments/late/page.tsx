'use client'
import { useState } from "react";
import Heading from "../../heading";
import Holder from "../../holder";
import OrdersNav from "../../orders";
import SubHeading from "../../preferences/website/subheading";
import Section from "../../section";
import Loader from "../../services/Loader/spinner";
import SkeletonLoading from "../../services/eventhandlers/skeleton-loading";
import { useLateParcels } from "../../services/swr-functions/customer-swr";
import SuccessMessage from "../../successmessage";
import BoxesHolder from "../../boxesholder";

export default function Late(){
    const {parcelLatesData, parcelLatesError, parcelLatesIsLoading, parcelLatesIsValiddating} = useLateParcels();
    const [successmessage, setSuccessMessage] = useState<boolean>(true);
    console.log(parcelLatesData)
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
                parcelLatesError && successmessage &&
                <SuccessMessage
                successMessageShow={successmessage}
                handleShowSuccessMessage={setSuccessMessage}
                id="failed"
                messageTitle="Late shipments cannot be fetched. Check network connection!"
                />
               }
                        <div className="flex flex-col w-full justify-center items-center">
                            <span className="-mb-16">
                                <i id="bigger" className="icon ion-md-cube"></i>
                            </span>
                            <br/>
                            <SubHeading subheading="You're all Caught Up."/>
                            <p className="w-5/12 mt-1 text-sm text-center">Nice! You're doing well. If for any reason you're running late on a delivery, those parcels will show up here.</p>
                        </div>
            </Section>
        </Holder>
    )
}