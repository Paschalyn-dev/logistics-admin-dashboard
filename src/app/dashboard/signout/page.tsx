'use client';

import { useRouter } from "next/navigation";
import { useContext } from "react";
import { logout } from "../services/libs/staff-auth";
import { customerLogout } from "../services/libs/customer-auth";
import { State_data } from "../context/context";
import SuccessMessage from "../successmessage";

export default function SignOut(){
    const router = useRouter();
    const {successMessage, setSuccessMessage} = useContext(State_data);
    function handleSignOut(){
        logout();
        customerLogout();
        setSuccessMessage((prev: any) => ({...prev, signOut: true}));
        let timer = setTimeout(() => {router.replace('/')}, 2000);
        () => clearTimeout(timer);
    }
    return(
        <div>
            {
                successMessage.signOut &&
                <SuccessMessage
                messageTitle="Sign out successful!"
                name="signOut"
                successMessageShow={successMessage.signOut}
                 />
            }
            <button 
            onClick={handleSignOut}>
                Sign Out
            </button>
        </div>
    )
}