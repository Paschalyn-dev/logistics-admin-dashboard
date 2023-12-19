'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { customerLogout } from "./dashboard/services/libs/customer-auth";
import { logout } from "./dashboard/services/libs/staff-auth";
import { useContext } from "react";
import { State_data } from "./dashboard/context/context";


export default function DropDown({mouseLeave}: any){
    const router = useRouter();
    const {setIsLoggedOut} = useContext(State_data);
    function handleSignOut(){
        logout();
        () => setIsLoggedOut(true);
        customerLogout();
        router.replace('/staff/web/login');
    }
    
    return(
        <div onMouseLeave={mouseLeave} className="float-right right-5 absolute z-2 mt-3">
            <div className="flex font-thin text-gray-600 phone:text-sm laptop:text-base flex-col gap-4 bg-gray-50 shadow-lg w-fit h-fit p-5 rounded-lg ">
                <Link href="/dashboard/welcome">Dashboard</Link>
                <Link href="/dashboard/profile">View Profile</Link>
                <button onClick={handleSignOut} className="text-red-400">Sign Out</button>
            </div>
        </div>
    )
}