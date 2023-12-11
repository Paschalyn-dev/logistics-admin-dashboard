'use client';
import Link from "next/link";
import '../globals.css';
import { useState, useEffect } from "react";
import { logout } from "./services/libs/staff-auth";
import { customerLogout } from "./services/libs/customer-auth";
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation';
import { useGetBusiness } from "./services/swr-functions/customer-swr";

export default function Sidebar() {
  const {getBusinessData, getBusinessError, getBusinessIsLoading, getBusinessIsValidating, getBusinessMutate} = useGetBusiness();
  const pathname = usePathname();
  const [clicked, setClicked] = useState<any>(pathname);
  const [windowWidth, setWindowWidth]= useState<number>(0);
  const router = useRouter();
  function handleSignOut(){
    logout();
    customerLogout();
    router.replace('/');
  }

  useEffect(function onFirstMount() {
    function checkWidth(){
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  });

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);
  
  useEffect(() => {
    setClicked(pathname)
    if(pathname.includes('/dashboard/profile')){
      setClicked('/dashboard/home/overview')
    }
  }, [pathname])


    return(
      <div className={ windowWidth <= 1025 ? "animate__animated animate__slideInLeft fixed flex flex-col justify-start items-center z-20 top-0 bottom-0 left-0 text-white w-fit h-full bg-stone-900 text-center shadow-lg" : "fixed flex flex-col justify-start items-center z-20 top-0 bottom-0 left-0 text-white w-fit h-full bg-stone-900 text-center shadow-lg"}>
        <div className="z-20 sticky h-fit w-fit bg-stone-900 py-8 px-12 shadow">
          <img src={getBusinessData?.data?.image} alt="logo" className="w-12 h-12 rounded-full m-auto mb-3" />
          <h4 className="font-bold mb-1">{getBusinessData?.data?.title}</h4>
          <div className="flex justify-around items-center gap-1">
            <p className="font-light text-xs p-1 border mt-1 border-gray-700 shadow rounded-full">Super Administrator</p>
            <a target="_blank" href="https://cakenus.logistix.africa"><i className="icon ion-md-globe" title="Globe"></i></a>
          </div>
        </div>
        
        <div className=" z-10 relative overflow-y-auto h-fit laptop:h-4/6 scroll-smooth bg-stone-900 p-8 flex flex-col w-fit justify-start items-start gap-2 phone:p-9 phone:text-sm tablet:text-base laptop:text-base desktop:text-xl bigger-desktop:text-2xl">   
          <div onClick={() => setClicked('/dashboard/welcome')} >
            <Link href="/dashboard/welcome" 
            className={clicked === "/dashboard/welcome" ? "flex justify-start font-bold gap-5 items-start bg-amber-500/10 text-amber-500 py-3 px-6 w-45 rounded-full" : "flex justify-start w-45 py-3 px-6 gap-5 items-start"}>
              <i id={clicked ==="/dashboard/welcome" ? "yellow-color" : "white-color"} className="icon ion-md-medal" title="Medal"></i>
              <h1 className={clicked === "/dashboard/welcome" ? " " : "text-gray-100/50"}>Welcome</h1>
            </Link>
          </div>

         
          <div onClick={() => setClicked('/dashboard/home/overview')}>
            <Link href="/dashboard/home/overview" 
              className={clicked.includes("/dashboard/home") ? "flex justify-start font-bold gap-5 items-start bg-amber-500/10 text-amber-500 py-3 px-6 w-45 rounded-full" : "flex justify-start w-45 py-3 px-6 gap-5 items-start"}>
                <i id={clicked.includes("/dashboard/home") ? "yellow-color" : "white-color"} className="icon ion-md-home" title="Home"></i>
                <h1 className={clicked.includes("/dashboard/home") ? " " : "text-gray-100/70"}>Home</h1>
            </Link>
          </div>
          
          <div onClick={() => setClicked('/dashboard/shipments/active')}>
            <Link href="/dashboard/shipments/active" 
            className={clicked.includes("/dashboard/shipments") ? "flex justify-start font-bold gap-5 items-start bg-amber-500/10 text-amber-500 py-3 px-6 w-45 rounded-full" : "flex justify-start w-45 py-3 px-6 gap-5 items-start"}>
                <i id={clicked.includes("/dashboard/shipments") ? "yellow-color" : "white-color"} className="icon ion-md-cube" title="Cube"></i>
                <h1 className={clicked.includes("/dashboard/shipments") ? " " : "text-gray-100/70"}>Shipments</h1>
            </Link>
          </div>

          <div onClick={() => setClicked('/dashboard/customers')}>
            <Link href="/dashboard/customers" 
            className={clicked.includes('/dashboard/customers') ? "flex justify-start font-bold gap-5 items-start bg-amber-500/10 text-amber-500 py-3 px-6 w-45 rounded-full" : "flex justify-start w-45 py-3 px-6 gap-5 items-start"}>
                <i id={clicked.includes('/dashboard/customers') ? "yellow-color" : "white-color"} className="icon ion-md-people" title="People"></i>
                <h1 className={clicked.includes('/dashboard/customers') ? " " : "text-gray-100/70"}>Customers</h1>
            </Link>
          </div>

          <div onClick={() => setClicked('/dashboard/dispatchers')}>
            <Link href="/dashboard/dispatchers" 
            className={clicked.includes("/dashboard/dispatchers") ? "flex justify-start font-bold gap-5 items-start bg-amber-500/10 text-amber-500 py-3 px-6 w-45 rounded-full" : "flex justify-start w-45 py-3 px-6 gap-5 items-start"}>
                <i id={clicked.includes("/dashboard/dispatchers") ? "yellow-color" : "white-color"} className="icon ion-md-bicycle" title="Dispatcher"></i>
                <h1 className={clicked.includes("/dashboard/dispatchers") ? " " : "text-gray-100/70"}>Dispatchers</h1>
            </Link>
          </div>

          <div onClick={() => setClicked('/dashboard/administrators')}>
            <Link href="/dashboard/administrators" 
            className={clicked.includes("/dashboard/administrators") ? "flex justify-start font-bold gap-5 items-start bg-amber-500/10 text-amber-500 py-3 px-6 w-45 rounded-full" : "flex justify-start w-45 py-3 px-6 gap-5 items-start"}>
              <i id={clicked.includes("/dashboard/administrators") ? "yellow-color" : "white-color"} className="icon ion-md-contacts" title="Administrators"></i>
              <h1 className={clicked.includes("/dashboard/administrators") ? " " : "text-gray-100/70"}>Administrators</h1>
            </Link>
          </div>

          <div onClick={() => setClicked('/dashboard/transactions')}>
            <Link href="/dashboard/transactions" 
            className={clicked.includes("/dashboard/transactions") ? "flex justify-start font-bold gap-5 items-start bg-amber-500/10 text-amber-500 py-3 px-6 w-45 rounded-full" : "flex justify-start w-45 py-3 px-6 gap-5 items-start"}>
              <i id={clicked.includes("/dashboard/transactions") ? "yellow-color" : "white-color"}  className="icon ion-md-cash" title="Cash"></i>
              <h1 className={clicked.includes("/dashboard/transactions") ? " " : "text-gray-100/70"}>Transactions</h1>
            </Link>
          </div>

          <div onClick={() => setClicked('/dashboard/preferences/website')}>
            <Link href="/dashboard/preferences/website" 
            className={clicked.includes("/dashboard/preferences") ? "flex justify-start font-bold gap-5 items-start bg-amber-500/10 text-amber-500 py-3 px-6 w-45 rounded-full" : "flex justify-start w-45 py-3 px-6 gap-5 items-start"}>
              <i id={clicked.includes("/dashboard/preferences") ? "yellow-color" : "white-color"}  className="icon ion-md-brush" title="Design"></i>
              <h1 className={clicked.includes("/dashboard/preferences") ? " " : "text-gray-100/70"}>Preferences</h1>
            </Link>
          </div>

          <div onClick={() => setClicked('/dashboard/messages')}>
            <Link href="/dashboard/messages" 
            className={clicked.includes("/dashboard/messages") ? "flex justify-start font-bold gap-5 items-start bg-amber-500/10 text-amber-500 py-3 px-6 w-45 rounded-full" : "flex justify-start w-45 py-3 px-6 gap-5 items-start"}>
              <i id={clicked.includes("/dashboard/messages") ? "yellow-color" : "white-color"}  className="icon ion-md-chatbubbles" title="Chat Bubbles"></i>
              <h1 className={clicked.includes("/dashboard/messages") ? " " : "text-gray-100/70"}>Messages</h1>
            </Link>
          </div>

          <div onClick={() => setClicked('/dashboard/reviews')}>
            <Link href="/dashboard/reviews" 
            className={clicked.includes("/dashboard/reviews") ? "flex justify-start font-bold gap-5 items-start bg-amber-500/10 text-amber-500 py-3 px-6 w-45 rounded-full" : "flex justify-start w-45 py-3 px-6 gap-5 items-start"}>
              <i id={clicked.includes("/dashboard/reviews") ? "yellow-color" : "white-color"}  className="icon ion-md-star-half" title="Star"></i>
              <h1 className={clicked.includes("/dashboard/reviews") ? " " : "text-gray-100/70"}>Reviews</h1>
            </Link>
          </div>
          
          <div onClick={() => setClicked('/dashboard/preferences/developer')}>
              <Link href="/dashboard/preferences/developer" 
              className="m-auto mt-6 mb-4">{`</> Developer`}</Link>
          </div>
          <div className="flex justify-between items-center gap-3">
              <button onClick={handleSignOut} className="bg-red-400 rounded-full px-6 py-2 font-bold">SignOut</button>
              <a target="_blank" href="https://help.logistix.africa/?business=cakenus">🛈 Help</a>
          </div>
         </div>
         </div>
    )
  }