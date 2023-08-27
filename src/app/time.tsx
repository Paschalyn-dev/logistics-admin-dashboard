'use client'
import { useState, useEffect } from "react";

export default function Time(){
    const [time, setTime] = useState<number>(0);
    useEffect(() => {
        let date: Date = new Date();
        setTime(date.getHours());
    }, [time])
    return(
        <div>
           {time >= 12 && time < 16 && <h1>Good Afternoon,</h1>}
           {time <= 11 && <h1>Good Morning,</h1>}
           {time >= 16 && time <= 18 && <h1>Good Evening,</h1>}
           {time > 18 && time <=23 && <h1>Good Night,</h1>}
        </div>
    )
}