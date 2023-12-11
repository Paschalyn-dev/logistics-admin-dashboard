'use client'
import { useContext, useEffect, useState } from "react";
import Heading from "../heading";
import Holder from "../holder";
import HomeNav from "../home/homenav";
import Section from "../section";
import { Password } from "../formik/password";
import { useGetBusiness } from "../services/swr-functions/customer-swr";
import { logout } from "../services/libs/staff-auth";
import { customerLogout } from "../services/libs/customer-auth";
import { useRouter } from "next/navigation";
import SubHeading from "../preferences/website/subheading";
import Link from "next/link";
import EditHeading from "../editHeading";
import MiniText from "../minitext";
import Label from "../preferences/website/label";
import Input from "./input";
import DefaultInput from "./input";
import Button from "../button";
import { State_data } from "../context/context";
import { staffAPIURL } from "../services/api-url/staff-api-url";
import { authorizationKeyCustomer } from "../services/customer-api/api";
import Loader from "../services/Loader/spinner";
import ErrorAndSucccessHandlers from "../services/eventhandlers/error-and-success-handlers";
import { customerAPIUrl } from "../services/api-url/customer-api-url";
import SkeletonLoading from "../services/eventhandlers/skeleton-loading";

export default function Profile(){
    const [imageSRC, setImageSRC] = useState<any>('')
    const router = useRouter();
    const [formDataUpdate, setFormDataUpdate] = useState<any>({
        info: "",
        code: "",
        result: ""
    })
    const {successMessage, setLoading, loading, setSuccessMessage} = useContext(State_data)
    const [uploadFile, setUploadFile] = useState<any>({
        info: "",
        result: "",
        code: ""
    })
    const [passwordName, setPassWordName] = useState('');
    function handleSignOut(){
        logout();
        customerLogout();
        router.replace('/');
    }
    const [password, setPassword] = useState<any>({
        newPassword: "",
        oldPassword: "",
        role: ""
    })
    const [passwordUpdate, setPasswordUpdate] = useState<any>({
        info: "",
        code: "",
        result: ""
    })
    const {getBusinessData, getBusinessError, getBusinessIsLoading, getBusinessIsValidating, getBusinessMutate} = useGetBusiness();
    const [formData, setFormData] = useState<any>({
        address: {
            street: "",
            city: "",
            state: "",
            country: ""
        },
        createdAt: "",
        email: "",
        fullName: "",
        id: "",
        image: null,
        isDefaultPassword: false,
        onboarded: false,
        phone: "",
        role: "",
        updatedAt: ""
    })
    useEffect(() => {
        if(getBusinessData?.data){
            setFormData((prev: any) => ({
                ...prev,
                address: {
                    street: getBusinessData?.data?.address?.street || "",
                    city: "",
                    state: "",
                    country: ""
                },
                createdAt: getBusinessData?.data?.createdAt || "",
                email: "claence.emy@gmail.com",
                fullName: getBusinessData?.data?.title || "",
                id: 1,
                image: getBusinessData?.data?.image || null,
                isDefaultPassword: getBusinessData?.data?.isDefaultPassword || false,
                onboarded: getBusinessData?.data?.onboarded || false,
                phone: getBusinessData?.data?.phone || "",
                role: getBusinessData?.data?.role || "superadmin",
                updatedAt: getBusinessData?.data?.updatedAt || ""
            }))
            setPassword((prev: any) => ({...prev, role: getBusinessData?.data?.role || 'superadmin'}))
        }
    }, [getBusinessData?.data])

    const handleFormData = (event: any) => {
        const {name, value} = event.target;
        setFormData((prev: any) => { 
            return {...prev, [name]: value}
        })
    }
    const handlePassword = (event: any) => {
        const {name, value} = event.target;
        setPassword((prev: any) => { 
            return {...prev, [name]: value}
        })
    }

    const handlePasswordUpdate = () => {
        setPasswordUpdate((prev: any) => ({...prev, code: Password(), info: password, result: ""}))
        setSuccessMessage((prev: any) => ({...prev, passwordUpdate: false}))
    }

    const handleInnerFormData = (event: any) => {
        const {name, value} = event.target;
        setFormData((prev: any) => { 
            return {...prev, address: {...formData.address, [name]: value}}
        })
    }

    const handleProfileUpdate = () => {
        setFormDataUpdate((prev: any) => ({...prev, code: Password(), info: formData, result: ""}))
        setSuccessMessage((prev: any) => ({...prev, profileUpdate: false}))
    }

    async function passwordUpdateFetcher(profileDetails: any) {
        const response = await fetch(staffAPIURL.changePassword, {
            method: 'PUT',
            body: JSON.stringify(profileDetails),
            headers: {
                "Content-Type": "application/json",
                'Authorization': authorizationKeyCustomer
            }
        });
        const data = await response.json();    
        setPasswordUpdate((prev: any) => ({...prev, result: data}))
        setSuccessMessage((prev: any) => ({...prev, passwordUpdate: true}))
        setLoading((prev: any) => ({...prev, passwordUpdate: false}))
    }

    async function profileUpdateFetcher(profileDetails: any) {
        const response = await fetch(customerAPIUrl.updateProfile(1), {
            method: 'PUT',
            body: JSON.stringify(profileDetails),
            headers: {
                "Content-Type": "application/json",
                'Authorization': authorizationKeyCustomer
            }
        });
        const data = await response.json();    
        setFormDataUpdate((prev: any) => ({...prev, result: data}))
        setSuccessMessage((prev: any) => ({...prev, profileUpdate: true}))
        setLoading((prev: any) => ({...prev, profileUpdate: false}))
    }

    useEffect(() => {
        if(passwordUpdate?.info !== "" && passwordUpdate?.result === ""){
            setLoading((prev: any) => ({...prev, passwordUpdate: true}))
        }
        if(passwordUpdate?.info !== ""){
            passwordUpdateFetcher(passwordUpdate?.info)
        }
    },[passwordUpdate?.code])

    useEffect(() => {
        if(formDataUpdate?.info !== "" && formDataUpdate?.result === ""){
            setLoading((prev: any) => ({...prev, profileUpdate: true}))
        }
        if(formDataUpdate?.info !== ""){
            profileUpdateFetcher(formDataUpdate?.info)
        }
    },[formDataUpdate?.code])

    return(
        <Holder>
            {
                getBusinessIsLoading || getBusinessIsValidating &&
                <SkeletonLoading title="profile details..." loadingSearching="Loading" />
            }
            {
                loading.passwordUpdate || loading.profileUpdate && <Loader />
            }
            {  passwordUpdate.info !== "" && passwordUpdate.result !== "" &&
                <ErrorAndSucccessHandlers
                name="passwordUpdate"
                successName={successMessage.passwordUpdate}
                message={passwordUpdate?.result?.code} 
                code={passwordUpdate?.code}
                successmessage="Your password has been updated!"
                failedmessage="Sorry, your password cannot be updated!" 
                staffAndCustomer={passwordUpdate?.result}
                error={passwordUpdate?.result?.code !== 200}
                loading={passwordUpdate?.result === "" && passwordUpdate?.info !== "" && passwordUpdate?.code !== ""}
                data={passwordUpdate?.result}
                />
            }
            {  formDataUpdate.info !== "" && formDataUpdate.result !== "" &&
                <ErrorAndSucccessHandlers
                name="profileUpdate"
                successName={successMessage.profileUpdate}
                message={formDataUpdate?.result?.code} 
                code={formDataUpdate?.code}
                successmessage="Your profile has been updated!"
                failedmessage="Sorry, your profile cannot be updated!" 
                staffAndCustomer={formDataUpdate?.result}
                error={formDataUpdate?.result?.code !== 200}
                loading={formDataUpdate?.result === "" && formDataUpdate?.info !== "" && formDataUpdate?.code !== ""}
                data={formDataUpdate?.result}
                />
            }
            <HomeNav />
            <Section>
                <Link href="/dashboard/home/overview">
                    <div className="bg-gray-200 cursor-pointer rounded-full mt-5 mb-10 font-bold w-fit px-4 py-2 text-2xl font-bold ml-3 text-gray-900">
                        <i className="icon ion-md-arrow-back"></i>
                    </div>
                </Link>
                <div className="bg-gray-50 mt-5 p-5 rounded-2xl w-full relative h-full">
                    <div className="flex phone:flex-col laptop:gap-10 phone:text-center phone:justify-center laptop:justify-start laptop:flex-row phone:items-center laptop:items-center w-full h-fit">
                        <div>
                            <span className="rounded-full relative flex justify-center items-center p-1">
                                <img className={uploadFile?.info ? "rounded-full brightness-50 bg-gray-200/40 p-1 shadow h-40 w-40" : "rounded-full h-40 w-40 bg-gray-200/40 p-1 shadow"} title={uploadFile?.info} src={uploadFile?.info ? imageSRC : getBusinessData?.data?.image} alt="logo" />
                                {uploadFile?.info && <button onClick={() => setUploadFile((prev: any) => ({...prev, code: Password()}))} className='absolute bg-green-700 p-1 rounded-xl text-gray-50 hover:bg-green-800 left-14'>Upload</button>}
                            </span>
                        <span className="relative w-full flex justify-center gap-20 items-center bottom-10">             
                        <span title={uploadFile?.info} className="relative rounded-full shadow h-fit cursor-pointer bg-gray-50 w-6">
                                <label title={uploadFile?.info} className=" cursor-pointer rounded-full" htmlFor="upload">
                                    <i className="icon ion-md-camera"></i>
                                </label>
                                <input id='upload' name='upload' accept="image/*" type="file" className="absolute w-0 z-1 top-10 left-10 text-sm text-gray-50" />
                            </span> 
                            <button className="rounded-full shadow h-fit bg-gray-50 w-6">
                                <i className="icon ion-md-close"></i>
                            </button>
                        </span>
                        </div>

                        <div className="flex phone:flex-col laptop:flex-col phone:justify-center laptop:justify-start laptop:items-start phone:items-center">
                            <Heading heading={formData?.fullName ? formData?.fullName : getBusinessData?.data?.title} />
                            <p className="phone:text-sm laptop:text-base -mt-3 text-gray-500">Super Administrator </p>
                            <p className="phone:text-sm laptop:text-base text-gray-500">{formData?.email ? formData?.email : getBusinessData?.data?.email}</p>
                            <button className="text-red-500 mt-2 text-lg font-bold" onClick={handleSignOut}>Sign Out</button>
                        </div>
                    </div>

                    <hr className="bg-gray-500 my-8" />

                    <div>
                        <Label text="Fullname" htmlFor="fullName"/>
                        <DefaultInput name="fullName" value={formData?.fullName} onChange={handleFormData} type="text" className="w-full mt-2 mb-10 bg-gray-100 p-3 rounded-lg outline-0 " />
                        <Label text="Email Address" htmlFor="email" />
                        <DefaultInput name="email" value={formData?.email} onChange={handleFormData} type="text" className="w-full mt-2 mb-10 bg-gray-100 p-3 rounded-lg outline-0 " />
                        <Label text="Phone" htmlFor="phone" />
                        <DefaultInput name="phone" value={formData?.phone} onChange={handleFormData} type="text" className="w-full mt-2 mb-10 bg-gray-100 p-3 rounded-lg outline-0 " />
                        <Label text="Address" htmlFor="street" />
                        <DefaultInput name="street" value={formData?.address?.street} onChange={handleInnerFormData} type="text" className="w-full mt-2 mb-10 bg-gray-100 p-3 rounded-lg outline-0 " />
                        <Label text="City" htmlFor="city" />
                        <DefaultInput name="city" value={formData?.address?.city} onChange={handleInnerFormData} type="text" className="w-full mt-2 mb-10 bg-gray-100 p-3 rounded-lg outline-0 " />
                        <Label text="State" htmlFor="state" />
                        <DefaultInput name="state" value={formData?.address?.state} onChange={handleInnerFormData} type="text" className="w-full mt-2 mb-10 bg-gray-100 p-3 rounded-lg outline-0 " />
                        <SubHeading subheading="Change Password"/>
                        <MiniText minitext="Enter your old password and then the password you wish to change it to."/>
                        <br />
                        <div className="flex justify-between">
                            <Label text="Old Password" htmlFor="oldPassword"/>
                            <p className="px-5 text-blue-400 cursor-pointer text-xs font-bold" onClick={() => {passwordName !=="old" ? setPassWordName('old') : setPassWordName('')}}>{passwordName !== 'old' ? 'SHOW' : 'HIDE'}</p>
                        </div>
                        <DefaultInput name="oldPassword" value={password?.oldPassword} onChange={handlePassword} type={passwordName === "old" ? "text" : "password"} className="w-full mt-2 mb-10 bg-gray-100 p-3 rounded-lg outline-0 " />
                        <div className="flex justify-between">
                            <Label text="New Password" htmlFor="newPassword"/>
                            <p className="px-5 text-blue-400 cursor-pointer text-xs font-bold" onClick={() => {passwordName !=='new' ? setPassWordName('new') : setPassWordName('')}}>{passwordName !== 'new' ? 'SHOW' : 'HIDE'}</p>
                        </div>
                        <DefaultInput name="newPassword" value={formData?.newPassword} onChange={handlePassword} type={passwordName === 'new' ? "text" : 'password'} className="w-full mt-2 mb-10 bg-gray-100 p-3 rounded-lg outline-0 " />
                        <div className="w-full text-right">
                            <button onClick={handlePasswordUpdate} className="text-green-500 bg-green-100/80 rounded-lg p-3 text-lg">Update <span><i className="icon ion-md-lock" /></span></button>
                        </div>
                    </div>

                    <div className="bg-red-50 my-20 py-10 rounded-lg w-full px-5 h-fit">
                        <div className="flex gap-5 mb-6 flex-wrap justify-between items-center">
                            <div className="flex text-gray-500 text-lg justify-start gap-2 items-center">
                                <i className="icon ion-md-sad" />
                                <p className="font-bold">Danger Zone</p>
                            </div>
                            <p className="rounded-lg text-sm text-green-500 bg-green-100 p-2">COMING SOON</p>
                        </div>
                        <p className="text-gray-500 mb-8 phone:text-base tablet:text-lg">All actions in this section cannot be undone. Please ensure you know what you are doing.</p>
                        <Button 
                        id="failed"
                        buttonName="Delete My Business" />
                    </div>
                    <Button 
                    handleClick={handleProfileUpdate}
                    buttonName="Apply"
                    />
                    </div>
            </Section>
        </Holder>
    )
}