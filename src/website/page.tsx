'use client'
import Footer from './footer';
import DefaultBody from "./mainbody";
import NavWebsite from "./nav";
import CustomerReviews from "./reviews";

export default function Website(){
    return(
        <div className="w-full relative overflow-x-hidden">
            {/* <img
            alt="background" 
            id="opacity"
            src="https://as2.ftcdn.net/v2/jpg/01/99/79/91/1000_F_199799127_0ZCUDkCD1NQQ65jvcY4sO1sxOdN5cpOT.jpg" 
            className="opacity-10 absolute -z-1 w-screen h-screen"
            /> */}
            <NavWebsite />
            <DefaultBody />  
            <CustomerReviews />
            <Footer />
        </div>
    )
}