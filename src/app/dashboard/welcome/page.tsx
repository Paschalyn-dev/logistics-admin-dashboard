'use client'
import { useState } from "react";
import ConstantNav from "../constantNav";
import Heading from "../heading";
import Section from "../section";
import WelcomeBoxes from "./welcomeboxes";
import Video from "../video";
import Holder from "../holder";
import Location from "./icons8-shipping-location-64.png";
import Input from "../input";
import Button from "../button";

export default function Welcome(){
    const [showVideo, setShowVideo] = useState<boolean>(false);
    return(
        <Holder>
            <ConstantNav />

            <Section>
                <div className="flex flex-row justify-start items-center">
                    <Heading heading="Welcome" />
                    <span className="text-2xl laptop:text-3xl desktop:text-4xl"> 🎉🥳 </span>
                </div> 

                <div className="flex laptop:mt-3 justify-start items-center phone:font-medium laptop:font-semibold gap-5">
                    <div className="rounded-full bg-green-100/70 shadow-sm phone:text-base laptop:text-xl text-green-500 p-4">
                        <p>0/4</p>
                    </div>
                    <div>
                        <h1 className="text-lg  phone:text-base laptop:text-xl">Yaaay! We're done.</h1>
                        <p className="text-green-500 laptop:text-lg phone:text-base">Skip this part</p>
                    </div>
                </div>

                <div onClick={() => {setShowVideo(true)}} className="flex justify-start phone:w-full laptop:w-fit cursor-pointer items-center gap-4 text-blue-500 h-16 shadow-sm mt-8 bg-gray-50 rounded-3xl p-5">
                  <span className="rounded-full bg-blue-500 py-1 px-3 text-white"><i className="icon ion-ios-play"></i></span>
                  <h1>Show me how to setup my business</h1>
                </div>

                {showVideo && <Video showvideo={setShowVideo} />}

                <div className="mt-6 flex flex-col justify-center items-center gap-5">
                    <WelcomeBoxes
                    icon="icon ion-md-checkmark"
                    step="STEP ONE"
                    heading="Add your Delivery Locations"
                    text="Let's Add the locations your delivers to and from. We'll use this to assist you in only receiving orders from the locations your business covers."
                    title="Check circle"
                    imageText="location"
                    img="https://img.icons8.com/?size=512&id=FvtoxuNYC9CD&format=png"
                     />

                    <WelcomeBoxes
                    icon="icon ion-md-checkmark"
                    step="STEP TWO"
                    heading="Create your Price List"
                    text="Create a price list for your business. This helps your Customers know how much it costs to ship from Point A to Point B."
                    title="Check circle"
                    imageText="price"
                    img="https://img.icons8.com/?size=512&id=n2xlO01NELDl&format=png"
                     />

                    <WelcomeBoxes
                    icon="icon ion-md-checkmark"
                    step="STEP THREE"
                    heading="Setup your Bank Account"
                    text="All payments will be made to the account you provide."
                    title="Check circle"
                    imageText="bank"
                    img="https://img.icons8.com/?size=512&id=jm4sI8I6lGAa&format=png"
                     />

                    <WelcomeBoxes
                    icon="icon ion-md-checkmark"
                    step="STEP FOUR"
                    heading="Add your Debit/Credit Card"
                    text="You will need this to continue using Logistix."
                    title="Check circle"
                    imageText="card"
                    img="https://img.icons8.com/?size=512&id=cRTDkLZsjH57&format=png"
                     />
                </div>
                <div className="laptop:text-base desktop:text-lg phone:text-sm mt-8 text-gray-50 w-full flex justify-end items-center">
                    <Button buttonName="Complete Setup" />
                </div>
            </Section>    
        </Holder>
    )
}