'use client'
import { useContext, useState } from "react";
import ConstantNav from "../constantNav";
import Heading from "../heading";
import Section from "../section";
import WelcomeBoxes from "./welcomeboxes";
import Video from "../video";
import Holder from "../holder";
import { useCardVerify, useFetchLocations, useGetBankAccount, useGetDistancePricing, usePostDistancePricing } from "../services/swr-functions/staff-swr";
import WelcomeBoxesDefault from "./welcomeboxesdefault";
import ButtonAndMessage from "../preferences/shipment/buttonandmessage";
import { State_data } from "../context/context";

export default function Welcome(){
    const [showVideo, setShowVideo] = useState<boolean>(false);
    const {getLocationsData} = useFetchLocations();
    const {getDistancePriceData} = useGetDistancePricing();
    const {getBankAccountData} = useGetBankAccount();
    const {cardVerifyData} = useCardVerify()
    const checkProgress: string[] = [];
    const handleCompleteSetup = () => {
        setSuccessMessage((prev: any) => ({...prev, completeSetup: true}))
    }
    const {successMessage, setSuccessMessage} = useContext(State_data)
    if(getLocationsData?.data?.length){
        checkProgress.push('locations')
    }
    
    if(getBankAccountData?.data){
        checkProgress.push('bankAccount')
    }
    
    if(getDistancePriceData?.data?.length){
        checkProgress.push('distancePricing')
    }
    
    if(cardVerifyData?.data){
        checkProgress.push('cardVerify')
    }

        return(
        <Holder>
            <ConstantNav />
            <Section>
                <div className="flex flex-row justify-start items-center">
                    <Heading heading="Welcome" />
                    <span className="text-2xl laptop:text-3xl desktop:text-4xl"> 🎉🥳 </span>
                </div> 

                <div className="flex laptop:mt-3 justify-start items-center phone:font-medium laptop:font-semibold gap-5">
                    <div className={checkProgress.length >= 0 && checkProgress.length < 2 ? "rounded-full bg-gray-300 shadow-sm phone:text-base laptop:text-xl text-gray-50 p-4" : checkProgress.length >= 2 && checkProgress.length < 4 ? "rounded-full bg-yellow-200/50 shadow-sm phone:text-base laptop:text-xl text-yellow-500 p-4" :  "rounded-full bg-green-100 shadow-sm phone:text-base laptop:text-xl text-green-500 p-4"}>
                        <p>{checkProgress.length}/4</p>
                    </div>
                    { checkProgress.length === 4 ?
                        <div>
                            <h1 className="text-lg text-green-500 phone:text-base laptop:text-xl">Yaaay! We're done. Click the button below to complete setup.</h1>
                            {/* <p className="laptop:text-lg phone:text-base">Skip this part!</p> */}
                        </div>
                        :
                        <div>
                            <h1 className="text-lg phone:text-base laptop:text-xl">Complete this part to setup your business.</h1>
                            {/* <p className="text-gray-500 laptop:text-lg phone:text-base">Skip this part</p> */}
                        </div>
                    }
                </div>

                <div onClick={() => {setShowVideo(true)}} className="flex justify-start phone:w-full laptop:w-fit cursor-pointer items-center gap-4 text-blue-500 h-16 shadow-sm mt-8 bg-gray-50 rounded-3xl p-5">
                  <span className="rounded-full bg-blue-500 py-1 px-3 text-white"><i className="icon ion-ios-play"></i></span>
                  <h1>Show me how to setup my business</h1>
                </div>

                {showVideo && <Video showvideo={setShowVideo} />}

                <div className="mt-6 flex flex-col justify-center items-center gap-5">
                    { getLocationsData?.data?.length > 0 ? 
                    <WelcomeBoxes
                    icon="icon ion-md-checkmark"
                    step="STEP ONE"
                    heading="Add your Delivery Locations"
                    text="Let's Add the locations your delivers to and from. We'll use this to assist you in only receiving orders from the locations your business covers."
                    title="Check circle"
                    imageText="location"
                    img="https://img.icons8.com/?size=512&id=FvtoxuNYC9CD&format=png"
                     />
                     :
                     <WelcomeBoxesDefault 
                     icon="icon ion-md-checkmark"
                     step="STEP ONE"
                     linkName="Add Location"
                     link="/dashboard/preferences/shipment"
                     heading="Add your Delivery Locations"
                     text="Let's Add the locations your delivers to and from. We'll use this to assist you in only receiving orders from the locations your business covers."
                     title="Check circle"
                     imageText="location"
                     img="https://img.icons8.com/?size=512&id=FvtoxuNYC9CD&format=png"
                     />
                    }

                    { getDistancePriceData?.data?.length > 0 ?
                    <WelcomeBoxes
                    icon="icon ion-md-checkmark"
                    step="STEP TWO"
                    heading="Create your Price List"
                    text="Create a price list for your business. This helps your Customers know how much it costs to ship from Point A to Point B."
                    title="Check circle"
                    imageText="price"
                    img="https://img.icons8.com/?size=512&id=n2xlO01NELDl&format=png"
                     />
                     :
                     <WelcomeBoxesDefault
                     icon="icon ion-md-checkmark"
                     step="STEP TWO"
                     link="/dahsboard/preferences/shipment"
                     linkName="Add Price"
                     heading="Create your Price List"
                     text="Create a price list for your business. This helps your Customers know how much it costs to ship from Point A to Point B."
                     title="Check circle"
                     imageText="price"
                     img="https://img.icons8.com/?size=512&id=n2xlO01NELDl&format=png"
                      />
                    }

                    { cardVerifyData?.data ?
                    <WelcomeBoxes
                    icon="icon ion-md-checkmark"
                    step="STEP THREE"
                    heading="Setup your Bank Account"
                    text="All payments will be made to the account you provide."
                    title="Check circle"
                    imageText="bank"
                    img="https://img.icons8.com/?size=512&id=jm4sI8I6lGAa&format=png"
                     />
                     :
                     <WelcomeBoxesDefault
                     icon="icon ion-md-checkmark"
                     step="STEP THREE"
                     link="/dashboard/preferences/payments"
                     linkName="Add Bank Details"
                     heading="Setup your Bank Account"
                     text="All payments will be made to the account you provide."
                     title="Check circle"
                     imageText="bank"
                     img="https://img.icons8.com/?size=512&id=jm4sI8I6lGAa&format=png"
                      />
                    }

                    {getBankAccountData?.data ?
                    <WelcomeBoxes
                    icon="icon ion-md-checkmark"
                    step="STEP FOUR"
                    heading="Add your Debit/Credit Card"
                    text="You will need this to continue using Logistix."
                    title="Check circle"
                    imageText="card"
                    img="https://img.icons8.com/?size=512&id=cRTDkLZsjH57&format=png"
                     />
                     :
                     <WelcomeBoxesDefault
                     icon="icon ion-md-checkmark"
                     step="STEP FOUR"
                     link="/dashboard/preferences/payments"
                     linkName="Add Card"
                     heading="Add your Debit/Credit Card"
                     text="You will need this to continue using Logistix."
                     title="Check circle"
                     imageText="card"
                     img="https://img.icons8.com/?size=512&id=cRTDkLZsjH57&format=png"
                      />
                    }
                </div>
                <div className="laptop:text-base desktop:text-lg phone:text-sm mt-8 text-gray-50 w-full flex justify-end items-center">
                    <ButtonAndMessage
                     name="completeSetup"
                     title={successMessage.completeSetup}
                     handleClick={handleCompleteSetup}
                     code={checkProgress.length === 4 ? 200 : 0}  
                     failedmessage={`Setup failed! You have ${4 - checkProgress.length} more tabs to setup.`}
                     successmessage="Congratulations! You have succesfully completed your business setup." 
                     buttonName="Complete Setup" 
                     />
                </div>
            </Section>    
        </Holder>
    )
}