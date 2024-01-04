const { Op } = require("sequelize");

const dotenv = require("dotenv");
dotenv.config();
const getAllWorkers = async (host) => {
}   

const getWorkerById = async (workerId) => {
}

const createWorker = async (params) => {
}

const deleteWorker = async (workerId) => {
};

module.exports =  {
    getAllWorkers,
    getWorkerById,
    createWorker,
    deleteWorker,
}