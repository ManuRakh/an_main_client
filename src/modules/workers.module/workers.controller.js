const { getAcademyHost } = require("../utils/getAcademyHost");
const workersService = require("./workers.service");

const getAllWorkers = async (req,res) => {
    try {
      const { query } = req;
      const { selected_academy: selectedAcademy } = query;
      const host = getAcademyHost(selectedAcademy ? selectedAcademy : req.academy_host);
      
        const allWorkers = await workersService.getAllWorkers(host);
    
        res.jsonp({
          error: "",
          data: { result: allWorkers },
        });
      } catch (e) {
        res.status(400).send({
          error: e.response?.data?.error || e.message,
          data: ""
      });
    }
}

const getWorkerById = async (req,res) => {
  try {
    const { params } = req;
    const { worker_id: workerId } = params;
    const host = getAcademyHost(req.academy_host);

    const foundWorker = await workersService.getWorkerById(workerId, host);

    res.jsonp({
      error: "",
      data: { result: foundWorker },
    });
  } catch (e) {
    res.status(400).send({
      error: e.response?.data?.error || e.message,
      data: ""
  });
}
}

const createWorker = async (req, res) => {
  try {
    const host = getAcademyHost(req.academy_host);

    const { body } = req;
    const foundWorker = await workersService.createWorker(body, host);

    res.jsonp({
      error: "",
      data: { result: foundWorker },
    });
  } catch (e) {
    res.status(400).send({
      error: e.response?.data?.error || e.message,
      data: ""
  });
}
}

const deleteWorker = async (req, res) => {
  try {
    const { params } = req;
    const host = getAcademyHost(req.academy_host);

    const { worker_id: workerId } = params;

    const foundWorker = await workersService.deleteWorker(workerId, host);

    res.jsonp({
      error: "",
      data: { result: foundWorker },
    });
  } catch (e) {
    res.status(400).send({
      error: e.response?.data?.error || e.message,
      data: ""
  });
}
}
module.exports = {
  getAllWorkers,
  getWorkerById,
  createWorker,
  deleteWorker,
}