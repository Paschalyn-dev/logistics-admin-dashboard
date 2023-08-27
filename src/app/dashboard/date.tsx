'use client'
import { useState, useEffect } from "react";
import { Password } from "./formik/password";
import { useAllDispatchersFetcher } from "./services/swr-functions/customer-swr";

type TDD = {
    dateDetails: string;
}

type dateAndTime = {
    day: number,
    month: number,
    year: number
}
useAllDispatchersFetcher
export default function useDateHandler(date: any){
    let currentDate: Date = new Date();
    // let date: Date = new Date(props.dateDetails);
    const currentDateObj = {
        day: currentDate.getDay(),
        month: currentDate.getMonth(),
        year: currentDate.getFullYear()
    }
    const dateObj = {
        day: date.getDay(),
        month: date.getMonth(),
        year: date.getFullYear()
    }
    let finalDate: dateAndTime = {       
        day: Math.abs(currentDateObj.day - dateObj.day), 
        // month: Math.abs(12 - dateObj.month + currentDateObj.month), 
        month: Math.abs(currentDateObj.month - dateObj.month), 
        year: Math.abs(currentDateObj.year - dateObj.year)
    }
    return(
        <div>
            {finalDate.day === 0 && finalDate.year === 0 && finalDate.month === 0 && 
            <span>Today,</span>}
            {finalDate.month >= 1 && finalDate.day <= 31 && finalDate.year <= 1 && 
            <span>{finalDate.month} months ago.</span>}
            {finalDate.month >= 1 && finalDate.day <= 31 && finalDate.year > 1 && 
            <span>{finalDate.month} years ago.</span>}
            {finalDate.month <= 1 && finalDate.day <= 31 && finalDate.year <= 1 && 
            <span>{finalDate.day} days ago.</span>}
        </div>
    )
}