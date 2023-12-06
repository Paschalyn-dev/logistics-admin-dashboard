type Welcome = {
    step: string;
    heading: string;
    linkName: string;
    text: string;
    icon: string;
    title: string;
    img: string | any;
    imageText: string;
    link: string;
}
import Link from "next/link";

export default function WelcomeBoxesDefault({step, heading, text, linkName, icon, title, img, link, imageText}: Welcome){
    return(
        <div className="h-fit w-full py-5 rounded-3xl bg-gray-300/70">
            <div className="w-full h-52 flex justify-between items-start ">
                <div className="flex p-6 flex-col justify-between items-start h-full">
                    <div className="flex justify-start items-center gap-2">
                        <span className="bg-white cursor-pointer text-gray-500/50 py-1 px-3 text-lg rounded-full ">
                            <i className={icon} title={title}></i>
                        </span>
                        <h2 className="font-semibold text-gray-600">{step}</h2>
                    </div>  
                    <div>
                        <h1 className="laptop:text-xl phone:text-lg font-medium">{heading}</h1>  
                        <p className="text-gray-500 phone:text-sm laptop:text-base">{text}</p>    
                    </div>        
                </div>
                <img src={img} className="w-3/12 p-8 animate__animated animate__zoomInRight phone:hidden laptop:block h-full tablet:block" alt={imageText} />            
            </div>
            <div className="flex flex-col w-fit pl-5 justify-center items-center">

                <Link href={link}
                className="cursor-pointer font-bold text-gray-50 bg-gray-600/80 
                shadow-lg px-7 py-2 rounded-3xl select-none
                active:translate-y-1 active:[box-shadow:0_0px_0_0_#36454F,0_0px_0_0_#16a34a]
                active:border-b-[0px] 
                transition-all duration-150 [box-shadow:0_5px_0_0_#36454F,0_2px_0_0_#16a34a]
                border-[1px] border-gray-600">
                    {linkName}
                </Link>
            </div>
        </div>
    )
}