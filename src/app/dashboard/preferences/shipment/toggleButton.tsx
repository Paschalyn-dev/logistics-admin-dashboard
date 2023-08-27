type TBTN = {
    title: string;
    handleOnOff?: any;
    onOff?: boolean;
    description?: string;
    icon?: string;
}

export default function ToggleButton({title, icon, onOff, description, handleOnOff}: TBTN){
    return(
        <>
        <head>
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
            />
        </head>
        <div onClick={handleOnOff} className="flex cursor-pointer justify-start items-center my-5 gap-2">
            <div className={onOff ? "rounded-3xl animate__animated animate__fadeIn animate__faster bg-amber-500 h-7 shadow relative w-12 p-1 shadow-inner" : "rounded-3xl shadow bg-gray-50 h-7 w-12 p-1 shadow-inner"}>
                <button className={onOff ? "w-5 animate__animated animate__slideInLeft rounded-3xl right-1 absolute bg-white shadow h-5" : "w-5 rounded-3xl animate__animated animate__slideInRight bg-white shadow h-5"}></button>
            </div>
            <div>
               { title && <p className="font-thin">{title}</p>}
               { description && icon && 
                <p className="mt-1 text-xs">
                        <span className=" text-sm mr-1 text-gray-500">
                        <i className={icon}></i>
                        </span>{description}
                </p>
               }
            </div>
        </div>
        </>
    )
}