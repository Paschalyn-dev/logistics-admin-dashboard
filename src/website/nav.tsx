'use client'
import Button from "@/app/dashboard/button";
import { useGetBusiness } from "@/app/dashboard/services/swr-functions/customer-swr"
import { useFetchBankCodesAndLogos } from "@/app/dashboard/services/swr-functions/staff-swr";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NavWebsite(){
    const {getBusinessData} = useGetBusiness();
    const [mywindow, setWindow] = useState<any>(0)
    const router = useRouter();
    const title = getBusinessData?.data?.title?.split(' ')
    useEffect(function onFirstMount() {
        function checkWidth(){
          setWindow(window.innerWidth);
        }
        window.addEventListener("resize", checkWidth);
        return () => window.removeEventListener('resize', checkWidth);
      });
    
      useEffect(() => {
        setWindow(window.innerWidth);
      }, []);

      const handleRouter = () => {
        router.replace('/ship');
      }
    return(
        <div className="py-3 shadow-sm px-7 bg-gray-50 relative w-full flex justify-between items-center">
            <div className="flex bg-gray-30 justify-start gap-3 items-center">
                <img className="w-12 h-12 rounded-sm" src={getBusinessData?.data?.image} alt="Profile image"/>
                <h3 className="tablet:text-base phone:w-5 tablet:w-7 phone:text-sm">{getBusinessData?.data?.title}</h3>
            </div>
            <div className="flex justify-start gap-3 items-center">
                { mywindow > 760 &&
                     <>
                        <Button
                        buttonName="Ship A Parcel" 
                        handleClick={handleRouter}
                        />
                        <a className="mx-3" target="_blank" href="https://radar.logistix.africa/">Track Parcel</a>
                    </>
                }
                <div className="flex bg-gray-100 p-2 cursor-pointer rounded-3xl items-center justify-start gap-2">
                    <i className="icon ion-md-contact text-xl" />
                    <p>{mywindow > 760 ? 'Hi,' : ""} {title?.length > 2 ? title?.slice(0, 2) : title?.slice(0)}</p>
                </div>
            </div>
        </div>
    )
}