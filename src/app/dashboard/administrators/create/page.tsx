'use client'
import { useState, useContext } from "react";
import { Formik, Form } from 'formik';
import SuccessMessage from "../../successmessage";
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
import { useCreateStaff } from "../../services/swr-functions/staff-swr";
import Loader from "../../services/Loader/spinner";
import { State_data, phoneRegExp } from "../../context/context";

export default function FormPageAdministrators(){
    const {successMessage, setSuccessMessage} = useContext(State_data);
    const [saveAndAddNewStaff, setSaveAndAddNewStaff] = useState<boolean>(false);
    const [passwordString, setPasswordString] = useState<boolean>(true)
    const [staffDetails, setStaffDetails] = useState<any>()
    const [generatePassword, setGeneratePassword] = useState<boolean>(true)
    const {createStaffData, createStaffMutate, createStaffError, createStaffIsLoading, createStaffIsValidating} = useCreateStaff(staffDetails);
    const router = useRouter()

    const handleSaveAndAddNewStaff = (e: any) => {
        e.preventDefault();
        setSaveAndAddNewStaff(!saveAndAddNewStaff)
    }

    const handleDispatcherPage = () => {
        router.replace('/dashboard/dispatchers/create')
    }
    return(
        <Holder>
            <ConstantNav />
            <Section>
                {successMessage.createAdministrator && createStaffData?.code === 200 && 
                    <SuccessMessage 
                    messageTitle="Administrator has been successfully added to the list!" 
                    successMessageShow={successMessage.createAdministrator} 
                    name="createAdministrator"
                    />
                }

                {
                    createStaffError && successMessage.createAdministrator &&
                    <SuccessMessage
                    successMessageShow={successMessage.createAdministrator}
                    name="createAdministrator"
                    id="failed"
                    messageTitle="Administrator cannot be added. Check network connection!"
                    />
                }     

                {
                    createStaffData?.data !== 200 && successMessage.createAdministrator &&
                    <SuccessMessage
                    successMessageShow={successMessage.createAdministrator}
                    name="createAdministrator"
                    id="failed"
                    messageTitle="Sorry, adminstrator cannot be added to the list!"
                    />
                }     
                
                {
                    (createStaffIsLoading || createStaffIsValidating) &&
                    <Loader />
                }     
            <Link href="/dashboard/administrators" className="bg-gray-200 cursor-pointer rounded-full w-fit px-2 text-2xl font-bold ml-3 text-gray-900">
                    <i className="icon ion-md-arrow-back"></i>
            </Link>

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
                  onSubmit={(values) => {
                    setTimeout(() => {
                        setSuccessMessage((prev: any) => ({...prev, createAdministrator: true}));
                        setStaffDetails(values);
                        createStaffMutate();
                    }, 1000);
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