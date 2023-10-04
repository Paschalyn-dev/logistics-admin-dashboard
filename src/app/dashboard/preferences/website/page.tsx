'use client'
import { useState, useContext } from "react";
import Heading from "../../heading";
import Holder from "../../holder";
import PreferencesNav from "../../preferences/preferencesnav";
import Section from "../../section";
import ToggleButton from "../shipment/toggleButton";
import SubHeading from "./subheading";
import { useBusiness, useGetBusiness } from "../../services/swr-functions/customer-swr";
import ButtonAndMessage from "../shipment/buttonandmessage";
import SkeletonLoading from "../../services/eventhandlers/skeleton-loading";
import { State_data } from "../../context/context";
import SuccessMessage from "../../successmessage";

export default function WebsitePreferences(){
    const {getBusinessData, getBusinessError, getBusinessIsLoading, getBusinessIsValidating, getBusinessMutate} = useGetBusiness();
    const [uploadFile, setUploadFile] = useState<any>('')
    const [formData, setFormData] = useState<any>({
        active: getBusinessData?.data?.active,
        additionalInfo: getBusinessData?.data?.additionalInfo,
        entryText: getBusinessData?.data?.entryText,
        address: {
            city: getBusinessData?.data?.address?.city,
            country: getBusinessData?.data?.address?.country,
            state: getBusinessData?.data?.address?.state,
            street: getBusinessData?.data?.address?.street,
        },
        channel: getBusinessData?.data?.channel,
        chargeBearer: getBusinessData?.data?.chargeBearer,
        contact: {
            email: getBusinessData?.data?.contact?.email,
            phone: getBusinessData?.data?.contact?.phone,
            whatsapp: getBusinessData?.data?.contact?.whatsapp
        },
        createdAt: getBusinessData?.data?.createdAt,
        disabled: getBusinessData?.data?.disabled,
        email: getBusinessData?.data?.email,
        favRiders: getBusinessData?.data?.favRiders,
        fullName: getBusinessData?.data?.fullName,
        image: getBusinessData?.data?.image,
        maintenance: getBusinessData?.data?.maintenance,
        paymentMethods: getBusinessData?.data?.paymentMethods,
        phone: getBusinessData?.data?.phone,
        platform: getBusinessData?.data?.platform,
        pricingPlan: getBusinessData?.data?.pricingPlan,
        rc: getBusinessData?.data?.rc,
        shippedParcel: getBusinessData?.data?.shippedParcel,
        sitedata: getBusinessData?.data?.sitedata,
        socialAccounts: {
            facebook: getBusinessData?.data?.socialAccounts?.facebook,
            instagram: getBusinessData?.data?.socialAccounts?.instagram,
            linkedln: getBusinessData?.data?.socialAccounts?.linkedln,
            twitter: getBusinessData?.data?.socialAccounts?.twitter
        },
        test: getBusinessData?.data?.test,
        title: getBusinessData?.data?.title,
        updatedAt: getBusinessData?.data?.updatedAt,
        verified: getBusinessData?.data?.verified,
        website: getBusinessData?.data?.whatsapp,
    });
    
    const handleToggleOnOff = () => {
        setFormData((prev: any) => ({...prev, maintenance: !formData.maintenance}));
    }
    
    const {successMessage, setSuccessMessage} = useContext(State_data)
    const handleFormData = (event: any) => {
        const {name, value} = event.target;
        setFormData((prev: any) => { 
            return {...prev, [name]: value}
        })
    }

    const handleSaveSite = () => {
        setSuccessMessage((prev: any) => ({...prev, saveWebsite: true}))
    }

    const handleInnerFormData = (event: any) => {
        const {name, value} = event.target;
        setFormData((prev: any) => { 
            return {...prev, address: {...formData.address, [name]: value}}
        })
    }

    const handleContact = (event: any) => {
        const {name, value} = event.target;
        setFormData((prev: any) => {
            return{...prev, contact: {...formData.contact, [name]: value}}
        })
    }

    const handleSocialAccounts = (event: any) => {
        const {name, value} = event.target;
        setFormData((prev: any) => { 
            return {...prev, socialAccounts: {...formData.socialAccounts, [name]: value}}
        })
    }
    // let reader  = new FileReader();
    // reader.readAsDataURL(document.getElementById('upload'));
      
    const {businessChangeData, businessChangeError, businessChangeIsLoading,businessChangeIsValidating, businessChangeMutate} = useBusiness(formData)
    
    return(
        <Holder>
            {
                businessChangeIsLoading || businessChangeIsValidating &&
                <SkeletonLoading title="website details"  loadingSearching="Updating"/>
            }
            {
                getBusinessIsLoading || getBusinessIsValidating &&
                <SkeletonLoading title="website details"  loadingSearching="Fetching" />
            }
            {
                getBusinessError && successMessage.websiteError &&
                <SuccessMessage 
                 name="websiteError"
                 successMessageShow={successMessage.websiteError}
                 id="failed"
                 messageTitle="Error occured! Check network connection!"
                />
            }
            <PreferencesNav />
            <Section>
                <div className="bg-gray-50 mt-5 p-5 rounded-2xl w-full relative h-full">
                  <div className="flex phone:flex-col laptop:gap-10 phone:text-center phone:justify-center laptop:justify-start laptop:flex-row phone:items-center laptop:items-center w-full h-fit">
                    <div>
                    <span className="rounded-full flex justify-center items-center bg-gray-200/40 p-1 shadow h-fit w-fit">
                        <img title={uploadFile} src={uploadFile?.length ? uploadFile : "https://cakenus.logistix.africa/logo-icon.svg"} alt="logo" />
                    </span>
                    <span className="relative w-full flex justify-between items-center bottom-10">             
                       <span title={uploadFile} className="relative rounded-full shadow h-fit cursor-pointer bg-gray-50 w-6">
                            <label title={uploadFile} className=" cursor-pointer rounded-full" htmlFor="upload">
                                <i className="icon ion-md-camera"></i>
                            </label>
                            <input id='upload' name='upload'  onChange={(e: any) => setUploadFile(e.target.value)} value={uploadFile} type="file" className="absolute w-0 z-1 top-10 left-10 text-sm text-gray-50" />
                        </span> 
                            {/* <i className="icon ion-md-camera"></i> */}
                        <button onClick={() => setUploadFile('')} className="rounded-full shadow h-fit bg-gray-50 w-6">
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
                    <input name="title" value={formData?.title} onChange={handleFormData} type="text" className="w-full bg-gray-100 p-3 rounded-lg outline-0 "  />
                    <SubHeading subheading="Entry Text" />
                    <input name="entry_text" value={formData?.entryText} onChange={handleFormData} type="text" className="w-full bg-gray-100 p-3 rounded-lg outline-0 "/>
                    <SubHeading subheading="Maintenance Mode"/>
                    <p className="mt-2 text-sm">If for any reason you need to take your website offline, you can turn on maintenance mode.</p>
                    <ToggleButton onOff={formData.maintenance} handleOnOff={handleToggleOnOff} title={formData.maintenance ? "Turn On" : "Turn Off"} />
                    <SubHeading subheading="Contact Information" />
                    <div className="mt-2">
                        <label htmlFor="street" className="text-gray-500 text-base">Office Address</label>
                        <input name="street" value={formData.address.street} onChange={handleInnerFormData} type="text" className="w-full mb-8 bg-gray-100 p-3 rounded-lg outline-0 "  />
                        <label htmlFor="email" className="text-gray-500 text-base">Email Address</label>
                        <input name="email" value={formData?.email} onChange={handleFormData} type="text" className="w-full mb-8 bg-gray-100 p-3 rounded-lg outline-0 "  />
                        <label htmlFor="phone" className="text-gray-500 text-base">Phone</label>
                        <input name="phone" value={formData?.phone} onChange={handleFormData} type="text" className="w-full mb-8 bg-gray-100 p-3 rounded-lg outline-0 "  />
                        <label htmlFor="whatsapp" className="text-gray-500 text-base">Whatsapp Contact</label>
                        <input name="whatsapp" value={formData?.whatsapp} onChange={handleFormData} type="text" className="w-full mb-8 bg-gray-100 p-3 rounded-lg outline-0 "  />
                    </div>
                    <div>
                        <SubHeading subheading="Social Media" />
                        <div className="flex items-center my-5 bg-white gap-3 rounded-xl w-full justify-start p-4">
                            <i id="icon" className="icon ion-logo-facebook"></i>
                            <input name="facebook" type="text" onChange={handleSocialAccounts} value={formData.socialAccounts.facebook} className="bg-white outline-0 h-fit w-full" placeholder="username" />
                        </div>
                        <div className="flex items-center mb-5 bg-white gap-3 rounded-xl w-full justify-start p-4">
                            <i id="icon" className="icon ion-logo-twitter"></i>
                            <input name="twitter" type="text" onChange={handleSocialAccounts}  value={formData.socialAccounts.twitter} className="bg-white outline-0 h-fit w-full" placeholder="username" />
                        </div>
                        <div className="flex items-center mb-5 bg-white gap-3 rounded-xl w-full justify-start p-4">
                            <i id="icon" className="icon ion-logo-instagram"></i>
                            <input name="instagram" type="text" onChange={handleSocialAccounts} value={formData.socialAccounts.instagram} className="bg-white outline-0 h-fit w-full" placeholder="username" />
                        </div>
                        <div className="flex items-center mb-5 bg-white gap-3 rounded-xl w-full justify-start p-4">
                            <i id="icon" className="icon ion-logo-linkedin"></i>
                            <input name="linkedln" type="text" onChange={handleSocialAccounts} value={formData.socialAccounts.linkedln} className="bg-white outline-0 h-fit w-full" placeholder="username" />
                        </div>
                    </div>
                  </div>
                  <ButtonAndMessage 
                  code={businessChangeData?.code}
                  error={businessChangeError}
                  mutate={businessChangeMutate}
                  title={successMessage.saveWebsite}
                  name="saveWebsite"
                  handleClick={handleSaveSite}
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