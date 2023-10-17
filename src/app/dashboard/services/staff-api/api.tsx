'use client'
import { staffAPIURL } from "../api-url/staff-api-url";
import { staffStore } from "../store/store";
 

// export const authorizationKey = "Bearer " + staffStore[staffStore.length - 1]?.authToken;
export const authorizationKey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJyb2xlIjoic3VwZXJhZG1pbiIsImFsaWFzIjoiY2FrZW51cyJ9LCJpYXQiOjE2OTExODgzNDZ9.73G4_gAI_mexLVUYQOkaJN7XCaIj0iHqj5b2g9yYIa8";


// create customer
export const createCustomerFetcher = async(customerDetails: any) =>{
    const response = await fetch(staffAPIURL.createCustomer, {
        method: 'POST',
        body: JSON.stringify(customerDetails),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJyb2xlIjoic3VwZXJhZG1pbiIsImFsaWFzIjoiY2FrZW51cyJ9LCJpYXQiOjE2OTExODgzNDZ9.73G4_gAI_mexLVUYQOkaJN7XCaIj0iHqj5b2g9yYIa8"
            // "Authorization":  authorizationKey
        },
    });
    const data = await response.json();
    return data;
}


//ADMIN SERVICES
//for getting admin data
export const createStaffFetcher = async(staffDetails: any) => {
    const response = await fetch(staffAPIURL.createStaff, {
        method: 'POST',
        body: JSON.stringify(staffDetails),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJyb2xlIjoic3VwZXJhZG1pbiIsImFsaWFzIjoiY2FrZW51cyJ9LCJpYXQiOjE2OTExODgzNDZ9.73G4_gAI_mexLVUYQOkaJN7XCaIj0iHqj5b2g9yYIa8"
        }
    });
    const data = await response.json();
    return data;
} 


export const createDispatcher = async(dispatcherDetails: any) => {
    const response = await fetch(staffAPIURL.createDispatcher, {
        method: 'POST',
        body: JSON.stringify(dispatcherDetails),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJyb2xlIjoic3VwZXJhZG1pbiIsImFsaWFzIjoiY2FrZW51cyJ9LCJpYXQiOjE2OTU1MTE2MjJ9.N_IW7YA6Gr7vuXPxZTvQbrRrd1VU2QeohI-DL1NRR_w"

        },
    });
    const data = await response.json();
    return data;
}


export const fetchCustomersFetcher = async() => {
    const response = await fetch(staffAPIURL.fetchCustomers, {
        method: 'GET',
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJyb2xlIjoic3VwZXJhZG1pbiIsImFsaWFzIjoiY2FrZW51cyJ9LCJpYXQiOjE2OTExODgzNDZ9.73G4_gAI_mexLVUYQOkaJN7XCaIj0iHqj5b2g9yYIa8"
            // 'Authorization': "Bearer " + customerStore[customerStore.length - 1],
        },
    });
    const data = await response.json();
    return data;
}

export const fetchStaffFetcher = async() => {
    const response = await fetch(staffAPIURL.fetchStaff, {
        method: 'GET',
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJyb2xlIjoic3VwZXJhZG1pbiIsImFsaWFzIjoiY2FrZW51cyJ9LCJpYXQiOjE2OTExODgzNDZ9.73G4_gAI_mexLVUYQOkaJN7XCaIj0iHqj5b2g9yYIa8"
            // 'Authorization': "Bearer " + customerStore[customerStore.length - 1],
        },
    });
    const data = await response.json();
    return data;
}

export const fetchMessagesFetcher = async() => {
    const response = await fetch(staffAPIURL.fetchMessages, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJyb2xlIjoic3VwZXJhZG1pbiIsImFsaWFzIjoiY2FrZW51cyJ9LCJpYXQiOjE2OTExODgzNDZ9.73G4_gAI_mexLVUYQOkaJN7XCaIj0iHqj5b2g9yYIa8"
        },
    });
    const data = await response.json();
    return data;
}

export const countCustomersFetcher = async() => {
    const response = await fetch(staffAPIURL.countCustomers, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJyb2xlIjoic3VwZXJhZG1pbiIsImFsaWFzIjoiY2FrZW51cyJ9LCJpYXQiOjE2OTExODgzNDZ9.73G4_gAI_mexLVUYQOkaJN7XCaIj0iHqj5b2g9yYIa8"
        },
    });
    const data = await response.json();
    return data;
}

export const countRidersFetcher = async() => {
    const response = await fetch(staffAPIURL.countDispatcher, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJyb2xlIjoic3VwZXJhZG1pbiIsImFsaWFzIjoiY2FrZW51cyJ9LCJpYXQiOjE2OTExODgzNDZ9.73G4_gAI_mexLVUYQOkaJN7XCaIj0iHqj5b2g9yYIa8"
        },
    });
    const data = await response.json();
    return data;
}

export const countStaffFetcher = async() => {
    const response = await fetch(staffAPIURL.countStaff, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJyb2xlIjoic3VwZXJhZG1pbiIsImFsaWFzIjoiY2FrZW51cyJ9LCJpYXQiOjE2OTExODgzNDZ9.73G4_gAI_mexLVUYQOkaJN7XCaIj0iHqj5b2g9yYIa8"
        },
    });
    const data = await response.json();
    return data;
}

export const accountFetcher = async(accountDetails: any) =>{
    const response = await fetch(staffAPIURL.account, {
        method: 'POST', 
        body: JSON.stringify(accountDetails),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJyb2xlIjoic3VwZXJhZG1pbiIsImFsaWFzIjoiY2FrZW51cyJ9LCJpYXQiOjE2OTExODgzNDZ9.73G4_gAI_mexLVUYQOkaJN7XCaIj0iHqj5b2g9yYIa8"
        },
    });
    const data = await response.json();
    return data;
}

export const cardFetcher = async() =>{
    const response = await fetch(staffAPIURL.card, {
        method: 'GET', 
        headers: {
            "Content-Type": "application/json",
            // "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJyb2xlIjoic3VwZXJhZG1pbiIsImFsaWFzIjoiY2FrZW51cyJ9LCJpYXQiOjE2OTExODgzNDZ9.73G4_gAI_mexLVUYQOkaJN7XCaIj0iHqj5b2g9yYIa8"
        },
    });
    const data = await response.json();
    return data;
}

export const locationsFetcher = async(locations: any) =>{
    const response = await fetch(staffAPIURL.locations, {
        method: 'PUT', 
        body: JSON.stringify(locations),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJyb2xlIjoic3VwZXJhZG1pbiIsImFsaWFzIjoiY2FrZW51cyJ9LCJpYXQiOjE2OTExODgzNDZ9.73G4_gAI_mexLVUYQOkaJN7XCaIj0iHqj5b2g9yYIa8"
        },
    });
    const data = await response.json();
    return data;
}

export const bankLogoAndDetailsFetcher = async() =>{
    const response = await fetch(staffAPIURL.bankCodesAndLogos, {
        method: 'GET', 
    });
    const data = await response.json();
    return data;
}

export const getLocationsFetcher = async() => {
    const response = await fetch(staffAPIURL.fetchLocations, {
        method: 'GET',
        headers: {
            "Authorization": authorizationKey
        },
    });
    const data = await response.json();
    return data;
}


export const postDistancePricing = async(distancePrice: any) => {
    const response = await fetch(staffAPIURL.postDistancePricing, {
        method: 'POST',
        body: JSON.stringify(distancePrice),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJyb2xlIjoic3VwZXJhZG1pbiIsImFsaWFzIjoiY2FrZW51cyJ9LCJpYXQiOjE2OTExODgzNDZ9.73G4_gAI_mexLVUYQOkaJN7XCaIj0iHqj5b2g9yYIa8"
        },
    });
    const data = await response.json();
    return data;
}


export const getDistancePricing = async() => {
    const response = await fetch(staffAPIURL.postDistancePricing, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJyb2xlIjoic3VwZXJhZG1pbiIsImFsaWFzIjoiY2FrZW51cyJ9LCJpYXQiOjE2OTExODgzNDZ9.73G4_gAI_mexLVUYQOkaJN7XCaIj0iHqj5b2g9yYIa8"
        },
    });
    const data = await response.json();
    return data;
}


export const getBankAccount = async() => {
    const response = await fetch(staffAPIURL.getAccount, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJyb2xlIjoic3VwZXJhZG1pbiIsImFsaWFzIjoiY2FrZW51cyJ9LCJpYXQiOjE2OTExODgzNDZ9.73G4_gAI_mexLVUYQOkaJN7XCaIj0iHqj5b2g9yYIa8"
        },
    });
    const data = await response.json();
    return data;
}

export const deleteBankAccountFetcher = async(id: number) =>{
    const response = await fetch(staffAPIURL.deleteBankAccount(id), {
        method: 'DELETE',
        headers: {
            'Authorization': authorizationKey
        }
    });
    const data = await response.json();
    return data;
}

export const deleteDistancePricing = async(id: number) =>{
    const response = await fetch(staffAPIURL.deleteDistancePricing(id), {
        method: 'DELETE',
        headers: {
            'Authorization': authorizationKey
        }
    });
    const data = await response.json();
    return data;
}


export const deleteLocationsFetcher = async(id: number) =>{
    const response = await fetch(staffAPIURL.deleteLocations(id), {
        method: 'DELETE',
        headers: {
            'Authorization': authorizationKey
        }
    });
    const data = await response.json();
    return data;
}

export const deletePreferenceFetcher = async(id: number) =>{
    const response = await fetch(staffAPIURL.deletePreference(id), {
        method: 'DELETE',
        headers: {
            'Authorization': authorizationKey
        }
    });
    const data = await response.json();
    return data;
}

export const deleteClassicPricing = async(id: number) =>{
    const response = await fetch(staffAPIURL.deleteClassicPricing(id), {
        method: 'DELETE',
        headers: {
            'Authorization': authorizationKey
        }
    });
    const data = await response.json();
    return data;
}