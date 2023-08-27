'use client'
import { useState, useEffect } from "react";
export function useLoading(loading: any, delay = 500) {
    const [isLoading, setIsLoading] = useState(loading)

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(true), delay)
    }, [loading])
  
    return isLoading;
  }