const { getAcademyHost } = require("../utils/getAcademyHost");
const requestsService = require("./requests.service");

const createRequest = async (req, res) => {
  try {
    const { body } = req;

    const host = getAcademyHost(req.academy_host);

    const request = await requestsService.createRequest(body, host);

    res.jsonp({
      error: "",
      data: { request },
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
      data: { request },
    });
  } catch (e) {
    res.status(400).send({
      error: e.response?.data?.error || e.message,
      data: ""
  });
}

}

module.exports = {
  createRequest,
  fetchRequestByWorker,
};
