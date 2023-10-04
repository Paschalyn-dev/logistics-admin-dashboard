'use client'
import { useState, useContext, useEffect } from "react";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useRouter } from "next/navigation";
import Holder from "@/app/dashboard/holder";
import ConstantNav from "@/app/dashboard/constantNav";
import Section from "@/app/dashboard/section";
import SuccessMessage from "@/app/dashboard/successmessage";
import { useViewDispatcher } from "@/app/dashboard/services/swr-functions/customer-swr";
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

export default function EditDispatchers({ params }: { params: {id: number}}){
    const {successMessage, setSuccessMessage} = useContext(State_data);
    const [saveAndAddNewRider, setSaveAndAddNewRider] = useState<boolean>(false);
    const [passwordString, setPasswordString] = useState<boolean>(true)
    const [generatePassword, setGeneratePassword] = useState<boolean>(true);
    const [dispatcherDetails, setDispatcherDetails] = useState<any>({
        info: "",
        result: "",
        code: ""
    });
    const {viewDispatcherData, 
        viewDispatcherError, 
        viewDispatcherIsLoading, 
        viewDispatcherIsValidating, 
        viewDispatcherMutate} = useViewDispatcher(params.id)
    
    const router = useRouter();
    const handleSaveAndAddNewRider = (e: any) => {
        e.preventDefault();
        setSaveAndAddNewRider(!saveAndAddNewRider)
    }
    
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
    }

    useEffect(() => {
        if(dispatcherDetails?.info !== ""){
          handleEdit({...dispatcherDetails?.info}, viewDispatcherData?.data?.id);
        }
    }, [dispatcherDetails?.code]);

    useEffect(() => {
        if(!saveAndAddNewRider && dispatcherDetails?.result?.code === 200){
            setTimeout(() => {
                router.replace('/dashboard/dispatchers')
            }, 5000);
        }
    }, [dispatcherDetails?.result])

    return(
        <Holder>
            <ConstantNav />
            <Section>

            {
                (viewDispatcherIsLoading || viewDispatcherIsValidating) &&
                <Loader />
            }     
            {
                dispatcherDetails.result !== "" && dispatcherDetails.info !== "" && dispatcherDetails?.code !== '' &&
                <ErrorAndSucccessHandlers
                name="editDispatcher"
                successName={successMessage.editDispatcher}
                message={dispatcherDetails?.result?.code} 
                code={dispatcherDetails?.info?.code}
                successmessage="Dispatcher details successfully updated!"
                failedmessage="Sorry, dispatcher details cannot be updated!"
                staffAndCustomer={dispatcherDetails?.result}
                error={dispatcherDetails?.result?.code !== 200}
                loading={dispatcherDetails?.result === "undefined" && dispatcherDetails?.info !== ""}
                data={dispatcherDetails?.result}
                />
            }

            <Link href="/dashboard/dispatchers" className="bg-gray-200 cursor-pointer rounded-full w-fit px-2 text-2xl font-bold ml-3 text-gray-900">
                <i className="icon ion-md-arrow-back"></i>
            </Link>

            <Formik
                  initialValues={{
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
                    insurance: viewDispatcherData?.data?.insurance,
                    isDefaultPassword: viewDispatcherData?.data?.isDefaultPassword,
                    licence: viewDispatcherData?.data?.licence,
                    misc: viewDispatcherData?.data?.misc,
                    parcels: viewDispatcherData?.data?.parcels,
                    personalWebsite: viewDispatcherData?.data?.personalWebsite,
                    phone: viewDispatcherData?.data?.phone,
                    rating: viewDispatcherData?.data?.rating,
                    roadWorthiness: viewDispatcherData?.data?.roadWorthiness,
                    role: viewDispatcherData?.data?.role,
                    socialProfiles: viewDispatcherData?.data?.socialProfiles,
                    updatedAt: viewDispatcherData?.data?.updatedAt,
                    vehicle: viewDispatcherData?.data?.vehicle
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
                    phone: Yup.number()
                    .min(1, 'Must be 1 character or more.')
                    .required('This field is required.'),
                  })}
                  onSubmit={(values) => {
                    setSuccessMessage((prev: any) => ({...prev, editDispatcher: true}));
                    setDispatcherDetails((prev: any) => ({...prev, code: Password(), result: "", info: {...values}}) );
                  }}
                  enableReinitialize={true}
                >
                    {
                        ({ values, handleSubmit, getFieldProps }) => (
                            <Hero formHeading={values.fullName} 
                            comingsoon="Rider" 
                            heading="Edit Rider Account" 
                            icon="icon ion-md-bicycle"
                            description={`${values.email} | ${values.phone}`}>
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

                                <SubHeading subheading="Documents" /> 

                                <div className="flex justify-between items-center flex-wrap">
                                    <UploadFile
                                    label = "License"
                                    type="file"
                                    {...getFieldProps('licence')}
                                    />

                                    <UploadFile
                                    label = "Vehicle"
                                    type="file"
                                    {...getFieldProps('vehicle')}
                                    />

                                    <UploadFile
                                    label = "Insurance"
                                    type="file"
                                    {...getFieldProps('insurance')}
                                    />

                                    <UploadFile
                                    label = "Roadworthiness"
                                    type="file"
                                    {...getFieldProps('roadWorthiness')}
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