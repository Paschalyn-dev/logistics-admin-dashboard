'use client';

import { useRouter } from "next/navigation";
import { logout } from "../services/libs/staff-auth";
import { customerLogout } from "../services/libs/customer-auth";
import { useStaffLogin } from "../services/swr-functions/staff-swr";
import Loader from "../services/Loader/spinner";
import { useCustomerLogin } from "../services/swr-functions/customer-swr";

export default function SignOut({staffLogin, customerLogin}: any){
    const {mutate, loading, loggedOut} = useStaffLogin(staffLogin || '');
    const {mutate: m, loading: l, loggedOut: lO} = useCustomerLogin(customerLogin || '');
    const router = useRouter();

    if(loggedOut || lO){
        console.log('router')
        router.replace('/');
    }
    // if(loggedOut) return <Loader />
    if(loading || l) return <Loader />
    return(
        <button 
        onClick={() => {
            logout();
            customerLogout();
            mutate(null);
            m(null);
        }}
        >Sign Out</button>
    )
}