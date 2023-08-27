'use client'
import { useReducer } from "react";
import Holder from "../../holder";
import Section from "../../section";
import Hero from "../hero";
import PreferencesNav from "../preferencesnav";
import ToggleButton from "../shipment/toggleButton";
import SubHeading from "../website/subheading";

type NOTIFICATIONS = {
    inAppNotfications: boolean;
    emailNotifications: boolean;
    smsNotifcations: boolean;
    lateDeliveryNotifications: boolean;
}

const INITIAL__STATE: NOTIFICATIONS = {
    inAppNotfications: true,
    emailNotifications: true,
    smsNotifcations: true,
    lateDeliveryNotifications: false,
}

const notificationsReducer = (state: any, action: any) => {
    switch(action.type){
        case 'INAPPNOTIFICATIONS':
            return {...state, inAppNotfications: !state.inAppNotfications}
        
        case 'EMAILNOTIFICATIONS':
            return {...state, emailNotifications: !state.emailNotifications}
            
        case 'SMSNOTIFICATIONS':
            return {...state, smsNotifcations: !state.smsNotifcations}

        case 'LATEDELIVERYNOTIFICATIONS':
            return {...state, lateDeliveryNotifications: !state.lateDeliveryNotifications}

        default: 
            return state;
    }
}

export default function Notifications() {

    const [state, dispatch] = useReducer(notificationsReducer, INITIAL__STATE)

    const handleInAppNotifications = () => {
        dispatch({type: "INAPPNOTIFICATIONS", payload: !INITIAL__STATE.inAppNotfications})
    } 

    const handleEmailNotifications = () => {
        dispatch({type: "EMAILNOTIFICATIONS", payload: !INITIAL__STATE.emailNotifications})
    } 

    const handleInSmsNotifications = () => {
        dispatch({type: "SMSNOTIFICATIONS", payload: !INITIAL__STATE.smsNotifcations})
    }
    
    const handleLateDeliveryNotifications = () => {
        dispatch({type: "LATEDELIVERYNOTIFICATIONS", payload: !INITIAL__STATE.lateDeliveryNotifications})
    } 

    return(
        <Holder>
            <PreferencesNav />
              <Section>
                <Hero heading="Notifications" comingsoon="COMING SOON" icon="icon ion-md-notifications-outline" description="Tell us how you will like to receive notifications from us.">
                    <SubHeading subheading="General" />
                    <ToggleButton title="In-App Notifications" onOff={state.inAppNotfications} handleOnOff={handleInAppNotifications}/>
                    <ToggleButton title="Email Notifications" onOff={state.emailNotifications} handleOnOff={handleEmailNotifications}/>
                    <ToggleButton title="SMS Notifications" onOff={state.smsNotifcations} handleOnOff={handleInSmsNotifications}/>
                    <SubHeading subheading="Custom Notifications" />
                    <ToggleButton title="Late Delivery Notifications" onOff={state.lateDeliveryNotifications} handleOnOff={handleLateDeliveryNotifications} description="Recieve a notification when a customer's parcel is taking more than the estimated time of delivery" />
                </Hero>
            </Section>
        </Holder>
    )
}