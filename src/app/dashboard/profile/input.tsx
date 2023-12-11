export default function DefaultInput({name, value, onChange, type, className}: any){
    return(
        <input name={name} value={value} onChange={onChange} type={type} className={className} />
    )
}