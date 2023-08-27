import { useField } from "formik";

type TEXTINPUT = {
    label: string, 
    id?:string, 
    stringPassword?:boolean, 
    handlePasswordString?: any, 
    [x: string]: any; name: string; 
}

export default function TextArea ({label, id, stringPassword, handlePasswordString, ...props}: TEXTINPUT) {
    const [field, meta] = useField(props);
    return(
        <div className="flex mb-8 mt-2 text-gray-500 gap-2 flex-col ">
            <label htmlFor={props.name}>{label}</label>
            <textarea id="input" className="text-area" {...field} {...props} />

            {
                meta.touched && meta.error ? (
                    <div className="error">
                        <p className="text-red-500 animate__animated animate__shakeX">{meta.error}</p>
                    </div> 
                ) : null
            }
        </div>
    );
}