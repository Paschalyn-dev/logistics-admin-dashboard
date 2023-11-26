'use client'
import { useState, useContext, useEffect, useCallback, useRef } from "react";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Link from "next/link";
import Holder from "@/app/dashboard/holder";
import ConstantNav from "@/app/dashboard/constantNav";
import Section from "@/app/dashboard/section";
import { useViewStaff } from "@/app/dashboard/services/swr-functions/customer-swr";
import Loader from "@/app/dashboard/services/Loader/spinner";
import Hero from "@/app/dashboard/preferences/hero";
import TextInput from "@/app/dashboard/formik/inputtypes";
import Button from "@/app/dashboard/button";
import { State_data, phoneRegExp } from "@/app/dashboard/context/context";
import { Password } from "@/app/dashboard/formik/password";
import { staffAPIURL } from "@/app/dashboard/services/api-url/staff-api-url";
import { authorizationKey } from "@/app/dashboard/services/staff-api/api";
import ErrorAndSucccessHandlers from "@/app/dashboard/services/eventhandlers/error-and-success-handlers";
import { useRouter } from "next/navigation";
import ToggleButton from "@/app/dashboard/preferences/shipment/toggleButton";
import SkeletonLoading from "@/app/dashboard/services/eventhandlers/skeleton-loading";
import SuccessMessage from "@/app/dashboard/successmessage";

export default function editAdministrators({ params }: { params: {id: number}}){
    const {successMessage, setSuccessMessage, setLoading, loading} = useContext(State_data);
    const [windowLocation, setWindowLocations] = useState<any>('')
    const formRef = useRef<any>();
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
        phone: Yup.string()
        .matches(phoneRegExp, 'Phone number is not valid')
        .min(1, 'Must be 1 character or more.')
        .required('This field is required.'),
      });
    const [saveAndAddNewStaff, setSaveAndAddNewStaff] = useState<boolean>(false);
    const [staffDetails, setStaffDetails] = useState<any>({
        info: "", 
        result: "",
        code: ""
    });
    const [initialValues, setInitialValues] = useState(
        {
            address: {
              city: "",
              country: "",
              state: "",
              street: ""
          },
          createdAt: "",
          email: "",
          fullName: "",
          id: "",
          image: "",
          isDefaultPassword: "",
          onboarded: "",
          phone: "",
          role: "",
          updatedAt: "",
        }
    )
    const router = useRouter();
    const {viewStaffData, 
           viewStaffError,
           viewStaffIsLoading,
           viewStaffIsValidating,
           viewStaffMutate} = useViewStaff(params.id);
    
    const handleSaveAndAddNewAdministrator = (e: any) => {
        e.preventDefault();
        setSaveAndAddNewStaff(!saveAndAddNewStaff)
    }

    const [isNotValid, setIsNotValid] = useState('');

    const handleIsNotValid = () => {
        setIsNotValid(Password())
        setSuccessMessage((prev: any) => ({...prev, isNotValid: false}))
    }
    
    const updateAdministratorInformation = useCallback((key: string) => {
        setTimeout(() => {formRef?.current?.setFieldTouched(key, true)}, 100)
    }, [ formRef.current]);
    
    console.log(formRef?.current)
    

    useEffect(() => {
        if(viewStaffData?.data){
            updateAdministratorInformation('address.state')
        }
    }, [viewStaffData?.data?.address, formRef?.current?.values?.address?.state])
    
    useEffect(() => {
        if(viewStaffData?.data){
            updateAdministratorInformation('phone')
        }
    }, [viewStaffData?.data?.phone, formRef?.current?.values?.phone])
    
    useEffect(() => {
        if(viewStaffData?.data){
            updateAdministratorInformation('fullName')
        }
    }, [viewStaffData?.data?.fullName, formRef?.current?.values?.fullName])
    
    useEffect(() => {
        if(viewStaffData?.data){
            updateAdministratorInformation('email')
        }
    }, [viewStaffData?.data?.email, formRef?.current?.values?.email])
    
    useEffect(() => {
        if(viewStaffData?.data){
            updateAdministratorInformation('address.street')
        }
    }, [viewStaffData?.data?.address, formRef?.current?.values?.address?.street])
    
    
    useEffect(() => {
        setSuccessMessage((prev: any) => ({...prev, isNotValid: true}))
    }, [isNotValid])
    
    async function handleEdit(details: any, id: any){
        const response = await fetch(staffAPIURL.editStaff(id), {
            method: 'PUT',
            body: JSON.stringify(details),
            headers: {
                "Content-Type": "application/json",
                "Authorization": authorizationKey
                // "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJyb2xlIjoic3VwZXJhZG1pbiIsImFsaWFzIjoiY2FrZW51cyJ9LCJpYXQiOjE2OTExODgzNDZ9.73G4_gAI_mexLVUYQOkaJN7XCaIj0iHqj5b2g9yYIa8"
            }
        });
        const data = await response.json();
        setStaffDetails((prev: any) => ({...prev, result: data}));
        setLoading((prev: any) => ({...prev, administrator: false}))
    }
    
    useEffect(() => {
        setLoading((prev: any) => ({...prev, administrator: false}))
        setSuccessMessage((prev: any) => ({...prev, isNotValid: false}))
    },[])

    useEffect(() => {
        if(staffDetails?.result === "" && staffDetails?.info !== ""){
            setLoading((prev: any) => ({...prev, administrator: true}))
        }
        if(staffDetails?.info !== ""){
            handleEdit({...staffDetails?.info}, viewStaffData?.data?.id)
        }
    }, [staffDetails?.code]);

    useEffect(() => {
        if(viewStaffData?.data){
            setInitialValues((prev: any) => ({
                ...prev,
                address: {
                    city: viewStaffData?.data?.address?.city,
                    country: viewStaffData?.data?.address?.country,
                    state: viewStaffData?.data?.address?.state,
                    street: viewStaffData?.data?.address?.street
              },
              createdAt: viewStaffData?.data?.createdAt,
              email: viewStaffData?.data?.email,
              fullName: viewStaffData?.data?.fullName,
              id: viewStaffData?.data?.id,
              image: viewStaffData?.data?.image,
              isDefaultPassword: viewStaffData?.data?.isDefaultPassword,
              onboarded: viewStaffData?.data?.onboarded,
              phone: viewStaffData?.data?.phone,
              role: viewStaffData?.data?.role,
              updatedAt: viewStaffData?.data?.updatedAt,
            }))
        }
    }, [viewStaffData?.data])    

    useEffect(() => {
        if(!saveAndAddNewStaff && staffDetails?.result?.code === 200){
            setTimeout(() => {
                if(windowLocation?.location?.pathname === `/dashboard/administrators/${params?.id}/edit`){
                    router.replace('/dashboard/administrators')
                }else{}
            }, 5000);
        }
    }, [staffDetails?.result, windowLocation?.location?.pathname]);

    useEffect(() => {
        if(typeof window !== 'undefined'){
            setWindowLocations(window)
        }
    },[typeof window !== 'undefined'])

    
    return(
        <Holder>
            {
                loading.administrator && <Loader />
            }
            <ConstantNav />
            <Section>

            {
                (viewStaffIsLoading || viewStaffIsValidating) &&
                <SkeletonLoading title="administrator data" />
            }     
            {
                staffDetails.result !== "" && staffDetails.info !== "" && staffDetails?.code !== '' &&
                <ErrorAndSucccessHandlers
                name="editStaff"
                successName={successMessage.editStaff}
                message={staffDetails?.result?.code} 
                code={staffDetails?.info?.code}
                successmessage="Administrator details successfully updated!"
                failedmessage="Sorry, administrator details cannot be updated!"
                staffAndCustomer={staffDetails?.result}
                error={staffDetails?.result?.code !== 200}
                loading={staffDetails?.result === "undefined" && staffDetails?.info !== ""}
                data={staffDetails?.result}
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

            <Link href="/dashboard/administrators" className="bg-gray-200 cursor-pointer rounded-full w-fit px-2 text-2xl font-bold ml-3 text-gray-900">
                    <i className="icon ion-md-arrow-back"></i>
            </Link>

            <Formik
                  innerRef={(ref) => formRef.current = ref}
                  initialValues={initialValues}
                  validationSchema={validation}
                  onSubmit={(values) => {
                    setSuccessMessage((prev: any) => ({...prev, editAdministrator: true}));
                    setStaffDetails((prev: any) => ({...prev, info: {...values}, code: Password(), result:""}));
                  }}
                  enableReinitialize={true}
                  validateOnMount={true}
                >
                    {
                        ({ values, isValid, errors, handleSubmit }) => (
                            <Hero formHeading={values.fullName} 
                            heading="Edit Staff Account" 
                            icon="icon ion-md-contact"
                            description={`${values.email} | ${values.phone}`}
                            comingsoon="Administrator">
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
                                name='phone'
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
                                
                                <ToggleButton
                                title="Save & Update Administrator."
                                icon="icon ion-md-information-circle-outline"
                                handleOnOff={handleSaveAndAddNewAdministrator}
                                onOff={saveAndAddNewStaff}
                                description="Enable this if you want to edit more details on this administrator immediately after clicking on the save button."
                                />  

                                <Button
                                type='submit'
                                handleClick={() => {viewStaffData?.data && (!Object.keys(errors).length || isValid)  ? () => handleSubmit() : handleIsNotValid()}}
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