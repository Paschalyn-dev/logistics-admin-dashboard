'use client'
import { useState, useEffect } from "react";
import { Formik, Form } from 'formik';
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
import { useContext } from "react";
import TextArea from "../../../formik/textarea";
import { useAllDispatchersFetcher } from "../../../services/swr-functions/customer-swr";
import {company, customerAPIUrl, data} from "./../../../services/api-url/customer-api-url";
import { State_data, phoneRegExp } from "@/app/dashboard/context/context";
import { useFetchCustomers } from "@/app/dashboard/services/swr-functions/staff-swr";
import ShowCustomers from "@/app/dashboard/showCustomers";
import { authorizationKeyCustomer } from "@/app/dashboard/services/customer-api/api";
import ErrorAndSucccessHandlers from "@/app/dashboard/services/eventhandlers/error-and-success-handlers";
import { Password } from "@/app/dashboard/formik/password";

export default function FormPageShipments(){
    const {successMessage, setSuccessMessage, id} = useContext(State_data);
    const [windowDetails, setWindowDetails] = useState<any>('')
    const [handleToggleParcelButtons, setHandleToggleParcelButtons] = useState<any>({
        saveAndAddNewRider: false,
        parcelFragility: false,
        parcelPicked: false,
        parcelDelivered: false,
        customerPaid: false
    });
    const [showCustomer, setShowCustomer] = useState({
        customer: false,
        destination: false,
        text: ""
    })
    const {fetchCustomersData} = useFetchCustomers();
    const {dispatcherAllData} = useAllDispatchersFetcher();
    const router = useRouter();
    const [createParcel, setCreateParcel] = useState<any>({
        info: "",
        result: "",
        code: ""
    })
    
    async function handleCreate(details: any){
        const response = await fetch(customerAPIUrl.createParcel, {
            method: 'POST',
            body: JSON.stringify(details),
            headers: {
                "Content-Type": "application/json",
                // 'Authorization': authorizationKeyCustomer
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJyb2xlIjoic3VwZXJhZG1pbiIsImFsaWFzIjoiY2FrZW51cyJ9LCJpYXQiOjE2OTU1MTE2MjJ9.N_IW7YA6Gr7vuXPxZTvQbrRrd1VU2QeohI-DL1NRR_w"

            },
        })
        const data = await response.json();
        setCreateParcel((prev: any) => ({...prev, result: data}));
    }

    useEffect(() => {
        if(createParcel?.info !== ""){
          handleCreate({...createParcel?.info});
        }
      }, [createParcel?.code]);

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

    const findCustomerIndex = fetchCustomersData?.data?.findIndex((f: any) => f.id === id.customer)
    const findDestinationIndex = fetchCustomersData?.data?.findIndex((f: any) => f.id === id.destination)
    
    useEffect(() => {
        setWindowDetails(window)
    }, [typeof window !== 'undefined']);

    useEffect(() => {
        if(!handleToggleParcelButtons.saveAndAddNewCustomer && createParcel?.result?.code === 200){
            setTimeout(() => {
                router.replace('/dashboard/shipments/active')
            }, 6000);                        
        }
    }, [createParcel?.result])

    return(
        <Holder>
            <OrdersNav />
            <Section>

            {
            createParcel.result !== "" && createParcel.info !== "" && 
            <ErrorAndSucccessHandlers
            name="createShipment"
            successName={successMessage.createShipment}
            message={createParcel?.result?.code} 
            code={createParcel?.info?.code}
            successmessage="Shipment successfully added to the list!"
            failedmessage="Sorry, shipment cannot be added to the list!"
            staffAndCustomer={createParcel?.result}
            error={createParcel?.result?.code !== 200}
            loading={createParcel?.result === "undefined" && createParcel?.info !== ""}
            data={createParcel?.result}
            />
          }
          
            <Link href="/dashboard/shipments/active" className="bg-gray-200 cursor-pointer rounded-full w-fit px-2 text-2xl font-bold ml-3 text-gray-900">
                <i className="icon ion-md-arrow-back"></i>
            </Link>

            <Formik
                  initialValues={{
                      amount: 0,
                      card: {
                          authorizationCode: "",
                          email: ""
                        },
                        company: company,
                        description: "",
                        completed: handleToggleParcelButtons.parcelDelivered,
                        destination:{
                            address: fetchCustomersData?.data[findDestinationIndex]?.user?.address || "",
                            email: fetchCustomersData?.data[findDestinationIndex]?.user?.email || "",
                            name: fetchCustomersData?.data[findDestinationIndex]?.user?.name || "",
                            phone: fetchCustomersData?.data[findDestinationIndex]?.user?.phone || "",
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
                            appId: windowDetails?.navigator?.appCodeName || "",
                            appName: windowDetails?.navigator?.appName || "",
                            appVersion: windowDetails?.navigator?.appVersion || "",
                            isVirtual: false,
                            manufacturer: windowDetails?.navigator?.vendor || "",
                            model: windowDetails?.navigator?.appName || "",
                            name: "CakenUs Services",
                            operatingSystem: windowDetails?.navigator?.platform || "",
                            platform: windowDetails?.navigator?.userAgent || ""
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
                        address: fetchCustomersData?.data[findCustomerIndex]?.user?.address || "",
                        email: fetchCustomersData?.data[findCustomerIndex]?.user?.email || "",
                        name: fetchCustomersData?.data[findCustomerIndex]?.user?.name || "",
                        phone: fetchCustomersData?.data[findCustomerIndex]?.user?.phone || "",
                    },
                    picked: handleToggleParcelButtons.parcelPicked,
                    reference: "",
                    rider: "",
                    user: null
                }}
                validationSchema={Yup.object({
                    pickUp: Yup.object({
                        name: Yup.string().notRequired(),
                        phone: Yup.string()
                        .matches(phoneRegExp, 'Phone number is not valid')
                        .min(1, 'Must be 1 character or more.')
                        .notRequired(),                        
                        email: Yup.string().email('This email seems invalid!').notRequired(),
                        address: Yup.string().notRequired(),
                    }),
                    destination: Yup.object({
                        name: Yup.string().notRequired(),
                        phone: Yup.string()
                        .matches(phoneRegExp, 'Phone number is not valid')
                        .min(1, 'Must be 1 character or more.')
                        .notRequired(),   
                        email: Yup.string().email('This email seems invalid!').notRequired(),
                        address: Yup.string().notRequired(),
                    }),
                    estimatedDistance: Yup.object({
                        text: Yup.string().notRequired(),
                    }),
                    estimatedTime: Yup.object({
                        text: Yup.string().notRequired(),
                    }),
                    name: Yup.string()
                    .min(5, 'Name must be five characters or more.')
                    .notRequired(),
                    description: Yup.string().notRequired(),
                    rider: Yup.string().notRequired(),
                    amount: Yup.string().notRequired(),
                    paymentType: Yup.string().notRequired()
                })}
                onSubmit={async (values) => {
                    setSuccessMessage((prev: any) => ({...prev, createShipment: true}));
                    setCreateParcel((prev: any) => ({...prev, result: "", code: Password(), info: {...values}}));
                }}
                enableReinitialize={true}
                >
                    {
                        ({ values, getFieldProps, handleSubmit }) => (
                            <Hero 
                            formHeading={values.name} 
                            description={values.amount ? `₦${values.amount}` : `₦0`}
                            heading="Create A Shipment" 
                            icon="icon ion-md-cube">
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
                                    {
                                        dispatcherAllData?.data?.map((dispatcher: any) => (
                                            <option value={dispatcher.fullName}>{dispatcher.fullName}</option>
                                        ))
                                    }
                                </Select> 

                                <SubHeading subheading="Pickup" />
                                <div onClick={() => setShowCustomer((prev: any) => ({...prev, customer: true, text: "customer"}))} className="my-4 cursor-pointer text-green-500">Select Customer</div>

                                <TextInput
                                label="Name"
                                type="text"
                                {...getFieldProps('pickUp.name')}
                                />

                                <TextInput
                                label="Email Address"
                                type="email"
                                {...getFieldProps('pickUp.email')}
                                /> 

                                <TextInput
                                label="Phone"
                                type="tel"
                                {...getFieldProps('pickUp.phone')}
                                /> 

                                <TextInput
                                label="Address"
                                type="text"
                                {...getFieldProps('pickUp.address')}
                                /> 

                                <SubHeading subheading="Destination" /> 
                                <div onClick={() => setShowCustomer((prev: any) => ({...prev, destination: true, text: "destination"}))} className="my-4 cursor-pointer text-green-500">Select Customer</div>

                                <TextInput
                                label="Name"
                                type="text"
                                {...getFieldProps('destination.name')}
                                />

                                <TextInput
                                label="Email Address"
                                type="email"
                                {...getFieldProps('destination.email')}
                                /> 

                                <TextInput
                                label="Phone"
                                type="tel"
                                {...getFieldProps('destination.phone')}
                                /> 

                                <TextInput
                                label="Address"
                                type="text"
                                {...getFieldProps('destination.address')}
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
                {(showCustomer.customer || showCustomer.destination) && <ShowCustomers setShow={setShowCustomer} show={showCustomer.text} />}
                </Section>
        </Holder>
    )
}