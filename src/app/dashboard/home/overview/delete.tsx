import { type } from "os";
import DarkFill from "../../darkfill";

type DELETE = {
    text: string;
    clearFill: any;
}

export default function Delete({text, clearFill}: DELETE){
    return(
        <>
            <DarkFill />
            <>
                <div className={"fixed z-30 animate__animated animate__bounceIn flex justify-center items-center phone:h-screen laptop:h-screen top-0 bottom-0 phone:-ml-10  laptop:w-3/4 after-tablet:w-10/12 after-tablet:ml-5 laptop:ml-0 tablet:w-full phone:w-full"}>
                    <div className="relative animate__animated text-center animate__headShake z-30 bg-gray-50 p-6 phone:h-fit tablet:h-3/6 mt-10 phone:w-3/4 tablet:w-3/6 rounded-lg">
                        <i id="bigger" className="icon ion-md-checkmark-circle-outline px-6 py-1 border-solid border-4 border-gray-300 rounded-full"></i>
                        <h1 className="laptop:text-4xl phone:text-2xl font-bold pt-5">Done</h1>
                        <p>{text} has been deleted.</p>
                        <div className="flex justify-center gap-2 items-center w-full my-4">
                            <button onClick={() => clearFill((prev: any) => ({...prev, isShow: false}))} className="bg-green-500 border-4 hover:bg-green-600 py-2 text-gray-50 px-3 text-lg rounded-lg">Yes</button>
                        </div>
                    </div>   
                </div>
            </>    
        </>    )
}