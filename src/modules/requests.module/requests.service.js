const { sendRequest } = require("../utils/sendRequest");

const createRequest = async (params, host) => {
  const data = JSON.stringify({
    ...params,
    status: "scheduled",
});

const config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: `${host}/requests`,
  headers: { 
      'accept': 'application/json', 
      'Content-Type': 'application/json'
  },
  data : data
  };
  const request = await sendRequest(config);

  console.log({request})
  return request;
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

const updateRequest =async (params, id, host) => {
  const config = {
    method: 'patch',
    maxBodyLength: Infinity,
    url: `${host}/requests/${id}`,
    headers: { 
        'accept': 'application/json', 
        'Content-Type': 'application/json'
    },
    data: JSON.stringify(params),
    };
    const request = await sendRequest(config);

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
module.exports = {
  createRequest,
  fetchRequestByWorker,
  fetchIncomingRequests,
  updateRequest,
  getRequest,
};
