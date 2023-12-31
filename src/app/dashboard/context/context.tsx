'use client'
// import { parsedUrlQueryToParams } from "next/dist/server/future/route-matches/route-match";
import {createContext, useEffect, useState} from "react";
export const phoneRegExp = /^[+]?((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
// export const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/
export const State_data = createContext<any>(null);

export default function Context({children}: any){
    const [globaldata, setGlobalData] = useState<string[] | any>([]);
    const [globalPriceList, setGlobalPriceList] = useState<number[]>([]);
    const [parcelRange, setParcelRange] = useState<any>({});
    const [customersRange, setCustomersRange] = useState<any>({});
    const [dispatchersRange, setDispatchersRange] = useState<any>({});
    const [administratorsRange, setAdministratorsRange] = useState<any>({});
    const [transactionsRange, setTransactionsRange] = useState<any>({})
    const [messagesRange, setMessagesRange] = useState<any>({});
    const [reviewsRange, setReviewsRange] = useState<any>({});
    const [id, setId] = useState({
        customer: 0,
        destination: 0
    });
    
    const [dispatcher, setDispatcher] = useState<any>({
        name: "",
        id: 0
    })
    const [staffDetails, setStaffDetails] = useState({
        authToken: "",
        email: "",
        id: 0
    })
    const [loading, setLoading] = useState({
        staffL: false,
        changeDP: false,
        customerL: false,
        parcel: false,
        customer: false,
        dispatcher: false,
        administrator: false,
        website: false,
        chargeBearer: false,
        sendMessage: false,
        locations: false,
        payment: false,
        deliveryPrice: false,
        deleteDeliveryPrice: false,
        passwordUpdate: false,
        profileUpdate: false
    })
    const [searchData, setSearchData] = useState<any>({
        parcelInfo: "",
        parcelResult: "",
        parcelCode:  "",
        customerInfo: "",
        customerResult: "",
        customerCode:  "",
        dispatcherInfo: "",
        dispatcherResult: "",
        dispatcherCode:  "",
        administratorInfo: "",
        administratorResult: "",
        administratorCode:  "",
        transactionInfo: "",
        transactionResult: "",
        transactionCode:  "",
        messageInfo: "",
        messageResult: "",
        messageCode:  "",
        reviewInfo: "",
        reviewResult: "",
        reviewCode:  "",
        profileUpdate: false
    })
    const [priceAndLocationsDelete, setPriceAndLocationsDelete] = useState<any>({
        priceInfo: "",
        priceResult: "",
        priceCode: "",
        locationsCode: "",
        locationsAdded: true,
        locationsResult: "",
        locationsDeleteInfo: "",
        locationsDeleteResult: "",
        locationsDeleteCode: "",
    })
    const [inputField, setInputField] = useState<any>({
        activeShipments: "",
        customersRange: "",
        dispatchersRange: "",
        administratorsRange: "",
        messagesRange: "",
        reviewsRange: ""
    });
    const [myKey, setMyKey] = useState('')
    const [searchFields, setSearchFields] = useState<any>({
        activeShipments: [],
        customersRange: [],
        dispatchersRange: [],
        administratorsRange: [],
        messagesRange: [],
        reviewsRange: []
    });
    const [createdAtStart, setCreatedAtStart] = useState<any>({
        activeShipments: "",
        customersRange: "",
        dispatchersRange: "",
        administratorsRange: "",
        messagesRange: "",
        reviewsRange: "", 
    });    
    const [createdAtEnd, setCreatedAtEnd] = useState<any>({
        activeShipments: "",
        customersRange: "",
        dispatchersRange: "",
        administratorsRange: "",
        messagesRange: "",
        reviewsRange: ""
    });
    const [amountStart, setAmountStart] = useState<any>({
        activeShipments: "",
        customersRange: "",
        dispatchersRange: "",
        administratorsRange: "",
        messagesRange: "",
        reviewsRange: ""
    });    
    const [amountEnd, setAmountEnd] = useState<any>({
        activeShipments: "",
        customersRange: "",
        dispatchersRange: "",
        administratorsRange: "",
        messagesRange: "",
        reviewsRange: ""
    });

    const [showDispatchers, setShowDispatcher] = useState<any>(false)

    const [deleteWithId, setDeleteWithId] = useState<any>({
        parcels: 0,
        customers: 0,
        dispatchers: 0,
        administrators: 0,
        messages: 0,
        transactions: 0,
    })

    const [openUIBoxes, setOpenUIBoxes] = useState({
        shipmentSearch: false,
        shipmentPopup: false,
        shipmentClearData: false,
        customerSearch: false,
        customerPopup: false,
        customerClearData: false, 
        dispatcherSearch: false,
        dispatcherPopup: false,
        dispatcherClearData: false,
        administratorSearch: false,
        administratorPopup: false,
        administratorClearData: false,
        transactionSearch: false,
        reviewSearch: false,
        messageSearch: false,
        messagePopup: false,
        messageClearData: false
    });

    const [successMessage, setSuccessMessage] = useState({
        input: false,
        sendMessageError: false,
        distancePricesWelcomePage: true,
        error: true,
        changeDp: false,
        passwordUpdate: false,
        changeDispatcher: false,
        locationsSaved: false,
        activeShipment: true,
        isNotValid: false,
        deliveredShipment: true,
        noRider: false,
        customer: true,
        reviews: true,
        lateShipment: true,
        transaction: true,
        administrator: true,
        scheduledShipment: false,
        createShipment: false,
        shipmentPreference: true,
        paymentPreference: true,
        createCustomer: false,
        createDispatcher: false,
        createAdministrator: false,
        dispatcher: true,
        editShipment: false,
        editDispatcher: false,
        editAdministrator: false,
        saveWebsite: false,
        chargeBearer: false,
        paymentOptions: false,
        messages: true,
        websiteError: true,
        deliveryPrice: true,
        deliveryPriceDelete: true,
        deliveryPriceFetch: true,
        changePassword: false,
        staffAndCustomerForgotPassword: true,
        staffAndCustomerChangePassword: false,
        staffAndCustomerLogin: false,
        signOut: false,
    });
    const [storedName, setStoredName] = useState<any>({
        dispatcher: "",
        parcel: ""
    })


    const [inputData, setInputData] = useState<any>({
        shipment: "",
        customer: "",
        dispatcher: "",
        administrator: "",
        transaction: "",
        message: "",
        review: ""
    })

    return(
        <State_data.Provider value={{ globaldata, storedName, setStaffDetails, priceAndLocationsDelete, setPriceAndLocationsDelete, staffDetails, setStoredName, myKey, setMyKey, showDispatchers, setShowDispatcher, loading, setLoading, setGlobalData, globalPriceList, inputData, setInputData, deleteWithId, setDeleteWithId, setGlobalPriceList, inputField, setInputField, createdAtStart, setCreatedAtStart, createdAtEnd, setCreatedAtEnd, amountStart, setAmountStart, amountEnd, setAmountEnd, searchFields, setSearchFields, parcelRange, setParcelRange, customersRange, dispatcher, setDispatcher, setCustomersRange, dispatchersRange, setDispatchersRange, administratorsRange, setAdministratorsRange, transactionsRange, setTransactionsRange, messagesRange, setMessagesRange, reviewsRange, setReviewsRange, openUIBoxes, setOpenUIBoxes, successMessage, setSuccessMessage, id, setId, setSearchData, searchData }}>
            {children}
        </State_data.Provider>
    )
}