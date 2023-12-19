'use client'
import Button from "@/app/dashboard/button";
import { State_data } from "@/app/dashboard/context/context";
import { useGetBusiness } from "@/app/dashboard/services/swr-functions/customer-swr"
import DropDown from "@/app/dropdown";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function NavWebsite(){
  const {getBusinessData} = useGetBusiness();
  const {isLoggedOut} = useContext(State_data)
  const [showDropDown, setShowDropDown] = useState<boolean>(false)
  const [mywindow, setWindow] = useState<any>(0)
  const router = useRouter();
  const title = getBusinessData?.data?.title?.split(' ')
  console.log(isLoggedOut, showDropDown)
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

    const handleShowDropDown = () => {
      setShowDropDown(true);
    }

    const handleNoShowDropDown = () => {
      setShowDropDown(false);
    }

    return(
      <div>

        <div className="py-3 shadow-sm px-7 bg-gray-50 relative w-full flex justify-between items-center">
            <Link href="/" className="flex bg-gray-30 justify-start gap-3 items-center">
                <img className="w-12 h-12 rounded-sm" src={getBusinessData?.data?.image} alt="Profile image"/>
                <h3 className="tablet:text-base phone:w-5 tablet:w-7 phone:text-sm">{getBusinessData?.data?.title}</h3>
            </Link>
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
                { isLoggedOut ? 
                  <div className="flex font-thin phone:text-sm tablet:text-base bg-gray-100 p-2 cursor-pointer rounded-3xl items-center justify-start gap-2">
                   <p>Sign In</p>
                    <i className="icon ion-md-arrow-right" />
                  </div> 
                  :
                  <div onMouseOut={handleShowDropDown} className="flex font-thin phone:text-sm tablet:text-base bg-gray-100 p-2 cursor-pointer rounded-3xl items-center justify-start gap-2">
                    <i className="icon ion-md-contact text-xl" />
                    <p>{mywindow > 760 ? 'Hi,' : ""} {title?.length > 2 ? title?.slice(0, 2) : title?.slice(0)}</p>
                  </div>
                }
            </div>
        </div>
                {
                  showDropDown  && !isLoggedOut && <DropDown mouseLeave={handleNoShowDropDown}/>
                }
        </div>
    )
}