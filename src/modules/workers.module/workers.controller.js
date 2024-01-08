const { getAcademyHost } = require("../utils/getAcademyHost");
const workersService = require("./workers.service");

const getAllWorkers = async (req,res) => {
    try {
      const { query } = req;
      const { selected_academy: selectedAcademy, all } = query;
      const host = getAcademyHost(selectedAcademy ? selectedAcademy : req.academy_host);
      const userId = req.user_id;

        const allWorkers = await workersService.getAllWorkers(host, userId, all);
    
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
    const { query } = req;
    const { selected_academy: selectedAcademy } = query;
    const host = getAcademyHost(selectedAcademy ? selectedAcademy : req.academy_host);

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
    const { query } = req;
    const { selected_academy: selectedAcademy } = query;
    const host = getAcademyHost(selectedAcademy ? selectedAcademy : req.academy_host);

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
    const { query } = req;
    const isAdmin = req.admin;
    if (!isAdmin) throw new Error("Только админ может удалять работников. Если вам нужно удалить работника, пожалуйста свяжитесь с администрацией");
    
    const { selected_academy: selectedAcademy } = query;
    const host = getAcademyHost(selectedAcademy ? selectedAcademy : req.academy_host);

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