'use client'
import { useState, useEffect, useRef, useCallback } from "react";
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
import ErrorAndSucccessHandlers from "@/app/dashboard/services/eventhandlers/error-and-success-handlers";
import { Password } from "@/app/dashboard/formik/password";
import { authorizationKeyCustomer } from "@/app/dashboard/services/customer-api/api";
import Loader from "@/app/dashboard/services/Loader/spinner";
import SuccessMessage from "@/app/dashboard/successmessage";

export default function FormPageShipments(){
    const formikRef = useRef<any>(null);
    const {successMessage, loading, setLoading, setSuccessMessage, id, setId} = useContext(State_data);
    const [windowDetails, setWindowDetails] = useState<any>('')
    const [windowLocations, setWindowLocations] = useState<any>('')
    const [handleToggleParcelButtons, setHandleToggleParcelButtons] = useState<any>({
        saveAndAddNewParcel: false,
        parcelFragility: false,
        parcelPicked: false,
        parcelDelivered: false,
        customerPaid: false
    });
    const [showCustomer, setShowCustomer] = useState({
        customer: false,
        destination: false,
        text: "",
        creatingCustomer: false,
        creatingDestination: false
    });
    const {fetchCustomersData} = useFetchCustomers();
    const {dispatcherAllData} = useAllDispatchersFetcher();
    const router = useRouter();
    const [createParcel, setCreateParcel] = useState<any>({
        info: "",
        result: "",
        code: ""
    });
    const validation = Yup.object({
        pickUp: Yup.object({
            name: Yup.string().required('Please provide name for pickup.'),
            phone: Yup.string()
            .matches(phoneRegExp, 'Phone number is not valid')
            .min(1, 'Must be 1 character or more.')
            .required('Please provide phone number'),   
            email: Yup.string().email('This email seems invalid!').required('Please provide email'),
            address: Yup.string().required('Please provide the pick up address'),
        }),
        destination: Yup.object({
            name: Yup.string().required('Please provide name for destination.'),
            phone: Yup.string()
            .matches(phoneRegExp, 'Phone number is not valid')
            .min(1, 'Must be 1 character or more.')
            .required('Please provide phone number'),   
            email: Yup.string().email('This email seems invalid!').required('Please provide email'),
            address: Yup.string().required('Please provide the destination address'),
        }),
        estimatedDistance: Yup.object({
            text: Yup.number().notRequired(),
            value: Yup.number(),
        }),
        estimatedTime: Yup.object({
            text: Yup.number().notRequired(),
            value: Yup.number(),
        }),
        name: Yup.string()
        .min(1, 'Name must be five characters or more.')
        .required('Please provide name for shipment.'),
        description: Yup.string().notRequired(),
        rider: Yup.string().required('Please choose a dispatcher from the list.'),
        amount: Yup.string().notRequired(),
        paymentType: Yup.string().notRequired()
    })
    
    async function handleCreate(details: any){
        const response = await fetch(customerAPIUrl.createParcel, {
            method: 'POST',
            body: JSON.stringify(details),
            headers: {
                "Content-Type": "application/json",
                'Authorization': authorizationKeyCustomer
            },
        })
        const data = await response.json();
        setCreateParcel((prev: any) => ({...prev, result: data}));
        setLoading((prev: any) => ({...prev, parcel: false}))
    }

    const handleFetchDispatcher = (name: string) => {
        const newId = dispatcherAllData?.data?.filter((dispatcher: any) => dispatcher?.fullName === name);
        return newId[0]?.id;
    }
    
    function handleSaveAndAddNewParcel() {
        setHandleToggleParcelButtons((prev: any) => ({
            ...prev, saveAndAddNewParcel: !handleToggleParcelButtons.saveAndAddNewParcel
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
    
    const updateButtons = useCallback((key: string, value: string) => {
        formikRef.current?.setFieldValue(`${key}`, value);
    }, [handleToggleParcelButtons, formikRef.current])
    
    const [timeAndDistance, setTimeAndDistance] = useState({
        time: 0,
        distance: 0
    })

    const findDestinationIndex = fetchCustomersData?.data?.findIndex((f: any) => f.id === id.destination)

    const findCustomerIndex = fetchCustomersData?.data?.findIndex((f: any) => f.id === id.customer)
    
    const updateCustomerInformation = useCallback((key: string, index: number | string) => {
        const { user } = fetchCustomersData?.data[index] ?? {};
        if (user && typeof(index) !== 'string') {
            formikRef.current?.setFieldValue(`${key}.name`, user.name);
            formikRef.current?.setFieldValue(`${key}.email`, user.email);
            formikRef.current?.setFieldValue(`${key}.phone`, user.phone);
            formikRef.current?.setFieldValue(`${key}.address`, user.address);
            setTimeout(() => {formikRef?.current?.setFieldTouched(`${key}.name`, true)}, 100)
            setTimeout(() => {formikRef?.current?.setFieldTouched(`${key}.email`, true)}, 100)
            setTimeout(() => {formikRef?.current?.setFieldTouched(`${key}.phone`, true)}, 100)
            setTimeout(() => {formikRef?.current?.setFieldTouched(`${key}.address`, true)}, 100)
        }
    }, [ fetchCustomersData?.data, formikRef.current]);

    useEffect(() => {
        if(createParcel?.result === "" && createParcel?.info !== ""){
            setLoading((prev: any) => ({...prev, parcel: true}))
        }
        if(createParcel?.info !== ""){
          handleCreate(createParcel?.info);
        }
    }, [createParcel?.code]);

    useEffect(() => {
        if(!handleToggleParcelButtons.saveAndAddNewParcel && createParcel?.result?.code === 200){
            setTimeout(() => {
                if(windowLocations?.location?.pathname === `/dashboard/shipments/active/create`){
                    router.replace('/dashboard/shipments/active')
                }
                else{}
            }, 5000);                        
        }
    }, [createParcel?.result, windowLocations?.location?.pathname]);
    
    useEffect(() => {
        updateButtons('fragile', handleToggleParcelButtons.parcelFragility)
        updateButtons('completed', handleToggleParcelButtons.parcelDelivered)
        updateButtons('paid', handleToggleParcelButtons.customerPaid)
        updateButtons('picked', handleToggleParcelButtons.parcelPicked)
    }, [handleToggleParcelButtons, formikRef?.current])
    
    useEffect(() => {
        updateCustomerInformation('pickUp', findCustomerIndex)
    }, [fetchCustomersData?.data, findCustomerIndex])
    
    useEffect(() => {
        updateCustomerInformation('destination', findDestinationIndex)
    }, [fetchCustomersData?.data, findDestinationIndex])
    
    useEffect(() => {
        setWindowDetails(window)
        setWindowLocations(window)
    }, [typeof window !== 'undefined']);
    
    const handleIsNotValid = () => {
        setSuccessMessage((prev: any) => ({...prev, isNotValid: true}))
    }
    
    useEffect(() => {
        setLoading((prev: any) => ({...prev, parcel: false}))
        setSuccessMessage((prev: any) => ({...prev, isNotValid: false}))
    },[])
    
    return(
        <Holder>
            <OrdersNav />
            <Section>
                {loading.parcel && <Loader />}

                {
                    createParcel.result !== "" && createParcel.info !== "" && 
                    <ErrorAndSucccessHandlers
                    name="createShipment"
                    successName={successMessage.createShipment}
                    message={createParcel?.result?.code} 
                    code={createParcel?.info?.code}
                    error={createParcel?.result?.code !== 200}
                    successmessage="Shipment successfully added to the list!"
                    failedmessage="Sorry, shipment cannot be added to the list!"
                    staffAndCustomer={createParcel?.result}
                    data={createParcel?.result}
                    />
                }

                {
                    successMessage.isNotValid && 
                    <SuccessMessage
                    id="failed"
                    name="isNotValid"
                    messageTitle="You have not filled all the required form fields."
                    successMessageShow={successMessage.isNotValid}
                    />
                }
            
                <Link href="/dashboard/shipments/active" className="bg-gray-200 cursor-pointer rounded-full w-fit px-2 text-2xl font-bold ml-3 text-gray-900">
                    <i className="icon ion-md-arrow-back"></i>
                </Link>

                <Formik
                    innerRef={(ref) => formikRef.current = ref}
                    initialValues={{
                        amount: '0',
                        card: {
                            authorizationCode: "",
                            email: ""
                          },
                          company: company,
                          description: '',
                          completed: handleToggleParcelButtons.parcelDelivered,
                          destination:{
                              address: "",
                              email: "",
                              name: "",
                              phone: "",
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
                        name: '',
                        paid: handleToggleParcelButtons.customerPaid,
                        paymentType: "",
                        pickUp: {
                            address: "",
                            email:  "",
                            name:   "",
                            phone:  "",
                        },
                        picked: handleToggleParcelButtons.parcelPicked,
                        reference: "",
                        rider: '',
                        user: null
                    }}
                validationSchema={validation}
                onSubmit={async (values) => {
                    if(Number(values?.meta?.estimatedTime?.text || values?.meta?.estimatedDistance?.text) >= 0){
                        setTimeAndDistance((prev: any) => ({...prev, time: Number(values?.meta?.estimatedTime?.text) * 3600, 
                        distance: Number(values?.meta?.estimatedDistance?.text) / 1000}))
                    }
                    setCreateParcel((prev: any) => ({...prev, result: "", 
                    info: {...values, 
                        meta: {...values?.meta, 
                            estimatedTime: {...values?.meta?.estimatedTime, 
                            value: timeAndDistance?.time},
                            estimatedDistance: {...values?.meta?.estimatedDistance, 
                            value: timeAndDistance?.distance}}}, 
                            code: Password()}));
                    setSuccessMessage((prev: any) => ({...prev, createShipment: true}));
                    setId((prev: any) => ({...prev, customer: 0, destination: 0}))
                }}
                validateOnMount={true}
                >
                    {
                        ({ values, isValid, handleSubmit }) => (
                            <Hero 
                            formHeading={values?.name || ""} 
                            description={`₦${values?.amount !== '0' || values?.amount !== null ? values?.amount : '0'}`}
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
                                    <option>Please choose a dispatcher from the list</option>
                                    {
                                        dispatcherAllData?.data?.map((dispatcher: any) => (
                                            <option key={dispatcher?.id} value={handleFetchDispatcher(dispatcher?.fullName) || ''}>{dispatcher.fullName}</option>
                                        ))
                                    }
                                </Select> 
                                <SubHeading subheading="Pickup" />
                                <div onClick={() => {setShowCustomer((prev: any) => ({...prev, customer: true, text: "customer", creatingCustomer: true}))}} className="my-4 cursor-pointer text-green-500">Select Customer</div>

                                <TextInput
                                 name="pickUp.name"
                                 type="text"
                                 label="Name"
                                 />

                                <TextInput
                                    label="Email Address"
                                    type="email"
                                    name='pickUp.email'
                                /> 

                                <TextInput
                                label="Phone"
                                type="tel"
                                name='pickUp.phone'
                                /> 

                                <TextInput
                                label="Address"
                                type="text"
                                name='pickUp.address'
                                /> 

                                <SubHeading subheading="Destination" /> 
                                <div onClick={() => setShowCustomer((prev: any) => ({...prev, destination: true, text: "destination", creatingDestination: true}))} className="my-4 cursor-pointer text-green-500">Select Customer</div>

                                <TextInput
                                label="Name"
                                type="text"
                                name='destination.name'
                                />

                                <TextInput
                                label="Email Address"
                                type="email"
                                name='destination.email'
                                /> 

                                <TextInput
                                label="Phone"
                                type="tel"
                                name='destination.phone'
                                /> 

                                <TextInput
                                label="Address"
                                type="text"
                                name='destination.address'
                                /> 

                                <SubHeading subheading="Route Estimate" />
                                <div className="my-4 cursor-pointer text-green-500">Refresh Estimate</div>

                                <TextInput
                                 label="Estimated Distance(meters)" 
                                 name="meta.estimatedDistance.text"
                                 type="number"
                                />

                                <TextInput
                                label="Estimated Time(hrs)"
                                name="meta.estimatedTime.text"
                                type="number"
                                /> 

                                <TextInput
                                label="Estimated Amount(₦)"
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
                                handleOnOff={handleSaveAndAddNewParcel}
                                onOff={handleToggleParcelButtons.saveAndAddNewParcel}
                                description="Enable this if you want to create a new rider immediately after creating this rider."
                                />  

                                <Button 
                                type="submit" 
                                handleClick={() => {isValid ? () => {handleSubmit()} : handleIsNotValid()}} 
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