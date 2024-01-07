const express = require("express");

const router = express.Router();
const { createComment, updateComment, getComment, deleteComment, getCommentsByRequest } = require("./comments.controller");

router.post("/", async (req, res) => {
  await createComment(req, res);
});

router.patch("/:id", async (req, res) => {
  await updateComment(req, res);
});

router.get("/:id", async (req, res) => {
  await getComment(req, res);
});

router.delete("/:id", async (req, res) => {
    await deleteComment(req, res);
  });

  router.get("/requests/:requestId", async (req, res) => {
    await getCommentsByRequest(req, res);
  });


module.exports = router;
