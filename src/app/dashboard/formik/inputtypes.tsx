import { useField } from "formik";

type TEXTINPUT = {
    label: string, 
    id?:string, 
    stringPassword?:boolean, 
    handlePasswordString?: any, 
    [x: string]: any; name: string; 
}

export default function TextInput ({label, id, stringPassword, handlePasswordString, ...props}: TEXTINPUT) {
    const [field, meta] = useField(props);
    return(
        <div className="flex mb-8 mt-2 text-gray-500 gap-2 flex-col ">
            <label htmlFor={props.name}>{label}</label>
            <input id="input" className="text-input" {...field} {...props} />

            { (id === "password" || id === "defaultPassword") &&
            <span id={id} onClick={() => handlePasswordString(!stringPassword)} className="relative bottom-10 cursor-pointer -ml-8 left-full">
                {props.type === "password" ? <i className="icon ion-md-eye"></i> : <i className="icon ion-md-eye-off"></i>}
            </span>
            }

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