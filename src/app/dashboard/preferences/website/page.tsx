'use client'
import { useState, useContext, useEffect } from "react";
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
import { customerAPIUrl } from "../../services/api-url/customer-api-url";
import { authorizationKeyCustomer } from "../../services/customer-api/api";
import { Password } from "../../formik/password";
import Button from "../../button";
import ErrorAndSucccessHandlers from "../../services/eventhandlers/error-and-success-handlers";
import Loader from "../../services/Loader/spinner";
import DefaultInput from "../../profile/input";
import { staffAPIURL } from "../../services/api-url/staff-api-url";
import Cookies from "js-cookie";

export default function WebsitePreferences(){
    const [base, setBase] = useState<any>();
    const [imageSRC, setImageSRC] = useState<any>('')
    const {getBusinessData, getBusinessError, getBusinessIsLoading, getBusinessIsValidating, getBusinessMutate} = useGetBusiness();
    const [updateWebsite, setUpdateWebsite] = useState<any>({
        info: "",
        code: "", 
        result: ""
    })
    const [uploadFile, setUploadFile] = useState<any>({
        info: "",
        result: "",
        code: ""
    })
    const [formData, setFormData] = useState<any>({        
        active: false,
        additionalInfo: null,
        address: {
            street: '',
        },
        channel: '',
        chargeBearer: '',
        contact: {
            whatsapp: '',
        },
        createdAt: '',
        disabled: false,
        email: '',
        entryText: '',
        favRiders: [],
        fullName: '',
        image: '',
        maintenance: false,
        paymentMethods: [],
        phone: '',
        platform: '',
        pricingPlan: null,
        rc: null,    
        shippedParcel: null,
        sitedata: null,
        socialAccounts: {
            facebook: '',
            instagram: '',
            linkedln: '',
            twitter: '',
        },
        test: false,
        title: '',
        updatedAt: '',
        verified: false,
        website: '',
    });

    useEffect(() => {
        if(getBusinessData?.data){
        setFormData((prev: any) => ({
        ...prev,
        active: getBusinessData?.data?.active || false,
        additionalInfo: getBusinessData?.data?.additionalInfo  || null,
        address: {
            street: getBusinessData?.data?.address?.street || "",
        },
        channel: getBusinessData?.data?.channel || "",
        chargeBearer: getBusinessData?.data?.chargeBearer || "",
        phone: getBusinessData?.data?.phone || "",
        contact: {
            whatsapp: getBusinessData?.data?.contact?.whatsapp || "",
        },
        createdAt: getBusinessData?.data?.createdAt || "",
        disabled: getBusinessData?.data?.disabled || false,
        email: getBusinessData?.data?.email || "",
        entryText: getBusinessData?.data?.entryText || "",
        favRiders: [...getBusinessData?.data?.favRiders] || [],
        fullName: getBusinessData?.data?.fullName || "",
        image: getBusinessData?.data?.image || "",
        maintenance: getBusinessData?.data?.maintenance || false,
        paymentMethods: [...getBusinessData?.data?.paymentMethods] || [],
        platform: getBusinessData?.data?.platform || "",
        pricingPlan: getBusinessData?.data?.pricingPlan || null,
        rc: getBusinessData?.data?.rc || null,
        shippedParcel: getBusinessData?.data?.shippedParcel || null,
        sitedata: getBusinessData?.data?.sitedata || null,
        socialAccounts: {
            facebook: getBusinessData?.data?.socialAccounts?.facebook || "",
            instagram: getBusinessData?.data?.socialAccounts?.instagram || "",
            linkedln: getBusinessData?.data?.socialAccounts?.linkedln || "",
            twitter: getBusinessData?.data?.socialAccounts?.twitter || ""
        },
        test: getBusinessData?.data?.test || false,
        title: getBusinessData?.data?.title || "",
        updatedAt: getBusinessData?.data?.updatedAt || "",
        verified: getBusinessData?.data?.verified || false,
        website: getBusinessData?.data?.website || "",
    }))
    }
    }, [getBusinessData?.data])
    
    const handleToggleOnOff = () => {
        setFormData((prev: any) => ({...prev, maintenance: !formData.maintenance}));
    }
    
    const {successMessage, setSuccessMessage, setLoading, loading} = useContext(State_data)
    
    const handleFormData = (event: any) => {
        const {name, value} = event.target;
        setFormData((prev: any) => { 
            return {...prev, [name]: value}
        })
    }

    const handleSaveSite = () => {
        setSuccessMessage((prev: any) => ({...prev, saveWebsite: false}))
        setUpdateWebsite((prev: any) => ({...prev, code: Password(), result: "", info: formData}))
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

    console.log(successMessage.changeDp, loading.changeDP, 'dp')

    const handleUpload = async() => {
        if(window.FormData){
            const fileReader = new FormData();
            if(uploadFile?.info){
                fileReader.append('name', 'business-cakenus')
                fileReader.append('file', uploadFile?.info);
                    setBase(fileReader);
                    setUploadFile((prev: any) => ({...prev, code: Password()}))
                }
            }
            setSuccessMessage((prev: any) => ({...prev, changeDp: false}))
    }

    const imageChange = (e: any) => {
        if (e.target.files && e.target.files.length > 0) {
            setUploadFile((prev: any) => ({...prev, info: e.target.files[0], result: ""}));
        };
    };
    
    const removeSelectedImage = () => {
        setUploadFile((prev: any) => ({...prev, info: ''}));
    };
    
    async function websiteUpdateFetcher(websiteDetails: any) {
        const response = await fetch(customerAPIUrl.business, {
            method: 'PUT',
            body: JSON.stringify(websiteDetails),
            headers: {
                "Content-Type": "application/json",
                'Authorization': authorizationKeyCustomer
            }
        });
        const data = await response.json();    
        setUpdateWebsite((prev: any) => ({...prev, result: data}))
        setSuccessMessage((prev: any) => ({...prev, saveWebsite: true}))
        setLoading((prev: any) => ({...prev, website: false}))
        getBusinessMutate(getBusinessData?.data);
    }
        
    async function handleChangeDP() {
        const response = await fetch(customerAPIUrl.changeDp, {
            method: 'POST',
            body: base,
            headers: {
                    // "Content-Type": "multipart/form-data",
                    "Authorization": authorizationKeyCustomer
                },
            });
            const data = await response.json();
            setUploadFile((prev: any) => ({...prev, result: data}));
            setLoading((prev: any) => ({...prev, changeDP: false}))
            setSuccessMessage((prev: any) => ({...prev, changeDp: true}))
        }
        
    useEffect(() => {
        if(uploadFile?.result){
            getBusinessMutate(getBusinessData?.data)
            setUploadFile((prev: any) => ({...prev, info: ""}));
        }
    }, [uploadFile?.result])

    useEffect(() => {
        if(uploadFile?.info !== "" && uploadFile?.result === ""){
            setLoading((prev: any) => ({...prev, changeDP: true}))
        }
        if(uploadFile?.info !== ""){
            handleChangeDP();
        }
    }, [uploadFile?.code]);
                    
    useEffect(() => {
        if(uploadFile?.info !== ""){
            setImageSRC(URL.createObjectURL(uploadFile?.info))
        }
    },[uploadFile?.info])

    useEffect(() => {
        if(updateWebsite?.info !== "" && updateWebsite?.result === ""){
            setLoading((prev: any) => ({...prev, website: true}))
        }
        if(updateWebsite?.info !== ""){
            websiteUpdateFetcher(updateWebsite?.info)
        }
    },[updateWebsite?.code])
        
    return(
        <Holder>
            {
                (loading.website  || loading.changeDP) && <Loader />
            }
            {/* <Loader /> */}
            <PreferencesNav />
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
                messageTitle="Website details cannot be fetched! Check network connection!"
                />
            }
            {  updateWebsite.info !== "" && updateWebsite.result !== "" &&
                <ErrorAndSucccessHandlers
                name="saveWebsite"
                successName={successMessage.saveWebsite}
                message={updateWebsite?.result?.code} 
                code={updateWebsite?.code}
                successmessage="Your website has been updated!"
                failedmessage="Sorry, your website cannot be updated!" 
                staffAndCustomer={updateWebsite?.result}
                error={updateWebsite?.result?.code !== 200}
                loading={updateWebsite?.result === "" && updateWebsite?.info !== "" && updateWebsite?.code !== ""}
                data={updateWebsite?.result}
                />
            }
            {  successMessage.changeDp && uploadFile.result !== "" &&
                <ErrorAndSucccessHandlers
                name="changeDp"
                successName={successMessage.changeDp}
                message={uploadFile?.result?.code} 
                code={uploadFile?.code}
                successmessage="Your profile image has been updated!"
                failedmessage="Sorry, your profile image cannot be updated!" 
                staffAndCustomer={uploadFile?.result}
                error={uploadFile?.result?.code !== 200}
                loading={uploadFile?.result === "" && uploadFile?.info !== "" && uploadFile?.code !== ""}
                data={uploadFile?.result}
                />
            }
            <Section>
                <div className="bg-gray-50 mt-5 p-5 rounded-2xl w-full relative h-full">
                  <div className="flex phone:flex-col laptop:gap-10 phone:text-center phone:justify-center laptop:justify-start laptop:flex-row phone:items-center laptop:items-center w-full h-fit">
                    <div>
                            { uploadFile?.info !== "" ? 
                                <span className="rounded-full relative flex justify-center items-center p-1">
                                    <img className="rounded-full brightness-50 bg-gray-200/40 p-1 shadow h-40 w-40" title={uploadFile?.info} src={imageSRC} alt="logo" />
                                    <button onClick={handleUpload} className='absolute bg-green-700 p-1 rounded-xl text-gray-50 hover:bg-green-800 left-14'>Upload</button>
                                </span>
                                :
                                <div>
                                    <img className="rounded-full h-40 w-40 bg-gray-200/40 p-1 shadow" title={getBusinessData?.data?.title} src={getBusinessData?.data?.image} alt="logo" />
                                </div>
                            }
                    <span className="relative w-full flex justify-center gap-20 items-center bottom-10">             
                       <span title={uploadFile?.info} className="relative rounded-full shadow h-fit cursor-pointer bg-gray-50 w-6">
                            <label title={uploadFile?.info} className=" cursor-pointer rounded-full" htmlFor="upload">
                                <i className="icon ion-md-camera"></i>
                            </label>
                            <input id='upload' name='upload' onChange={imageChange} accept="image/*" type="file" className="absolute w-0 z-1 top-10 left-10 text-sm text-gray-50" />
                        </span> 
                        <button onClick={removeSelectedImage} className="rounded-full shadow h-fit bg-gray-50 w-6">
                            <i className="icon ion-md-close"></i>
                        </button>
                    </span>
                    </div>

                    <div className="flex phone:flex-col laptop:flex-col phone:justify-center laptop:justify-start laptop:items-start phone:items-center">
                        <Heading heading="Website Preferences" />
                        <p className="phone:text-sm laptop:text-base -mt-3 text-gray-500">Customize what your frontpage at <a className="text-gray-900" target="_blank" href="https://cakenus.logistix.africa">https://cakenus.logistix.africa</a> looks like.</p>
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
                    <DefaultInput name="title" value={formData?.title} onChange={handleFormData} type="text" className="w-full bg-gray-100 p-3 rounded-lg outline-0 "  />
                    <SubHeading subheading="Entry Text" />
                    <DefaultInput name="entry_text" value={formData?.entryText} onChange={handleFormData} type="text" className="w-full bg-gray-100 p-3 rounded-lg outline-0 "/>
                    <SubHeading subheading="Maintenance Mode"/>
                    <p className="mt-2 text-sm">If for any reason you need to take your website offline, you can turn on maintenance mode.</p>
                    <ToggleButton onOff={formData.maintenance} handleOnOff={handleToggleOnOff} title={formData.maintenance ? "Turn On" : "Turn Off"} />
                    <SubHeading subheading="Contact Information" />
                    <div className="mt-2">
                        <label htmlFor="street" className="text-gray-500 text-base">Office Address</label>
                        <DefaultInput name="street" value={formData.address.street} onChange={handleInnerFormData} type="text" className="w-full mb-8 bg-gray-100 p-3 rounded-lg outline-0 "  />
                        <label htmlFor="email" className="text-gray-500 text-base">Email Address</label>
                        <DefaultInput name="email" value={formData?.email} onChange={handleFormData} type="text" className="w-full mb-8 bg-gray-100 p-3 rounded-lg outline-0 "  />
                        <label htmlFor="phone" className="text-gray-500 text-base">Phone</label>
                        <DefaultInput name="phone" value={formData?.phone} onChange={handleFormData} type="text" className="w-full mb-8 bg-gray-100 p-3 rounded-lg outline-0 "  />
                        <label htmlFor="whatsapp" className="text-gray-500 text-base">Whatsapp Contact</label>
                        <DefaultInput name="whatsapp" value={formData?.contact?.whatsapp} onChange={handleContact} type="text" className="w-full mb-8 bg-gray-100 p-3 rounded-lg outline-0 "  />
                    </div>
                    <div>
                        <SubHeading subheading="Social Media" />
                        <p className="my-2 font-thin text-sm">Enter usernames only</p>
                        <div className="flex items-center my-5 bg-white gap-3 rounded-xl w-full justify-start p-4">
                            <i id="icon" className="icon ion-logo-facebook"></i>
                            <input name="facebook" type="text" onChange={handleSocialAccounts} value={formData.socialAccounts.facebook} className="bg-white outline-0 h-fit w-full" placeholder="facebook " />
                        </div>
                        <div className="flex items-center mb-5 bg-white gap-3 rounded-xl w-full justify-start p-4">
                            <i id="icon" className="icon ion-logo-twitter"></i>
                            <input name="twitter" type="text" onChange={handleSocialAccounts}  value={formData.socialAccounts.twitter} className="bg-white outline-0 h-fit w-full" placeholder="twitter" />
                        </div>
                        <div className="flex items-center mb-5 bg-white gap-3 rounded-xl w-full justify-start p-4">
                            <i id="icon" className="icon ion-logo-instagram"></i>
                            <input name="instagram" type="text" onChange={handleSocialAccounts} value={formData.socialAccounts.instagram} className="bg-white outline-0 h-fit w-full" placeholder="instagram" />
                        </div>
                        <div className="flex items-center mb-5 bg-white gap-3 rounded-xl w-full justify-start p-4">
                            <i id="icon" className="icon ion-logo-linkedin"></i>
                            <input name="linkedln" type="text" onChange={handleSocialAccounts} value={formData.socialAccounts.linkedln} className="bg-white outline-0 h-fit w-full" placeholder="linkedln" />
                        </div>
                    </div>
                  </div>
                  <Button 
                  buttonName="Save" 
                  handleClick={handleSaveSite}
                  />
                </div>
            </Section>
        </Holder>
    )
}