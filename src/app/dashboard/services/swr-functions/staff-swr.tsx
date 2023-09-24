'use client'
import useSWR from "swr";
import { accountFetcher, cardFetcher, countRidersFetcher, countStaffFetcher, deleteBankAccountFetcher, deleteClassicPricing, deleteDistancePricing, deleteLocationsFetcher, deletePreferenceFetcher, fetchCustomersFetcher, fetchMessagesFetcher, fetchStaffFetcher, getBankAccount, getDistancePricing, getLocationsFetcher, locationsFetcher, postDistancePricing } from "../staff-api/api";
import { STAFFSWRKEYS } from "../swr-keys/staff-keys";
import { useRouter } from "next/navigation";


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
