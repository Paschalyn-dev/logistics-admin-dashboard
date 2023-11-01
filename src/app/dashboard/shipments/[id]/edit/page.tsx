'use client'
import { useState, useContext, useEffect } from "react";
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
import TextArea from "../../../formik/textarea";
import { useAllDispatchersFetcher, useAllParcelsFetcher, useEditParcels, useViewParcels } from "../../../services/swr-functions/customer-swr";
import Loader from "@/app/dashboard/services/Loader/spinner";
import SkeletonLoading from "@/app/dashboard/services/eventhandlers/skeleton-loading";
import { State_data, phoneRegExp } from "@/app/dashboard/context/context";
import { customerAPIUrl } from "@/app/dashboard/services/api-url/customer-api-url";
import { authorizationKeyCustomer } from "@/app/dashboard/services/customer-api/api";
import { Password } from "@/app/dashboard/formik/password";
import ErrorAndSucccessHandlers from "@/app/dashboard/services/eventhandlers/error-and-success-handlers";
import ShowCustomers from "@/app/dashboard/showCustomers";
import { useFetchCustomers } from "@/app/dashboard/services/swr-functions/staff-swr";

export default function FormPageShipments({ params }: { params: {id: number}}){
    const {viewParcelData, viewParcelIsLoading, viewParcelIsValidating} = useViewParcels(params.id);
    const {successMessage, setSuccessMessage, setLoading, loading, id} = useContext(State_data);
    const [handleToggleParcelButtons, setHandleToggleParcelButtons] = useState<any>({
        saveAndAddNewParcel: false,
        parcelFragility: viewParcelData?.data?.fragile,
        parcelPicked: viewParcelData?.data?.picked,
        parcelDelivered: viewParcelData?.data?.completed,
        customerPaid: viewParcelData?.data?.paid
    });
    const {parcelAllMutate} = useAllParcelsFetcher();
    const router = useRouter();
    const [editParcelDetails, setEditParcelDetails] = useState<any>({
        info: "",
        result: "", 
        code: ""
    });

    
    const [showCustomer, setShowCustomer] = useState({
        customer: false,
        destination: false,
        text: "", 
        editingCustomer: false,
        editingDestination: false
    });

    async function handleEdit(details: any, id: any){
        const response = await fetch(customerAPIUrl.editParcels(id), {
            method: 'PUT',
            body: JSON.stringify(details),
            headers: {
                "Content-Type": "application/json",
                'Authorization': authorizationKeyCustomer
                // "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJyb2xlIjoic3VwZXJhZG1pbiIsImFsaWFzIjoiY2FrZW51cyJ9LCJpYXQiOjE2OTU1MTE2MjJ9.N_IW7YA6Gr7vuXPxZTvQbrRrd1VU2QeohI-DL1NRR_w"

            },
        })
        const data = await response.json();
        setEditParcelDetails((prev: any) => ({...prev, result: data}));
        setLoading((prev: any) => ({...prev, parcel: false}))
    }
    
    function handleSaveAndAddNewParcel() {
        setHandleToggleParcelButtons((prev: any) => ({
            ...prev, saveAndAddNewParcel: !handleToggleParcelButtons.saveAndAddNewParcel
        }))
    }
    useEffect(() => {
        if(editParcelDetails?.result === "" && editParcelDetails?.info !== ""){
            setLoading((prev: any) => ({...prev, parcel: true}))
        }      
        if(editParcelDetails?.info !== ""){
            handleEdit({...editParcelDetails?.info}, viewParcelData?.data?.id);
        }
    }, [editParcelDetails?.code]);

    useEffect(() => {
        if(!handleToggleParcelButtons.saveAndAddNewParcel && editParcelDetails?.result?.code === 200){
            setTimeout(() => {
                console.log('jhgfdsdfghjkl')
                router.replace('/dashboard/shipments/active')
            }, 5000);
        }
    }, [editParcelDetails?.result]);

    function handleParcelFragility() {
        setHandleToggleParcelButtons((prev: any) => ({
            ...prev, parcelFragility: !handleToggleParcelButtons.parcelFragility
        }))
    }
    
    const {fetchCustomersData} = useFetchCustomers();
    const {dispatcherAllData} = useAllDispatchersFetcher();
    const findCustomerIndex = fetchCustomersData?.data?.findIndex((f: any) => f.id === id.customer)
    const findDestinationIndex = fetchCustomersData?.data?.findIndex((f: any) => f.id === id.destination)

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
            {
                loading.parcel && <Loader />
            }
            {
                viewParcelIsLoading || viewParcelIsValidating &&
                <SkeletonLoading title="parcel data." />
            }
            <OrdersNav />
            <Section>

            {
                editParcelDetails.result !== "" && editParcelDetails.info !== "" && 
                <ErrorAndSucccessHandlers
                name="editShipment"
                successName={successMessage.editShipment}
                message={editParcelDetails?.result?.code} 
                code={editParcelDetails?.info?.code}
                successmessage="Shipment successfully updated!"
                failedmessage="Sorry, shipment cannot be updated!"
                staffAndCustomer={editParcelDetails?.result}
                error={editParcelDetails?.result?.code !== 200}
                data={editParcelDetails?.result}
                />
            }

            <Link href="/dashboard/shipments/active" className="bg-gray-200 cursor-pointer rounded-full w-fit px-2 text-2xl font-bold ml-3 text-gray-900">
                <i className="icon ion-md-arrow-back"></i>
            </Link>

            <Formik
                  initialValues={{
                    amount: viewParcelData?.data?.amount,
                    card: {
                        authorizationCode: "",
                        email: ""
                    },
                    company: viewParcelData?.data?.company,
                    completed: handleToggleParcelButtons.parcelDelivered,
                    description: viewParcelData?.data?.description,
                    destination:{
                        address: showCustomer?.editingDestination !== true ? viewParcelData?.data?.destination?.address : fetchCustomersData?.data[findDestinationIndex]?.user?.address,
                        email: showCustomer?.editingDestination !== true ? viewParcelData?.data?.destination?.email : fetchCustomersData?.data[findDestinationIndex]?.user?.email,
                        name: showCustomer?.editingDestination !== true  ?  viewParcelData?.data?.destination?.name : fetchCustomersData?.data[findDestinationIndex]?.user?.name,
                        phone: showCustomer?.editingDestination !== true ? viewParcelData?.data?.destination?.phone : fetchCustomersData?.data[findDestinationIndex]?.user?.phone
                    },
                    fragile: handleToggleParcelButtons.parcelFragility,
                    meta: {
                        by: {
                            entity: viewParcelData?.data?.meta?.by?.entity,
                            id: viewParcelData?.data?.meta?.by?.id
                        },
                        company:{
                            alias: viewParcelData?.data?.meta?.company?.alias
                        },
                        device:{
                            appBuild: viewParcelData?.data?.meta?.device?.appBuild,
                            appId: viewParcelData?.data?.meta?.device?.appId,
                            appName: viewParcelData?.data?.meta?.device?.appName,
                            appVersion: viewParcelData?.data?.meta?.device?.appVersion,
                            isVirtual: viewParcelData?.data?.meta?.device?.isVirtual,
                            manufacturer: viewParcelData?.data?.meta?.device?.manufacturer,
                            model: viewParcelData?.data?.meta?.device?.model,
                            name: viewParcelData?.data?.meta?.device?.name,
                            operatingSystem: viewParcelData?.data?.meta?.device?.operatingSystem,
                            platform: viewParcelData?.data?.meta?.device?.platform
                        },
                        estimatedDistance: {
                            text: viewParcelData?.data?.meta?.estimatedDistance?.text,
                            value:  viewParcelData?.data?.meta?.estimatedDistance?.value
                        },
                        estimatedTime: {
                            text:  viewParcelData?.data?.meta?.estimatedTime?.text,
                            value:  viewParcelData?.data?.meta?.estimatedTime?.value
                        },
                    },
                        name: viewParcelData?.data?.name,
                        paid: handleToggleParcelButtons.customerPaid,
                        paymentType:  viewParcelData?.data?.paymentType,
                        pickUp: {
                            address: showCustomer?.editingCustomer !== true ? viewParcelData?.data?.pickUp?.address : fetchCustomersData?.data[findCustomerIndex]?.user?.address,
                            email: showCustomer?.editingCustomer !== true ? viewParcelData?.data?.pickUp?.email : fetchCustomersData?.data[findCustomerIndex]?.user?.email,
                            name: showCustomer?.editingCustomer !== true ? viewParcelData?.data?.pickUp?.name : fetchCustomersData?.data[findCustomerIndex]?.user?.name,
                            phone: showCustomer?.editingCustomer !== true ? viewParcelData?.data?.pickUp?.phone : fetchCustomersData?.data[findCustomerIndex]?.user?.phone,
                        },
                        picked: handleToggleParcelButtons.parcelPicked,
                        rider: viewParcelData?.data?.rider,
                        size: viewParcelData?.data?.size,
                        trackId: viewParcelData?.data?.trackId,
                        updatedAt: viewParcelData?.data?.updatedAt,
                        userId: viewParcelData?.data?.userId,
                  }}
                  validationSchema={Yup.object({
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
                        name: Yup.string().required('Please provide name for pickup.'),
                        phone: Yup.string()
                        .matches(phoneRegExp, 'Phone number is not valid')
                        .min(1, 'Must be 1 character or more.')
                        .required('Please provide phone number'),                          
                        email: Yup.string().email('This email seems invalid!').required('Please provide email'),
                        address: Yup.string().required('Please provide the destination address'),
                    }),
                    estimatedDistance: Yup.object({
                        text: Yup.string().notRequired(),
                    }),
                    estimatedTime: Yup.object({
                        text: Yup.string().notRequired(),
                    }),
                    name: Yup.string()
                    .min(5, 'Name must be five characters or more.')
                    .required('Please provide name for shipment.'),
                    description: Yup.string().notRequired(),
                    rider: Yup.string().notRequired(),
                    amount: Yup.string(),
                    paymentType: Yup.string().notRequired()
                  })}
                  onSubmit={async (values) => {
                        setSuccessMessage((prev:any) => ({...prev, editShipment: true}));
                        setEditParcelDetails((prev: any) => ({...prev, info:{...values}, code: Password(), result: ""}));
                    }}
                    enableReinitialize={true}
                    >
                    {
                        ({ values, getFieldProps, handleSubmit }) => (
                            <Hero 
                            formHeading={values.name} 
                            description={values.amount ? `₦${values.amount}` : `₦0`}
                            heading="Edit A Shipment" 
                            icon="icon ion-md-cube">
                            <Form onSubmit={handleSubmit}>
                                <SubHeading subheading="Parcel" />

                                <TextInput
                                    label="Name"
                                    type="text"
                                    {...getFieldProps('name')}
                                />

                                <TextArea 
                                label="Description (optional)"
                                {...getFieldProps('description')}
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
                                <div onClick={() => setShowCustomer((prev: any) => ({...prev, customer: true, text: "customer", editingCustomer: true}))} className="my-4 cursor-pointer text-green-500">Select Customer</div>

                                <TextInput
                                label="Name"
                                type="text"
                                {...getFieldProps('pickUp.name')}

                                />

                                <TextInput
                                label="Email Address"
                                {...getFieldProps('pickUp.email')}
                                type="email"
                                /> 

                                <TextInput
                                label="Phone"
                                {...getFieldProps('pickUp.phone')}
                                type="tel"
                                /> 

                                <TextInput
                                label="Address"
                                {...getFieldProps('pickUp.address')}
                                type="text"
                                /> 

                                <SubHeading subheading="Destination" /> 
                                <div onClick={() => setShowCustomer((prev: any) => ({...prev, destination: true, text: "destination", editingDestination: true}))} className="my-4 cursor-pointer text-green-500">Select Customer</div>

                                <TextInput
                                label="Name"
                                {...getFieldProps('destination.name')}
                                type="text"
                                />

                                <TextInput
                                label="Email Address"
                                {...getFieldProps('destination.email')}
                                type="email"
                                /> 

                                <TextInput
                                label="Phone"
                                {...getFieldProps('destination.phone')}
                                type="tel"
                                /> 

                                <TextInput
                                label="Address"
                                {...getFieldProps('destination.address')}
                                type="text"
                                /> 

                                <SubHeading subheading="Route Estimate" />
                                <div className="my-4 cursor-pointer text-green-500">Refresh Estimate</div>

                                <TextInput
                                label="Estimated Time"
                                {...getFieldProps('estimatedTime.text')}
                                type="number"
                                /> 

                                {/* <TextInput
                                label=""
                                name="estimatedMinutes"
                                type="number"
                                />  */}

                                <TextInput
                                label="Estimated Amount"
                                {...getFieldProps('amount')}
                                type="number"
                                /> 

                                <SubHeading subheading="Payment" />

                                <Select label="Payment Option" {...getFieldProps('paymentType')}>
                                    <option value="PAY_ON_DELIVERY">Pay On Delivery</option>
                                    <option value="PAY_ON_PICKUP">Pay On Pickup</option>
                                </Select>

                                <ToggleButton
                                title="This Customer has Paid" 
                                onOff={handleToggleParcelButtons.customerPaid}
                                handleOnOff={handleCustomerPaid}
                                />

                                <ToggleButton 
                                title="Save & Update New Shipment."
                                icon="icon ion-md-information-circle-outline"
                                handleOnOff={handleSaveAndAddNewParcel}
                                onOff={handleToggleParcelButtons.saveAndAddNewParcel}
                                description="Enable this if you want to edit more details on this shipment immediately after clicking on the save button."
                                />  

                                <Button 
                                type="submit" 
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