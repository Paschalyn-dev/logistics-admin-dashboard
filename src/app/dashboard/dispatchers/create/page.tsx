'use client'
import { useState, useContext, useEffect } from "react";
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
import { State_data } from "../../context/context";
import { staffAPIURL } from "../../services/api-url/staff-api-url";
import ErrorAndSucccessHandlers from "../../services/eventhandlers/error-and-success-handlers";

export default function FormPageDispatcher({handleOpenForm}: any){
    const {successMessage, setSuccessMessage} = useContext(State_data);
    const [saveAndAddNewRider, setSaveAndAddNewRider] = useState<boolean>(false);
    const [passwordString, setPasswordString] = useState<boolean>(true)
    const [generatePassword, setGeneratePassword] = useState<boolean>(true);
    const [dispatcherDetails, setDispatcherDetails] = useState<any>({
        info: "",
        result: ""
    });
    const router = useRouter();
    const handleSaveAndAddNewRider = (e: any) => {
        e.preventDefault();
        setSaveAndAddNewRider(!saveAndAddNewRider)
    }

    const handleAdministratorsPage = () => {
        router.replace('/dashboard/administrators/create')
    }

    async function handleCreate(details: any){
        const response = await fetch(staffAPIURL.createDispatcher, {
            method: 'POST',
            body: JSON.stringify(dispatcherDetails),
            headers: {
                "Content-Type": "application/json"
            },
        });
        const data = await response.json();
        setDispatcherDetails((prev: any) => ({...prev, result: data}))
    }

    useEffect(() => {
        if(dispatcherDetails?.info !== ''){
            handleCreate(dispatcherDetails?.info)
        }
    }, [dispatcherDetails?.info?.code])

    return(
        <Holder>
            <ConstantNav />
            <Section>   
            <Link href="/dashboard/dispatchers" className="bg-gray-200 cursor-pointer rounded-full w-fit px-2 text-2xl font-bold ml-3 text-gray-900">
                <i className="icon ion-md-arrow-back"></i>
            </Link>
            {
            dispatcherDetails.result !== "" && dispatcherDetails.info !== "" && 
            <ErrorAndSucccessHandlers
            name="createShipment"
            successName={successMessage.createShipment}
            message={dispatcherDetails?.result?.code} 
            code={dispatcherDetails?.info?.code}
            successmessage="Dispatcher successfully added to the list!"
            failedmessage="Sorry, dispatcher cannot be added to the list!"
            staffAndCustomer={dispatcherDetails?.result}
            error={dispatcherDetails?.result?.code !== 200}
            loading={dispatcherDetails?.result === "undefined" && dispatcherDetails?.info !== ""}
            data={dispatcherDetails?.result}
            />
          }
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
                        setSuccessMessage((prev: any) => ({...prev, createDispatcher: true}));
                        setDispatcherDetails((prev: any) => ({...prev, result:"", info: {...values, code: Password()}}));
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