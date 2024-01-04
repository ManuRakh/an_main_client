const { sendRequest } = require("../utils/sendRequest");

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

module.exports = {
    getAllUsers,
}