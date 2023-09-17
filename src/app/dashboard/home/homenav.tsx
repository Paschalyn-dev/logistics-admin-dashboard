"use client"
import InsideNav from "@/app/dashboard/home/insidenav";
import { useEffect, useState } from "react";
import ToggleNav from "@/app/dashboard/toggleNav";
import Sidebar from "@/app/dashboard/sidebar";
import ModeToggle from "../modetoggle";
import * as React from "react";


export default function HomeNav(){
    const [clickIt, setClickIt] = useState<string>('');
    const [windowWidth, setWindowWidth]= useState<number>(window.innerWidth);

    useEffect(function onFirstMount() {
        function checkWidth() {
          setWindowWidth(window.innerWidth);
        }
        window.addEventListener("resize", checkWidth);
        return () => window.removeEventListener('resize', checkWidth);
    }, [windowWidth]);

    useEffect(() => {
        const homepage = localStorage.getItem('homepage');
        if(homepage) {
          setClickIt(JSON.parse(homepage))
        }
      }, [])
    
      useEffect(() => {
        localStorage.setItem('homepage', JSON.stringify(clickIt))
      }, [clickIt])

    return(
        <div className= "flex z-10 dark:bg-red-500 bg-blue-700 top-0 phone:w-full laptop:w-10/12 overflow-x-auto bg-gray-100 phone:pr-10 laptop:pr-24 fixed justify-between items-center shadow-sm">            
            <div className="pl-5 flex gap-6 justify-start items-center">
            {
                windowWidth <= 1024 ? <ToggleNav /> : <Sidebar/>
            }

            <InsideNav 
            title="Overview" 
            link="/dashboard/home/overview" 
            icon="icon ion-md-list"
            clicked={clickIt} 
            name="overview" 
            tooltip="List" 
            handleClick={setClickIt}
             />

            <InsideNav 
            title="Billing" 
            link="/dashboard/home/billing" 
            icon="icon ion-md-cash" 
            clicked={clickIt} 
            tooltip="Cash" 
            name="billing" 
            handleClick={setClickIt}
             />
             </div>
            <div className="flex justify-between items-center gap-10">
             <ModeToggle />
            <div>
                <p className="text-gray-500 text-xs">Usage</p>
                <h2 className="font-bold tracking-wider -mt-2">₦0.00</h2>
            </div>
            </div>
        </div>
    )
}