'use client'
import { useState } from "react";
import { Formik, Form } from 'formik';
import SuccessMessage from "../../successmessage";
import Hero from "../../preferences/hero";
import SubHeading from "../../preferences/website/subheading";
import * as Yup from 'yup';
import { useRouter } from "next/navigation";
import TextInput from "../../formik/inputtypes";
import Button from "../../button";
import ToggleButton from "../../preferences/shipment/toggleButton";
import Select from "../../formik/select";
import UploadFile from "../../formik/file";
import Link from "next/link";
import Holder from "../../holder";
import ConstantNav from "../../constantNav";
import Section from "../../section";
import { Password } from "../../formik/password";
import { useCreateDispatcher } from "../../services/swr-functions/staff-swr";
import Loader from "../../services/Loader/spinner";

export default function FormPageDispatcher({handleOpenForm}: any){
    const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
    const [saveAndAddNewRider, setSaveAndAddNewRider] = useState<boolean>(false);
    const [passwordString, setPasswordString] = useState<boolean>(true)
    const [generatePassword, setGeneratePassword] = useState<boolean>(true);
    const [dispatcherDetails, setDispatcherDetails] = useState<any>();
    const {createDispatcherData, createDispatcherError, createDispatcherIsLoading, createDispatcherIsValidating, createDispatcherMutate} = useCreateDispatcher(dispatcherDetails)
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
            {showSuccessMessage && createDispatcherData?.code === 200 && 
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
                }     
                
                {
                    (createDispatcherIsLoading || createDispatcherIsValidating) &&
                    <Loader />
                }     
            <Link href="/dashboard/dispatchers" className="bg-gray-200 cursor-pointer rounded-full w-fit px-2 text-2xl font-bold ml-3 text-gray-900">
                <i className="icon ion-md-arrow-back"></i>
            </Link>

            <Formik
                  initialValues={{
                    address: {
                        city: "",
                        country: "Nigeria",
                        state: "",
                        street: ""
                    },
                    email: "",
                    fullName: "",
                    password: "",
                    phone: "",
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
                    password: Yup.string()
                    .required('No password provided.')
                    .min(8, 'Password is too short. It should be 8 characters or more')
                    .matches(/[a-zaA-z0-9]/, 'Password can only contain letters and numbers.')
                  })}
                  onSubmit={(values) => {
                    setTimeout(() => {
                        console.log(createDispatcherData)
                        setShowSuccessMessage(true);
                        setDispatcherDetails(values);
                    }, 1000);
                  }}
                >
                    {
                        ({ values, handleSubmit }) => (
                            <Hero formHeading={values.fullName} heading="Create Rider Account" icon="icon ion-md-bicycle">
                            <Form>
                                <Select label="Role" onChange={handleAdministratorsPage} name="role">
                                    <option value="dispatcher">Dispatcher</option>
                                    <option value="administrator">Administrator</option>
                                </Select>

                                <TextInput
                                label="Full Name"
                                name="fullName"
                                type="text"
                                />

                                <TextInput
                                label="Email Address"
                                name="email"
                                type="email"
                                />  

                                <TextInput
                                label="Phone"
                                name="phone"
                                type="tel"
                                /> 

                            {                               
                            !generatePassword ?
                                <TextInput
                                label="Password"
                                name="password"
                                id={generatePassword ? "password" : "defaultPassword"}
                                type={passwordString ? "password" : "text"}
                                handlePasswordString={setPasswordString}
                                stringPassword={passwordString} 
                                /> : 
                                <TextInput
                                label="Password"
                                name="password"
                                value={Password()}
                                id={generatePassword ? "password" : "defaultPassword"}
                                type={passwordString ? "password" : "text"}
                                handlePasswordString={setPasswordString}
                                stringPassword={passwordString} 
                                />
                            }


                            <button onClick={(e) => {e.preventDefault(); setGeneratePassword(!generatePassword)}} className={generatePassword ? "font-bold text-green-500 mb-5 " : "font-bold mb-5 text-gray-800"}>{generatePassword ? "Default Password Generator is on." : "Click here to use the default password"}</button>

                                <TextInput
                                label="State"
                                name="address.state"
                                type="text"
                                />

                                <TextInput
                                label="Address"
                                name="address.street"
                                type="text"
                                placeholder="Enter Location"
                                /> 

                                <SubHeading subheading="Documents" /> 

                                <div className="flex justify-between items-center flex-wrap">
                                    <UploadFile
                                    label = "License"
                                    name="license"
                                    type="file"
                                    />

                                    <UploadFile
                                    label = "Vehicle"
                                    name="vehicle"
                                    type="file"
                                    />

                                    <UploadFile
                                    label = "Insurance"
                                    name="insurance"
                                    type="file"
                                    />

                                    <UploadFile
                                    label = "Roadworthiness"
                                    name="roadworthiness"
                                    type="file"
                                    />
                                
                                </div>

                                <ToggleButton 
                                title="Save & Add New Customer."
                                icon="icon ion-md-information-circle-outline"
                                handleOnOff={handleSaveAndAddNewRider}
                                onOff={saveAndAddNewRider}
                                description="Enable this if you want to create a new rider immediately after creating this rider."
                                />  

                                <Button
                                handleClick={handleSubmit}
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