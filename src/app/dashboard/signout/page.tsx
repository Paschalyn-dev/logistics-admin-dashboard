import { useRouter } from "next/navigation";
import { logout } from "../services/libs/staff-auth";
import { useStaffLogin } from "../services/swr-functions/staff-swr";
import { useEffect } from "react";
import Loader from "../services/Loader/spinner";

export default function SignOut({staffLogin}: any){
    const {mutate, loading, loggedOut} = useStaffLogin(staffLogin || '');
    const router = useRouter();

    useEffect(() => {
        if(loggedOut){
           router.replace('/');
           console.log('router')
        }
    }, [loggedOut]);
    if(loggedOut) return <Loader />
    if(loading) return <Loader />
    return(
        <button 
        onClick={() => {
            logout();
            mutate(null);
        }}
        >Sign Out</button>
    )
}