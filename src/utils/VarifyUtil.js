
export function isPhone(phone) {
    const isPhone = /^1[3-9]\d{9}$/;
    return isPhone.test(phone)
}

export function varifyPsw(password) {
    return password.length >= 8
}