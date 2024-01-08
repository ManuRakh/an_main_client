const { sendRequest } = require("../utils/sendRequest");
const bcrypt = require('bcryptjs');

const possibleRoles = ["админ", "работник"];

const create = async (params, host) => {
    if (!params.password) throw new Error("Пароль не корректно введён");
    if (!params.phone) throw new Error("Пароль не корректно введён");
    if (!params.username) throw new Error("Не корректный никнейм");
    if (!params.role) throw new Error("Роль не задана");
    if (!possibleRoles.includes(params.role)) throw new Error("Не корректная роль, должна быть либо админ, либо работник")

    const phoneRegex = /^\d{9}$/;
    if (!phoneRegex.test(params.phone)) {
        throw new Error("Номер телефона должен содержать ровно 9 цифр");
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(params.password)) {
        throw new Error("Пароль должен содержать минимум 8 символов, включать буквы и цифры");
    }

    const usernameRegex = /^[A-Za-z\d]{3,16}$/;
    if (!usernameRegex.test(params.username)) {
        throw new Error("Никнейм должен быть от 3 до 16 символов и содержать только буквы и цифры");
    }

    if (params.email) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(params.email)) {
            throw new Error("Некорректный формат email");
        }
    };

    params.role = params.role === "админ" ? "admin" : "worker";
    const hashedPassword = await bcrypt.hash(params.password, 8);
    params.password = hashedPassword;

    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${host}/users`,
        headers: { 
            'accept': 'application/json', 
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(params),
        };
        
    
        const request = await sendRequest(config);
      
        return request;
}

const getAllUsers = async (host) => {
    const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${host}/users`,
        headers: { 
            'accept': 'application/json', 
            'Content-Type': 'application/json'
        },
        };
        const request = await sendRequest(config);
      
        return request;
}   

const updateMe = async (body, id, host) => {
    const config = {
        method: 'patch',
        maxBodyLength: Infinity,
        url: `${host}/users/${id}`,
        headers: { 
            'accept': 'application/json', 
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(body),
        };
        const request = await sendRequest(config);
      
        return request;
}

const getMe = async (id, host) => {
    const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${host}/users/${id}`,
        headers: { 
            'accept': 'application/json', 
            'Content-Type': 'application/json'
        },
        };
        const request = await sendRequest(config);
      
        return request;
}

module.exports = {
    getAllUsers,
    updateMe,
    getMe,
    create,
}