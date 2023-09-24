'use client';
import { useState, useEffect } from "react";
import Sidebar from "./sidebar";

export default function ToggleNav(){
    const [showNav, setShowNav] = useState<boolean>(false);
    const [windowWidth, setWindowWidth]= useState<number>(0);
    useEffect(function onFirstMount() {
        function checkWidth(){
          setWindowWidth(window.innerWidth);
        }
        window.addEventListener("resize", checkWidth);
        return () => window.removeEventListener('resize', checkWidth);
    }, []);

    
    return(
      <>
        {
            windowWidth  >= 1025 || showNav && <Sidebar />
        }

        { 
          showNav && windowWidth <= 1025 &&
          <>
         <div onClick={() => setShowNav(false) } 
          className="left-64 animate__animated animate__slideInLeft tablet:left-72 fixed top-2 z-30 bg-amber-500 text-stone-900 cursor-pointer hover:shadow-xl text-xl w-fit px-4 py-2 rounded-full">
          <i className="icon ion-md-close" title="Close"></i>
        </div>
        <div onClick={() => setShowNav(false)} className="cursor-pointer invert bg-gray-50 z-10 bottom-0 opacity-10 fixed top-0 h-full w-full "></div>
        </>
        }

        {
          !showNav && windowWidth <= 1025 &&    
        <div onClick={() => setShowNav(true)} 
           className="bg-amber-500 text-stone-900 cursor-pointer hover:shadow-xl text-xl w-fit px-4 py-2 rounded-full ">
           <i className="icon ion-md-menu" title="Menu"></i>
        </div>
        }
       </>
    )
}