const { sendMessage } = require("../rabbit/send");
const { mainQueue } = require("../utils/queues");
const { sendRequest } = require("../utils/sendRequest");

const objectType = "request";

const createRequest = async (params) => {
  params.status = "scheduled";
  params.action = "create";
  params.object_type = objectType;

  await sendMessage(mainQueue, params);
};

const fetchRequestByWorker = async (workerId, host) => {
  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${host}/requests/${workerId}`,
    headers: { 
        'accept': 'application/json', 
        'Content-Type': 'application/json'
    },
    };
    const request = await sendRequest(config);

    return request;
}

const fetchIncomingRequests = async (host) => {
  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${host}/requests/incoming/requests`,
    headers: { 
        'accept': 'application/json', 
        'Content-Type': 'application/json'
    },
    };
    const request = await sendRequest(config);

    return request;
}

const updateRequest =async (params, id) => {
    params.id = id;
    params.action = "update";
    params.object_type = objectType;

    const request = await sendMessage(mainQueue, params);

    return request;
}

const getRequest = async (id, host) => {
  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${host}/requests/${id}`,
    headers: { 
        'accept': 'application/json', 
        'Content-Type': 'application/json'
    },
    };
    const request = await sendRequest(config);

    return request;
}

const fetchOutcomingRequests = async (host) => {
  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${host}/requests/outcoming/requests`,
    headers: { 
        'accept': 'application/json', 
        'Content-Type': 'application/json'
    },
    };
    const request = await sendRequest(config);

    return request;
}

module.exports = {
  createRequest,
  fetchRequestByWorker,
  fetchIncomingRequests,
  updateRequest,
  getRequest,
  fetchOutcomingRequests,
};
