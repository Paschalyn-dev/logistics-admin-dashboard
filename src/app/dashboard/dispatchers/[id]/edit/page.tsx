'use client'
import { useState } from "react";
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

export default function EditDispatchers({ params }: { params: {id: number}}){
    const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
    const [saveAndAddNewRider, setSaveAndAddNewRider] = useState<boolean>(false);
    const [passwordString, setPasswordString] = useState<boolean>(true)
    const [generatePassword, setGeneratePassword] = useState<boolean>(true);
    const [dispatcherDetails, setDispatcherDetails] = useState<any>();
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
    
    const handleAdministratorsPage = () => {
        router.replace('/dashboard/administrators/create')
    }
    return(
        <Holder>
            <ConstantNav />
            <Section>
            {/* {showSuccessMessage && createDispatcherData?.code === 200 && 
                    <SuccessMessage
                    messageTitle="Dispatcher has been successfully added to the list!" 
                    successMessageShow={showSuccessMessage} 
                    handleShowSuccessMessage={setShowSuccessMessage} 
                    />
                }

                {
                    createDispatcherError && showSuccessMessage &&
                    <SuccessMessage
                    successMessageShow={showSuccessMessage}
                    handleShowSuccessMessage={setShowSuccessMessage}
                    id="failed"
                    messageTitle="Dispatcher cannot be added. Check network connection!"
                    />
                }     

                {
                    createDispatcherData?.data !== 200 && showSuccessMessage &&
                    <SuccessMessage
                    successMessageShow={showSuccessMessage}
                    handleShowSuccessMessage={setShowSuccessMessage}
                    id="failed"
                    messageTitle="Sorry, Dispatcher cannot be added to the list!"
                    />
                }      */}
                
                {
                    (viewDispatcherIsLoading || viewDispatcherIsValidating) &&
                    <Loader />
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
                    setTimeout(() => {
                        setShowSuccessMessage(true);
                        setDispatcherDetails(values);
                    }, 1000);
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