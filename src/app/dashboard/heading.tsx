type Header = {
  heading: string;
}
export default function Heading({heading}: Header){
    return(
        <div>
          <h1 
          className="w-fit font-bold phone:text-2xl tablet:text-2xl laptop:text-3xl desktop:text-4xl bigger-desktop:text-5xl my-5">
            {heading}
          </h1>
        </div>
    )
}