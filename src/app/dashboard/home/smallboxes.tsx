
type Boxes = {
    icon: string;
    title: string;
    amount: number | string;
    name: string;
}
export default function SmallBoxes({icon, title, amount, name}:Boxes){
    return(
        <>      
          <div className="flex justify-between flex-col items-start h-44 w-full bg-white shadow-sm rounded-2xl p-5 ">
            <div className="rounded-full shadow-sm w-fit px-3 py-1 text-2xl text-gray-500 bg-gray-100 ">
                 <i className={icon} title={name}></i>
            </div>
            <div>
                <p className="text-gray-500 text-sm">{title}</p>
                <h1>{amount}</h1>
            </div>
          </div>
        </>
    )
}