'use client'
import { useState } from "react";
import { Formik, Form } from 'formik';
import SuccessMessage from "../../../successmessage";
import Hero from "../../../preferences/hero";
import SubHeading from "../../../preferences/website/subheading";
import * as Yup from 'yup';
import TextInput from "../../../formik/inputtypes";
import Button from "../../../button";
import ToggleButton from "../../../preferences/shipment/toggleButton";
import Select from "../../../formik/select";
import Link from "next/link";
import Holder from "../../../holder";
import Section from "../../../section";
import { useRouter } from "next/navigation";
import OrdersNav from "../../../orders";
import TextArea from "../../../formik/textarea";
import { useCreateParcel } from "../../../services/swr-functions/customer-swr";
import {company, data} from "./../../../services/api-url/customer-api-url";
import { phoneRegExp } from "@/app/dashboard/administrators/create/page";
import Loader from "@/app/dashboard/services/Loader/spinner";

export default function FormPageShipments(){
    const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
    const [handleToggleParcelButtons, setHandleToggleParcelButtons] = useState<any>({
        saveAndAddNewRider: false,
        parcelFragility: false,
        parcelPicked: false,
        parcelDelivered: false,
        customerPaid: false
    });
    const router = useRouter();
    const [createParcel, setCreateParcel] = useState<any>()
    const {createParcelData, 
        createParcelMutate, 
        createParcelError, 
        createParcelIsLoading, 
        createParcelIsValidating} = useCreateParcel(createParcel);

    function handleSaveAndAddNewRider() {
        setHandleToggleParcelButtons((prev: any) => ({
            ...prev, saveAndAddNewRider: !handleToggleParcelButtons.saveAndAddNewRider
        }))
    }

    function handleParcelFragility() {
        setHandleToggleParcelButtons((prev: any) => ({
            ...prev, parcelFragility: !handleToggleParcelButtons.parcelFragility
        }))
    }

    function handleParcelPicked() {
        setHandleToggleParcelButtons((prev: any) => ({
            ...prev, parcelPicked: !handleToggleParcelButtons.parcelPicked
        }))
    }

    function handleDelivered() {
        setHandleToggleParcelButtons((prev: any) => ({
            ...prev, parcelDelivered: !handleToggleParcelButtons.parcelDelivered
        }))
    }

    function handleCustomerPaid() {
        setHandleToggleParcelButtons((prev: any) => ({
            ...prev, customerPaid: !handleToggleParcelButtons.customerPaid
        }))
    }


    return(
        <Holder>
            <OrdersNav />
            <Section>
            {showSuccessMessage && createParcelData.code === 200 &&
           <SuccessMessage 
           messageTitle="Shipment has been successfully added to the list." 
            successMessageShow={showSuccessMessage} 
            handleShowSuccessMessage={setShowSuccessMessage} 
           />
           }
          
          {showSuccessMessage && createParcelData.code !== 200 &&
           <SuccessMessage 
           id="failed"
           messageTitle="Sorry! Shipment cannot be created!" 
            successMessageShow={showSuccessMessage} 
            handleShowSuccessMessage={setShowSuccessMessage} 
           />
           }

          {showSuccessMessage && createParcelError && 
           <SuccessMessage 
           messageTitle="Error occured! Check your network connection." 
           id='failed'
            successMessageShow={showSuccessMessage} 
            handleShowSuccessMessage={setShowSuccessMessage} 
           />
           }

           {
             (createParcelIsLoading || createParcelIsValidating) && 
             <Loader />
           }
            <Link href="/dashboard/shipments/active" className="bg-gray-200 cursor-pointer rounded-full w-fit px-2 text-2xl font-bold ml-3 text-gray-900">
                <i className="icon ion-md-arrow-back"></i>
            </Link>

            <Formik
                  initialValues={{
                    amount: "",
                    card: {
                        authorizationCode: "",
                        email: ""
                    },
                    company: company,
                    completed: handleToggleParcelButtons.parcelDelivered,
                    description: "",
                    destination:{
                    address: "",
                    email: "",
                    name: "",
                    phone: ""
                    },
                    fragile: handleToggleParcelButtons.parcelFragility,
                    meta: {
                        by: {
                            entity: 'BUSINESS',
                            id: null
                        },
                        company:{
                            alias: data
                        },
                        device:{
                            appBuild: null,
                            appId: navigator.appCodeName,
                            appName: navigator.appName,
                            appVersion: navigator.appVersion,
                            isVirtual: false,
                            manufacturer: navigator.vendor,
                            model: navigator.appName,
                            name: "CakenUs Services",
                            operatingSystem: navigator.platform,
                            platform: navigator.userAgent
                        },
                        estimatedDistance: {
                            text: "",
                            value: null
                        },
                        estimatedTime: {
                            text: "",
                            value: null
                        },
                    },
                        name: "",
                        paid: handleToggleParcelButtons.customerPaid,
                        paymentType: "",
                        pickUp: {
                            address: "",
                            email: "",
                            name: "",
                            phone: "",
                        },
                        picked: handleToggleParcelButtons.parcelPicked,
                        reference: "",
                        rider: 2,
                        user: null
                  }}
                  validationSchema={Yup.object({
                    pickUp: Yup.object({
                        name: Yup.string().required('This field is required!'),
                        phone: Yup.string()
                        .matches(phoneRegExp, 'Phone number is not valid')
                        .min(1, 'Must be 1 character or more.')
                        .required('This field is required.'),                        
                        email: Yup.string().email('This email seems invalid!').required('This field is required!'),
                        address: Yup.string().required('This feild is required!'),
                    }),
                    destination: Yup.object({
                        name: Yup.string().required('This field is required!'),
                        phone: Yup.string()
                        .matches(phoneRegExp, 'Phone number is not valid')
                        .min(15, 'Must be 15 characters or more.')
                        .required('This field is required.'),                        
                        email: Yup.string().email('This email seems invalid!').required('This field is required!'),
                        address: Yup.string().required('This feild is required!'),
                    }),
                    estimatedDistance: Yup.object({
                        text: Yup.string().notRequired(),
                    }),
                    estimatedTime: Yup.object({
                        text: Yup.string().notRequired(),
                    }),
                    name: Yup.string()
                    .min(5, 'Name must be five characters or more.')
                    .required('This field is required.'),
                    description: Yup.string().notRequired(),
                    rider: Yup.string().required('This field is required!'),
                    amount: Yup.string().required('This field is required.'),
                    paymentType: Yup.string().notRequired()
                  })}
                  onSubmit={async (values) => {
                        setShowSuccessMessage(true);
                        setCreateParcel(values);
                        createParcelMutate();
                        console.log(createParcel, createParcelData)
                        if(!handleToggleParcelButtons.saveAndAddNewCustomer && createParcelData?.code === 200){
                            let timer = setTimeout(() => {
                                router.replace('/dashboard/shipments/active')
                            }, 6000);                        
                        }
                    }}
                    >
                    {
                        ({ values, handleSubmit }) => (
                            <Hero 
                            formHeading={values.name} 
                            description={values.amount ? `₦${values.amount}` : `₦0`}
                            heading="Create A Shipment" 
                            icon="icon ion-md-cube">
                            {console.log(values)}
                            <Form>
                                <SubHeading subheading="Parcel" />

                                <TextInput
                                label="Name"
                                name="name"
                                type="text"
                                />

                                <TextArea 
                                label="Description (optional)"
                                name="description"
                                />
                               

                                <ToggleButton
                                onOff={handleToggleParcelButtons.parcelFragility}
                                handleOnOff={handleParcelFragility}
                                title="This parcel is fragile."
                                />                                
                                
                                <ToggleButton
                                onOff={handleToggleParcelButtons.parcelPicked}
                                handleOnOff={handleParcelPicked}
                                title="This parcel has been picked."
                                />                                
                                
                                <ToggleButton
                                onOff={handleToggleParcelButtons.parcelDelivered}
                                handleOnOff={handleDelivered}
                                title="This parcel been delivered."
                                />

                                <Select label="Dispatcher" name="rider">
                                    <option value=""></option>
                                    <option value=""></option>
                                </Select> 

                                <SubHeading subheading="Pickup" />
                                <div className="my-4 cursor-pointer text-green-500">Select Customer</div>

                                <TextInput
                                label="Name"
                                name="pickUp.name"
                                type="text"
                                />

                                <TextInput
                                label="Email Address"
                                name="pickUp.email"
                                type="email"
                                /> 

                                <TextInput
                                label="Phone"
                                name="pickUp.phone"
                                type="tel"
                                /> 

                                <TextInput
                                label="Address"
                                name="pickUp.address"
                                type="text"
                                /> 

                                <SubHeading subheading="Destination" /> 
                                {/* <div className="my-4 cursor-pointer text-green-500">Select Customer</div> */}

                                <TextInput
                                label="Name"
                                name="destination.name"
                                type="text"
                                />

                                <TextInput
                                label="Email Address"
                                name="destination.email"
                                type="email"
                                /> 

                                <TextInput
                                label="Phone"
                                name="destination.phone"
                                type="tel"
                                /> 

                                <TextInput
                                label="Address"
                                name="destination.address"
                                type="text"
                                /> 

                                <SubHeading subheading="Route Estimate" />
                                <div className="my-4 cursor-pointer text-green-500">Refresh Estimate</div>

                                <TextInput
                                label="Estimated Time"
                                name="estimatedTime.text"
                                type="number"
                                /> 

                                {/* <TextInput
                                label=""
                                name="estimatedMinutes"
                                type="number"
                                />  */}

                                <TextInput
                                label="Estimated Amount"
                                name="amount"
                                type="number"
                                /> 

                                <SubHeading subheading="Payment" />

                                <Select label="Payment Option" name="paymentType">
                                    <option value="PAY_ON_DELIVERY">Pay On Delivery</option>
                                    <option value="PAY_ON_PICKUP">Pay On Pickup</option>
                                </Select>

                                <ToggleButton
                                title="This Customer has Paid" 
                                onOff={handleToggleParcelButtons.customerPaid}
                                handleOnOff={handleCustomerPaid}
                                />

                                <ToggleButton 
                                title="Save & Add New Customer."
                                icon="icon ion-md-information-circle-outline"
                                handleOnOff={handleSaveAndAddNewRider}
                                onOff={handleToggleParcelButtons.saveAndAddNewRider}
                                description="Enable this if you want to create a new rider immediately after creating this rider."
                                />  

                                <Button 
                                type="submit" 
                                handleClick={handleSubmit} 
                                buttonName="Save" 
                                />
                            </Form>
                            </Hero>
                        )
                    }
                </Formik>
                </Section>
        </Holder>
    )
}