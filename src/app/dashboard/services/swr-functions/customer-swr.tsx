'use client'

import { useRouter } from "next/navigation";
import { activeShipmentsCountFetcher, administratorsRangeFetcher, billingInvoiceFetcher, businessChangeFetcher, companyRevenueFetcher, countParcelsFetcher, createParcelFetcher, customerRangeFetcher, deleteBusinessFetcher, deleteParcel, deleteReviewFetcher, deleteUserFetcher, dispatchersRangeFetcher, editParcelFetcher, fetchAllDispatchersFetcher, fetchAllParcelsFetcher, fetchAllReviews, fetchMonthlyRevenue, fetchTransactionsFetcher, fetchWeeklyRevenue, getBusinessDetails, messagesRangeFetcher, parcelLateFetcher, parcelRangeFetcher, parcelsDeliveredFetcher, reviewsRangeFetcher, todayRevenueFetcher, transactionsRangeFetcher, viewCustomerFetcher, viewDispatcherFetcher, viewParcelFetcher, viewStaffFetcher } from "../customer-api/api";
import { CUSTOMERSWRKEYS } from "../swr-keys/customer-keys";
import useSWR from "swr";
import { countCustomersFetcher } from "../staff-api/api";




export function useCreateParcel(parcelDetails: any){
    const {data, error, isLoading, mutate, isValidating} = useSWR(CUSTOMERSWRKEYS.createParcel, 
        () => createParcelFetcher(parcelDetails));
    
        return{
            createParcelData: data,
            createParcelError: error,
            createParcelMutate: mutate,
            createParcelIsLoading: isLoading,
            createParcelIsValidating: isValidating 
        }
}


export function useCountParcel(){
    const {data, error, isLoading, mutate, isValidating} = useSWR(CUSTOMERSWRKEYS.countParcel, 
        () => countParcelsFetcher());
    
        return{
            countParcelData: data,
            countParcelError: error,
            countParcelMutate: mutate,
            countParcelIsLoading: isLoading,
            countParcelIsValidating: isValidating 
        }
}

export function useCompanyRevenue(){
    const {data, error, isLoading, mutate, isValidating} = useSWR(CUSTOMERSWRKEYS.companyRevenue, 
        () => companyRevenueFetcher());
    
        return{
            companyRevenueData: data,
            companyRevenueError: error,
            companyRevenueMutate: mutate,
            companyRevenueIsLoading: isLoading,
            companyRevenueIsValidating: isValidating 
        }
}

export function useSearchParcelRange(parcelRangeQuery: any){
    const {data, error, isLoading, mutate, isValidating} = useSWR(CUSTOMERSWRKEYS.parcelRange, 
        () => parcelRangeFetcher(parcelRangeQuery));

        return {
            parcelRangeData: data,
            parcelRangeError: error,
            parcelRangeMutate: mutate,
            parcelRangeIsLoading: isLoading,
            parcelRangeIsValidating: isValidating
        }
}

export function useCustomerSearchRange(customerRangeQuery: any){
    const {data, error, isLoading, mutate, isValidating} = useSWR(CUSTOMERSWRKEYS.searchCustomers, 
        () => customerRangeFetcher(customerRangeQuery));

        return {
            customerRangeData: data,
            customerRangeError: error,
            customerRangeMutate: mutate,
            customerRangeIsLoading: isLoading,
            customerRangeIsValidating: isValidating
        }
}

export function useDispatcherSearchRange(dispatchersRangeQuery: any){
    const {data, error, isLoading, mutate, isValidating} = useSWR(CUSTOMERSWRKEYS.searchDispatchers, 
        () => dispatchersRangeFetcher(dispatchersRangeQuery));

        return {
            dispatchersRangeData: data,
            dispatchersRangeError: error,
            dispatchersRangeMutate: mutate,
            dispatchersRangeIsLoading: isLoading,
            dispatchersRangeIsValidating: isValidating
        }
}

export function useAdministratorsSearchRange(administratorsRangeQuery: any){
    const {data, error, isLoading, mutate, isValidating} = useSWR(CUSTOMERSWRKEYS.searchAdministrators, 
        () => administratorsRangeFetcher(administratorsRangeQuery));

        return {
            administratorsRangeData: data,
            administratorsRangeError: error,
            administratorsRangeMutate: mutate,
            administratorsRangeIsLoading: isLoading,
            administratorsRangeIsValidating: isValidating
        }
}

export function useTransactionsSearchRange(transactionsRangeQuery: any){
    const {data, error, isLoading, mutate, isValidating} = useSWR(CUSTOMERSWRKEYS.searchTransactions, 
        () => transactionsRangeFetcher(transactionsRangeQuery));

        return {
            transactionsRangeData: data,
            transactionsRangeError: error,
            transactionsRangeMutate: mutate,
            transactionsRangeIsLoading: isLoading,
            transactionsRangeIsValidating: isValidating
        }
}
export function useMessagesSearchRange(messagesRangeQuery: any){
    const {data, error, isLoading, mutate, isValidating} = useSWR(CUSTOMERSWRKEYS.searchMessages, 
        () => messagesRangeFetcher(messagesRangeQuery));

        return {
            messagesRangeData: data,
            messagesRangeError: error,
            messagesRangeMutate: mutate,
            messagesRangeIsLoading: isLoading,
            messagesRangeIsValidating: isValidating
        }
}

export function useReviewsSearchRange(reviewsRangeQuery: any){
    const {data, error, isLoading, mutate, isValidating} = useSWR(CUSTOMERSWRKEYS.searchReviews, 
        () => reviewsRangeFetcher(reviewsRangeQuery));

        return {
            reviewsRangeData: data,
            reviewsRangeError: error,
            reviewsRangeMutate: mutate,
            reviewsRangeIsLoading: isLoading,
            reviewsRangeIsValidating: isValidating
        }
}

export function useAllParcelsFetcher(){
    const{data, error, mutate, isLoading, isValidating} = useSWR(CUSTOMERSWRKEYS.parcelsAll,
        () => fetchAllParcelsFetcher());

        return{
            parcelAllData: data,
            parcelAllError: error,
            parcelAllMutate: mutate,
            parcelAllIsLoading: isLoading,
            parcelAllIsValiddating: isValidating,
        }
}

export function useAllParcelsRangeFetcher(parcelRange: any){
    const{data, error, mutate, isLoading, isValidating} = useSWR(CUSTOMERSWRKEYS.parcelRange,
        () => parcelRangeFetcher(parcelRange));

        return{
            parcelRData: data,
            parcelRError: error,
            parcelRMutate: mutate,
            parcelRIsLoading: isLoading,
            parcelRIsValiddating: isValidating,
        }
}

export function useAllDispatchersFetcher(){
    const{data, error, mutate, isLoading, isValidating} = useSWR(CUSTOMERSWRKEYS.dispatchersAll,
        () => fetchAllDispatchersFetcher());

        return{
            dispatcherAllData: data,
            dispatcherAllError: error,
            dispatcherAllMutate: mutate,
            dispatcherAllIsLoading: isLoading,
            dispatcherAllIsValiddating: isValidating,
        }
}

export function useDeliveredParcels(){
    const {data, error, mutate, isLoading, isValidating} = useSWR(CUSTOMERSWRKEYS.deliveredParcels, 
        () => parcelsDeliveredFetcher());
    return {
        deliveredParcelsData: data,
        deliveredParcelsError: error,
        deliveredParcelsMutate: mutate,
        deliveredParcelsIsLoading: isLoading,
        deliveredParcelsIsValiddating: isValidating,
    }
}

export function useLateParcels(){
    const {data, error, mutate, isLoading, isValidating} = useSWR(CUSTOMERSWRKEYS.lateParcels, 
        () => parcelLateFetcher());
    return {
        parcelLatesData: data,
        parcelLatesError: error,
        parcelLatesMutate: mutate,
        parcelLatesIsLoading: isLoading,
        parcelLatesIsValiddating: isValidating,
    }
}

export function useAllFetchReviews(){
    const {data, error, mutate, isLoading, isValidating} = useSWR(CUSTOMERSWRKEYS.fetchReviews, 
        () => fetchAllReviews());
    return {
        fetchAllReviewsData: data,
        fetchAllReviewsError: error,
        fetchAllReviewsMutate: mutate,
        fetchAllReviewsIsLoading: isLoading,
        fetchAllReviewsIsValiddating: isValidating,
    }
}

export function useAllFetchTransactions(){
    const {data, error, mutate, isLoading, isValidating} = useSWR(CUSTOMERSWRKEYS.transactions, 
        () => fetchTransactionsFetcher());
    return {
        fetchTransactionsData: data,
        fetchTransactionsError: error,
        fetchTransactionsMutate: mutate,
        fetchTransactionsIsLoading: isLoading,
        fetchTransactionsIsValidating: isValidating,
    }
}

export function useBillingInvoice(){
    const {data, error, mutate, isLoading, isValidating} = useSWR(CUSTOMERSWRKEYS.billingInvoice, 
        () => billingInvoiceFetcher());
    return{
        billingInvoiceData: data,
        billingInvoiceError: error,
        billingInvoiceMutate: mutate,
        billingInvoiceIsLoading: isLoading,
        billingInvoiceIsValidating: isValidating 
    }
}

export function useActiveShipmentsCount(){
    const {data, error, mutate, isLoading, isValidating} = useSWR(CUSTOMERSWRKEYS.activeShipmentsCount, 
        () => activeShipmentsCountFetcher());
    return{
        activeShipmentsCountData: data,
        activeShipmentsCountError: error,
        activeShipmentsCountMutate: mutate,
        activeShipmentsCountIsLoading: isLoading,
        activeShipmentsCountIsValidating: isValidating 
    }
}

export function useCustomerCount(){
    const {data, error, mutate, isLoading, isValidating} = useSWR(CUSTOMERSWRKEYS.countCustomers, 
        () => countCustomersFetcher());
    return{
        countCustomersData: data,
        countCustomersError: error,
        countCustomersMutate: mutate,
        countCustomersIsLoading: isLoading,
        countCustomersIsValidating: isValidating 
    }
}


export function useTodayRevenue(){
    const {data, error, mutate, isLoading, isValidating} = useSWR(CUSTOMERSWRKEYS.todayRevenue, 
        () => todayRevenueFetcher());
    return{
        todayRevenueData: data,
        todayRevenueError: error,
        todayRevenueMutate: mutate,
        todayRevenueIsLoading: isLoading,
        todayRevenueIsValidating: isValidating 
    }
}

export function useWeekRevenue(){
    const {data, error, mutate, isLoading, isValidating} = useSWR(CUSTOMERSWRKEYS.fetchWeekRevenue, 
        () => fetchWeeklyRevenue());
    return{
        weekRevenueData: data,
        weekRevenueError: error,
        weekRevenueMutate: mutate,
        weekRevenueIsLoading: isLoading,
        weekRevenueIsValidating: isValidating 
    }
}

export function useViewParcels(id: number){
    const {data, error, mutate, isLoading, isValidating} = useSWR(CUSTOMERSWRKEYS.viewParcels, 
        () => viewParcelFetcher(id));
    return{
        viewParcelData: data,
        viewParcelError: error,
        viewParcelMutate: mutate,
        viewParcelIsLoading: isLoading,
        viewParcelIsValidating: isValidating 
    }
}

export function useEditParcels(id: number, parcelDetails: any){
    const {data, error, mutate, isLoading, isValidating} = useSWR(CUSTOMERSWRKEYS.editParcels, 
        () => editParcelFetcher(id, parcelDetails));
    return{
        editParcelData: data,
        editParcelError: error,
        editParcelMutate: mutate,
        editParcelIsLoading: isLoading,
        editParcelIsValidating: isValidating 
    }
}

export function useViewCustomers(id: number){
    const {data, error, mutate, isLoading, isValidating} = useSWR(CUSTOMERSWRKEYS.viewCustomers, 
        () => viewCustomerFetcher(id));
    return{
        viewCustomerData: data,
        viewCustomerError: error,
        viewCustomerMutate: mutate,
        viewCustomerIsLoading: isLoading,
        viewCustomerIsValidating: isValidating 
    }
}

export function useViewDispatcher(id: number){
    const {data, error, mutate, isLoading, isValidating} = useSWR(CUSTOMERSWRKEYS.viewDispatcher, 
        () => viewDispatcherFetcher(id));
    return{
        viewDispatcherData: data,
        viewDispatcherError: error,
        viewDispatcherMutate: mutate,
        viewDispatcherIsLoading: isLoading,
        viewDispatcherIsValidating: isValidating 
    }
}

export function useViewStaff(id: number){
    const {data, error, mutate, isLoading, isValidating} = useSWR(CUSTOMERSWRKEYS.viewStaff, 
        () => viewStaffFetcher(id));
    return{
        viewStaffData: data,
        viewStaffError: error,
        viewStaffMutate: mutate,
        viewStaffIsLoading: isLoading,
        viewStaffIsValidating: isValidating 
    }
}


export function useBusiness(changeBearer: any){
    const {data, error, mutate, isLoading, isValidating} = useSWR(CUSTOMERSWRKEYS.business, 
        () => businessChangeFetcher(changeBearer));
    return{
        businessChangeData: data,
        businessChangeError: error,
        businessChangeMutate: mutate,
        businessChangeIsLoading: isLoading,
        businessChangeIsValidating: isValidating 
    }
}

export function useGetBusiness(){
    const {data, error, mutate, isLoading, isValidating} = useSWR(CUSTOMERSWRKEYS.getBusinessDetails, 
        () => getBusinessDetails());
    return{
        getBusinessData: data,
        getBusinessError: error,
        getBusinessMutate: mutate,
        getBusinessIsLoading: isLoading,
        getBusinessIsValidating: isValidating 
    }
}

export function useDeleteParcels(id: number){
    console.log(id, "parcel")
    const {data, error, mutate, isLoading, isValidating} = useSWR(CUSTOMERSWRKEYS.deleteParcel, 
        () => deleteParcel(id));
    return{
        deleteParcelData: data,
        deleteParcelError: error,
        deleteParcelMutate: mutate,
        deleteParcelIsLoading: isLoading,
        deleteParcelIsValidating: isValidating 
    }
}

export function useDeleteUser(id: number){
    const {data, error, mutate, isLoading, isValidating} = useSWR(CUSTOMERSWRKEYS.deleteUser, 
        () => deleteUserFetcher(id));
    return{
        deleteUserData: data,
        deleteUserError: error,
        deleteUserMutate: mutate,
        deleteUserIsLoading: isLoading,
        deleteUserIsValidating: isValidating 
    }
}

export function useDeleteBusiness(id: number){
    const {data, error, mutate, isLoading, isValidating} = useSWR(CUSTOMERSWRKEYS.deleteBusiness, 
        () => deleteBusinessFetcher(id));
    return{
        deleteBusinessData: data,
        deleteBusinessError: error,
        deleteBusinessMutate: mutate,
        deleteBusinessIsLoading: isLoading,
        deleteBusinessIsValidating: isValidating 
    }
}

export function useDeleteReviews(id: number){
    const {data, error, mutate, isLoading, isValidating} = useSWR(CUSTOMERSWRKEYS.deleteReview, 
        () => deleteReviewFetcher(id));
    return{
        deleteReviewsData: data,
        deleteReviewsError: error,
        deleteReviewsMutate: mutate,
        deleteReviewsIsLoading: isLoading,
        deleteReviewsIsValidating: isValidating 
    }
}

export function useGetMonthlyRevenue(){
    const {data, error, mutate, isLoading, isValidating} = useSWR(CUSTOMERSWRKEYS.fetchMonthRevenue, 
        () => fetchMonthlyRevenue());
    return{
        fetchMonthlyRevenueData: data,
        fetchMonthlyRevenueError: error,
        fetchMonthlyRevenueMutate: mutate,
        fetchMonthlyRevenueIsLoading: isLoading,
        fetchMonthlyRevenueIsValidating: isValidating 
    }
}