const express = require("express");

const router = express.Router();
const { getAllWorkers, getWorkerById, createWorker, deleteWorker } = require("./workers.controller");

router.get("/", async (req, res) => {

  await getAllWorkers(req, res);
});

router.get("/:worker_id", async (req, res) => {

  await getWorkerById(req, res);
})

router.post("/", async (req, res) => {

  await createWorker(req, res);
});

router.delete("/:worker_id", async (req, res) => {
  await deleteWorker(req, res);
});
  module.exports = router;
