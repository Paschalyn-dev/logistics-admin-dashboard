export type SUBHEADING = {
    subheading: string;
}

export default function SubHeading({subheading}: SUBHEADING){
    return(
        <>
        <h1 className="phone:text-xl laptop:text-2xl mt-12 text-black">{subheading}</h1>
        </>
    )
}