type GLP = {
    title?: string;
    icon: string;
}
export default function GeneralLoading({title, icon}: GLP){
    return(
    <div className="flex flex-col justify-center items-center h-screen w-screen">
        <i id='bigger' className={`icon ion-md-${icon} animate-bounce`}></i>
        <h1 className="text-center text-gray-50 font-bold text-lg bg-amber-500 rounded-3xl shadow-xs px-6 py-3">{title}...</h1>
    </div>
    )
}