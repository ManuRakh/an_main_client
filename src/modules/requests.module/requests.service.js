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


module.exports = {
  createRequest,
  fetchRequestByWorker,
};
