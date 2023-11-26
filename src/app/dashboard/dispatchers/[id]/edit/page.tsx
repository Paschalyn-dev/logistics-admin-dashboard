'use client'
import { useState, useContext, useEffect, useRef, useCallback } from "react";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useRouter } from "next/navigation";
import Holder from "@/app/dashboard/holder";
import ConstantNav from "@/app/dashboard/constantNav";
import Section from "@/app/dashboard/section";
import SuccessMessage from "@/app/dashboard/successmessage";
import { useAllDispatchersFetcher, useViewDispatcher } from "@/app/dashboard/services/swr-functions/customer-swr";
import Link from "next/link";
import Loader from "@/app/dashboard/services/Loader/spinner";
import Hero from "@/app/dashboard/preferences/hero";
import Select from "@/app/dashboard/formik/select";
import TextInput from "@/app/dashboard/formik/inputtypes";
import { Password } from "@/app/dashboard/formik/password";
import SubHeading from "@/app/dashboard/preferences/website/subheading";
import UploadFile from "@/app/dashboard/formik/file";
import ToggleButton from "@/app/dashboard/preferences/shipment/toggleButton";
import Button from "@/app/dashboard/button";
import { State_data } from "@/app/dashboard/context/context";
import { staffAPIURL } from "@/app/dashboard/services/api-url/staff-api-url";
import { authorizationKey } from "@/app/dashboard/services/staff-api/api";
import ErrorAndSucccessHandlers from "@/app/dashboard/services/eventhandlers/error-and-success-handlers";
import SkeletonLoading from "@/app/dashboard/services/eventhandlers/skeleton-loading";
import MiniText from "@/app/dashboard/minitext";
import { Console } from "console";

export default function EditDispatchers({ params }: { params: {id: number}}){
    const {successMessage, loading, setLoading, setSuccessMessage} = useContext(State_data);
    const [saveAndAddNewRider, setSaveAndAddNewRider] = useState<boolean>(false);
    const router = useRouter();
    const formRef = useRef<any>();
    const [windowLocation, setWindowLocations] = useState<any>('');
    const validation = Yup.object().shape({
            address: Yup.object().shape({
                state: Yup.string().required('This field is required.'),
                street: Yup.string().required('This field is required.'),
            }),
            fullName: Yup.string()
            .min(1, 'Name must be one character or more.')
            .required('This field is required.'),
            email: Yup.string()
            .email('This email address seems invalid.')
            .required('This field is required.'),
            phone: Yup.number()
            .min(1, 'Must be 1 character or more.')
            .required('This field is required.'),
    });
    const [dispatcherDetails, setDispatcherDetails] = useState<any>({
        info: "",
        result: "",
        code: ""
    });
    
    const {viewDispatcherData, 
        viewDispatcherError, 
        viewDispatcherIsLoading, 
        viewDispatcherIsValidating, 
        viewDispatcherMutate} = useViewDispatcher(params.id);

    const [initialValues, setInitialValues] = useState<any>({
        address: {
            city: "",
            country: "",
            state: "",
            street: ""
        },
        bioDetails: "",
        createdAt: "",
        email:  "",
        fullName:  "",
        id: "",
        image:  "",
        insurance: "",
        isDefaultPassword: "",
        licence: "",
        misc: "",
        parcels: "",
        personalWebsite: "",
        phone:  "",
        rating: "",
        roadWorthiness: "",
        role: "",
        socialProfiles: "",
        updatedAt: "",
        vehicle: ""
      });
      
      const [isNotValid, setIsNotValid] = useState('');

      const handleIsNotValid = () => {
          setIsNotValid(Password())
          setSuccessMessage((prev: any) => ({...prev, isNotValid: false}))
      }
      
      useEffect(() => {
          setSuccessMessage((prev: any) => ({...prev, isNotValid: true}))
      }, [isNotValid])

      
    const handleSaveAndAddNewRider = (e: any) => {
        e.preventDefault();
        setSaveAndAddNewRider(!saveAndAddNewRider)
    }

    const updateDispatcherInformation = useCallback((key: string) => {
        setTimeout(() => {formRef?.current?.setFieldTouched(`address.${key}`, true)}, 100)
    }, [ formRef.current]);

    useEffect(() => {
        if(viewDispatcherData?.data){
            updateDispatcherInformation('state')
        }
    }, [viewDispatcherData?.data?.address, formRef?.current?.values?.address])

    useEffect(() => {
        if(viewDispatcherData?.data){
            updateDispatcherInformation('street')
        }
    }, [viewDispatcherData?.data?.address, formRef?.current?.values?.address])
        
    async function handleEdit(details: any, id: any){
        const response = await fetch(staffAPIURL.editDispatcher(id), {
            method: 'PUT',
            body: JSON.stringify(details),
            headers: {
                "Content-Type": "application/json",
                "Authorization": authorizationKey    
            },
        });
        const data = await response.json();
        setDispatcherDetails((prev: any) => ({...prev, result: data}));
        setLoading((prev: any) => ({...prev, dispatcher: false}))
    }
    
    useEffect(() => {
        if(dispatcherDetails?.result === "" && dispatcherDetails?.info !== ""){
            setLoading((prev: any) => ({...prev, dispatcher: true}))
        }
        if(dispatcherDetails?.info !== ""){
            handleEdit({...dispatcherDetails?.info}, viewDispatcherData?.data?.id);
        }
    }, [dispatcherDetails?.code]);
    
    useEffect(() => {
        setLoading((prev: any) => ({...prev, dispatcher: false}))
        setSuccessMessage((prev: any) => ({...prev, isNotValid: false}))
    },[])
    
    useEffect(() => {
        if(!saveAndAddNewRider && dispatcherDetails?.result?.code === 200){
            setTimeout(() => {
                    if(windowLocation?.location?.pathname === `/dashboard/dispatchers/${params?.id}/edit`){
                        router.replace('/dashboard/dispatchers')
                    }else{}
                }, 5000);
            }
    }, [dispatcherDetails?.result, windowLocation?.location?.pathname]);
        
    useEffect(() => {
        if(typeof window !== 'undefined'){
            setWindowLocations(window)
        }
    },[typeof window !== 'undefined'])
        
    useEffect(() => {
        if(viewDispatcherData?.data){
            setInitialValues((prev: any) => ({
                ...prev,
                address: {
                    city: viewDispatcherData?.data?.address?.city,
                    country: viewDispatcherData?.data?.address?.country,
                    state: viewDispatcherData?.data?.address?.state,
                    street: viewDispatcherData?.data?.address?.street
                },
            bioDetails: viewDispatcherData?.data?.bioDetails,
            createdAt: viewDispatcherData?.data?.createdAt,
            email: viewDispatcherData?.data?.email,
            fullName: viewDispatcherData?.data?.fullName,
            id: viewDispatcherData?.data?.id,
            image: viewDispatcherData?.data?.image,
            insurance: "",
            isDefaultPassword: viewDispatcherData?.data?.isDefaultPassword,
            licence: "",
            misc: viewDispatcherData?.data?.misc,
            parcels: viewDispatcherData?.data?.parcels,
            personalWebsite: viewDispatcherData?.data?.personalWebsite,
            phone: viewDispatcherData?.data?.phone,
            rating: viewDispatcherData?.data?.rating,
            roadWorthiness: "",
            role: viewDispatcherData?.data?.role,
            socialProfiles: viewDispatcherData?.data?.socialProfiles,
            updatedAt: viewDispatcherData?.data?.updatedAt,
            vehicle: ""
        }))
    }
}, [viewDispatcherData?.data]);


        return(
            <Holder>
            {
                viewDispatcherIsLoading || viewDispatcherIsValidating  &&
                <SkeletonLoading title="dispatcher data" />
            }   
            {
                (loading.dispatcher) &&
                <Loader />
            }  
            <ConstantNav />
            <Section>

            {
                dispatcherDetails.result !== "" && dispatcherDetails.info !== "" && dispatcherDetails?.code !== '' &&
                <ErrorAndSucccessHandlers
                name="editDispatcher"
                successName={successMessage.editDispatcher}
                message={dispatcherDetails?.result?.code} 
                code={dispatcherDetails?.info?.code}
                successmessage="Dispatcher details successfully updated!"
                failedmessage="Sorry, dispatcher cannot be added to the list or dispatcher already exists!"
                staffAndCustomer={dispatcherDetails?.result}
                error={dispatcherDetails?.result?.code !== 200}
                data={dispatcherDetails?.result}
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

            <Link href="/dashboard/dispatchers" className="bg-gray-200 cursor-pointer rounded-full w-fit px-2 text-2xl font-bold ml-3 text-gray-900">
                <i className="icon ion-md-arrow-back"></i>
            </Link>

            <Formik
                  innerRef={(ref) => formRef.current = ref}
                  initialValues={initialValues}
                  validationSchema={validation}
                  onSubmit={(values) => {
                    setSuccessMessage((prev: any) => ({...prev, editDispatcher: true}));
                    setDispatcherDetails((prev: any) => ({...prev, code: Password(), result: "", info: {...values}}) );
                  }}
                  enableReinitialize={true}
                  validateOnMount={true}
                >
                    {
                        ({ values, handleSubmit, isValid, errors }) => (
                            <Hero formHeading={values.fullName} 
                            comingsoon="Rider" 
                            heading="Edit Rider Account" 
                            icon="icon ion-md-bicycle"
                            description={`${values.email} | ${values.phone}`}>
                            <Form>
                                <TextInput
                                label="Full Name"
                                type="text"
                                name='fullName'
                                />

                                <TextInput
                                label="Email Address"
                                type="email"
                                name='email'
                                />  

                                <TextInput
                                label="Phone"
                                type="tel"
                                name="phone"
                                /> 

                                <TextInput
                                label="State"
                                type="text"
                                name='address.state'
                                />

                                <TextInput
                                label="Address"
                                type="text"
                                placeholder="Enter Location"
                                name='address.street'
                                /> 

                                <SubHeading subheading="Documents" /> 
                                <MiniText minitext="Click on 'choose file' to replace already existing files."/>
                                <br/>

                                <div className="flex justify-between items-center flex-wrap">
                                    <UploadFile
                                    label = "License"
                                    type="file"
                                    name='licence'
                                    document={viewDispatcherData?.data?.licence}
                                    />

                                    <UploadFile
                                    label = "Vehicle"
                                    type="file"
                                    name='vehicle'
                                    document={viewDispatcherData?.data?.vehicle}
                                    />

                                    <UploadFile
                                    label = "Insurance"
                                    type="file"
                                    name='insurance'
                                    document={viewDispatcherData?.data?.insurance}
                                    />

                                    <UploadFile
                                    label = "Roadworthiness"
                                    type="file"
                                    name='roadWorthiness'
                                    document={viewDispatcherData?.data?.roadWorthiness}
                                    />
                                </div>

                                <ToggleButton 
                                title="Save & Update Customer."
                                icon="icon ion-md-information-circle-outline"
                                handleOnOff={handleSaveAndAddNewRider}
                                onOff={saveAndAddNewRider}
                                description="Enable this if you want to edit more details on this dispatcher immediately after clicking on the save button."
                                />  

                                <Button
                                type="submit" 
                                handleClick={() => {viewDispatcherData?.data && (!Object.keys(errors).length || isValid) ? () => handleSubmit() : handleIsNotValid()}}
                                buttonName="Save" />
                            </Form>
                            </Hero>
                        )
                    }
                </Formik>
                </Section>
        </Holder>
    )
}