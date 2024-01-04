const { Op } = require("sequelize");

const dotenv = require("dotenv");
const { sendRequest } = require("../utils/sendRequest");
dotenv.config();
const getAllWorkers = async (host, selectedAcademy) => {
  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${host}/workers?selectedAcademy=${selectedAcademy}`,
    headers: { 
        'accept': 'application/json', 
        'Content-Type': 'application/json'
    },
    };
    const request = await sendRequest(config);
  
    return request || [];

}   

const getWorkerById = async (workerId, host) => {
  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${host}/workers/${workerId}`,
    headers: { 
        'accept': 'application/json', 
        'Content-Type': 'application/json'
    },
    };
    const request = await sendRequest(config);
  
    return request;

}

const createWorker = async (params, host) => {
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${host}/workers`,
    headers: { 
        'accept': 'application/json', 
        'Content-Type': 'application/json'
    },
    data: JSON.stringify(params)
    };
    const request = await sendRequest(config);
  
    return request;
}

const deleteWorker = async (workerId, host) => {
  const config = {
    method: 'delete',
    maxBodyLength: Infinity,
    url: `${host}/workers/${workerId}`,
    headers: { 
        'accept': 'application/json', 
        'Content-Type': 'application/json'
    },
    };
    const request = await sendRequest(config);
  
    return request;
};

module.exports =  {
    getAllWorkers,
    getWorkerById,
    createWorker,
    deleteWorker,
}