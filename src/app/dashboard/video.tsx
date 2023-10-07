import DarkFill from "./darkfill"

export default function Video({showvideo}: any){
    return(
        <div>
        <DarkFill handleNoShow={showvideo} />
        <div> 
        <div className="fixed z-30 flex justify-center items-center phone:h-screen laptop:h-screen top-0 bottom-0 phone:-ml-10  laptop:w-3/4 after-tablet:w-10/12 after-tablet:ml-5 laptop:ml-0 tablet:w-full phone:w-full">
            <div className="laptop:w-full h-screen z-30 gap-3 flex justify-center flex-col items-center phone:w-full mt-16 p-4">
                <div className="flex flex-row-reverse justify-between w-full items-center">
                    <div title="Click here to collapse this video" onClick={() => showvideo(false)} 
                    className="laptop:px-4 laptop:py-1 shadow-sm rounded-full laptop:bg-amber-500/50 laptop:text-5xl phone:text-3xl tablet:text-4xl cursor-pointer text-white">
                        <i className="icon ion-md-close"></i>
                    </div> 
                    <h1 className="font-bold w-full laptop:text-3xl text-center tablet:text-2xl phone:text-lg mb-5 text-white">How to setup your business</h1>
                </div>
                    <video className="rounded-xl animate__animated animate__zoomIn shadow-xl" autoPlay controls playsInline>
                        <source src="https://res.cloudinary.com/echwood/video/upload/v1652312625/Logistix/videos/product-education/setup-business.mp4" type="video/mp4" />
                            How to setup your business.
                    </video>
            </div>
        </div>
        </div>
        </div>
    )
}