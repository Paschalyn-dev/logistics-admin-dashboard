'use client'
import Heading from "../../heading";
import Holder from "../../holder";
import OrdersNav from "../../orders";
import SubHeading from "../../preferences/website/subheading";
import Section from "../../section";

export default function Delivered(){
    return(
        <Holder>
            <OrdersNav />
            <Section>
               <Heading heading="Scheduled Orders" />
               <div className="p-2 text-sm bg-green-100 text-green-600 w-fit rounded-lg">COMING SOON</div>
               <div className="flex flex-col w-full justify-center items-center">
                            <span className="-mb-16">
                                <i id="bigger" className="icon ion-md-cube"></i>
                            </span>
                            <br/>
                            <SubHeading subheading="No Scheduled Order."/>
                            <p className="w-5/12 mt-1 text-sm text-center">Whenever a customer schedules an order, we'll catch it here.</p>
                </div>
            </Section>
        </Holder>
    )
}