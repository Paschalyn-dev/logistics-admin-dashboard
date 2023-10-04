'use client';
import Link from "next/link";
import '../globals.css';
import { useState, useEffect } from "react";
import { logout } from "./services/libs/staff-auth";
import { customerLogout } from "./services/libs/customer-auth";
import { useParams, useRouter } from "next/navigation";
// import SuccessMessage from "./successmessage";

export default function Sidebar() {
  const [clicked, setClicked] = useState<any>('welcome');
  const [windowWidth, setWindowWidth]= useState<number>(0);
  const router = useRouter();
  const params = useParams();
  function handleSignOut(){
    logout();
    customerLogout();
    router.replace('/');
  }
  console.log(decodeURIComponent(params.source), "decodeparams")
  console.log(params.source, "params")
  useEffect(function onFirstMount() {
    function checkWidth(){
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  });

  useEffect(() => {
    const page = localStorage.getItem('page');
    if(page) {
      setClicked(JSON.parse(page))
      // router.replace(`/dashboard/${JSON.parse(page)}`);
    }
    setWindowWidth(window.innerWidth);
  }, []);
  
  useEffect(() => {
    localStorage.setItem('page', JSON.stringify(clicked))
  }, [clicked]);

    return(
      <div className={ windowWidth <= 1025 ? "animate__animated animate__slideInLeft fixed flex flex-col justify-start items-center z-20 top-0 bottom-0 left-0 text-white w-fit h-full bg-stone-900 text-center shadow-lg" : "fixed flex flex-col justify-start items-center z-20 top-0 bottom-0 left-0 text-white w-fit h-full bg-stone-900 text-center shadow-lg"}>
        <div className="z-20 sticky h-fit w-fit bg-stone-900 py-8 px-12 shadow">
          <img src="https://cakenus.logistix.africa/logo-icon.svg" alt="logo" className="w-12 m-auto mb-3" />
          <h4 className="font-bold mb-1">CakenUs Services</h4>
          <div className="flex justify-around items-center gap-1">
            <p className="font-light text-xs p-1 border mt-1 border-gray-700 shadow rounded-full">Super Administrator</p>
            <span><i className="icon ion-md-globe" title="Globe"></i></span>
          </div>
        </div>
        
        <div className=" z-10 relative overflow-y-auto h-fit laptop:h-4/6 scroll-smooth bg-stone-900 p-8 flex flex-col w-fit justify-start items-start gap-2 phone:p-9 phone:text-sm tablet:text-base laptop:text-base desktop:text-xl bigger-desktop:text-2xl">   
          <div onClick={() => setClicked('welcome')} >
            <Link href="/dashboard/welcome" 
            className={clicked === "welcome" ? "flex justify-start font-bold gap-5 items-start bg-amber-500/10 text-amber-500 py-3 px-6 w-45 rounded-full" : "flex justify-start w-45 py-3 px-6 gap-5 items-start"}>
              <i id={clicked ==="welcome" ? "yellow-color" : "white-color"} className="icon ion-md-medal" title="Medal"></i>
              <h1 className={clicked === "welcome" ? " " : "text-gray-100/50"}>Welcome</h1>
            </Link>
          </div>

         
          <div onClick={() => setClicked('home/overview')}>
            <Link href="/dashboard/home/overview" 
              className={clicked === "home/overview" ? "flex justify-start font-bold gap-5 items-start bg-amber-500/10 text-amber-500 py-3 px-6 w-45 rounded-full" : "flex justify-start w-45 py-3 px-6 gap-5 items-start"}>
                <i id={clicked === "home/overview" ? "yellow-color" : "white-color"} className="icon ion-md-home" title="Home"></i>
                <h1 className={clicked === "home/overview" ? " " : "text-gray-100/70"}>Home</h1>
            </Link>
          </div>
          
          <div onClick={() => setClicked('shipments/active')}>
            <Link href="/dashboard/shipments/active" 
            className={clicked === "shipments/active" ? "flex justify-start font-bold gap-5 items-start bg-amber-500/10 text-amber-500 py-3 px-6 w-45 rounded-full" : "flex justify-start w-45 py-3 px-6 gap-5 items-start"}>
                <i id={clicked ==="shipments/active" ? "yellow-color" : "white-color"} className="icon ion-md-cube" title="Cube"></i>
                <h1 className={clicked === "shipments/active" ? " " : "text-gray-100/70"}>Shipments</h1>
            </Link>
          </div>

          <div onClick={() => setClicked('customers')}>
            <Link href="/dashboard/customers" 
            className={clicked === "customers" ? "flex justify-start font-bold gap-5 items-start bg-amber-500/10 text-amber-500 py-3 px-6 w-45 rounded-full" : "flex justify-start w-45 py-3 px-6 gap-5 items-start"}>
                <i id={clicked ==="customers" ? "yellow-color" : "white-color"} className="icon ion-md-people" title="People"></i>
                <h1 className={clicked === "customers" ? " " : "text-gray-100/70"}>Customers</h1>
            </Link>
          </div>

          <div onClick={() => setClicked('dispatchers')}>
            <Link href="/dashboard/dispatchers" 
            className={clicked === "dispatchers" ? "flex justify-start font-bold gap-5 items-start bg-amber-500/10 text-amber-500 py-3 px-6 w-45 rounded-full" : "flex justify-start w-45 py-3 px-6 gap-5 items-start"}>
                <i id={clicked ==="dispatchers" ? "yellow-color" : "white-color"} className="icon ion-md-bicycle" title="Dispatcher"></i>
                <h1 className={clicked === "dispatchers" ? " " : "text-gray-100/70"}>Dispatchers</h1>
            </Link>
          </div>

          <div onClick={() => setClicked('administrators')}>
            <Link href="/dashboard/administrators" 
            className={clicked === "administrators" ? "flex justify-start font-bold gap-5 items-start bg-amber-500/10 text-amber-500 py-3 px-6 w-45 rounded-full" : "flex justify-start w-45 py-3 px-6 gap-5 items-start"}>
              <i id={clicked ==="administrators" ? "yellow-color" : "white-color"} className="icon ion-md-contacts" title="Administrators"></i>
              <h1 className={clicked === "administrators" ? " " : "text-gray-100/70"}>Administrators</h1>
            </Link>
          </div>

          <div onClick={() => setClicked('transactions')}>
            <Link href="/dashboard/transactions" 
            className={clicked === "transactions" ? "flex justify-start font-bold gap-5 items-start bg-amber-500/10 text-amber-500 py-3 px-6 w-45 rounded-full" : "flex justify-start w-45 py-3 px-6 gap-5 items-start"}>
              <i id={clicked ==="transactions" ? "yellow-color" : "white-color"}  className="icon ion-md-cash" title="Cash"></i>
              <h1 className={clicked === "transactions" ? " " : "text-gray-100/70"}>Transactions</h1>
            </Link>
          </div>

          <div onClick={() => setClicked('preferences/website')}>
            <Link href="/dashboard/preferences/website" 
            className={clicked === "preferences/website" ? "flex justify-start font-bold gap-5 items-start bg-amber-500/10 text-amber-500 py-3 px-6 w-45 rounded-full" : "flex justify-start w-45 py-3 px-6 gap-5 items-start"}>
              <i id={clicked ==="preferences/website" ? "yellow-color" : "white-color"}  className="icon ion-md-brush" title="Design"></i>
              <h1 className={clicked === "preferences/website" ? " " : "text-gray-100/70"}>Preferences</h1>
            </Link>
          </div>

          <div onClick={() => setClicked('messages')}>
            <Link href="/dashboard/messages" 
            className={clicked === "messages" ? "flex justify-start font-bold gap-5 items-start bg-amber-500/10 text-amber-500 py-3 px-6 w-45 rounded-full" : "flex justify-start w-45 py-3 px-6 gap-5 items-start"}>
              <i id={clicked ==="messages" ? "yellow-color" : "white-color"}  className="icon ion-md-chatbubbles" title="Chat Bubbles"></i>
              <h1 className={clicked === "messages" ? " " : "text-gray-100/70"}>Messages</h1>
            </Link>
          </div>

          <div onClick={() => setClicked('reviews')}>
            <Link href="/dashboard/reviews" 
            className={clicked === "reviews" ? "flex justify-start font-bold gap-5 items-start bg-amber-500/10 text-amber-500 py-3 px-6 w-45 rounded-full" : "flex justify-start w-45 py-3 px-6 gap-5 items-start"}>
              <i id={clicked ==="reviews" ? "yellow-color" : "white-color"}  className="icon ion-md-star-half" title="Star"></i>
              <h1 className={clicked === "reviews" ? " " : "text-gray-100/70"}>Reviews</h1>
            </Link>
          </div>

          {/* {
              successMessage.signOut &&
              <SuccessMessage
              messageTitle="Sign out successful!"
              name="signOut"
              successMessageShow={successMessage.signOut}
                />
          } */}
          
          <Link href="/dashboard/preferences/developer" 
          className="m-auto mt-6 mb-4">{`</> Developer`}</Link>
          <div className="flex justify-between items-center gap-3">
              <button onClick={handleSignOut} className="bg-red-400 rounded-full px-6 py-2 font-bold">SignOut</button>
              <a target="_blank" href="https://help.logistix.africa/?business=cakenus">🛈 Help</a>
          </div>
         </div>
         </div>
    )
  }