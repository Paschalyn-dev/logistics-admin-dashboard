export const data = 'cakenus';
export const company = 18;
const today = new Date();
var yesterday = new Date(today.getTime());
yesterday.setDate(today.getDate() - 1);


export const customerAPIUrl= {
    fetchCustomer: "https://logapi.logistixng.com/api/b2c/user/login",
    forgotCustomerPassword: 'https://logapi.logistixng.com/api/b2c/user/forgotPassword',
    changePassword: 'https://logapi.logistixng.com/api/b2c/user/changePassword',
    createParcel: 'https://logapi.logistixng.com/api/b2c/parcel',
    companyRevenue: `https://logapi.logistixng.com/api/b2c/parcels/revenue/${company}`,
    parcelsRange: `https://logapi.logistixng.com/api/b2c/parcels/range`,
    countParcels: `https://logapi.logistixng.com/api/b2c/parcels/count?query={%22company%22:${company}}`,
    parcelsAll: `https://logapi.logistixng.com/api/b2c/parcels?query={%22company%22:${company},%22completed%22:false}&populate=userId`,
    dispatchersAll: `https://logapi.logistixng.com/api/b2b/${data}/riders`,
    parcelsDelivered: `https://logapi.logistixng.com/api/b2c/parcels?query={%22company%22:${company},%22completed%22:true}&populate=userId`,
    parcelsLate: `https://logapi.logistixng.com/api/b2c/parcels/due/${company}?count=true`,
    transactions: `https://logapi.logistixng.com/api/b2c/parcels?sort=-createdAt&limit=15&page=1&query={%22company%22:${company}}`,
    fetchReviews: `https://logapi.logistixng.com/api/b2c/reviews?query={%22company%22:${company}}`,
    billingInvoice: `https://logapi.logistixng.com/api/lgx/billing/invoice/${company}`,
    activeShipmentsCount: `https://logapi.logistixng.com/api/b2c/parcels/count?query={%22company%22:${company},%22completed%22:false}`,
    business: `https://logapi.logistixng.com/api/b2c/business/${company}`,
    todayRevenue: `https://logapi.logistixng.com/api/b2c/parcels/range?range=[{%22field%22:%22createdAt%22,%22start%22:%22${yesterday}%22,%22end%22:%22${today}%22}]&query={%22company%22:18}`,
    searchParcels: ({inputField, searchFields, createdAtStart, createdAtEnd, amountStart, amountEnd}: any) => `https://logapi.logistixng.com/api/b2c/parcels/range?search=${inputField.activeShipments}&searchFields=${searchFields.activeShipments}&query={%22company%22:${company}}&range=[]`,
    searchCustomers: ({inputField, searchFields}: any) => `https://logapi.logistixng.com/api/b2c/search/subscribers?search=${inputField.customersRange}&searchFields=${searchFields.customersRange}`,
    searchDispatchers: ({inputField, searchFields}: any) => `https://logapi.logistixng.com/api/b2b/cakenus/riders?search=${inputField.dispatchersRange}&searchFields=${searchFields.dispatchersRange}`,
    searchAdminisrators: ({inputField, searchFields}: any) => `https://logapi.logistixng.com/api/b2b/cakenus/staff?search=${inputField.administratorsRange}&searchFields=${searchFields.administratorsRange}`,
    searchTransactions: ({inputField, searchFields, amountStart, amountEnd}:any) => `https://logapi.logistixng.com/api/b2c/parcels/range?search=${inputField.transactionsRange}&searchFields=${searchFields.transactionsRange}&query={%22company%22:${company}}&range=[{%22field%22:%22amount%22,%22start%22:%22${amountStart.transactionsRange}%22,%22end%22:%22${amountEnd.transactionsRange}%22}]`,
    searchMessages: ({inputField, searchFields}: any) => `https://logapi.logistixng.com/api/b2c/inmails?search=${inputField.messagesRange}&searchFields=${searchFields.messagesRange}`,
    searchReviews: ({inputField, searchFields}: any) => `https://logapi.logistixng.com/api/b2c/reviews?search=${inputField.reviewsRange}&searchFields=${searchFields.reviewsRange}`,
    viewParcels: (id: number) => `https://logapi.logistixng.com/api/b2c/parcel/${id}`,
    editParcels: (id: number) => `https://logapi.logistixng.com/api/b2c/parcel/${id}`,
    viewCustomer: (id: number) => `https://logapi.logistixng.com/api/b2c/user/${id}`,
    viewDispatcher: (id: number) => `https://logapi.logistixng.com/api/b2b/cakenus/rider/${id}`,
    viewStaff: (id: number) => `https://logapi.logistixng.com/api/b2b/cakenus/staff/${id}`,
    deleteParcels: (id: number) => `https://logapi.logistixng.com/api/b2c/parcel/${id}`,
    deleteReviews: (id: any) => `https://logapi.logistixng.com/api/b2c/review/${id}`,
    deleteBusiness: (id: any) => `https://logapi.logistixng.com/api/b2c/business/${id}`,
    deleteUser: (id: any) => `https://logapi.logistixng.com/api/b2c/user/${id}`,
}
