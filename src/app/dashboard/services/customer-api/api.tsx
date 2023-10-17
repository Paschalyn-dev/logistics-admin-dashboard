import { customerAPIUrl } from "../api-url/customer-api-url";

// const authorizationKeyCustomer = staffStore[staffStore.length - 1]?.authToken;
export const authorizationKeyCustomer = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJyb2xlIjoic3VwZXJhZG1pbiIsImFsaWFzIjoiY2FrZW51cyJ9LCJpYXQiOjE2OTU1MTE2MjJ9.N_IW7YA6Gr7vuXPxZTvQbrRrd1VU2QeohI-DL1NRR_w";


export const createParcelFetcher = async(parcelDetails: any) => {
    const response = await fetch(customerAPIUrl.createParcel, {
        method: 'POST',
        body: JSON.stringify(parcelDetails),
        headers: {
            "Content-Type": "application/json",
            'Authorization': authorizationKeyCustomer
        },
    })
    const data = await response.json();
    return data;
}


export const countParcelsFetcher = async() => {
    const response = await fetch(customerAPIUrl.countParcels, {
        method: 'GET',
        headers: {
            'Authorization': authorizationKeyCustomer
        },
    })

    const data = await response.json();
    return data;
}

export const parcelsDeliveredFetcher = async() => {
    const response = await fetch(customerAPIUrl.parcelsDelivered, {
        method: 'GET',
        headers: {
            'Authorization': authorizationKeyCustomer
        }
    });
    const data = await response.json();
    return data;
}


export const companyRevenueFetcher = async() => {
    const response = await fetch(customerAPIUrl.companyRevenue, {
        method: 'GET'
    });
    const data = await response.json();
    return data;
}

// search parcels
export const parcelRangeFetcher = async (parcelRangeQuery: any) => {
    const response = await fetch(customerAPIUrl.searchParcels(parcelRangeQuery), {
        method: 'GET',
        headers: {
            'Authorization': authorizationKeyCustomer
        }
    });
    const data = await response.json();
    return data;
}


// search customers
export const customerRangeFetcher = async (customersRangeQuery: any) => {
    const response = await fetch(customerAPIUrl.searchCustomers(customersRangeQuery), {
        method: 'GET',
        headers: {
            'Authorization': authorizationKeyCustomer
        }
    });
    const data = await response.json();
    return data;
}

//search dispatchers
export const dispatchersRangeFetcher = async (dispatchersRangeQuery: any) => {
    const response = await fetch(customerAPIUrl.searchDispatchers(dispatchersRangeQuery), {
        method: 'GET',
        headers: {
            'Authorization': authorizationKeyCustomer
        }
    });
    const data = await response.json();
    return data;
}

//search administrators
export const administratorsRangeFetcher = async (administratorsRangeQuery: any) => {
    const response = await fetch(customerAPIUrl.searchAdminisrators(administratorsRangeQuery), {
        method: 'GET',
        headers: {
            'Authorization': authorizationKeyCustomer
        }
    });
    const data = await response.json();
    return data;
}

//search transactions
export const transactionsRangeFetcher = async (transactionsRangeQuery: any) => {
    const response = await fetch(customerAPIUrl.searchTransactions(transactionsRangeQuery), {
        method: 'GET',
        headers: {
            'Authorization': authorizationKeyCustomer
        }
    });
    const data = await response.json();
    return data;
}

//search messages
export const messagesRangeFetcher = async (messagesRangeQuery: any) => {
    const response = await fetch(customerAPIUrl.searchMessages(messagesRangeQuery), {
        method: 'GET',
        headers: {
            'Authorization': authorizationKeyCustomer
        }
    });
    const data = await response.json();
    return data;
}

//search reviews
export const reviewsRangeFetcher = async (reviewsRangeQuery: any) => {
    const response = await fetch(customerAPIUrl.searchReviews(reviewsRangeQuery), {
        method: 'GET',
        headers: {
            'Authorization': authorizationKeyCustomer
        }
    });
    const data = await response.json();
    return data;
}


export const parcelLateFetcher = async() =>{
    const response = await fetch(customerAPIUrl.parcelsLate, {
        method: 'GET',
    });
    const data = await response.json();
    return data;
}

export const fetchAllParcelsFetcher = async() => {
    const response = await fetch(customerAPIUrl.parcelsAll, {
        method: 'GET',
        headers:{
            'Authorization': authorizationKeyCustomer
        },
    });
    const data = await response.json();
    return data;
}


export const fetchAllDispatchersFetcher = async() => {
    const response = await fetch(customerAPIUrl.dispatchersAll, {
        method: 'GET',
        headers: {
            'Authorization': authorizationKeyCustomer
        },
    });
    const data = await response.json();
    return data;
}

export const fetchAllReviews = async() => {
    const response = await fetch(customerAPIUrl.fetchReviews, {
        method: 'GET',
        headers: {
            'Authorization': authorizationKeyCustomer
        },
    });
    const data = await response.json();
    return data;
}

export const fetchTransactionsFetcher = async() => {
    const response = await fetch(customerAPIUrl.transactions, {
        method: 'GET',
        headers: {
            'Authorization': authorizationKeyCustomer
        },
    });
    const data = await response.json();
    return data;

}

export const billingInvoiceFetcher = async() => {
    const response = await fetch(customerAPIUrl.billingInvoice, {
        method: 'GET',
        headers: {
            'Authorization': authorizationKeyCustomer
        },
    });
    const data = await response.json();
    return data;

}

export const activeShipmentsCountFetcher = async() => {
    const response = await fetch(customerAPIUrl.activeShipmentsCount, {
        method: 'GET',
        headers: {
            'Authorization': authorizationKeyCustomer
        },
    });
    const data = await response.json();
    return data;
}

export const todayRevenueFetcher = async() => {
    const response = await fetch(customerAPIUrl.todayRevenue, {
        method: 'GET',
        headers: {
            'Authorization': authorizationKeyCustomer
        },
    });
    const data = await response.json();
    return data;
}


export const viewParcelFetcher = async(id: number) => {
    const response = await fetch(customerAPIUrl.viewParcels(id), {
        method: 'GET',
        headers: {
            'Authorization': authorizationKeyCustomer
        }
    });
    const data = await response.json();
    return data;
}

export const editParcelFetcher = async(id: number, parcelDetails: any) =>{
    const response = await fetch(customerAPIUrl.editParcels(id), {
        method: 'PUT',
        body: JSON.stringify(parcelDetails),
        headers: {
            'Authorization': authorizationKeyCustomer
        }
    });
    const data = await response.json();
    return data;
}


export const viewCustomerFetcher = async(id: number) =>{
    const response = await fetch(customerAPIUrl.viewCustomer(id), {
        method: 'GET',
        headers: {
            'Authorization': authorizationKeyCustomer
        }
    });
    const data = await response.json();
    return data;
}


export const viewDispatcherFetcher = async(id: number) =>{
    const response = await fetch(customerAPIUrl.viewDispatcher(id), {
        method: 'GET',
        headers: {
            'Authorization': authorizationKeyCustomer
        }
    });
    const data = await response.json();
    return data;
}

export const viewStaffFetcher = async(id: number) =>{
    const response = await fetch(customerAPIUrl.viewStaff(id), {
        method: 'GET',
        headers: {
            'Authorization': authorizationKeyCustomer
        }
    });
    const data = await response.json();
    return data;
}

export const businessChangeFetcher = async(changeBearer: any) =>{
    const response = await fetch(customerAPIUrl.business, {
        method: 'PUT',
        body: JSON.stringify(changeBearer),
        headers: {
            "Content-Type": "application/json",
            'Authorization': authorizationKeyCustomer
        }
    });
    const data = await response.json();
    return data;
}

export const getBusinessDetails = async() => {
    const response = await fetch(customerAPIUrl.business, {
        method: 'GET',
    });
    const data = await response.json();
    return data;
}

export const deleteParcel = async(id: number) => {
    const response = await fetch(customerAPIUrl.deleteParcels(id), {
        method: 'DELETE',
        headers: {
            'Authorization': authorizationKeyCustomer
        }
    });
    const data = await response.json();
    return data;
}

export const deleteUserFetcher = async(id: number) =>{
    const response = await fetch(customerAPIUrl.deleteUser(id), {
        method: 'DELETE',
        headers: {
            'Authorization': authorizationKeyCustomer
        }
    });
    const data = await response.json();
    return data;
}

export const deleteBusinessFetcher = async(id: number) =>{
    const response = await fetch(customerAPIUrl.deleteBusiness(id), {
        method: 'DELETE',
        headers: {
            'Authorization': authorizationKeyCustomer
        }
    });
    const data = await response.json();
    return data;
}

export const deleteReviewFetcher = async(id: number) =>{
    const response = await fetch(customerAPIUrl.deleteReviews(id), {
        method: 'DELETE',
        headers: {
            'Authorization': authorizationKeyCustomer
        }
    });
    const data = await response.json();
    return data;
}

export const fetchMonthlyRevenue = async() => {
    const response = await fetch(customerAPIUrl.monthRevenue, {
        method: 'GET',
        headers: {
            'Authorization': authorizationKeyCustomer
        }
    });
    const data = await response.json();
    return data;
}

export const fetchWeeklyRevenue = async() => {
    const response = await fetch(customerAPIUrl.weekRevenue, {
        method: 'GET',
        headers: {
            'Authorization': authorizationKeyCustomer
        }
    });
    const data = await response.json();
    return data;
}