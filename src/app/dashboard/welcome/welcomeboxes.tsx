type Welcome = {
    step: string;
    heading: string;
    text: string;
    icon: string;
    title: string;
    img: string | any;
    imageText: string;
}

export default function WelcomeBoxes({step, heading, text, icon, title, img, imageText}: Welcome){
    return(
    <>
        <head>
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
            />
        </head>

        <div className="w-full h-52 flex justify-between items-start rounded-3xl bg-green-100/70">
            <div className="flex p-6 flex-col justify-between items-start h-full">
                <div className="flex justify-start items-center gap-2">
                    <span className="bg-white cursor-pointer text-gray-500/50 py-1 px-3 text-lg rounded-full ">
                        <i className={icon} title={title}></i>
                    </span>
                    <h2 className="font-semibold text-green-500">{step}</h2>
                </div>  
                <div>
                    <h1 className="laptop:text-xl phone:text-lg font-medium">{heading}</h1>  
                    <p className="text-gray-500 phone:text-sm laptop:text-base">{text}</p>    
                </div>        
            </div>
            <img src={img} className="w-fit h-fit p-8 animate__animated animate__zoomInRight phone:hidden laptop:block h-full w-fit tablet:block" alt={imageText} />            
        </div>
    </>
    )
}