import { useField } from 'formik';

export default function Select({label, ...props}: {label: string, [x: string]: any; name: string; }){
    const [field, meta] = useField(props);
    return(
        <div className="flex mb-8 mt-2 text-gray-500 gap-2 flex-col ">
            <label htmlFor={props.name}>{label}</label>
            <select id="input" {...field} {...props} />
            { meta.touched && meta.error ? (
            <div className="error">
                <p className="text-red-500 animate__animated animate__shakeX">{meta.error}</p>
            </div>  
            ) : null }
        </div>
    );
};