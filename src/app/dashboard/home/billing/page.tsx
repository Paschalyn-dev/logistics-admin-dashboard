'use client'
import Loading from "@/app/loading";
import Boxes from "../../boxes";
import Heading from "../../heading";
import Holder from "../../holder";
import Section from "../../section";
import HomeNav from "../homenav";
import { useBillingInvoice } from "../../services/swr-functions/customer-swr";

export default function Billing(){
  const {billingInvoiceData} = useBillingInvoice();
    return(
      <Holder>
        <HomeNav />  
        <Section>
          <Heading heading="Billing" />
          <div className="flex flex-wrap phone:justify-center tablet:justify-between laptop:justify-start items-center mt-7 w-full">
            <Boxes
            icon = "icon ion-md-cash"
            name="Cash"
            title="Monthly Bill"
            amount={billingInvoiceData?.data ? '₦' + billingInvoiceData?.data?.amount : "₦0"}
            />
           </div>

           <Heading heading="Invoices" />
           <div className="flex flex-col justify-center items-center text-center shadow-xs p-5 h-72 laptop:w-max w-full bg-gray-50 rounded-3xl mb-10">
              <i id="bigger" className="icon ion-md-filing"></i>
              <h1 className="phone:text-lg mt-5 laptop:text-xl">Coming Soon</h1>
              <p className="phone:text-sm laptop:text-base">You will be able to view and download the invoices generated for your business.</p>
           </div>
        </Section>
      </Holder>
    )
}