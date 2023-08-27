export const data = 'cakenus';
export const company = 18;

export const staffAPIURL = {
    createStaff: `https://logapi.logistixng.com/api/b2b/${data}/staff`,
    stafflogin:  `https://logapi.logistixng.com/api/b2b/${data}/staff/login`,
    forgetStaffPassword: `https://logapi.logistixng.com/api/b2b/${data}/staff/forgotPassword`,
    changeStaffPassword: `https://logapi.logistixng.com/api/b2b/${data}/staff/changePassword`,
    createCustomer: `https://logapi.logistixng.com/api/b2b/${data}/subscriber`,
    fetchStaff: `https://logapi.logistixng.com/api/b2b/${data}/staff`,
    createDispatcher: `https://logapi.logistixng.com/api/b2b/${data}/rider`,
    fetchCustomers: `https://logapi.logistixng.com/api/b2b/${data}/subscribers`,
    fetchMessages: `https://logapi.logistixng.com/api/b2b/${data}/inmails`,
    countStaff: `https://logapi.logistixng.com/api/b2b/${data}/staff/count`,
    countDispatcher: `https://logapi.logistixng.com/api/b2b/${data}/riders/count`,
    countCustomers: `https://logapi.logistixng.com/api/b2b/cakenus/subscribers/count`,
    account: `https://logapi.logistixng.com/api/b2b/${data}/account/verify`,
    card: `https://logapi.logistixng.com/api/lgx/billing/card/${company}`,
    locations: `https://logapi.logistixng.com/api/b2b/${data}/locations`,
    fetchLocations: `https://logapi.logistixng.com/api/b2b/${data}/locations`,
    postDistancePricing: `https://logapi.logistixng.com/api/b2b/${data}/distance-pricing`
}