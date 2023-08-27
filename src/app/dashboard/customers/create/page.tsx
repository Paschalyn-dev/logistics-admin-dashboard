'use client'
import { useState } from "react";
import { Formik, Form } from 'formik';
import SuccessMessage from "../../successmessage";
import Hero from "../../preferences/hero";
import SubHeading from "../../preferences/website/subheading";
import * as Yup from 'yup';
import TextInput from "../../formik/inputtypes";
import Button from "../../button";
import ToggleButton from "../../preferences/shipment/toggleButton";
import Link from "next/link";
import Holder from "@/app/dashboard/holder";
import ConstantNav from "@/app/dashboard/constantNav";
import Section from "@/app/dashboard/section";
import { useCreateCustomer } from "../../services/swr-functions/staff-swr";
import { staffStore } from "../../services/store/store";
import { useRouter } from "next/navigation";
import Loader from "../../services/Loader/spinner";

export default function FormPageCustomers(){
    const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
    const [saveAndAddNewCustomer, setSaveAndAddNewCustomer] = useState<boolean>(false);
    const [customerDetails, setCustomerDetails] = useState<any>();
    const {createCustomerData, createCustomerMutate, createCustomerIsLoading, createCustomerIsValidating, createCustomerError} = useCreateCustomer(customerDetails);
    let router = useRouter();
    console.log(staffStore)

    const handleSaveAndAddNewCustomer = (e: any) => {
        e.preventDefault();
        setSaveAndAddNewCustomer(!saveAndAddNewCustomer)
    }
    return(
        <Holder>
          <ConstantNav />
          <Section>
           {showSuccessMessage && createCustomerData.code === 200 &&
           <SuccessMessage 
           messageTitle="Customer has been successfully added to the list." 
            successMessageShow={showSuccessMessage} 
            handleShowSuccessMessage={setShowSuccessMessage} 
           />
           }
          
          {showSuccessMessage && createCustomerData.code !== 200 &&
           <SuccessMessage 
           id="failed"
           messageTitle="Sorry! Customer cannot be added to the list!" 
            successMessageShow={showSuccessMessage} 
            handleShowSuccessMessage={setShowSuccessMessage} 
           />
           }

          {showSuccessMessage && createCustomerError && 
           <SuccessMessage 
           messageTitle="Error occured! Check your network connection." 
           id='failed'
            successMessageShow={showSuccessMessage} 
            handleShowSuccessMessage={setShowSuccessMessage} 
           />
           }

           {
             (createCustomerIsLoading || createCustomerIsValidating) && 
             <Loader />
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
                    name: Yup.string().min(5, 'Name must be five characters or more.')
                    .required('Required'),
                    email: Yup.string().email('This email address seems invalid.')
                    .required('Required'),
                    phone: Yup.number().min(1, 'Must be 1 character or more.')
                    .required('Required'),
                    address: Yup.string()
                    .required('Required'),
                  })}
                  onSubmit={async (values) => {
                    setTimeout(() => {
                        console.log(customerDetails, createCustomerData)
                        setCustomerDetails(values)
                        setShowSuccessMessage(true);
                        if(!saveAndAddNewCustomer && createCustomerData.code === 200){
                          let timer = setTimeout(() => {
                              router.replace('/dashboard/customers')
                          }, 6000);
                        }
                    }, 1000);
                  }}
                >

{             ({values, handleSubmit}) => (   
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
                         handleClick={handleSubmit} 
                         buttonName="Save" />
                    </Form>
                    </Hero>)}
                </Formik>
            </Section>
        </Holder>
    )
}