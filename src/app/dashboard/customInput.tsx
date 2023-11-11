import { useField } from "formik";

type CUSTOMINPUT = {
    label: string;
    id: string;
    type: string;
    name: string;
    value: any;
    handleChange: any;
    // [x: string]: any; name: string; 
}

export default function CustomInput({label, id, name, value, handleChange, type, ...props}: CUSTOMINPUT){
    // const [meta] = useField(props);
    return(
        <div className="flex mb-8 mt-2 text-gray-500 gap-2 flex-col ">
            <label htmlFor={name}>{label}</label>
            <input
                className="bg-gray-100 p-2 outline-0"
                id={id}
                name={name}
                type={type}
                onChange={handleChange}
                value={value}
            />
        </div>
    )
}