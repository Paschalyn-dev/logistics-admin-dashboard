'use client'

import { useGetBusiness } from "@/app/dashboard/services/swr-functions/customer-swr"
import Link from "next/link";

export default function Footer(){
    const {getBusinessData} = useGetBusiness();
    function sendEmailDefault(){
        if(getBusinessData?.data?.email?.length > 0){
            var email = getBusinessData?.data?.email;
            var subject = "MESSAGE FROM " +  getBusinessData?.data?.title;
            var msgBody = `Hello ${getBusinessData?.data?.title}, `;
            window.open(`mailto:${email}?subject=${subject}&body=${msgBody}`);
        }
        else{
            alert('No email is provided. Login to your dashboard to enter an email address.')
        }
    }
    const socialAccounts = getBusinessData?.data?.socialAccounts;
    return(
        <div className="flex flex-col items-center bg-gray-50 shadow justify-center w-full phone:h-full">
            <div className="flex p-10 flex-wrap justify-start gap-20 items-start w-full">

                <div className="flex tablet:w-3/12 gap-5 flex-col tablet:justify-start text-left phone:text-xs tablet:text-base phone:justify-center">
                    <div>
                        <h1 className="font-bold phone:text-lg tablet:text-xl">{getBusinessData?.data?.title}</h1>
                        <p className="text-gray-600">{getBusinessData?.data?.address?.street}</p>
                    </div>
                    <Link href="https://logistix.africa" target="_blank" > 
                        <img className="bg-gray-100 rounded-lg" id="image" src="https://cakenus.logistix.africa/logistix-badge.svg" alt="Made Possible with Logistix" />
                    </Link>
                </div>

                <div className="flex tablet:w-3/12 gap-5 flex-col tablet:justify-start text-left phone:text-xs tablet:text-base phone:justify-center">
                    <h1 className="font-normal text-black phone:text-sm tablet:text-base">Quick Links</h1>
                    <Link className="tablet:text-gray-600 phone:text-gray-800 font-thin phone:text-xs tablet:text-sm" href="/ship">Ship A Parcel</Link>
                    <Link className="tablet:text-gray-600 phone:text-gray-800 font-thin phone:text-xs tablet:text-sm" href="https://radar.logistix.africa">Track Your Parcel</Link>
                    <Link className="tablet:text-gray-600 phone:text-gray-800 font-thin phone:text-xs tablet:text-sm" href="/dashboard/staff/web/login">Sign In</Link>
                    <Link className="tablet:text-gray-600 phone:text-gray-800 font-thin phone:text-xs tablet:text-sm" href="https://help.logistix.africa/">Help Center</Link>
                </div>

                <div className="flex tablet:w-3/12 gap-5 flex-col tablet:justify-start text-left phone:text-xs tablet:text-base phone:justify-center">
                    <h1 className="font-normal text-black phone:text-sm tablet:text-base">Social Accounts</h1>
                    <Link target="_blank" href={socialAccounts?.facebook?.length ? "https://facebook.com/" + socialAccounts?.facebook : "https://facebook.com"} className="flex gap-2 text-gray-600 font-thin phone:text-xs tablet:text-sm items-center justify-start">
                        <i className="tablet:text-lg phone:text-base icon ion-logo-facebook" />
                        <span>
                            {socialAccounts?.facebook || "Facebook"}
                        </span>
                    </Link>
                    <Link className="flex gap-2 text-gray-600 font-thin phone:text-xs tablet:text-sm items-center justify-start" target="_blank" href={socialAccounts?.twitter?.length ? "https://twitter.com/" + socialAccounts?.twitter : "https://twitter.com"}>
                        <i className="tablet:text-lg phone:text-base icon ion-logo-twitter" />
                        <span>
                            {socialAccounts?.twitter || 'Twitter'}
                        </span>
                    </Link>
                    <Link className="flex gap-2 text-gray-600 font-thin phone:text-xs tablet:text-sm items-center justify-start" target="_blank" href={socialAccounts?.instagram?.length ? "https://instagram.com/" + socialAccounts?.instagram : "https://instagram.com"}>
                        <i className="tablet:text-lg phone:text-base icon ion-logo-instagram" />
                        <span>
                            {socialAccounts?.instagram || "Instagram"}
                        </span>
                    </Link>
                    <Link className="flex gap-2 text-gray-600 phone:text-xs tablet:text-sm font-thin items-center justify-start" target="_blank" href={socialAccounts?.linkedln?.length ? "https://linkedin.com/" + socialAccounts?.linkedln : "https://linkedin.com"}>
                        <i className="tablet:text-lg phone:text-base icon ion-logo-linkedin" />
                        <span>
                            {socialAccounts?.linkedln || "Linkedln"}
                        </span>
                    </Link>
                </div>

                <div className="flex tablet:w-3/12 gap-5 flex-col tablet:justify-start text-left phone:text-xs tablet:text-base phone:justify-center">
                    <h1 className="font-normal text-black phone:text-sm tablet:text-base">Contact</h1>
                    <Link className="flex gap-2 text-gray-600 phone:text-xs tablet:text-sm font-thin items-center justify-start" target="_blank" href={getBusinessData?.data?.contact?.whatsapp ? `https://api.whatsapp.com/send?phone=${getBusinessData?.data?.contact?.whatsapp}` : "https://www.whatsapp.com"}>
                        <i className="tablet:text-lg phone:text-base icon ion-logo-whatsapp" />
                        <span>
                            {getBusinessData?.data?.contact?.whatsapp || 'Whatsapp'}
                        </span>
                    </Link>

                    <button onClick={sendEmailDefault} className="flex gap-2 text-gray-600 phone:text-xs tablet:text-sm font-thin items-center justify-start">
                        <i className="tablet:text-lg phone:text-base icon ion-md-mail" />
                        <span>
                            {getBusinessData?.data?.email || 'Email'}
                        </span>
                    </button>

                    <Link className="flex gap-2 text-gray-600 phone:text-xs tablet:text-sm font-thin items-center justify-start" href={`tel:${getBusinessData?.data?.phone}`}>
                        <i className="tablet:text-lg phone:text-base icon ion-md-call" />
                        <span>
                            {getBusinessData?.data?.phone || 'Phone'}
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    )
}