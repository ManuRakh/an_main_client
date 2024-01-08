const commentsService = require("./comments.service");

const createComment = async (req, res) => {
    try {
        const { body } = req;

        const request = await commentsService.createComment(body);
        res.jsonp({
          error: "",
          data: { result: request },
        });
      } catch (e) {
        res.status(400).send({ error: e.message, data: {} });
      }
}

const updateComment = async (req, res) => {
    try {
        const { params, body } = req;
        const { id } = params;
        const currentUserId = req.user_id;

        const request = await commentsService.updateComment(body, id, currentUserId);

        res.jsonp({
          error: "",
          data: { result: request },
        });
      } catch (e) {
        res.status(400).send({ error: e.message, data: {} });
      }
}

const getComment = async (req, res) => {
    try {
        const { params } = req;
        const { id } = params;
        const request = await commentsService.getComment(id);

        res.jsonp({
          error: "",
          data: { result: request },
        });
      } catch (e) {
        res.status(400).send({ error: e.message, data: {} });
      }
}

const deleteComment = async (req, res) => {
    try {
        const { params } = req;
        const { id } = params;
        const currentUserId = req.user_id;

        const request = await commentsService.deleteComment(id, currentUserId);

        res.jsonp({
          error: "",
          data: { result: request },
        });
      } catch (e) {
        res.status(400).send({ error: e.message, data: {} });
      }
}

const getCommentsByRequest = async (req, res) => {
  try {
      const { params } = req;
      const { requestId } = params;
      const request = await commentsService.getCommentsByRequest(requestId);

      res.jsonp({
        error: "",
        data: { result: request },
      });
    } catch (e) {
      res.status(400).send({ error: e.message, data: {} });
    }
}

module.exports = {
    createComment, 
    updateComment, 
    getComment, 
    deleteComment,
    getCommentsByRequest
}