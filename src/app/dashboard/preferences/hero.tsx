import Heading from "../heading";

type HERO = {
    icon: string;
    heading: string;
    formHeading?: string;
    description?: string;
    comingsoon?: string;
    children: any;
}

export default function Hero({icon, formHeading, heading, description, comingsoon, children}: HERO){
    return(
    <div className="bg-gray-50 mt-5 p-5 overflow-x-hidden rounded-2xl w-full h-full">
        <div className="bg-gray-50 mt-5 p-5 rounded-2xl w-full h-full">
            <div className="flex phone:flex-col laptop:gap-10 phone:text-center phone:justify-center laptop:justify-start laptop:flex-row phone:items-center laptop:items-center w-full h-fit">
                <span className="rounded-xl flex justify-center items-center bg-gray-200/40 px-6 py-2 h-24 w-28">
                    <i id="bigger" className={icon}></i>
                </span>
                <div className="flex phone:flex-col laptop:flex-col phone:justify-center laptop:justify-start laptop:items-start phone:items-center">
                    <Heading heading={heading} />
                    {formHeading && <p className="text-gray-500">{formHeading.toUpperCase()}</p> }
                    {description && <p className="phone:text-sm laptop:text-base text-gray-500">{description}</p>}
                    {comingsoon && <p className="text-center phone:text-xs tablet:text-sm my-2 bg-green-100 w-fit py-2 px-3 rounded-3xl text-green-600">{comingsoon}</p>}
                </div>
            </div>
        </div>
        <hr className="bg-gray-500 my-8" />
        {children}
    </div>
    )
}