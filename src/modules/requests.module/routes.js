const express = require("express");

const router = express.Router();
const { createRequest, fetchRequestByWorker, fetchIncomingRequests, updateRequest, getRequest, fetchOutcomingRequests } = require("./requests.controller");

router.post("/", async (req, res) => {
  await createRequest(req, res);
});

router.patch("/:id", async (req, res) => {
  await updateRequest(req, res);
});

router.get("/:id", async (req, res) => {
  await getRequest(req, res);
});

router.get("/incoming/requests", async (req, res) => {
  await fetchIncomingRequests(req, res);
});

router.get("/outcoming/requests", async (req, res) => {
  await fetchOutcomingRequests(req, res);
});

module.exports = router;
