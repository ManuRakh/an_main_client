const axios = require('axios');

const sendRequest = async (config) => {
    const response = await axios.request(config);

    return response?.data?.data?.result;
}

module.exports = {
    sendRequest,
}