'use-client'
import {useEffect, useState} from "react";

export default function ModeToggle(){
    const [mode, setMode] = useState<boolean>(true);

    useEffect(function onFirstMount() {
        const currentMode = localStorage.getItem('currentMode');
        if(currentMode) setMode(JSON.parse(currentMode))
    },[]);

    useEffect(() => {
        localStorage.setItem('currentMode', JSON.stringify('currentMode'));
    })
    return(
        <div>
            <div className="cursor-pointer" onClick={() => setMode(!mode)}>
                <i className={mode ? 'icon ion-md-sunny' : 'icon ion-md-moon'} title={mode ? "Light" : "Dark"}></i>
            </div>
        </div>
    )
}