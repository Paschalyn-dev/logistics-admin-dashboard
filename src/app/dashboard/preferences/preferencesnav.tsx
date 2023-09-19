'use client'
import { useEffect, useState } from "react";
import ToggleNav from "../toggleNav";
import Sidebar from "../sidebar";
import 'src/app/globals.css';
import InsideNav from "../home/insidenav";


export default function PreferencesNav(){
    const [windowWidth, setWindowWidth]= useState<number>(0);
    const [clicked, setClicked]= useState<string>('website');

    useEffect(() => {
        function checkWidth(){
          setWindowWidth(window.innerWidth);
        }
        window.addEventListener("resize", checkWidth);
        return () => window.removeEventListener('resize', checkWidth);
    }, []);
    // const minipage = localStorage.getItem('minipage');
    // useEffect(() => {
    //     if(minipage) {
    //       setClicked(JSON.parse(minipage))
    //     }
    //   }, [])
    
      // useEffect(() => {
      //   localStorage.setItem('minipage', JSON.stringify(clicked))
      // }, [clicked])

    return(
        <div className= "flex gap-5 z-10 h-fit bg-blue-700 top-0 phone:w-full laptop:w-10/12 bg-gray-100 phone:pr-10 laptop:pr-24 fixed justify-between items-center shadow-sm">            
            <div className="pl-5 fixed flex gap-6 justify-start items-center">
                {
                    windowWidth <= 1024 ? <ToggleNav /> : <Sidebar/>
                }
            </div>

            <div className="flex w-full overflow-x-auto laptop:w-full phone:ml-20 laptop:ml-10 justify-between items-center">

                 <div className="flex mr-5 justify-between items-center"> 
                        <InsideNav
                        icon="icon ion-md-globe"
                        name="website"
                        tooltip="Globe"
                        title="Website"
                        clicked={clicked}
                        link="/dashboard/preferences/website"
                        handleClick={setClicked}
                        />  
                        
                        <InsideNav
                        icon="icon ion-md-card"
                        name="payments"
                        tooltip="Card"
                        title="Payments"
                        clicked={clicked}
                        link="/dashboard/preferences/payments"
                        handleClick={setClicked}
                        />   

                        <InsideNav
                        icon="icon ion-md-cube"
                        name="shipment"
                        tooltip="Cube"
                        title="Shipment"
                        clicked={clicked}
                        link="/dashboard/preferences/shipment"
                        handleClick={setClicked}
                        />   
                
                        <InsideNav
                        icon="icon ion-md-code"
                        name="developer"
                        tooltip="Code"
                        title="Developer"
                        clicked={clicked}
                        link="/dashboard/preferences/developer"
                        handleClick={setClicked}
                        />   
                        
                        <InsideNav
                        icon="icon ion-md-notifications"
                        name="notifications"
                        tooltip="Notifications"
                        title="Notifications"
                        clicked={clicked}
                        link="/dashboard/preferences/notifications"
                        handleClick={setClicked}
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