export type BUTTON = {
    buttonName?: string;
    handleClick?: any;
    successmessage?: string;
    failedmessage?: string;
    errormessage?: string;
    id?: string;
    code?: number;
    mutate?: any;
    error?: any;
}

export type HANDLESUCCESSMESSAGETYPE = {
    successmessage?: string;
    failedmessage?: string;
    errormessage?: string;
    id?: string;
    code?: number;
    mutate?: any;
    error?: any;
    successMessage?: boolean;
    setSuccessMessage?: any;
}