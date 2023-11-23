'use client'
import { useState, useContext, useEffect, useRef, useCallback } from "react";
import { Formik, Form } from 'formik';
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
import { authorizationKey } from "../../services/staff-api/api";
import Loader from "../../services/Loader/spinner";
import SuccessMessage from "../../successmessage";

export default function FormPageDispatcher({handleOpenForm}: any){
    const {successMessage, setSuccessMessage, loading, setLoading} = useContext(State_data);
    const [saveAndAddNewRider, setSaveAndAddNewRider] = useState<boolean>(false);
    const [passwordString, setPasswordString] = useState<boolean>(true);
    const formRef = useRef<any>();
    const [code, setCode] = useState('');
    const [generatePassword, setGeneratePassword] = useState<boolean>(false);
    const [windowLocation, setWindowLocations] =useState<any>('')
    const [dispatcherDetails, setDispatcherDetails] = useState<any>({
        info: "",
        result: "",
        code: ""
    });
    const router = useRouter();
    const handleSaveAndAddNewRider = (e: any) => {
        e.preventDefault();
        setSaveAndAddNewRider(!saveAndAddNewRider)
    }
    
    const updateDispatcherInformation = useCallback((value: string) => {
        formRef.current?.setFieldValue('password', value);
        setTimeout(() => {formRef?.current?.setFieldTouched('password', true)}, 1000)
    }, [ formRef.current?.values, generatePassword]);

    useEffect(()=>{
        setCode(Password())
    }, [])
    
    useEffect(() => {
        if(generatePassword === true){
            updateDispatcherInformation(code)
        }
        else{
            updateDispatcherInformation('')
        }
    }, [generatePassword])

    const handleIsNotValid = () => {
        setSuccessMessage((prev: any) => ({...prev, isNotValid: true}))
    }

    const handleAdministratorsPage = () => {
        router.replace('/dashboard/administrators/create')
    }

    async function handleCreate(details: any){
        const response = await fetch(staffAPIURL.createDispatcher, {
            method: 'POST',
            body: JSON.stringify(details),
            headers: {
                "Content-Type": "application/json",
                "Authorization": authorizationKey
    
            },
        });
        const data = await response.json();
        setDispatcherDetails((prev: any) => ({...prev, result: data}));
        setLoading((prev: any) => ({...prev, dispatcher: false}))
    }

    
    useEffect(() => {
        if(dispatcherDetails?.result === "" && dispatcherDetails?.info !== ""){
            setLoading((prev: any) => ({...prev, dispatcher: true}))
        }
        if(dispatcherDetails?.info !== ""){
            handleCreate({...dispatcherDetails?.info});
        }
    }, [dispatcherDetails?.code]);
    
    useEffect(() => {
        setLoading((prev: any) => ({...prev, dispatcher: false}))
        setSuccessMessage((prev: any) => ({...prev, isNotValid: false}))
    },[])
    
    useEffect(() => {
        if(!saveAndAddNewRider && dispatcherDetails?.result?.code === 200){
            setTimeout(() => {
                if(windowLocation?.location?.pathname === `/dashboard/dispatchers/create`){
                    router.replace('/dashboard/dispatchers')
                }else{}
            }, 5000);
        }
    }, [dispatcherDetails?.result, windowLocation?.location?.pathname]);

    useEffect(() => {
        if(typeof window !== 'undefined'){
            setWindowLocations(window)
        }
    },[typeof window !== 'undefined'])
    
    return(
        <Holder>
            {
                loading.dispatcher && <Loader />
            }
            <ConstantNav />
            <Section>
            {
                dispatcherDetails.result !== "" && dispatcherDetails.info !== "" && 
                <ErrorAndSucccessHandlers
                name="createDispatcher"
                successName={successMessage.createDispatcher}
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
            {
                successMessage.isNotValid && 
                <SuccessMessage
                id="failed"
                name="isNotValid"
                messageTitle="You have not filled all the required form fields."
                successMessageShow={successMessage.isNotValid}
                />
            }
            <Link href="/dashboard/dispatchers" className="bg-gray-200 cursor-pointer rounded-full w-fit px-2 text-2xl font-bold ml-3 text-gray-900">
                <i className="icon ion-md-arrow-back"></i>
            </Link>

            <Formik
                  innerRef={(ref) => formRef.current = ref}
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
                    .min(1, 'Name must be five characters or more.')
                    .required('This field is required.'),
                    email: Yup.string()
                    .email('This email address seems invalid.')
                    .required('This field is required.'),
                    phone: Yup.number()
                    .min(1, 'Must be 1 character or more.')
                    .required('This field is required.'),
                    password: Yup.string()
                    .min(8, 'Password is too short. It should be 8 characters or more')
                    .matches(/[a-zaA-z0-9]/, 'Password can only contain letters and numbers.')
                  })}
                  onSubmit={(values) => {
                    setDispatcherDetails((prev: any) => ({...prev, result: "", info: {...values}, code: Password()}));
                    setSuccessMessage((prev: any) => ({...prev, createDispatcher: true}));
                }}
                validateOnMount={true}
                >
                    {
                        ({ values, handleSubmit, isValid }) => (
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
                              
                                <TextInput
                                label="Password"
                                name="password"
                                id={"password"}
                                type={passwordString ? "password" : "text"}
                                handlePasswordString={setPasswordString}
                                stringPassword={passwordString} 
                                /> 

                               <div onClick={(e) => {e.preventDefault(); setGeneratePassword(!generatePassword)}} className={generatePassword ? "font-bold cursor-pointer text-green-500 mb-5 " : "font-bold cursor-pointer mb-5 text-gray-800"}>{generatePassword ? "Default Password Generator is on." : "Default password generator is off"}</div>

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
                                handleClick={() => { isValid ? () => handleSubmit() : handleIsNotValid()}}
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