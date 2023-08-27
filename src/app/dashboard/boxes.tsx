
type Boxes = {
    icon: string;
    title: string;
    amount: number | string;
    name: string;
}
export default function Boxes({icon, title, amount, name}:Boxes){
    return(
        <div className="flex animate__animated animate__bounceIn justify-between flex-col items-start tablet:h-36 laptop:h-40 phone:h-36 phone:w-full tablet:w-1/4 laptop:w-1/6 desktop:w-1/12 bigger-desktop:w-1/12 bg-gray-50 shadow-xs rounded-2xl p-5 ">
          <div className="flex flex-col justify-between gap-4 items-start animate__animated animate__bounceIn">
            <div className="rounded-full shadow-sm w-fit px-3 py-1 text-2xl text-gray-500 bg-gray-100 ">
                 <i className={icon} title={name}></i>
            </div>
            <div>
                <p className="text-gray-500 text-sm">{title}</p>
                <h1>{amount}</h1>
            </div>
          </div>
         </div>
    )
}