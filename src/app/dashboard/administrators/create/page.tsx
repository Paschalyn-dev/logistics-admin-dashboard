'use client'
import { useState, useContext, useEffect, useRef, useCallback } from "react";
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
import SuccessMessage from "../../successmessage";

export default function FormPageAdministrators(){
    const {successMessage, setSuccessMessage, setLoading, loading} = useContext(State_data);
    const [saveAndAddNewStaff, setSaveAndAddNewStaff] = useState<boolean>(false);
    const [passwordString, setPasswordString] = useState<boolean>(true)
    const [windowLocation, setWindowLocations] =useState<any>('')
    const formRef = useRef<any>();
    const [code, setCode] = useState('');
    const [staffDetails, setStaffDetails] = useState<any>({
        info: "",
        result: "",
        code: ""
    })
    const [generatePassword, setGeneratePassword] = useState<boolean>(false)
    const router = useRouter()
    
    const handleSaveAndAddNewStaff = (e: any) => {
        e.preventDefault();
        setSaveAndAddNewStaff(!saveAndAddNewStaff)
    }
    const handleDispatcherPage = () => {
        router.replace('/dashboard/dispatchers/create')
    }
    const updateAdministratorInformation = useCallback((value: string) => {
        formRef.current?.setFieldValue('password', value);
        setTimeout(() => {formRef?.current?.setFieldTouched('password', true)}, 100)
    }, [ formRef.current?.values, generatePassword]);

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
        setLoading((prev: any) => ({...prev, administrator: false}))
    }
    const [isNotValid, setIsNotValid] = useState('');

    const handleIsNotValid = () => {
            setIsNotValid(Password())
            setSuccessMessage((prev: any) => ({...prev, isNotValid: false}))
    }
    
    useEffect(() => {
        setSuccessMessage((prev: any) => ({...prev, isNotValid: true}))
    }, [isNotValid])
    
    useEffect(() => {
        if(staffDetails?.info !== ""){
            handleCreate(staffDetails?.info)
        }
    }, [staffDetails?.code])

    useEffect(() => {
        setLoading((prev: any) => ({...prev, administrator: false}))
        setSuccessMessage((prev: any) => ({...prev, isNotValid: false}))
        setCode(Password())
        if(formRef?.current?.values?.password?.length){
            setTimeout(() => {formRef?.current?.setFieldTouched('password', true)}, 100)
        }
    },[])

    useEffect(() => {
        if(staffDetails?.result === "" && staffDetails?.info !== ""){
            setLoading((prev: any) => ({...prev, administrator: true}))
        }
        if(staffDetails?.info !== ""){
            handleCreate({...staffDetails?.info});
        }
    }, [staffDetails?.code]);
    
    useEffect(() => {
        if(generatePassword === true){
            updateAdministratorInformation(code)
        }
        else{
            updateAdministratorInformation(formRef?.current?.values?.password)
        }
    }, [generatePassword, formRef?.current?.values?.password])

    useEffect(() => {
        if(!saveAndAddNewStaff && staffDetails?.result?.code === 200){
            setTimeout(() => {
                if(windowLocation?.location?.pathname === `/dashboard/administrators/create`){
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

          {
                successMessage.isNotValid && 
                <SuccessMessage
                id="failed"
                name="isNotValid"
                messageTitle="You have not filled all the required form fields."
                successMessageShow={successMessage.isNotValid}
                />
            }

            <Formik
                  innerRef={(ref) => formRef.current = ref}
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
                    .min(1, 'Name must be one character or more.')
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
                        ({ values, isValid, errors, handleSubmit }) => (
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

                                <TextInput
                                label="Password"
                                name="password"
                                id={"password"}
                                type={passwordString ? "password" : "text"}
                                handlePasswordString={setPasswordString}
                                stringPassword={passwordString} 
                                /> 


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
                                type='submit'
                                handleClick={() => { isValid && !Object.keys(errors).length ? () => handleSubmit() : handleIsNotValid()}} 
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