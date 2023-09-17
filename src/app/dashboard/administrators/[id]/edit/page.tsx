'use client'
import { useState, useContext } from "react";
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

export default function editAdministrators({ params }: { params: {id: number}}){
    const {successMessage, setSuccessMessage} = useContext(State_data);
    const [saveAndAddNewStaff, setSaveAndAddNewStaff] = useState<boolean>(false);
    const [staffDetails, setStaffDetails] = useState<any>()
    const {viewStaffData, 
           viewStaffError,
           viewStaffIsLoading,
           viewStaffIsValidating,
           viewStaffMutate} = useViewStaff(params.id);
    return(
        <Holder>
            <ConstantNav />
            <Section>
                {/* {showSuccessMessage && createStaffData?.code === 200 && 
                    <SuccessMessage 
                    messageTitle="Administrator has been successfully added to the list!" 
                    successMessageShow={showSuccessMessage} 
                    handleShowSuccessMessage={setShowSuccessMessage} 
                    />
                }

                {
                    createStaffError && showSuccessMessage &&
                    <SuccessMessage
                    successMessageShow={showSuccessMessage}
                    handleShowSuccessMessage={setShowSuccessMessage}
                    id="failed"
                    messageTitle="Administrator cannot be added. Check network connection!"
                    />
                }     

                {
                    createStaffData?.data !== 200 && showSuccessMessage &&
                    <SuccessMessage
                    successMessageShow={showSuccessMessage}
                    handleShowSuccessMessage={setShowSuccessMessage}
                    id="failed"
                    messageTitle="Sorry, adminstrator cannot be added to the list!"
                    />
                }      */}
                
                {
                    (viewStaffIsLoading || viewStaffIsValidating) &&
                    <Loader />
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
                    setTimeout(() => {
                        setSuccessMessage((prev: any) => ({...prev, editAdministrator: true}));
                        setStaffDetails(values);
                    }, 1000);
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