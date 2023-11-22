import { useField } from 'formik';

export default function UploadFile({document, label, ...props}: {label: string, [x: string]: any; name: string; }){
    const [field, meta] = useField(props);

    return(
        <>
            <div className="flex mb-8 mt-2 text-gray-500 gap-2 flex-col ">
                <label htmlFor={props.name}>{label}</label>
                <input accept='image/*' className='file-input' {...field} {...props} />
                <p className='cursor-not-allowed text-gray-400'>{document || ""}</p>
                { meta.touched && meta.error ? (
                <div className="error">
                    <p className="text-red-500 animate__animated animate__shakeX">{meta.error}</p>
                </div>  
                ) : null }
            </div>
        </>
    );
};