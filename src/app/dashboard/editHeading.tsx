import { SUBHEADING } from "./preferences/website/subheading";

export default function EditHeading({subheading}: SUBHEADING){
    return(
        <>
        <h1 className="phone:text-lg laptop:text-xl mt-12 text-black">{subheading}</h1>
        </>
    )
}