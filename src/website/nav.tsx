'use client'
import Button from "@/app/dashboard/button";
import { State_data } from "@/app/dashboard/context/context";
import { logout } from "@/app/dashboard/services/libs/staff-auth";
import { useGetBusiness } from "@/app/dashboard/services/swr-functions/customer-swr"
import DropDown from "@/app/dropdown";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function NavWebsite(){
  const {getBusinessData} = useGetBusiness();
  const [showDropDown, setShowDropDown] = useState<boolean>(false)
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

    const handleShowDropDown = () => {
      setShowDropDown(true);
    }

    const handleNoShowDropDown = () => {
      setShowDropDown(false);
    }

    const handleRouteLogin = () => {
      router.replace('/staff/web/login')
    }
    const [token, setToken] = useState<string>('')

    const checkSignOut = Cookies.get('logistix.user.auth')

    useEffect(() => {
      if(checkSignOut?.length){
        setToken(checkSignOut)
      }
    },[checkSignOut !== undefined])

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
                { token && token === undefined ? 
                  <button onClick={handleRouteLogin} className="flex font-thin phone:text-sm tablet:text-base bg-gray-100 p-2 cursor-pointer rounded-3xl items-center justify-start gap-2">
                    <span>Sign In</span>
                    <i className="icon ion-md-arrow-right" />
                  </button> 
                  :
                  <div onMouseOut={handleShowDropDown}>
                    <div className="flex tablet:font-thin phone:font-base phone:text-sm tablet:text-base bg-gray-100 p-2 cursor-pointer rounded-3xl items-center justify-start gap-2">
                      <i className="icon ion-md-contact text-xl" />
                      <p>{mywindow > 760 ? 'Hi,' : ""} {title?.length > 2 ? title?.slice(0, 2) : title?.slice(0)}</p>
                    </div>
                    {
                      showDropDown && <DropDown mouseLeave={handleNoShowDropDown}/>
                    }
                  </div>
                }
            </div>
        </div>
        </div>
    )
}