'use client'
import Image from "next/image";
import Holder from "../../holder";
import Section from "../../section";
import { useAccountVerify, useCardVerify, useFetchBankCodesAndLogos, useGetBankAccount } from "../../services/swr-functions/staff-swr";
import Hero from "../hero";
import PreferencesNav from "../preferencesnav";
import SubHeading from "../website/subheading";
import { useState, useContext, useEffect } from "react";
import SkeletonLoading from "../../services/eventhandlers/skeleton-loading";
import { State_data } from "../../context/context";
import { getBankAccount } from "../../services/staff-api/api";
import { customerAPIUrl } from "../../services/api-url/customer-api-url";
import { authorizationKeyCustomer } from "../../services/customer-api/api";
import { Password } from "../../formik/password";
import ErrorAndSucccessHandlers from "../../services/eventhandlers/error-and-success-handlers";
import SuccessMessage from "../../successmessage";

export default function Payments(){
  const [chargeBearer, setChargeBearer] =  useState<any>({
    info: "BUSINESS",
    result: "",
    code: ""
  });
  const {successMessage, setSuccessMessage} = useContext(State_data);
  const {bankCodesAndDetailsData, bankCodesAndDetailsError, bankCodesAndDetailsIsLoading, bankCodesAndDetailsIsValidating, bankCodesAndDetailsMutate} = useFetchBankCodesAndLogos();
  const {cardVerifyData, cardVerifyError, cardVerifyIsLoading, cardVerifyIsValidating, cardVerifyMutate} = useCardVerify();
  const {getBankAccountData, getBankAccountError, getBankAccountIsIsLoading, getBankAccountIsMutate, getBankAccountIsValidating} =  useGetBankAccount();
  async function handleChargeBearer(chargeBearer: any){
    const response = await fetch(customerAPIUrl.business, {
      method: 'PUT',
      body: JSON.stringify(chargeBearer),
      headers: {
          "Content-Type": "application/json",
          'Authorization': authorizationKeyCustomer
      }
  });
  const data = await response.json();
  setChargeBearer((prev: any) => ({...prev, result: data}))
  }

  useEffect(() => {
    if(chargeBearer.info !== ''){
      handleChargeBearer({chargeBearer: chargeBearer.info})
    }
  }, [chargeBearer.code]);

  function getBankDetails(details: any){
    let bankData = bankCodesAndDetailsData?.filter((bank: any) => String(bank.code) === String(details) || bank.name.toString().toLowerCase() === details.toString().toLowerCase());
    let logo = "";
    if(bankData)
    {
      logo = bankData[0]?.logo
    }
    return logo;
  }

  return(
    <Holder>
          {
            cardVerifyIsLoading || cardVerifyIsValidating && 
            <SkeletonLoading title="debit card..." loadingSearching="Loading" />
          }

          {
            bankCodesAndDetailsIsLoading || bankCodesAndDetailsIsValidating || 
            getBankAccountIsIsLoading || getBankAccountIsValidating &&
            <SkeletonLoading title="bank" loadingSearching="Loading" /> 
          }

            <PreferencesNav />
            <Section>
                {
                  chargeBearer.result !== "" && chargeBearer.info !== "" && successMessage.chargeBearer &&
                  <ErrorAndSucccessHandlers
                  name="chargeBearer"
                  successName={successMessage.chargeBearer}
                  message={chargeBearer?.result?.code} 
                  code={chargeBearer?.info?.code}
                  successmessage={`Charge bearer changed to '${chargeBearer.info}'`}
                  failedmessage="Sorry, charge bearer cannot be changed."
                  staffAndCustomer={chargeBearer?.result}
                  error={chargeBearer?.result?.code !== 200}
                  loading={chargeBearer?.result === "undefined" && chargeBearer?.info !== ""}
                  data={chargeBearer?.result}
                  />
                }
                {
                  (successMessage.paymentPreference && (bankCodesAndDetailsError || getBankAccountError ||  cardVerifyError)) &&
                  <SuccessMessage
                  successMessageShow={successMessage.paymentPreference}
                  id="failed" 
                  name="paymentPreference"
                  messageTitle="Error occured! Check network connection!"
                  />
                }

                <Hero heading="Payments" description="Manage your banks account and billing details" icon="icon ion-md-card">
                  <SubHeading subheading="Charge Bearer" />
                  <p className="text-gray-500">We charge 10% on every shipment where the customer pays via Paystack. Who will you like to bear this charge?</p> 
                  <div className="flex text-base mt-3 w-fit justify-start items-center">
                    <button className={chargeBearer?.info === "BUSINESS" ? "bg-amber-500 rounded-l-lg p-3 text-white" : "text-gray-500 rounded-l-lg p-3 bg-gray-200"} onClick={() => {setChargeBearer((prev: any) => ({...prev, code: Password(), result: "", info: 'BUSINESS'})); setSuccessMessage((prev: any) => ({...prev, chargeBearer: true}));}}>Business</button>
                    <button className={chargeBearer?.info === "CUSTOMER" ? "bg-amber-500 rounded-r-lg p-3 text-white" : "text-gray-500 rounded-r-lg p-3 bg-gray-200"} onClick={() => {setChargeBearer((prev: any) => ({...prev, code: Password(), result: "", info: 'CUSTOMER'})); setSuccessMessage((prev: any) => ({...prev, chargeBearer: true}));}}>Customer</button>
                  </div>

                  <SubHeading subheading="Payment Account" /> 
                  <p className="text-gray-500">We will be sending the amount charged on every shipment to this account</p> 
                  { getBankAccountData?.data && 
                      <div className="bg-amber-500 border-2 border-amber-500/50 shadow-xl h-full tablet:w-5/12 before-laptop:w-4/12 phone:w-full mt-5 text-gray-50 p-6 rounded-xl">
                          <img src={getBankDetails(getBankAccountData?.data?.bankCode)} className="w-10 rounded-lg" alt={getBankAccountData?.data?.bankCode} />
                          <h4 className="font-thin mt-12 text-lg">{getBankAccountData?.data?.accountNumber}</h4>
                          <h3 className="uppercase font-bold">{cardVerifyData?.data?.card?.account_name}</h3>
                      </div>
                  }
                  <SubHeading subheading="Debit Card" />
                  <p className="text-gray-500">We will need this to charge your card monthly as you use Logistix.</p> 
                  { cardVerifyData?.data && 
                      <div className="bg-amber-500 border-2 border-amber-500/50 shadow-xl h-full tablet:w-5/12 before-laptop:w-4/12 phone:w-full mt-5 text-gray-50 p-6 rounded-xl">
                          <img src={getBankDetails(cardVerifyData?.data?.card?.bank)} className="w-10 rounded-lg" alt={cardVerifyData?.data?.card?.bank} />
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