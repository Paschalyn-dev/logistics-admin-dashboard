'use client'
import { useState, useContext, useEffect } from "react";
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

export default function editAdministrators({ params }: { params: {id: number}}){
    const {successMessage, setSuccessMessage} = useContext(State_data);
    const [saveAndAddNewStaff, setSaveAndAddNewStaff] = useState<boolean>(false);
    const [staffDetails, setStaffDetails] = useState<any>({
        info: "", 
        result: "",
        code: ""
    });
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
    }

    useEffect(() => {
        if(staffDetails?.info !== ""){
            handleEdit({...staffDetails?.info}, viewStaffData?.data?.id)
        }
    }, [staffDetails?.code]);

    useEffect(() => {
        if(!saveAndAddNewStaff && staffDetails?.result?.code === 200){
            setTimeout(() => {
                router.replace('/dashboard/dispatchers')
            }, 5000);
        }
    }, [staffDetails?.result]);
    
    return(
        <Holder>
            <ConstantNav />
            <Section>

            {
                (viewStaffIsLoading || viewStaffIsValidating) &&
                <Loader />
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
            <Link href="/dashboard/administrators" className="bg-gray-200 cursor-pointer rounded-full w-fit px-2 text-2xl font-bold ml-3 text-gray-900">
                    <i className="icon ion-md-arrow-back"></i>
            </Link>

            <Formik
                  initialValues={{
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
                  }}
                  validationSchema={Yup.object({
                    address: Yup.object({
                        state: Yup.string().required('This field is required.'),
                        street: Yup.string().required('This field is required.'),
                    }),
                    fullName: Yup.string()
                    .min(5, 'Name must be five characters or more.')
                    .required('This field is required.'),
                    email: Yup.string()
                    .email('This email address seems invalid.')
                    .required('This field is required.'),
                    phone: Yup.string()
                    .matches(phoneRegExp, 'Phone number is not valid')
                    .min(1, 'Must be 1 character or more.')
                    .required('This field is required.'),
                  })}
                  onSubmit={(values) => {
                    setSuccessMessage((prev: any) => ({...prev, editAdministrator: true}));
                    setStaffDetails((prev: any) => ({...prev, info: {...values}, code: Password(), result:""}));
                  }}
                  enableReinitialize = {true}
                >
                    {
                        ({ values, getFieldProps,  handleSubmit }) => (
                            <Hero formHeading={values.fullName} 
                            heading="Edit Staff Account" 
                            icon="icon ion-md-contact"
                            description={`${values.email} | ${values.phone}`}
                            comingsoon="Administrator">
                            <Form onSubmit={handleSubmit}>
                                <TextInput
                                label="Full Name"
                                type="text"
                                {...getFieldProps('fullName')}
                                />

                                <TextInput
                                label="Email Address"
                                type="email"
                                {...getFieldProps('email')}
                                />  

                                <TextInput
                                label="Phone"
                                type="tel"
                                {...getFieldProps('phone')}
                                /> 

                                <TextInput
                                label="State"
                                type="text"
                                {...getFieldProps('address.state')}
                                />

                                <TextInput
                                label="Address"
                                type="text"
                                placeholder="Enter Location"
                                {...getFieldProps('address.street')}
                                /> 
                                
                                <ToggleButton
                                title="Save & Update Administrator."
                                icon="icon ion-md-information-circle-outline"
                                handleOnOff={handleSaveAndAddNewAdministrator}
                                onOff={saveAndAddNewStaff}
                                description="Enable this if you want to edit more details on this administrator immediately after clicking on the save button."
                                />  

                                <Button
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