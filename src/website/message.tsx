import { State_data } from "@/app/dashboard/context/context";
import { Password } from "@/app/dashboard/formik/password";
import Input from "@/app/dashboard/input";
import Label from "@/app/dashboard/preferences/website/label";
import DefaultInput from "@/app/dashboard/profile/input";
import Loader from "@/app/dashboard/services/Loader/spinner";
import { staffAPIURL } from "@/app/dashboard/services/api-url/staff-api-url";
import ErrorAndSucccessHandlers from "@/app/dashboard/services/eventhandlers/error-and-success-handlers";
import SuccessMessage from "@/app/dashboard/successmessage";
import { useContext, useEffect, useState } from "react";

export default function Message(){
    const [mywindow, setWindow] = useState<any>(0)
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const [formData, setFormData] = useState<any>({
      email: "",
      message: "",
      name: ""
    });
    const [error, setError] = useState(false);
    const {loading, setSuccessMessage, setLoading, successMessage} = useContext(State_data);
    const [message, setMessage] = useState<any>({
      info:  "",
      code: "",
      result: ""
    });

    const handleFieldValue = (event: any) => {
      setFormData((prev: any) => ({...prev, [event.target.name]: event.target.value}))
    }

    const handleSubmit = (e: any) => {
      e.preventDefault();
      if(formData.name !== "" && emailRegex.test(formData.email) && formData.message !== ""){
        setSuccessMessage((prev: any) => ({...prev, sendMessage: true}));
        setMessage((prev: any) => ({...prev, code: Password(), info: formData, result: ""}))
      }
      else{
        setSuccessMessage((prev: any) => ({...prev, sendMessageError: true}))
        setError(true);
      }
    }

    async function handleSendMessage(){
      const response = await fetch(staffAPIURL.sendMessage, {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
          "Content-Type": "application/json",
        },
    })
    const data = await response.json();
    setMessage((prev: any) => ({...prev, result: data}));
    setSuccessMessage((prev: any) => ({...prev, sendMessage: false}))
    setLoading((prev: any) => ({...prev, sendMessage: false}))
    }

    useEffect(() => {
      if(message.info !== ""){
        handleSendMessage()
      }
      if(message.info !== "" && message.result === ""){
        setLoading((prev: any) => ({...prev, sendMessage: true}))
      }
      
    },[message.code])

    useEffect(function onFirstMount() {
        function checkWidth(){
          setWindow(window.innerWidth);
        }
        window.addEventListener("resize", checkWidth);
        return () => window.removeEventListener('resize', checkWidth);
    });
    
      useEffect(() => {
        setWindow(window.innerWidth);
        setSuccessMessage((prev: any) => ({...prev, sendMessageError: false}))
      }, []);

    return(
        <div className="w-full my-20 flex flex-col items-center bg-gray-50 justify-center">
          {
            loading.sendMessage && <Loader />
          }
          {
            error && successMessage.sendMessageError &&
            <SuccessMessage 
            name="sendMessageError"
            successMessageShow={successMessage.sendMessageError}
            id="failed"
            messageTitle="Fill in the required fields correctly before submitting."
            />            
          }
          {
              message.result !== "" && message.info !== "" && 
              <ErrorAndSucccessHandlers
              name="sendMessage"
              successName={successMessage.sendMessage}
              message={message?.result?.code} 
              code={message?.info?.code}
              successmessage="Your message has been sent!"
              failedmessage="Sorry, your message was not sent!"
              staffAndCustomer={message?.result}
              error={message?.result?.code}
              data={message?.result}
              />
            }
            <div className="p-10">
                <h1 className="phone:text-2xl font-semibold" id={ mywindow > 760 ? "reviews" : ""}>Send Us A Message.</h1>
                <p className="mt-3 w-2/12 p-10 phone:text-sm tablet:text-lg">Do you have any complaints or message you wish to get across to us? Send it to us using the form below.</p>
                <form className="px-10 mt-10 text-left">
                    <Label htmlFor="name" text="Name" />
                    <DefaultInput name="name" type="text" onChange={handleFieldValue} value={formData.name}  />

                    <Label htmlFor="email" text="Email" />
                    <DefaultInput name="email" type="email" onChange={handleFieldValue} value={formData.email} />

                    <Label htmlFor="message" text="Message" />
                    <textarea className="w-full mt-2 mb-10 bg-gray-100 p-3 rounded-lg outline-0"  name="message" onChange={handleFieldValue} value={formData.message} />

                    <button onClick={handleSubmit} className="rounded-3xl bg-black text-gray-50 w-full p-3">Send</button>
                </form>
            </div>
        </div>
    )
}