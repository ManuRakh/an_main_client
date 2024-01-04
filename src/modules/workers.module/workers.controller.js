const workersService = require("./workers.service");

const getAllWorkers = async (req,res) => {
    try {
        const allWorkers = await workersService.getAllWorkers();
    
        res.jsonp({
          error: "",
          data: { result: allWorkers },
        });
      } catch (e) {
        res.status(400).send({ error: e.message, data: {} });
      }
}

const getWorkerById = async (req,res) => {
  try {
    const { params } = req;
    const { worker_id: workerId } = params;

    const foundWorker = await workersService.getWorkerById(workerId);

    res.jsonp({
      error: "",
      data: { result: foundWorker },
    });
  } catch (e) {
    res.status(400).send({ error: e.message, data: {} });
  }
}

const createWorker = async (req, res) => {
  try {

    const { body } = req;
    const foundWorker = await workersService.createWorker(body);

    res.jsonp({
      error: "",
      data: { result: foundWorker },
    });
  } catch (e) {
    res.status(400).send({ error: e.message, data: {} });
  }
}

const deleteWorker = async (req, res) => {
  try {
    const { params } = req;

    const { worker_id: workerId } = params;

    const foundWorker = await workersService.deleteWorker(workerId);

    res.jsonp({
      error: "",
      data: { result: foundWorker },
    });
  } catch (e) {
    res.status(400).send({ error: e.message, data: {} });
  }
}
module.exports = {
  getAllWorkers,
  getWorkerById,
  createWorker,
  deleteWorker,
}