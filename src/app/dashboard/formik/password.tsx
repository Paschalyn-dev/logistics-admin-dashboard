let string = 'ABCDEFGHIJKLMNOPQRSTUVXWYZ' + 'abcdefghijklmnopqrstuvwxyz' + '0123456789' + '@$%&';

export function Password () {
    let password = '';
        for(let i = 0; i <= 12; i++){
            let char = Math.floor(Math.random() * string.length);
            password += string[char];
    }
    return password;
}
    
