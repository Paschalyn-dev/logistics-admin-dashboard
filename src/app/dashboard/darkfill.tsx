export default function DarkFill({handleNoShow, item}: any){
    return(
        <div onClick={() => handleNoShow(false)} title={`To collapse the ${item}, click here.`} 
        className="cursor-pointer bg-black -ml-10 z-20 brightness-50 bottom-0 opacity-60 fixed -mt-20 h-screen w-screen "></div>  
    )
}