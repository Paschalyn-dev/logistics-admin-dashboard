'use client'
import { useState, useContext, useEffect } from "react";
import { Formik, Form } from 'formik';
import Hero from "../../preferences/hero";
import * as Yup from 'yup';
import TextInput from "../../formik/inputtypes";
import Button from "../../button";
import ToggleButton from "../../preferences/shipment/toggleButton";
import Select from "../../formik/select";
import Link from "next/link";
import Holder from "../../holder";
import { useRouter } from "next/navigation";
import ConstantNav from "../../constantNav";
import Section from "../../section";
import { Password } from "../../formik/password";
import Loader from "../../services/Loader/spinner";
import { State_data, phoneRegExp } from "../../context/context";
import { staffAPIURL } from "../../services/api-url/staff-api-url";
import ErrorAndSucccessHandlers from "../../services/eventhandlers/error-and-success-handlers";

export default function FormPageAdministrators(){
    const {successMessage, setSuccessMessage} = useContext(State_data);
    const [saveAndAddNewStaff, setSaveAndAddNewStaff] = useState<boolean>(false);
    const [passwordString, setPasswordString] = useState<boolean>(true)
    const [staffDetails, setStaffDetails] = useState<any>({
        info: "",
        result: "",
        code: ""
    })
    const [generatePassword, setGeneratePassword] = useState<boolean>(true)
    const router = useRouter()

    const handleSaveAndAddNewStaff = (e: any) => {
        e.preventDefault();
        setSaveAndAddNewStaff(!saveAndAddNewStaff)
    }

    async function handleCreate(details: any){
        const response = await fetch(staffAPIURL.createStaff, {
            method: 'POST',
            body: JSON.stringify(details),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJyb2xlIjoic3VwZXJhZG1pbiIsImFsaWFzIjoiY2FrZW51cyJ9LCJpYXQiOjE2OTExODgzNDZ9.73G4_gAI_mexLVUYQOkaJN7XCaIj0iHqj5b2g9yYIa8"
            }
        });
        const data = await response.json();
        setStaffDetails((prev: any) => ({...prev, result: data}));
    }

    useEffect(() => {
        if(staffDetails?.info !== ""){
            handleCreate(staffDetails?.info)
        }
    }, [staffDetails?.code])

    useEffect(() => {
        if(staffDetails?.result?.code === 200){
            setTimeout(() => {
                router.replace('/dashboard/administrators')
            }, 5000);
        }
    }, [staffDetails?.result])

    const handleDispatcherPage = () => {
        router.replace('/dashboard/dispatchers/create')
    }
    return(
        <Holder>
            <ConstantNav />
            <Section>  
            <Link href="/dashboard/administrators" className="bg-gray-200 cursor-pointer rounded-full w-fit px-2 text-2xl font-bold ml-3 text-gray-900">
                    <i className="icon ion-md-arrow-back"></i>
            </Link>

            {
            staffDetails.result !== "" && staffDetails.info !== "" && 
            <ErrorAndSucccessHandlers
            name="createAdministrator"
            successName={successMessage.createAdministrator}
            message={staffDetails?.result?.code} 
            code={staffDetails?.info?.code}
            successmessage="Administrator successfully added to the list!"
            failedmessage="Sorry, administrator cannot be added to the list!"
            staffAndCustomer={staffDetails?.result}
            error={staffDetails?.result?.code !== 200}
            loading={staffDetails?.result === "undefined" && staffDetails?.info !== ""}
            data={staffDetails?.result}
            />
          }

            <Formik
                  initialValues={{
                    role:"admin",
                    address: {
                        city: "",
                        country: 'Nigeria',
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
                    phone: Yup.string()
                    .matches(phoneRegExp, 'Phone number is not valid')
                    .min(1, 'Must be 1 character or more.')
                    .required('This field is required.'),
                    password: Yup.string()
                    .required('No password provided.')
                    .min(8, 'Password is too short. It should be 8 characters or more')
                    .matches(/[a-zaA-z0-9]/, 'Password can only contain letters and numbers.'),
                  })}
                  onSubmit={async (values) => {
                    setSuccessMessage((prev: any) => ({...prev, createAdministrator: true}));
                    setStaffDetails((prev: any) => ({...prev, result: "", info: {...values}, code: Password()}));
                  }}
                >
                    {
                        ({ values, handleSubmit }) => (
                            <Hero formHeading={values.fullName} heading="Create Staff Account" icon="icon ion-md-contact">
                            <Form>
                                <Select name='role' label="Role" onChange={handleDispatcherPage}>
                                    <option value="administrator">Administrator</option>
                                    <option value="dispatcher">Dispatcher</option>
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


                            <button onClick={(e) => {e.preventDefault(); setGeneratePassword(!generatePassword)}} 
                                className={generatePassword ? "font-bold text-green-500 mb-5 " : "font-bold mb-5 text-gray-800"}>
                                {generatePassword ? "Default Password Generator is on." : "Click here to use the default password"}
                            </button>

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

                                <ToggleButton 
                                title="Save & Add New Staff."
                                icon="icon ion-md-information-circle-outline"
                                handleOnOff={handleSaveAndAddNewStaff}
                                onOff={saveAndAddNewStaff}
                                description="Enable this if you want to create a new rider immediately after creating this rider."
                                />  

                                <Button
                                handleClick={handleSubmit} 
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