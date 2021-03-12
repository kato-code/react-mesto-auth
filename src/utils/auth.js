export const BASE_URL = 'https://auth.nomoreparties.co';

export function register(email, password) {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    })
        .then((res) => {
            if(res.ok) {
                return res.json();
            } 

            return Promise.reject(`Ошибка: ${res.status}`)
        })
};

export function login(email, password) {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    })
        .then((res) => {
            if(res.ok) {
                return res.json();
            } 

            return Promise.reject(`Ошибка: ${res.status}`)
        });
};

export function getToken(token) {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`
        },
    })
        .then((res) => {
            if(res.ok) {
                return res.json();
            } 

            return Promise.reject(`Ошибка: ${res.status}`)
        });
};



