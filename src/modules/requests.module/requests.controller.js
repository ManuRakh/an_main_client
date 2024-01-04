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
    const request = await requestsService.createRequest(body, host);

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

module.exports = {
  createRequest,
  fetchRequestByWorker,
};
