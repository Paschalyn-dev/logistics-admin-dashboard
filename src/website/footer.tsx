'use client'

import { useGetBusiness } from "@/app/dashboard/services/swr-functions/customer-swr"
import Link from "next/link";

export default function Footer(){
    const {getBusinessData} = useGetBusiness();
    function sendEmailDefault(){
        var email = getBusinessData?.data?.email;
        var subject = "MESSAGE FROM " +  getBusinessData?.data?.title;
        var msgBody = `Hello ${getBusinessData?.data?.title}, `;
        window.open(`mailto:${email}?subject=${subject}&body=${msgBody}`);
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
                    <a href="https://logistix.africa" target="_blank" > 
                        <img className="bg-gray-100 rounded-lg" id="image" src="https://cakenus.logistix.africa/logistix-badge.svg" alt="Made Possible with Logistix" />
                    </a>
                </div>

                <div className="flex tablet:w-3/12 gap-5 flex-col tablet:justify-start text-left phone:text-xs tablet:text-base phone:justify-center">
                    <h1 className="font-normal text-black phone:text-base tablet:text-lg">Quick Links</h1>
                    <Link className="text-gray-600 phone:text-xs tablet:text-base" href="/ship">Ship A Parcel</Link>
                    <Link className="text-gray-600 phone:text-xs tablet:text-base" href="https://radar.logistix.africa">Track Your Parcel</Link>
                    <Link className="text-gray-600 phone:text-xs tablet:text-base" href="/dashboard/staff/web/login">Sign In</Link>
                    <Link className="text-gray-600 phone:text-xs tablet:text-base" href="https://help.logistix.africa/">Help Center</Link>
                </div>

                <div className="flex tablet:w-3/12 gap-5 flex-col tablet:justify-start text-left phone:text-xs tablet:text-base phone:justify-center">
                    <h1 className="font-normal text-black phone:text-base tablet:text-lg">Social Accounts</h1>
                    <Link target={socialAccounts?.facebook?.length ? "_blank" : ""} href={socialAccounts?.facebook?.length ? socialAccounts?.facebook : "/"} className="flex gap-2 text-gray-600 items-center justify-start">
                        <i className="tablet:text-xl phone:text-base icon ion-logo-facebook" />
                        <span>
                            {socialAccounts?.facebook || "Facebook"}
                        </span>
                    </Link>
                    <Link className="flex gap-2 text-gray-600 items-center justify-start" target={socialAccounts?.twitter?.length ? "_blank" : ""} href={socialAccounts?.twitter?.length ? socialAccounts?.twitter : "/"}>
                        <i className="tablet:text-xl phone:text-base icon ion-logo-twitter" />
                        <span>
                            {socialAccounts?.twitter || 'Twitter'}
                        </span>
                    </Link>
                    <Link className="flex gap-2 text-gray-600 items-center justify-start" target={socialAccounts?.instagram?.length ? "_blank" : ""} href={socialAccounts?.instagram?.length ? socialAccounts?.instagram : "/"}>
                        <i className="tablet:text-xl phone:text-base icon ion-logo-instagram" />
                        <span>
                            {socialAccounts?.instagram || "Instagram"}
                        </span>
                    </Link>
                    <Link className="flex gap-2 text-gray-600 items-center justify-start" target={socialAccounts?.linkedln?.length ? "_blank" : ""} href={socialAccounts?.linkedln?.length ? socialAccounts?.linkedln : "/"}>
                        <i className="tablet:text-xl phone:text-base icon ion-logo-linkedin" />
                        <span>
                            {socialAccounts?.linkedln || "Linkedln"}
                        </span>
                    </Link>
                </div>

                <div className="flex tablet:w-3/12 gap-5 flex-col tablet:justify-start text-left phone:text-xs tablet:text-base phone:justify-center">
                    <h1 className="font-normal text-black phone:text-base tablet:text-lg">Contact</h1>
                    <Link className="flex gap-2 text-gray-600 items-center justify-start" target="_blank" href={`https://api.whatsapp.com/send?phone=${getBusinessData?.data?.contact?.whatsapp}`}>

                        <i className="tablet:text-xl phone:text-base icon ion-logo-whatsapp" />
                        <span>
                            {getBusinessData?.data?.contact?.whatsapp || 'Whatsapp'}
                        </span>
                    </Link>

                    <button onClick={sendEmailDefault} className="flex gap-2 text-gray-600 items-center justify-start">
                        <i className="tablet:text-xl phone:text-base icon ion-md-mail" />
                        <span>
                            {getBusinessData?.data?.email || 'Email'}
                        </span>
                    </button>

                    <Link className="flex gap-2 text-gray-600 items-center justify-start" target="_blank" href="">
                        <i className="tablet:text-xl phone:text-base icon ion-md-call" />
                        <span>
                            {getBusinessData?.data?.phone || 'Phone'}
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    )
}