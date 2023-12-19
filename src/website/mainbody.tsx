'use client'
import { useGetBusiness } from "@/app/dashboard/services/swr-functions/customer-swr";
import Time from "@/app/time";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DefaultBody(){
    const {getBusinessData} = useGetBusiness();
    const [mywindow, setWindow] = useState<any>(0)
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
    return(
        <div className="flex flex-col justify-center p-10 my-20 w-full phone:h-full after-laptop:h-screen">
            <h1 className={mywindow > 760 ? "text-gray-600" : "text-3xl font-bold text-gray-600"} id={mywindow > 760 ? "big-font" : ""}>{Time()}</h1>
            <p id="medium-font" className="phone:text-xl tablet:text-2xl laptop:text-3xl text-gray-700">{getBusinessData?.data?.entryText}</p>
            <div className="flex justify-start gap-5 mt-10 items-center">
                <Link href="/ship" id="green-box" className="flex flex-col rounded-xl h-52 w-40 text-center justify-center items-center gap-5">
                    <img src="https://cakenus.logistix.africa/parcel.svg" alt="Ship a shipment"/>
                    <div>
                        <h2 className="text-green-600 text-lg">Ship</h2>
                        <p className="text-green-600 text-xs">A PARCEL</p>
                    </div>
                </Link>

                <Link href="https://radar.logistix.africa" target="_blank" id="purple-box" className="flex flex-col rounded-xl h-52 w-40 text-center justify-center items-center gap-5">
                    <img src="https://cakenus.logistix.africa/track.svg" alt="Track a shipment"/>
                    <div>
                        <h2 className="text-purple-500 text-lg">Track</h2>
                        <p className="text-purple-800 text-xs">A PARCEL</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}