'use client'
import { useState } from "react";
import Heading from "../../heading";
import Holder from "../../holder";
import PreferencesNav from "../../preferences/preferencesnav";
import Section from "../../section";
import ToggleButton from "../shipment/toggleButton";
import SubHeading from "./subheading";
import { useBusiness } from "../../services/swr-functions/customer-swr";
import ButtonAndMessage from "../shipment/buttonandmessage";

export default function WebsitePreferences(){
    const [formData, setFormData] = useState<any>({
        active: true,
        additionalInfo: null,
        address: {
            city: "",
            country: 'Nigeria',
            state: "",
            street: "",
        },
        channel: "Social Media",
        chargeBearer: '',
        contact: {
            email: "",
            phone: "",
            whatsapp: ""
        },
        createdAt: "",
        disabled: false,
        email: "",
        favRiders: [],
        fullName: "",
        image: null,
        maintenance: true,
        paymentMethods: [],
        phone: "",
        platform: "",
        pricingPlan: null,
        rc: null,
        shippedParcel: null,
        sitedata: null,
        socialAccounts: {
            facebook: "",
            instagram: "",
            linkedln: "",
            twitter: ""
        },
        test: true,
        title: "",
        updatedAt: "",
        verified: true,
        website: "",
    })
    const handleToggleOnOff = () => {
        setFormData((prev: any) => ({...prev, maintenance: !formData.maintenance}));
    }

    const {businessChangeData, businessChangeError, businessChangeIsLoading,businessChangeIsValidating, businessChangeMutate} = useBusiness(formData)

    const handleFormData = (event: any) => {
        const {name, value} = event.target;
        setFormData((prev: any) => { 
            return {...prev, [name]: value}
        })
    }

    return(
        <Holder>
            <PreferencesNav />
            <Section>
                <div className="bg-gray-50 mt-5 p-5 rounded-2xl w-full relative h-full">
                  <div className="flex phone:flex-col laptop:gap-10 phone:text-center phone:justify-center laptop:justify-start laptop:flex-row phone:items-center laptop:items-center w-full h-fit">
                    <div>
                    <span className="rounded-full flex justify-center items-center bg-gray-200/40 p-1 shadow h-fit w-fit">
                        <img src="https://cakenus.logistix.africa/logo-icon.svg" alt="logo" />
                    </span>
                    <span className="relative w-full flex justify-between items-center bottom-10">
                        <input type="file" className="rounded-full shadow h-fit bg-gray-50 w-6" />
                            {/* <i className="icon ion-md-camera"></i> */}
                        <button className="rounded-full shadow h-fit bg-gray-50 w-6">
                            <i className="icon ion-md-close"></i>
                        </button>
                    </span>
                    </div>

                    <div className="flex phone:flex-col laptop:flex-col phone:justify-center laptop:justify-start laptop:items-start phone:items-center">
                        <Heading heading="Website Preferences" />
                        <p className="phone:text-sm laptop:text-base -mt-3 text-gray-500">Customize what your frontpage at <a className="text-gray-900" href="https://cakenus.logistix.africa">https://cakenus.logistix.africa</a> looks like.</p>
                    </div>
                  </div>

                  <hr className="bg-gray-500 mt-8" />
                  <div className="text-left">
                    <SubHeading subheading="Theme" />
                    <div className="rounded-xl mt-0 flex flex-col justify-center items-center mt-5 tracking-wide font-bold text-green-500 p-5 bg-green-100 w-28 h-28">
                         <i className="icon ion-md-brush" title="Brush"></i>
                         <p>Default</p>                         
                    </div>
                    <SubHeading subheading="Title" />
                    <input name="title" value={formData.title} onChange={handleFormData} type="text" className="w-full bg-gray-100 p-3 rounded-lg outline-0 "  />
                    <SubHeading subheading="Entry Text" />
                    <input name="entry_text" value="Same time every week day from 10am - 4pm daily" onChange={handleFormData} type="text" className="w-full bg-gray-100 p-3 rounded-lg outline-0 "  />
                    <SubHeading subheading="Maintenance Mode"/>
                    <p className="mt-2 text-sm">If for any reason you need to take your website offline, you can turn on maintenance mode.</p>
                    <ToggleButton onOff={formData.maintenance} handleOnOff={handleToggleOnOff} title={formData.maintenance ? "Turn On" : "Turn Off"} />
                    <SubHeading subheading="Contact Information" />
                    <div className="mt-2">
                        <label htmlFor="street" className="text-gray-500 text-base">Office Address</label>
                        <input name="street" value={formData.address.street} onChange={handleFormData} type="text" className="w-full mb-8 bg-gray-100 p-3 rounded-lg outline-0 "  />
                        <label htmlFor="email" className="text-gray-500 text-base">Email Address</label>
                        <input name="email" value={formData.email} onChange={handleFormData} type="text" className="w-full mb-8 bg-gray-100 p-3 rounded-lg outline-0 "  />
                        <label htmlFor="phone" className="text-gray-500 text-base">Phone</label>
                        <input name="phone" value={formData.phone} onChange={handleFormData} type="text" className="w-full mb-8 bg-gray-100 p-3 rounded-lg outline-0 "  />
                        <label htmlFor="whatsapp" className="text-gray-500 text-base">Whatsapp Contact</label>
                        <input name="whatsapp" value={formData.whatsapp} onChange={handleFormData} type="text" className="w-full mb-8 bg-gray-100 p-3 rounded-lg outline-0 "  />
                    </div>
                    <div>
                        <SubHeading subheading="Social Media" />
                        <div className="flex items-center my-5 bg-white gap-3 rounded-xl w-full justify-start p-4">
                            <i id="icon" className="icon ion-logo-facebook"></i>
                            <input name="facebook" type="text" onChange={handleFormData} value={formData.socialAccounts.facebook} className="bg-white outline-0 h-fit w-full" placeholder="username" />
                        </div>
                        <div className="flex items-center mb-5 bg-white gap-3 rounded-xl w-full justify-start p-4">
                            <i id="icon" className="icon ion-logo-twitter"></i>
                            <input name="twitter" type="text" onChange={handleFormData} value={formData.socialAccounts.twitter} className="bg-white outline-0 h-fit w-full" placeholder="username" />
                        </div>
                        <div className="flex items-center mb-5 bg-white gap-3 rounded-xl w-full justify-start p-4">
                            <i id="icon" className="icon ion-logo-instagram"></i>
                            <input name="instagram" type="text" onChange={handleFormData} value={formData.socialAccounts.instagram} className="bg-white outline-0 h-fit w-full" placeholder="username" />
                        </div>
                        <div className="flex items-center mb-5 bg-white gap-3 rounded-xl w-full justify-start p-4">
                            <i id="icon" className="icon ion-logo-linkedin"></i>
                            <input name="linkedln" type="text" onChange={handleFormData} value={formData.socialAccounts.linkedln} className="bg-white outline-0 h-fit w-full" placeholder="username" />
                        </div>
                    </div>
                  </div>
                  <ButtonAndMessage 
                  code={businessChangeData?.code}
                  error={businessChangeError}
                  mutate={businessChangeMutate}
                  successmessage="Your website has been updated!"
                  failedmessage="Sorry, your website cannot be updated!"
                  errormessage="Error occured! Check network connection."
                  buttonName="Save" 
                  />
                </div>
            </Section>
        </Holder>
    )
}