type GLP = {
    title: string;
    loadingSearching?: string;
}
export default function SkeletonLoading({title, loadingSearching}: GLP){

    return(
        <>
            <div className="z-50 fixed top-3 animate__animated animate__slideInDown flex justify-center items-center phone:w-full laptop:w-8/12">
                <button className="px-3 py-2 flex gap-2 justify-center items-center shadow-sm w-fit rounded-full bg-gray-50 text-center disabled">
                    <i className="icon ion-md-refresh text-xl animate-spin"></i>
                    <h1 className="font-bold">{loadingSearching ? loadingSearching : 'Fetching'} {title}...</h1> 
                </button>
                </div>
        </>
    )
}