'use client'
import useSWR from "swr";
import { accountFetcher, cardFetcher, countRidersFetcher, countStaffFetcher, createCustomerFetcher, createDispatcher, createStaffFetcher, deleteBankAccountFetcher, deleteClassicPricing, deleteCustomerFetcher, deleteDispatcherFetcher, deleteDistancePricing, deleteLocationsFetcher, deleteMessagesFetcher, deletePreferenceFetcher, deleteStaffFetcher, fetchCustomersFetcher, fetchMessagesFetcher, fetchStaffFetcher, forgetPasswordFetcher, getBankAccount, getDistancePricing, getLocationsFetcher, locationsFetcher, postDistancePricing, staffLoginFetcher } from "../staff-api/api";
import { STAFFSWRKEYS } from "../swr-keys/staff-keys";
import { changeStaffPasswordFetcher } from "../staff-api/api";
import { login } from "../libs/staff-auth";
import { useRouter } from "next/navigation";
import { staffStore } from "../store/store";

// staffloginswr
export function useStaffLogin(creds: any){
    const router = useRouter();
    const {data, mutate, error } = useSWR(
        STAFFSWRKEYS.staffKey, 
        () => staffLoginFetcher(creds),
        {
            onSuccess: (data) => {
                const user = data.data
                if (data.code === 200 && data.data.isDefaultPassword === false) {
                    login(user.authToken)
                    staffStore.push(user);
                    console.log(staffStore)
                    let timer = setTimeout(() => {
                        router.replace('/dashboard/welcome');
                    }, 5000);
                    () => clearTimeout(timer);
                }
                if(data.code === 200 && data.data.isDefaultPassword === true){
                    router.replace('/staff/web/changepassword')
                    staffStore.push(user);
                }
            }
        }
    );
    const loading = !data && !error;
    const loggedOut = error && error.status === 403;
    return{
        loading,
        error,
        loggedOut,
        staffData: data,
        mutate
    };
}

// forgotpassword swr
export function useForgetPassword(credentials: any){
    const router = useRouter();
    const {
        data,
        error,
        isLoading, 
        mutate,
        isValidating
    } = useSWR(
        STAFFSWRKEYS.forgetPasswordKey,
        () => forgetPasswordFetcher(credentials), {
            onSuccess: (data) => {
                if(data.code === 200){
                    let timer = setTimeout(() => {
                        router.replace('/staff/web/login')
                    }, 6000);
                    () => clearTimeout(timer);
                }
            }
        });

        const loggedOut = error && error.status === 403;      
        return{
            isLoading,
            forgotPasswordError: error,
            forgetPasswordLoggedout: loggedOut,
            forgotPasswordData: data,
            forgotPasswordValidating: isValidating,
            mutate
        };
}


// change password

export function useChangePassword(passwordDetails: any){
    const router = useRouter();
    const {
        data: staffChangePasswordData,
        isLoading,
        mutate,
        isValidating,
        error
    } = useSWR(STAFFSWRKEYS.changePassword, 
        () => changeStaffPasswordFetcher(passwordDetails), {
            onSuccess: (data) => {
                if (data.code === 200) {
                    let timer = setTimeout(() => {
                        router.replace('/dashboard/welcome');
                    }, 6000);
                    () => clearTimeout(timer);
                }
            }
        });

        const changePasswordLoggedOut = error && error.status === 403;
        return{
            changePasswordIsLoading: isLoading,
            staffChangePasswordData,
            changePaswwordMutate: mutate,
            changePasswordIsValidating: isValidating,
            changePasswordError: error,
            changePasswordLoggedOut            
        }
}

export function useCreateCustomer(customerDetails: any){
    const {data, error, isValidating, mutate, isLoading} = useSWR(STAFFSWRKEYS.createCustomer, 
        () => createCustomerFetcher(customerDetails));
        return {
            createCustomerData: data,
            createCustomerError: error,
            createCustomerIsValidating: isValidating,
            createCustomerIsLoading: isLoading,
            createCustomerMutate: mutate
        }
}

export function useCreateStaff(staffDetails: any){
    const {data, error, mutate, isLoading, isValidating} = useSWR(STAFFSWRKEYS.createStaff,
        () => createStaffFetcher(staffDetails));
    return{
        createStaffData: data,
        createStaffError: error,
        createStaffIsValidating: isValidating,
        createStaffIsLoading: isLoading,
        createStaffMutate: mutate
    }
}

export function useFetchStaff(){
    const {data, error, mutate, isLoading, isValidating} = useSWR(STAFFSWRKEYS.fetchStaff, 
        () => fetchStaffFetcher());
    
        return {
            fetchStaffData: data,
            fetchStaffError: error,
            fetchStaffIsLoading: isLoading,
            fetchStaffIsValidating: isValidating,
            fetchStaffMutate: mutate
        }
}


export function useFetchCustomers(){
    const {data, error, isLoading, isValidating, mutate} = useSWR(STAFFSWRKEYS.fetchCustomers, 
        () => fetchCustomersFetcher());

    return {
        fetchCustomersData: data,
        fetchCustomersError: error,
        fetchCustomersIsValidating: isValidating,
        fetchCustomersIsLoading: isLoading,
        fetchCustomersMutate: mutate
    }
}

export function useFetchMessages(){
    const {data, error, isLoading, isValidating, mutate} = useSWR(STAFFSWRKEYS.fetchCustomers, 
        () => fetchMessagesFetcher());
        
        return {
        fetchMessagesData: data,
        fetchMessagesError: error,
        fetchMessagesIsValidating: isValidating,
        fetchMessagesIsLoading: isLoading,
        fetchMessagesMutate: mutate
    }
}

export function useCreateDispatcher(dispatcherDetails: any){
    const {data, error, isLoading, isValidating, mutate} = useSWR(STAFFSWRKEYS.createDispatcher, 
        () => createDispatcher(dispatcherDetails));

    return {
        createDispatcherData: data,
        createDispatcherError: error,
        createDispatcherIsValidating: isValidating,
        createDispatcherIsLoading: isLoading,
        createDispatcherMutate: mutate
    }
}

export function useCountDispatcher(){
    const {data, error, isLoading, isValidating, mutate} = useSWR(STAFFSWRKEYS.countDispatcher, 
        () => countRidersFetcher());

    return {
        countRidersData: data,
        countRidersError: error,
        countRidersIsValidating: isValidating,
        countRidersIsLoading: isLoading,
        countRidersMutate: mutate
    }
}

export function useCountStaff(){
    const {data, error, isLoading, isValidating, mutate} = useSWR(STAFFSWRKEYS.countStaff, 
        () => countStaffFetcher());

    return {
        countStaffData: data,
        countStaffError: error,
        countStaffIsValidating: isValidating,
        countStaffIsLoading: isLoading,
        countStaffMutate: mutate
    }
}

export function useAccountVerify(accountDetails: any){
    const {data, error, isLoading, isValidating, mutate} = useSWR(STAFFSWRKEYS.accountVerify, 
        () => accountFetcher(accountDetails));

    return {
        accountDetailsData: data,
        accountDetailsError: error,
        accountDetailsIsValidating: isValidating,
        accountDetailsIsLoading: isLoading,
        accountDetailsMutate: mutate
    }
}

export function useCardVerify(){
    const {data, error, isLoading, isValidating, mutate} = useSWR(STAFFSWRKEYS.cardVerify, 
        () => cardFetcher());

    return {
        cardVerifyData: data,
        cardVerifyError: error,
        cardVerifyIsValidating: isValidating,
        cardVerifyIsLoading: isLoading,
        cardVerifyMutate: mutate
    }
}

export function useLocations(locations: any){
    const {data, error, isLoading, isValidating, mutate} = useSWR(STAFFSWRKEYS.locations, 
        () => locationsFetcher(locations));

    return {
        locationsData: data,
        locationsError: error,
        locationsIsValidating: isValidating,
        locationsIsLoading: isLoading,
        locationsMutate: mutate
    }
}


export function useFetchLocations(){
    const {data, isLoading, isValidating, mutate, error} = useSWR(STAFFSWRKEYS.fetchLocations, 
        () => getLocationsFetcher());
    return{
        getLocationsData: data,
        getLocationsError: error,
        getLocationsIsValidating: isValidating,
        getLocationsIsLoading: isLoading,
        getLocationsMutate: mutate
    }
}

export function usePostDistancePricing(distancePrice: any){
    const {data, isLoading, isValidating, mutate, error} = useSWR(STAFFSWRKEYS.postDistancePricing, 
        () => postDistancePricing(distancePrice));
    return{
        postDistancePriceData: data,
        postDistancePriceError: error,
        postDistancePriceIsValidating: isValidating,
        postDistancePriceIsLoading: isLoading,
        postDistancePriceMutate: mutate
    }
}


export function useGetDistancePricing(){
    const {data, mutate, isLoading, isValidating, error} = useSWR(STAFFSWRKEYS.getDistancePricing, 
        () => getDistancePricing());

        return{        
            getDistancePriceData: data,
            getDistancePriceError: error,
            getDistancePriceIsValidating: isValidating,
            getDistancePriceIsLoading: isLoading,
            getDistancePriceMutate: mutate 
        }
}


export function useGetBankAccount(){
    const {data, mutate, isLoading, isValidating, error} = useSWR(STAFFSWRKEYS.getBankAccount, 
        () => getBankAccount());

        return{        
            getBankAccountData: data,
            getBankAccountError: error,
            getBankAccountIsValidating: isValidating,
            getBankAccountIsIsLoading: isLoading,
            getBankAccountIsMutate: mutate 
        }
}


export function useDeleteCustomer(id: number){
    const {data, error, mutate, isLoading, isValidating} = useSWR(STAFFSWRKEYS.deleteCustomer, 
        () => deleteCustomerFetcher(id));
    return{
        deleteCustomerData: data,
        deleteCustomerError: error,
        deleteCustomerMutate: mutate,
        deleteCustomerIsLoading: isLoading,
        deleteCustomerIsValidating: isValidating 
    }
}

export function useDeleteStaff(id: number){
    const router = useRouter();
    const {data, error, mutate, isLoading, isValidating} = useSWR(STAFFSWRKEYS.deleteStaff, 
        () => deleteStaffFetcher(id));
    return{
        deleteStaffData: data,
        deleteStaffError: error,
        deleteStaffMutate: mutate,
        deleteStaffIsLoading: isLoading,
        deleteStaffIsValidating: isValidating 
    }
}

export function useDeleteDispatcher(id: number){
    const {data, error, mutate, isLoading, isValidating} = useSWR(STAFFSWRKEYS.deleteDispatcher, 
        () => deleteDispatcherFetcher(id));
    return{
        deleteDispatcherData: data,
        deleteDispatcherError: error,
        deleteDispatcherMutate: mutate,
        deleteDispatcherIsLoading: isLoading,
        deleteDispatcherIsValidating: isValidating 
    }
}


export function useDeleteBankAccount(id: number){
    const {data, error, mutate, isLoading, isValidating} = useSWR(STAFFSWRKEYS.deleteAccount, 
        () => deleteBankAccountFetcher(id));
    return{
        deleteBankAccountData: data,
        deleteBankAccountError: error,
        deleteBankAccountMutate: mutate,
        deleteBankAccountIsLoading: isLoading,
        deleteBankAccountIsValidating: isValidating 
    }
}

export function useDeleteMessages(id: number){
    const {data, error, mutate, isLoading, isValidating} = useSWR(STAFFSWRKEYS.deleteMessages, 
        () => deleteMessagesFetcher(id));
    return{
        deleteMessagesData: data,
        deleteMessagesError: error,
        deleteMessagesMutate: mutate,
        deleteMessagesIsLoading: isLoading,
        deleteMessagesIsValidating: isValidating 
    }
}

export function useDeleteDistancePricing(id: number){
    const {data, error, mutate, isLoading, isValidating} = useSWR(STAFFSWRKEYS.deleteDistancePricing, 
        () => deleteDistancePricing(id));
    return{
        deleteDistancePricingData: data,
        deleteDistancePricingError: error,
        deleteDistancePricingMutate: mutate,
        deleteDistancePricingIsLoading: isLoading,
        deleteDistancePricingIsValidating: isValidating 
    }
}

export function useDeleteLocations(id: number){
    const {data, error, mutate, isLoading, isValidating} = useSWR(STAFFSWRKEYS.deleteLocations, 
        () => deleteLocationsFetcher(id));
    return{
        deleteLocationsFetcherData: data,
        deleteLocationsFetcherError: error,
        deleteLocationsFetcherMutate: mutate,
        deleteLocationsFetcherIsLoading: isLoading,
        deleteLocationsFetcherIsValidating: isValidating 
    }
}

export function useDeletePreference(id: number){
    const {data, error, mutate, isLoading, isValidating} = useSWR(STAFFSWRKEYS.deletePreference, 
        () => deletePreferenceFetcher(id));
    return{
        deletePreferenceData: data,
        deletePreferenceError: error,
        deletePreferenceMutate: mutate,
        deletePreferenceIsLoading: isLoading,
        deletePreferenceIsValidating: isValidating 
    }
}

export function useClassicPricing(id: number){
    const {data, error, mutate, isLoading, isValidating} = useSWR(STAFFSWRKEYS.deleteClassicPricing, 
        () => deleteClassicPricing(id));
    return{
        deleteClassicPricingData: data,
        deleteClassicPricingError: error,
        deleteClassicPricingMutate: mutate,
        deleteClassicPricingIsLoading: isLoading,
        deleteClassicPricingIsValidating: isValidating 
    }
}
