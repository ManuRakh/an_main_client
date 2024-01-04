const express = require("express");

const router = express.Router();
const { createRequest, fetchRequestByWorker } = require("./requests.controller");

router.post("/", async (req, res) => {
  await createRequest(req, res);
});

router.get("/:worker_id", async (req, res) => {
  await fetchRequestByWorker(req, res);
});

module.exports = router;
