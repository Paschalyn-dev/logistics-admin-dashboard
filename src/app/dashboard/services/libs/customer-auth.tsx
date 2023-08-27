import Cookies from "js-cookie";

export function customerLogin(token: string){
    Cookies.set('logistix.customer.auth', token)
}

export function customerLogout(){
    Cookies.remove('logistix.customer.auth');
}