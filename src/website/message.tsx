import Input from "@/app/dashboard/input";
import Label from "@/app/dashboard/preferences/website/label";
import DefaultInput from "@/app/dashboard/profile/input";
import { useEffect, useState } from "react";

export default function Message(){
    const [mywindow, setWindow] = useState<any>(0)
    useEffect(function onFirstMount() {
        function checkWidth(){
          setWindow(window.innerWidth);
        }
        window.addEventListener("resize", checkWidth);
        return () => window.removeEventListener('resize', checkWidth);
      });
    
      useEffect(() => {
        setWindow(window.innerWidth);
      }, []);
    return(
        <div className="w-full my-20 flex flex-col items-center bg-gray-50 justify-center">
            <div className="p-10">
                <h1 className="phone:text-2xl font-semibold" id={ mywindow > 760 ? "reviews" : ""}>Send Us A Message.</h1>
                <p className="mt-3 w-2/12 phone:text-sm tablet:text-lg">Do you have any complaints or message you wish to get across to us? Send it to us using the form below.</p>
                <form className="mt-20 text-left">
                    <Label htmlFor="name" text="Name" />
                    <DefaultInput name="name" value="" />

                    <Label htmlFor="email" text="Email" />
                    <DefaultInput name="email" value="" />

                    <Label htmlFor="message" text="Message" />
                    <DefaultInput name="message" value="" />

                    <button className="rounded-3xl bg-black text-gray-50 w-full p-3">Send</button>
                </form>
            </div>
        </div>
    )
}