export default function DefaultInput({name, value, onChange, type, className}: any){
    return(
        <input name={name} value={value} onChange={onChange} type={type} className={className ? className : "w-full mt-2 mb-10 bg-gray-100 p-3 rounded-lg outline-0"} />
    )
}