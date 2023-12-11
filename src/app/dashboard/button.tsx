
type BUTTON = {
    buttonName: string;
    handleClick?: any;
    type?: string | any;
    id?: string;
}

export default function Button({buttonName, id, type, handleClick}: BUTTON) {
    return(
        <button 
        type={type}
        onClick={handleClick} 
        // className="cursor-pointer font-bold text-gray-50 bg-green-600/80 
        // shadow-lg px-7 py-2 rounded-3xl select-none
        // active:translate-y-1 active:[box-shadow:0_0px_0_0_#16a34a,0_0px_0_0_#16a34a]
        // active:border-b-[0px] w-full
        // transition-all duration-150 [box-shadow:0_5px_0_0_#16a34a,0_2px_0_0_#16a34a]
        // border-[1px] border-green-600">
        className={id === "failed" ? "cursor-pointer phone:text-sm tablet:text-base font-bold text-gray-50 bg-red-600/80 shadow-lg phone:px-4 tablet:px-7 py-2 rounded-3xl select-none active:translate-y-1 active:[box-shadow:0_0px_0_0_#8B0000,0_0px_0_0_#8B0000] active:border-b-[0px] transition-all duration-150 [box-shadow:0_5px_0_0_#8B0000,0_2px_0_0_#8B0000] border-[1px] border-red-600" : 
        "cursor-pointer font-bold text-gray-50 bg-green-600/80 shadow-lg px-7 py-2 rounded-3xl select-none active:translate-y-1 active:[box-shadow:0_0px_0_0_#16a34a,0_0px_0_0_#16a34a] active:border-b-[0px] transition-all duration-150 [box-shadow:0_5px_0_0_#16a34a,0_2px_0_0_#16a34a] border-[1px] border-green-600"}>
            {buttonName}
        </button>
    )
}