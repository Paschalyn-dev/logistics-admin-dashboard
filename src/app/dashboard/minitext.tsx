type MINITEXT = {
    minitext: string | number | Date | any;
}

export default function MiniText({minitext}: MINITEXT){
    return(
        <>
        <h1 className="text-base text-gray-600 text-black">{minitext}</h1>
        </>
    )
}