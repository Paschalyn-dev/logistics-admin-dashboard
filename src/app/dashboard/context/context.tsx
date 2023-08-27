'use client'
import {createContext, useState} from "react";

export const State_data = createContext<any>(null);

export default function Context({children}: any){
    const [globaldata, setGlobalData] = useState<string[] | any>([]);
    const [globalPriceList, setGlobalPriceList] = useState<number[]>([]);
    const [parcelRange, setParcelRange] = useState<any>({});
    const [customersRange, setCustomersRange] = useState<any>({});
    const [dispatchersRange, setDispatchersRange] = useState<any>({});
    const [administratorsRange, setAdministratorsRange] = useState<any>({});
    const [messagesRange, setMessagesRange] = useState<any>({});
    const [reviewsRange, setReviewsRange] = useState<any>({});

    const [inputField, setInputField] = useState<any>({
        activeShipments: "",
        customersRange: "",
        dispatchersRange: "",
        administratorsRange: "",
        messagesRange: "",
        reviewsRange: ""
    });
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
    return(
        <State_data.Provider value={{ globaldata, setGlobalData, globalPriceList, setGlobalPriceList, inputField, setInputField, createdAtStart, setCreatedAtStart, createdAtEnd, setCreatedAtEnd, amountStart, setAmountStart, amountEnd, setAmountEnd, searchFields, setSearchFields, parcelRange, setParcelRange, customersRange, setCustomersRange, dispatchersRange, setDispatchersRange, administratorsRange, setAdministratorsRange, messagesRange, setMessagesRange, reviewsRange, setReviewsRange }}>
            {children}
        </State_data.Provider>
    )
}