'use client'
import { useEffect, useState } from "react";
import ModeToggle from "./modetoggle"
import ToggleNav from "./toggleNav";
import Sidebar from "./sidebar";
import * as React from "react";


export default function ConstantNav(){
    const [windowWidth, setWindowWidth]= useState<number>(0);
    useEffect(() => {
        function checkWidth(){
          setWindowWidth(window.innerWidth);
        }
        window.addEventListener("resize", checkWidth);
        return () => window.removeEventListener('resize', checkWidth);
    }, []);

    return(
        <div className= "flex z-10 h-16 bg-blue-700 top-0 phone:w-full laptop:w-10/12 overflow-x-auto bg-gray-100 phone:pr-10 laptop:pr-24 fixed justify-between items-center shadow-sm">            
            <div className="pl-5 flex gap-6 justify-start items-center">
                {
                    windowWidth <= 1024 ? <ToggleNav /> : <Sidebar/>
                }
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