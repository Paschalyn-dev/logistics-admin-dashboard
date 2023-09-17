'use client'
import { useState, useContext } from "react";
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
import { useAllParcelsFetcher, useEditParcels, useViewParcels } from "../../../services/swr-functions/customer-swr";
import Loader from "@/app/dashboard/services/Loader/spinner";
import SkeletonLoading from "@/app/dashboard/services/eventhandlers/skeleton-loading";
import { State_data, phoneRegExp } from "@/app/dashboard/context/context";

export default function FormPageShipments({ params }: { params: {id: number}}){
    const {viewParcelData, viewParcelIsLoading, viewParcelIsValidating} = useViewParcels(params.id);
    const {successMessage, setSuccessMessage} = useContext(State_data);
    const [handleToggleParcelButtons, setHandleToggleParcelButtons] = useState<any>({
        saveAndAddNewRider: false,
        parcelFragility: viewParcelData?.data?.fragile,
        parcelPicked: viewParcelData?.data?.picked,
        parcelDelivered: viewParcelData?.data?.completed,
        customerPaid: viewParcelData?.data?.paid
    });
    const {parcelAllMutate} = useAllParcelsFetcher();
    const router = useRouter();
    const [editParcelDetails, setEditParcelDetails] = useState<any>()
    const {editParcelData, 
        editParcelError, 
        editParcelIsLoading, 
        editParcelIsValidating, 
        editParcelMutate} = useEditParcels(params.id, editParcelDetails);

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
            {
                viewParcelIsLoading || viewParcelIsValidating &&
                <SkeletonLoading title="parcel data." />
            }
            <OrdersNav />
            <Section>
            {successMessage.editShipment && editParcelData.code === 200 &&
           <SuccessMessage 
           name="editShipment"
           messageTitle="Shipment details has been successfully updated!" 
            successMessageShow={successMessage.editShipment} 
           />
           }
          
          {successMessage.editShipment && editParcelData.code !== 200 &&
           <SuccessMessage 
            id="failed"
            messageTitle="Sorry, Shipment details cannot be updated!" 
            successMessageShow={successMessage.editShipment} 
            name="editShipment"
            />
           }

          {successMessage.editShipment && editParcelError && 
           <SuccessMessage 
            messageTitle="Error occured, Check your network connection!" 
            id='failed'
            successMessageShow={successMessage.editShipment} 
            name="editShipment"
            />
           }

           {
             (editParcelIsLoading || editParcelIsValidating && !viewParcelIsValidating && !viewParcelIsLoading) && 
             <Loader />
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
                        address: viewParcelData?.data?.destination?.address,
                        email: viewParcelData?.data?.destination?.email,
                        name: viewParcelData?.data?.destination?.name,
                        phone: viewParcelData?.data?.destination?.phone
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
                            address: viewParcelData?.data?.pickUp?.address,
                            email: viewParcelData?.data?.pickUp?.email,
                            name: viewParcelData?.data?.pickUp?.name,
                            phone: viewParcelData?.data?.pickUp?.phone,
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
                        .min(1, 'Must be 1 character or more.')
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
                    rider: Yup.string().notRequired(),
                    amount: Yup.string().required('This field is required.'),
                    paymentType: Yup.string().notRequired()
                  })}
                  onSubmit={async (values) => {
                        setSuccessMessage((prev:any) => ({...prev, editShipment: true}));
                        parcelAllMutate();
                        setEditParcelDetails(values);
                        if(!handleToggleParcelButtons.saveAndAddNewCustomer && editParcelData?.code === 200){
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

                                <Select label="Dispatcher" {...getFieldProps('rider')}>
                                    <option value=""></option>
                                    <option value=""></option>
                                </Select> 

                                <SubHeading subheading="Pickup" />
                                <div className="my-4 cursor-pointer text-green-500">Select Customer</div>

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
                                {/* <div className="my-4 cursor-pointer text-green-500">Select Customer</div> */}

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
                                title="Save & Add New Customer."
                                icon="icon ion-md-information-circle-outline"
                                handleOnOff={handleSaveAndAddNewRider}
                                onOff={handleToggleParcelButtons.saveAndAddNewRider}
                                description="Enable this if you want to create a new rider immediately after creating this rider."
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
                </Section>
        </Holder>
    )
}