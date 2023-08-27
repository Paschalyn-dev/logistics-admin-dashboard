export default function BoxesHolder({children}: any){
    return(
        <div className="flex flex-wrap phone:justify-center tablet:justify-between laptop:justify-start items-start mt-7 gap-7 w-full">
            {children}
        </div>
    )
}