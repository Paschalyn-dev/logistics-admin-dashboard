'use client'
import { useState, useContext, useEffect, useRef, useCallback } from "react";
import { Formik, Form, validateYupSchema } from 'formik';
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
import { useAllDispatchersFetcher, useViewParcels } from "../../../services/swr-functions/customer-swr";
import Loader from "@/app/dashboard/services/Loader/spinner";
import SkeletonLoading from "@/app/dashboard/services/eventhandlers/skeleton-loading";
import { State_data, phoneRegExp } from "@/app/dashboard/context/context";
import { customerAPIUrl } from "@/app/dashboard/services/api-url/customer-api-url";
import { authorizationKeyCustomer } from "@/app/dashboard/services/customer-api/api";
import { Password } from "@/app/dashboard/formik/password";
import ErrorAndSucccessHandlers from "@/app/dashboard/services/eventhandlers/error-and-success-handlers";
import ShowCustomers from "@/app/dashboard/showCustomers";
import { useFetchCustomers } from "@/app/dashboard/services/swr-functions/staff-swr";
import SuccessMessage from "@/app/dashboard/successmessage";
import { usePathname } from "next/navigation";

export default function FormPageShipments({ params }: { params: {id: number}}){
    const router = useRouter();
    const formikRef = useRef<any>(null);
    const [windowWidth, setWindowWidth]= useState<any>('');
    const [windowLocation, setLocations]= useState<any>('');
    const {viewParcelData, viewParcelIsLoading, viewParcelIsValidating} = useViewParcels(params?.id);
    const {successMessage, setSuccessMessage, setLoading, loading, id, setId} = useContext(State_data);
    const [handleToggleParcelButtons, setHandleToggleParcelButtons] = useState<any>({
        saveAndAddNewParcel: false,
        parcelFragility: false,
        parcelPicked: false,
        parcelDelivered: false,
        customerPaid: false
    });
    const {fetchCustomersData} = useFetchCustomers();
    const {dispatcherAllData} = useAllDispatchersFetcher();
    const [myInitialValues, setInitialValues] = useState<any>({
        amount: "",
        card: {
            authorizationCode: "",
            email: ""
        },
        company: "",
        completed: handleToggleParcelButtons.parcelDelivered,
        description: "",
        destination: {
            address: "",
            email:  "",
            name:  "",
            phone: ""
        },
        fragile: handleToggleParcelButtons.parcelFragility,
        meta: {
            by: {
                entity: "",
                id: ""
            },
            company: {
                alias: ""
            },
            device: {
                appBuild: "",
                appId: "",
                appName: "",
                appVersion: "",
                isVirtual: "",
                manufacturer: "",
                model: "",
                name: "",
                operatingSystem: "",
                platform: ""
            },
            estimatedDistance: {
                text: "",
                value: ""
            },
            estimatedTime: {
                text:  "",
                value: ""
            },
        },
        name: "",
        paid: handleToggleParcelButtons.customerPaid,
        paymentType:  "",
        pickUp: {
            address: "",
            email:  "",
            name: "",
            phone:  "",
        },
        picked: handleToggleParcelButtons.parcelPicked,
        rider:  "",
        size:  "",
        trackId: "",
        updatedAt: "", 
        userId: "",
    });
    
    const findCustomerIndex = fetchCustomersData?.data?.findIndex((f: any) => f.id === id.customer)
    
    const findDestinationIndex = fetchCustomersData?.data?.findIndex((f: any) => f.id === id.destination)
    
    const [myValidation, setValidation] = useState(
        Yup.object().shape({
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
    )

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
    
    const handleFetchDispatcher = (name: string) => {
        const newId = dispatcherAllData?.data?.filter((dispatcher: any) => dispatcher?.fullName === name);
        return newId[0]?.id;
    }
    
    const updateCustomerInformation = useCallback((key: string, index: number) => {
        const { user } = fetchCustomersData?.data[index] ?? {};
        if (user) {
            formikRef.current?.setFieldValue(`${key}.name`, user.name);
            formikRef.current?.setFieldValue(`${key}.email`, user.email);
            formikRef.current?.setFieldValue(`${key}.phone`, user.phone);
            formikRef.current?.setFieldValue(`${key}.address`, user.address);
        }
    }, [ fetchCustomersData?.data, formikRef.current]);
    
    useEffect(() => {
        setWindowWidth(window);
        setLocations(window);
      }, [typeof window !== undefined]);
    
    useEffect(() => {
        updateCustomerInformation('destination', findDestinationIndex)
    }, [fetchCustomersData?.data, findDestinationIndex]);
    
    useEffect(() => {
        updateCustomerInformation('pickUp', findCustomerIndex)
    }, [fetchCustomersData?.data, findCustomerIndex])
    
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
            },
        })
        const data = await response.json();
        setEditParcelDetails((prev: any) => ({...prev, result: data}));
        setLoading((prev: any) => ({...prev, parcel: false}))
    }
    
    const updateButtons = useCallback((key: string, value: string) => {
        formikRef.current?.setFieldValue(`${key}`, value);
    }, [handleToggleParcelButtons, formikRef.current])

    
    
    const handleIsNotValid = (submit: any) => {
        if(viewParcelData?.data && !editParcelDetails?.result?.length && !loading.parcel){
            setSuccessMessage((prev: any) => ({...prev, isNotValid: true}))
        }
        else{
            setLoading((prev: any) => ({...prev, parcel: true}))
            submit();
        }
    }
    
    const [timeAndDistance, setTimeAndDistance] = useState({
        time: 0,
        distance: 0
    })
    
    function handleSaveAndAddNewParcel() {
        setHandleToggleParcelButtons((prev: any) => ({
            ...prev, saveAndAddNewParcel: !handleToggleParcelButtons.saveAndAddNewParcel
        }))
    }
    
    useEffect(() => {
        if(viewParcelData?.data){
            setHandleToggleParcelButtons((prev: any) => ({...prev, 
                parcelFragility: viewParcelData?.data?.fragile,
                parcelPicked: viewParcelData?.data?.picked,
                parcelDelivered: viewParcelData?.data?.completed,
                customerPaid: viewParcelData?.data?.paid
            }))
        }
        setLoading((prev: any) => ({...prev, parcel: false}))
        setSuccessMessage((prev: any) => ({...prev, isNotValid: false}))
    },[])

    useEffect(() => {
        if(viewParcelData?.data?.fragile){
            setHandleToggleParcelButtons((prev: any) => ({...prev, parcelFragility: true}))
        }
    },[viewParcelData?.data?.fragile])
    
    useEffect(() => {
        if(viewParcelData?.data?.completed){
            setHandleToggleParcelButtons((prev: any) => ({...prev, parcelDelivered: true}))
        }
    },[viewParcelData?.data?.completed])
    
    useEffect(() => {
        if(viewParcelData?.data?.picked){
            setHandleToggleParcelButtons((prev: any) => ({...prev, parcelPicked: true}))
        }
    },[viewParcelData?.data?.picked])

    useEffect(() => {
        if(viewParcelData?.data?.paid){
            setHandleToggleParcelButtons((prev: any) => ({...prev, customerPaid: true}))
        }
    },[viewParcelData?.data?.paid])
    
    useEffect(() => {
        if(editParcelDetails?.result === "" && editParcelDetails?.info !== ""){
            setLoading((prev: any) => ({...prev, parcel: true}))
        }      
        if(editParcelDetails?.info !== ""){
            handleEdit({...editParcelDetails?.info}, viewParcelData?.data?.id);
        }
    }, [editParcelDetails?.code]);
    
    const handleRouter = () => {
        router.replace('/dashboard/shipments/active')
    }

    useEffect(() => {
        if(!handleToggleParcelButtons.saveAndAddNewParcel && editParcelDetails?.result?.code === 200){
            setTimeout(() => {
                    if(windowLocation?.location?.pathname === `/dashboard/shipments/${params?.id}/edit`){
                        handleRouter();
                    }
                    else{}
                }, 5000);
        }
    }, [editParcelDetails?.result, windowLocation?.location?.pathname]);
    
    useEffect(() => {
        if(viewParcelData?.data){
            setInitialValues((prev: any) => ({
                ...prev,
                amount: viewParcelData?.data?.amount,
                card: {
                    authorizationCode: "",
                    email: ""
                },
                company: viewParcelData?.data?.company ,
                completed: handleToggleParcelButtons.parcelDelivered,
                description: viewParcelData?.data?.description,
                destination: {
                    address: viewParcelData?.data?.destination?.address,
                    email: viewParcelData?.data?.destination?.email,
                name:  viewParcelData?.data?.destination?.name,
                phone: viewParcelData?.data?.destination?.phone
            },
            fragile: handleToggleParcelButtons.parcelFragility,
            meta: {
                by: {
                    entity: viewParcelData?.data?.meta?.by?.entity ,
                    id: viewParcelData?.data?.meta?.by?.id 
                },
                company: {
                    alias: viewParcelData?.data?.meta?.company?.alias
                },
                device: {
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
        }))
    }
    setLoading((prev: any) => ({...prev, parcel: false}))
    }, [viewParcelData]);

    useEffect(() => {
        setValidation(Yup.object({
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
        }));
    },[findCustomerIndex, findDestinationIndex, fetchCustomersData?.data, " "])
    
    useEffect(() => {
        updateButtons('fragile', handleToggleParcelButtons.parcelFragility)
        updateButtons('completed', handleToggleParcelButtons.parcelDelivered)
        updateButtons('paid', handleToggleParcelButtons.customerPaid)
        updateButtons('picked', handleToggleParcelButtons.parcelPicked)
    }, [handleToggleParcelButtons, formikRef?.current])
        
    return(
        <Holder>
            {
                loading.parcel && <Loader />
            }
            {
                viewParcelIsLoading || viewParcelIsValidating &&
                <SkeletonLoading title="parcel data" />
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

            {
                successMessage.isNotValid && 
                <SuccessMessage
                id="failed"
                top={30}
                name="isNotValid"
                messageTitle="You have not filled all the required form fields."
                successMessageShow={successMessage.isNotValid}
                />
            }

            <Link onClick={() => setId((prev: any) => ({...prev, customer: 0, destination: 0}))} 
                href="/dashboard/shipments/active" className="bg-gray-200 cursor-pointer rounded-full w-fit px-2 text-2xl font-bold ml-3 text-gray-900">
                <i className="icon ion-md-arrow-back"></i>
            </Link>

            <Formik
                  innerRef={(ref) => formikRef.current = ref}
                  initialValues={myInitialValues}
                  validationSchema={myValidation}
                  onSubmit={async (values) => {
                        if(Number(values?.meta?.estimatedTime?.text || values?.meta?.estimatedDistance?.text) >= 0){
                            setTimeAndDistance((prev: any) => ({...prev, time: Number(values?.meta?.estimatedTime?.text) * 3600, 
                            distance: Number(values?.meta?.estimatedDistance?.text) / 1000}))
                        }
                        setSuccessMessage((prev:any) => ({...prev, editShipment: true}));
                        setEditParcelDetails((prev: any) => ({...prev, info:{...values,
                            meta: {...values?.meta, 
                                estimatedTime: {...values?.meta?.estimatedTime, 
                                value: timeAndDistance?.time},
                                estimatedDistance: {...values?.meta?.estimatedDistance, 
                                value: timeAndDistance?.distance}}
                        }, code: Password(), result: ""}));
                        setId((prev: any) => ({...prev, customer: 0, destination: 0}))
                    }}
                    enableReinitialize={true}
                    validateOnMount={true}
                >
                    {
                        ({ values, errors, handleSubmit }) => (
                            <Hero 
                            formHeading={values.name} 
                            description={values.amount ? `₦${values.amount}` : `₦0`}
                            heading="Edit A Shipment" 
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
                                            <option key={dispatcher?.id} value={handleFetchDispatcher(dispatcher.fullName) || ''}>{dispatcher.fullName}</option>
                                        ))
                                    }
                                </Select> 
                                    
                                <SubHeading subheading="Pickup" />
                                <div onClick={() => setShowCustomer((prev: any) => ({...prev, customer: true, text: "customer", editingCustomer: true}))} className="my-4 cursor-pointer text-green-500">Select Customer</div>

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
                                <div onClick={() => setShowCustomer((prev: any) => ({...prev, destination: true, text: "destination", editingDestination: true}))} className="my-4 cursor-pointer text-green-500">Select Customer</div>

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
                                title="Save & Update New Shipment."
                                icon="icon ion-md-information-circle-outline"
                                handleOnOff={handleSaveAndAddNewParcel}
                                onOff={handleToggleParcelButtons.saveAndAddNewParcel}
                                description="Enable this if you want to edit more details on this shipment immediately after clicking on the save button."
                                />  
                                <Button 
                                type="submit" 
                                handleClick={() => !Object.keys(errors).length && viewParcelData?.data ? () => {handleSubmit()} :  handleIsNotValid(handleSubmit)} 
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