const { sendMessage } = require("../rabbit/send");
const { mainQueue } = require("../utils/queues");
const { sendRequest } = require("../utils/sendRequest");
const { v4: uuidv4 } = require('uuid');

const objectType = "request";

const createRequest = async (params) => {
  params.status = "scheduled";
  params.action = "create";
  params.object_type = objectType;
  params.identifier = uuidv4();
  
  if (!params.receiver_user_id) throw new Error("Receiver user id is required");
  if (!params.worker_id || params.worker_id === "") throw new Error("worker_id must be specified");
  
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

const fetchIncomingRequests = async (host, userId, isAdmin = false) => {
  const     url = `${host}/requests/incoming/requests?user_id=${userId}&isAdmin=${isAdmin}`
  console.log(url);
  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url,
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

const getRequest = async (id, userId, isAdmin = false, host) => {
  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${host}/requests/${id}?user_id=${userId}&isAdmin=${isAdmin}`,
    headers: { 
        'accept': 'application/json', 
        'Content-Type': 'application/json'
    },
    };
    const request = await sendRequest(config);

    return request;
}

const fetchOutcomingRequests = async (host, userId, isAdmin = false) => {
  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${host}/requests/outcoming/requests?user_id=${userId}&isAdmin=${isAdmin}`,
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
