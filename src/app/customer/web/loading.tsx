export default function Loading(){
    return(
        <div className="w-screen relative h-screen overflow-x-hidden">
            <div  
            className="brightness-50 w-screen h-screen"> </div>
            
            <div className="w-full animate-pulse absolute phone:top-0 after-tablet:top-10 laptop:top-0 flex justify-center items-center h-full">
                <div className="tablet:w-2/4 after-tablet:w-1/3 laptop:w-2/4 phone:w-11/12 p-5 rounded-3xl" id="transparent">
                    <div className="flex flex-col justify-center items-center">
                        <div className="w-10 mb-2"></div>
                        <h5 className="text-sm text-gray-800">..............</h5>
                    </div>
                    <div className="mt-5 justify-center font-bold text-2xl flex gap-2 ">.............</div>
                    <p className="text-center text-gray-500">..............</p>
                    <div className="flex mt-6 text-sm w-full text-center gap-5">
                        <div className="bg-yellow-500 text-gray-50 rounded-2xl p-2 w-full">............</div>
                        <div className="bg-gray-50 border text-gray-500 rounded-2xl p-2 w-full">...........</div>
                    </div>
                    <div className="flex flex-col w-full mt-10">
  
                            <form autoComplete="on">

                                <div className="rounded-xl bg-gray-200 mx-2 w-full h-8">
                                </div>

                                <div className="rounded-xl bg-gray-100 mx-2 w-full h-8">
                                </div>
                        
                                <div 
                                className="text-left font-bold text-blue-600 mb-2"
                                >
                                    .........
                                </div>

                                <div className="rounded-xl bg-green-500 mx-2 w-full h-10"></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )   
}