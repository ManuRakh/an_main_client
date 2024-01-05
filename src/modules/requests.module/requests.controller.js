const { getAcademyHost } = require("../utils/getAcademyHost");
const requestsService = require("./requests.service");

const createRequest = async (req, res) => {
  try {
    const { body } = req;
    const { query } = req;
    if (!req.user_id) throw new Error("Internal server error");

    const { selected_academy: selectedAcademy } = query;
    const host = getAcademyHost(selectedAcademy ? selectedAcademy : req.academy_host);

    body.user_id = req.user_id;
    body.sender_academy = req.academy_host;
    body.receiving_academy = selectedAcademy;

    const creatingParams = {
      ...body,
      user_id: req.user_id,
      sender_academy: req.academy_host,
      receiving_academy: selectedAcademy,
    }

    const request = await requestsService.createRequest(creatingParams, host);

    res.jsonp({
      error: "",
      data: { result: request },
    });
  } catch (e) {
    res.status(400).send({
      error: e.response?.data?.error || e.message,
      data: ""
  });
}
};

const fetchRequestByWorker = async (req, res) => {
  try {
    const { params } = req;
    const { worker_id: workerId } = params;
    const host = getAcademyHost(req.academy_host);

    const request = await requestsService.fetchRequestByWorker(workerId, host);

    res.jsonp({
      error: "",
      data: { result: request },
    });
  } catch (e) {
    res.status(400).send({
      error: e.response?.data?.error || e.message,
      data: ""
  });
}
}

const fetchIncomingRequests = async (req, res) => {
  try {
    const host = getAcademyHost(req.academy_host);

    const request = await requestsService.fetchIncomingRequests(host);

    res.jsonp({
      error: "",
      data: { result: request },
    });
  } catch (e) {
    res.status(400).send({
      error: e.response?.data?.error || e.message,
      data: ""
  });
}
}

const updateRequest = async (req, res) => {
  try {
    const { body } = req;
    const { params } = req;
    const { id } = params;
    const { selected_academy: selectedAcademy } = req.query;
    const host = getAcademyHost(selectedAcademy ? selectedAcademy : req.academy_host);

    const request = await requestsService.updateRequest(body, id, host);

    res.jsonp({
      error: "",
      data: { result: request },
    });
  } catch (e) {
    res.status(400).send({
      error: e.response?.data?.error || e.message,
      data: ""
  });
}
}

const getRequest = async (req, res) =>{
  try {
    const { params } = req;
    const { id } = params;
    const { selected_academy: selectedAcademy } = req.query;
    const host = getAcademyHost(selectedAcademy ? selectedAcademy : req.academy_host);

    const request = await requestsService.getRequest(id, host);

    res.jsonp({
      error: "",
      data: { result: request },
    });
  } catch (e) {
    res.status(400).send({
      error: e.response?.data?.error || e.message,
      data: ""
  });
}
}

const fetchOutcomingRequests = async (req, res) => {
  try {
    const { selected_academy: selectedAcademy } = req.query;
    console.log({selectedAcademy})
    const host = getAcademyHost(selectedAcademy ? selectedAcademy : req.academy_host);

    const request = await requestsService.fetchOutcomingRequests(host);

    res.jsonp({
      error: "",
      data: { result: request },
    });
  } catch (e) {
    res.status(400).send({ error: e.message, data: {} });
  }
}
module.exports = {
  createRequest,
  fetchRequestByWorker,
  fetchIncomingRequests,
  updateRequest,
  getRequest,
  fetchOutcomingRequests,
};
