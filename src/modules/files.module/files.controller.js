const commentsService = require("./files.service");

const create = async (req, res) => {
    try {
        const { body } = req;
    
        const request = await commentsService.create(body);
        res.jsonp({
          error: "",
          data: { result: request },
        });
      } catch (e) {
        res.status(400).send({ error: e.message, data: {} });
      }
}

const getFile = async (req, res) => {
    try {
        const { params } = req;
        const { id } = params;
        const request = await commentsService.getFile(id);

        res.jsonp({
          error: "",
          data: { result: request },
        });
      } catch (e) {
        console.log(e)
        res.status(400).send({ error: e.message, data: {} });
      }
}

const deleteFile = async (req, res) => {
    try {
        const { params } = req;
        const { id } = params;
        const request = await commentsService.deleteFile(id);

        res.jsonp({
          error: "",
          data: { result: request },
        });
      } catch (e) {
        res.status(400).send({ error: e.message, data: {} });
      }
}

module.exports = {
    create, 
    getFile,
    deleteFile
}