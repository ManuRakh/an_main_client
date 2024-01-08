const { sendRequest } = require("../utils/sendRequest");

const create = async (params, host) => {
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