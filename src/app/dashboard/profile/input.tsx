export default function DefaultInput({name, value, onChange, type, className}: any){
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return(
        <div>
            {
                type !== 'email' &&
                <input name={name} value={value} onChange={onChange} type={type} className={className ? className : "w-full mt-2 mb-10 bg-gray-100 p-3 rounded-lg outline-0"} />
            }
            {
                type === "email" &&
                <div className="mb-10">
                    <input name={name} value={value} onChange={onChange} type={type} className={className ? className : "w-full mt-2 bg-gray-100 p-3 rounded-lg outline-0"} />
                    { value.length > 0 && !emailRegex.test(value) && <p className="animate__animated animate__shakeX text-red-400 font-thin text-sm">The email you entered is not valid.</p> }
                </div>
            }
        </div>
    )
}