export default function Label({htmlFor, text}: any){
    return(
    <label htmlFor={htmlFor} className="text-gray-500 text-base">{text}</label>
    )
}