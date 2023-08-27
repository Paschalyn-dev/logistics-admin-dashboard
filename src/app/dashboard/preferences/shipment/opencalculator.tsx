export default function OpenCalculator({handleNoShow}: any){
    return(
        <>
        <div className="cursor-pointer phone:bg-gray-50 -ml-16 z-20 right-0 bottom-0 fixed -mt-20 h-full w-full"></div>
            <div className="fixed z-30 animate__animated animate__slideInLeft phone:pl-14 tablet:pl-5 laptop:pl-0 flex justify-center items-center phone:h-screen laptop:h-screen top-0 bottom-0 phone:-ml-16 laptop:w-4/6 after-tablet:w-10/12 after-tablet:ml-5 laptop:ml-0 tablet:w-full phone:w-full">
                <div className="mt-20">
                    <span onClick={handleNoShow} className="absolute cursor-pointer top-24 right-5 text-2xl"> <i className="icon ion-md-close"></i> </span>
                    <div className="flex flex-col p-4 w-full justify-center items-center ">
                        <h1 className="font-bold text-center phone:text-2xl tablet:text-4xl">Distance Calculator</h1>
                        <p className="phone:text-sm tablet:text-lg laptop:text-base phone:font-thin tablet:font-normal text-center">Enter the source and destination of the places whose distances (in km) you wish to estimate.</p>
                        <div className="flex flex-col justify-start w-full tablet:text-lg phone:text-base mt-8 gap-4">
                            <label htmlFor="start_location">Start Location</label>
                            <input type="text" className="w-full h-12 rounded-lg p-4 bg-gray-200/20 outline-0" placeholder="Enter Location" name="start_location" id="start_location" />
                            <label htmlFor="end_location">End Location</label>
                            <input type="text" className="w-full h-12 rounded-lg p-4 bg-gray-200/20 outline-0" placeholder="Enter Location" name="end_location" id="end_location" />
                    </div>

                    <div className="mt-10 text-center">
                        <p className="font-thin text-sm">Estimated Distance</p>
                        <h1 className="font-bold text-4xl">0<span className="text-xs ml-1">KM</span></h1>
                    </div>
            </div>

            <div className="flex justify-end mr-5 phone:mt-5 tablet:mt-0 gap-8 items-center">
                <button className="text-red-500 font-bold" onClick={handleNoShow}>Close</button>
                <button
                className="cursor-pointer text-gray-50 bg-green-600/80 shadow-lg px-7 py-2 rounded-3xl select-none
                active:translate-y-1 active:[box-shadow:0_0px_0_0_#16a34a,0_0px_0_0_#16a34a]
                active:border-b-[0px]
                transition-all duration-150 [box-shadow:0_5px_0_0_#16a34a,0_2px_0_0_#16a34a]
                border-[1px] border-green-600">Estimate</button>
            </div>
            </div>
        </div>
        </>
    )
}