'use client'
import { useState, useContext, useEffect } from "react";
import { Formik, Form } from 'formik';
import Hero from "../../preferences/hero";
import * as Yup from 'yup';
import TextInput from "../../formik/inputtypes";
import Button from "../../button";
import ToggleButton from "../../preferences/shipment/toggleButton";
import Link from "next/link";
import Holder from "@/app/dashboard/holder";
import ConstantNav from "@/app/dashboard/constantNav";
import Section from "@/app/dashboard/section";
import { useRouter } from "next/navigation";
import { State_data } from "../../context/context";
import { staffAPIURL } from "../../services/api-url/staff-api-url";
import { authorizationKey } from "../../services/staff-api/api";
import { Password } from "../../formik/password";
import ErrorAndSucccessHandlers from "../../services/eventhandlers/error-and-success-handlers";
import Loader from "../../services/Loader/spinner";
import SuccessMessage from "../../successmessage";

export default function FormPageCustomers(){
  const {successMessage, setSuccessMessage, loading, setLoading} = useContext(State_data);
  const [saveAndAddNewCustomer, setSaveAndAddNewCustomer] = useState<boolean>(false);
  const [windowLocation, setLocationWindow] = useState<any>('');
  const [customerDetails, setCustomerDetails] = useState<any>({
    info: "",
    result: "",
    code: ""
  });
  let router = useRouter();
  const handleSaveAndAddNewCustomer = (e: any) => {
    e.preventDefault();
    setSaveAndAddNewCustomer(!saveAndAddNewCustomer)
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
      setLocationWindow(window)
  }, [typeof window !== 'undefined']);
    
    async function handleCreate(details: any){
      const response = await fetch(staffAPIURL.createCustomer, {
        method: 'POST',
        body: JSON.stringify(details),
        headers: {
          "Content-Type": "application/json",
          "Authorization":  authorizationKey
        },
      });
      const data = await response.json();
      setCustomerDetails((prev: any) => ({...prev, result: data}));
      setSuccessMessage((prev: any) => ({...prev, isNotValid: false}))
      setLoading((prev: any) => ({...prev, customer: false}))
    }
    
    useEffect(() => {
      if(customerDetails?.result === "" && customerDetails?.info !== ""){
        setLoading((prev: any) => ({...prev, customer: true}))
    }  
      if(customerDetails?.info !== ""){
        handleCreate(customerDetails?.info);
      }
    }, [customerDetails?.code]);

    useEffect(() => {
      if(!saveAndAddNewCustomer && customerDetails?.result?.code === 200){
          setTimeout(() => {
            if(windowLocation?.location?.pathname === `/dashboard/customers/create`){
              router.replace('/dashboard/customers')
            }
            else{}
          }, 5000);
      }
  }, [customerDetails?.result, windowLocation?.location?.pathname])

  useEffect(() => {
    setSuccessMessage((prev: any) => ({...prev, isNotValid: false}))
},[])



    return(
        <Holder>
          {
            loading.customer && <Loader />
          }
          <ConstantNav />
          <Section>
          {
            customerDetails.result !== "" && customerDetails.info !== "" && 
            <ErrorAndSucccessHandlers
            name="createCustomer"
            successName={successMessage.createCustomer}
            message={customerDetails?.result?.code} 
            code={customerDetails?.info?.code}
            successmessage="Customer successfully added to the list!"
            failedmessage="Sorry, customer cannot be added to the list!"
            staffAndCustomer={customerDetails?.result}
            error={customerDetails?.result?.code !== 200}
            data={customerDetails?.result}
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

           <Link href="/dashboard/customers">
                <div className="bg-gray-200 cursor-pointer rounded-full w-fit px-2 text-2xl font-bold ml-3 text-gray-900">
                      <i className="icon ion-md-arrow-back"></i>
                </div>
           </Link>
                <Formik
                  initialValues={{
                    email: "",
                    address: "",
                    name: "",
                    phone: "",
                  }}
                  validationSchema={Yup.object({
                    name: Yup.string().min(1, 'Name must be one character or more.')
                    .required('This field is required.'),
                    email: Yup.string().email('This email address seems invalid.')
                    .required('This field is required.'),
                    phone: Yup.number().min(1, 'Must be 1 character or more.')
                    .required('This field is required.'),
                    address: Yup.string()
                    .required('This field is required.'),
                  })}
                  onSubmit={async (values) => {
                      setCustomerDetails((prev: any) => ({...prev, result: "", info: {...values}, code: Password()}))
                      setSuccessMessage((prev: any) => ({...prev, createCustomer: true}));
                  }}
                  validateOnMount={true}
                >

{             ({values, errors, handleSubmit, isValid}) => (   
              <Hero formHeading={values.name} heading="New Customer" icon="icon ion-md-contact">
             
                    <Form>
                        <TextInput
                        label="Name"
                        name="name"
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
                        label="Address"
                        name="address"
                        type="text"
                        placeholder="Enter Location"
                         /> 

                        <ToggleButton 
                        title="Save & Add New Customer."
                        icon="icon ion-md-information-circle-outline"
                        handleOnOff={handleSaveAndAddNewCustomer}
                        onOff={saveAndAddNewCustomer}
                        description="Enable this if you want to create a new customer immediately after creating this customer."
                        />
                                   
                         <Button 
                         handleClick={() => {isValid && !Object.keys(errors).length ? () => handleSubmit() :  handleIsNotValid()}} 
                         type='submit'
                         buttonName="Save" />
                    </Form>
                    </Hero>)}
                </Formik>
            </Section>
        </Holder>
    )
}