'use client'
import Image from "next/image";
import Holder from "../../holder";
import Section from "../../section";
import { useAccountVerify, useCardVerify, useGetBankAccount } from "../../services/swr-functions/staff-swr";
import Hero from "../hero";
import PreferencesNav from "../preferencesnav";
import SubHeading from "../website/subheading";
import { useState, useContext } from "react";
import { useBusiness } from "../../services/swr-functions/customer-swr";
import SkeletonLoading from "../../services/eventhandlers/skeleton-loading";
import SuccessMessag from "../../successmessage";
import { State_data } from "../../context/context";
import SuccessMessage from "../../successmessage";
import { getBankAccount } from "../../services/staff-api/api";

export default function Payments(){
  const [chargeBearer, setChargeBearer] =  useState<string>('BUSINESS');
  const {successMessage, setSuccessMessage} = useContext(State_data);
  const {businessChangeData, businessChangeError, businessChangeIsLoading, businessChangeIsValidating, businessChangeMutate} = useBusiness({chargeBearer: chargeBearer})
  const {cardVerifyData, cardVerifyError, cardVerifyIsLoading, cardVerifyIsValidating, cardVerifyMutate} = useCardVerify();
  const {getBankAccountData} =  useGetBankAccount();
  console.log(getBankAccountData, cardVerifyData)
  return(
    <Holder>
          {
            cardVerifyIsLoading || cardVerifyIsValidating && 
            <SkeletonLoading title="debit card..." loadingSearching="Loading" />
          }
          {
            businessChangeIsLoading || businessChangeIsValidating &&
            <SkeletonLoading title="charge bearer..." loadingSearching="Loading" />
          }
            <PreferencesNav />
            <Section>
              {
                businessChangeData?.code === 200 && successMessage?.chargeBearer &&
                <SuccessMessage 
                messageTitle={`Charge bearer has been changed to '${businessChangeData?.data?.chargeBearer.toLowerCase()}'`}
                successMessageShow={successMessage.chargeBearer}
                name="chargeBearer"
                />
              }
              {
                businessChangeError &&
                <SuccessMessage 
                 id="failed"
                 messageTitle="Sorry, charge cannot be changed"
                 successMessageShow={successMessage.chargeBearer}
                 name="chargeBearer"
                 />
              }
                <Hero heading="Payments" description="Manage your banks account and billing details" icon="icon ion-md-card">
                  <SubHeading subheading="Charge Bearer" />
                  <p className="text-gray-500">We charge 10% on every shipment where the customer pays via Paystack. Who will you like to bear this charge?</p> 
                  <div className="flex text-base mt-3 w-fit justify-start items-center">
                    <button className={chargeBearer === "BUSINESS" ? "bg-amber-500 rounded-l-lg p-3 text-white" : "text-gray-500 rounded-l-lg p-3 bg-gray-200"} onClick={() => {businessChangeMutate(null); setChargeBearer('BUSINESS'); setSuccessMessage((prev: any) => ({...prev, chargeBearer: true}));}}>Business</button>
                    <button className={chargeBearer === "CUSTOMER" ? "bg-amber-500 rounded-r-lg p-3 text-white" : "text-gray-500 rounded-r-lg p-3 bg-gray-200"} onClick={() => {businessChangeMutate(null); setChargeBearer('CUSTOMER'); setSuccessMessage((prev: any) => ({...prev, chargeBearer: true}));}}>Customer</button>
                  </div>

                  <SubHeading subheading="Payment Account" /> 
                  <p className="text-gray-500">We will be sending the amount charged on every shipment to this account</p> 
                  { getBankAccountData?.data && 
                      <div className="bg-amber-500 border-2 border-amber-500/50 shadow-xl h-full tablet:w-5/12 before-laptop:w-4/12 phone:w-full mt-5 text-gray-50 p-6 rounded-xl">
                          <Image src="" alt={getBankAccountData?.data?.bankCode} />
                          <h4 className="font-thin mt-12 text-lg">{getBankAccountData?.data?.accountNumber}</h4>
                          <h3 className="uppercase font-bold">{cardVerifyData?.data?.card?.account_name}</h3>
                      </div>
                  }
                  <SubHeading subheading="Debit Card" />
                  <p className="text-gray-500">We will need this to charge your card monthly as you use Logistix.</p> 
                  { cardVerifyData?.data && 
                      <div className="bg-amber-500 border-2 border-amber-500/50 shadow-xl h-full tablet:w-5/12 before-laptop:w-4/12 phone:w-full mt-5 text-gray-50 p-6 rounded-xl">
                          <Image src="" alt={cardVerifyData?.data?.card?.bank} />
                          <h4 className="font-bold tracking-widest mt-12 text-xl">{cardVerifyData?.data?.card?.bin.slice(0, 4)} {cardVerifyData?.data?.card?.bin.slice(4)}<span className="text-2xl">.. ....</span> {cardVerifyData?.data?.card?.last4}</h4>
                          <p className="my-1 font-thin">{cardVerifyData?.data?.card?.exp_month}/{cardVerifyData?.data?.card?.exp_year.slice(2)}</p>
                          <h3 className="uppercase font-thin">{cardVerifyData?.data?.card?.account_name}</h3>
                      </div>
                  }
                </Hero>
            </Section>
        </Holder>
    )
}