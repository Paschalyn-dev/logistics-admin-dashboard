export type BUTTON = {
    buttonName?: string;
    successmessage?: string;
    failedmessage?: string;
    errormessage?: string;
    handleClick?: any;
    title?: boolean;
    name?: any;
    code?: any;
    mutate?: any;
    error?: any;
}

export type HANDLESUCCESSMESSAGETYPE = {
    successmessage?: string;
    failedmessage?: string;
    errormessage?: string;
    id?: string;
    code?: number;
    handleClick?: any;
    title?: boolean;
    name?: any;
    mutate?: any;
    error?: any;
    successMessage?: boolean;
    setSuccessMessage?: any;
}