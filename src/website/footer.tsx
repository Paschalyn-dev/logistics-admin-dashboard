'use client'

import { useGetBusiness } from "@/app/dashboard/services/swr-functions/customer-swr"

export default function Footer(){
    const {getBusinessData} = useGetBusiness();
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
                    <a className="text-gray-600 phone:text-xs tablet:text-base" href="">Ship A Parcel</a>
                    <a className="text-gray-600 phone:text-xs tablet:text-base" href="">Track Your Parcel</a>
                    <a className="text-gray-600 phone:text-xs tablet:text-base" href="">Sign In</a>
                    <a className="text-gray-600 phone:text-xs tablet:text-base" href="">Help Center</a>
                </div>

                <div className="flex tablet:w-3/12 gap-5 flex-col tablet:justify-start text-left phone:text-xs tablet:text-base phone:justify-center">
                    <h1 className="font-normal text-black phone:text-base tablet:text-lg">Social Accounts</h1>
                    <a className="flex gap-2 text-gray-600 items-center justify-start" href="">
                        <i className="tablet:text-xl phone:text-base icon ion-logo-facebook" />
                        <span>
                            {getBusinessData?.data?.socialAccounts?.facebook || "Facebook"}
                        </span>
                    </a>
                    <a className="flex gap-2 text-gray-600 items-center justify-start" href="">
                        <i className="tablet:text-xl phone:text-base icon ion-logo-twitter" />
                        <span>
                            {getBusinessData?.data?.socialAccounts?.twitter || 'Twitter'}
                        </span>
                    </a>
                    <a className="flex gap-2 text-gray-600 items-center justify-start" href="">
                        <i className="tablet:text-xl phone:text-base icon ion-logo-instagram" />
                        <span>
                            {getBusinessData?.data?.socialAccounts?.instagram || "Instagram"}
                        </span>
                    </a>
                    <a className="flex gap-2 text-gray-600 items-center justify-start" href="">
                        <i className="tablet:text-xl phone:text-base icon ion-logo-linkedin" />
                        <span>
                            {getBusinessData?.data?.socialAccounts?.linkedln || "Linkedln"}
                        </span>
                    </a>
                </div>

                <div className="flex tablet:w-3/12 gap-5 flex-col tablet:justify-start text-left phone:text-xs tablet:text-base phone:justify-center">
                    <h1 className="font-normal text-black phone:text-base tablet:text-lg">Contact</h1>
                    <a className="flex gap-2 text-gray-600 items-center justify-start" href="">
                        <i className="tablet:text-xl phone:text-base icon ion-logo-whatsapp" />
                        <span>
                            {getBusinessData?.data?.contact?.whatsapp || 'Whatsapp'}
                        </span>
                    </a>

                    <a className="flex gap-2 text-gray-600 items-center justify-start" href="">
                        <i className="tablet:text-xl phone:text-base icon ion-md-mail" />
                        <span>
                            {getBusinessData?.data?.email || 'Email'}
                        </span>
                    </a>

                    <a className="flex gap-2 text-gray-600 items-center justify-start" href="">
                        <i className="tablet:text-xl phone:text-base icon ion-md-call" />
                        <span>
                            {getBusinessData?.data?.phone || 'Phone'}
                        </span>
                    </a>
                </div>
            </div>
        </div>
    )
}