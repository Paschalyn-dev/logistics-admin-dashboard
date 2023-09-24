'use client'
import { useEffect, useState } from "react";
import ToggleNav from "./toggleNav";
import Sidebar from "./sidebar";
import InsideNav from "./home/insidenav";

export default function OrdersNav(){
    let myWidth = 0;
    
    const [clickIt, setClickIt] = useState<string>('');
    
    if(typeof window !== "undefined"){
        myWidth = window.innerWidth;
    }  
    
    const [windowWidth, setWindowWidth]= useState<number>(myWidth);
    
    useEffect(() => {
        function checkWidth(){
          setWindowWidth(window.innerWidth);
        }
        window.addEventListener("resize", checkWidth);
        return () => window.removeEventListener('resize', checkWidth);
    });
  

    return(
        <div className= "flex gap-5 z-10 h-fit bg-blue-700 top-0 phone:w-full laptop:w-10/12 bg-gray-100 phone:pr-10 laptop:pr-24 fixed justify-between items-center shadow-sm">            
            <div className="pl-5 fixed flex gap-6 justify-start items-center">
                {
                    windowWidth <= 1024 ? <ToggleNav /> : <Sidebar/>
                }
            </div>

            <div className="flex overflow-x-auto laptop:w-full phone:ml-20 w-full laptop:ml-10 justify-between items-center">

                 <div className="flex mr-5 justify-between items-center">                 
                <InsideNav
                  link="/dashboard/shipments/active"
                  title="Active"
                  clicked={clickIt}
                  name="active"
                  icon="icon ion-md-rocket"
                  tooltip="Rocket"
                  handleClick={setClickIt}
                 />

                <InsideNav
                  link="/dashboard/shipments/delivered"
                  title="Delivered"
                  clicked={clickIt}
                  name="delievered"
                  icon="icon ion-md-happy"
                  tooltip="Happy"
                  handleClick={setClickIt}
                 />

                <InsideNav
                  link="/dashboard/shipments/late"
                  title="Late"
                  clicked={clickIt}
                  name="late"
                  icon="icon ion-md-sad"
                  tooltip="Sad"
                  handleClick={setClickIt}
                 />

                <InsideNav
                  link="/dashboard/shipments/scheduled"
                  title="Scheduled"
                  clicked={clickIt}
                  name="scheduled"
                  icon="icon ion-md-clock"
                  tooltip="Clock"
                  handleClick={setClickIt}
                 />   

            </div> 

            <div>
                <p className="text-gray-500 text-xs">Usage</p>
                <h2 className="font-bold tracking-wider -mt-2">₦0.00</h2>
            </div>
            </div>
        </div>

    )
}