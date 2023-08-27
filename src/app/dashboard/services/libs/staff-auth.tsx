import Cookies from "js-cookie";

export function login(token: string) {
    Cookies.set('logistix.user.auth', token)
}

export function logout() {
    Cookies.remove('logistix.user.auth');
}
