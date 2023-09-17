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
import { useContext } from "react";
import TextArea from "../../../formik/textarea";
import { useAllDispatchersFetcher, useCreateParcel } from "../../../services/swr-functions/customer-swr";
import {company, data} from "./../../../services/api-url/customer-api-url";
import Loader from "@/app/dashboard/services/Loader/spinner";
import { State_data, phoneRegExp } from "@/app/dashboard/context/context";
import { useFetchCustomers } from "@/app/dashboard/services/swr-functions/staff-swr";
import ShowCustomers from "@/app/dashboard/showCustomers";

export default function FormPageShipments(){
    const {successMessage, setSuccessMessage, id} = useContext(State_data);
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

    const findCustomerIndex = fetchCustomersData?.data?.findIndex((f: any) => f.id === id.customer)
    const findDestinationIndex = fetchCustomersData?.data?.findIndex((f: any) => f.id === id.destination)
    console.log(fetchCustomersData?.data, findCustomerIndex, "wertyuioiuytre")
    
    return(
        <Holder>
            <OrdersNav />
            <Section>
            {successMessage.createShipment && createParcelData.code === 200 &&
            <SuccessMessage 
            name="createShipment"
            messageTitle="Shipment has been successfully added to the list." 
            successMessageShow={successMessage.createShipment} 
            />
        }
          
          {successMessage.createShipment && createParcelData.code !== 200 &&
           <SuccessMessage 
           id="failed"
           name="createShipment"
           messageTitle="Sorry! Shipment cannot be created!" 
           successMessageShow={successMessage.createShipment} 
           />
           }

          {successMessage.createShipment && createParcelError && 
           <SuccessMessage 
            messageTitle="Error occured! Check your network connection." 
            id='failed'
            successMessageShow={successMessage.createShipment} 
            name="createShipment"
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
                            address: fetchCustomersData?.data[findDestinationIndex]?.user?.address,
                            email: fetchCustomersData?.data[findDestinationIndex]?.user?.email,
                            name: fetchCustomersData?.data[findDestinationIndex]?.user?.name,
                            phone: fetchCustomersData?.data[findDestinationIndex]?.user?.phone
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
                        address: fetchCustomersData?.data[findCustomerIndex]?.user?.address,
                        email: fetchCustomersData?.data[findCustomerIndex]?.user?.email,
                        name: fetchCustomersData?.data[findCustomerIndex]?.user?.name,
                        phone: fetchCustomersData?.data[findCustomerIndex]?.user?.phone,
                    },
                    picked: handleToggleParcelButtons.parcelPicked,
                    reference: "",
                    rider: "",
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
                    setSuccessMessage((prev: any) => ({...prev, createShipment: true}));
                    setCreateParcel(values);
                    createParcelMutate();
                    console.log(createParcel, createParcelData)
                    if(!handleToggleParcelButtons.saveAndAddNewCustomer && createParcelData?.code === 200){
                        let timer = setTimeout(() => {
                            router.replace('/dashboard/shipments/active')
                        }, 6000);                        
                    }
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