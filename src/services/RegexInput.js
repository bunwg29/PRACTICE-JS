// This file check input of login-register form

export const usernameRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,}$/;
export const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{6,}$/;
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function validateUsername(username) {
    return usernameRegex.test(username);
}

export function validatePassword(password) {
    return passwordRegex.test(password);
}

export function validateEmail(email) {
   return emailRegex.test(email);
}