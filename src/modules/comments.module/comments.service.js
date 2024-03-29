const { sendMessage } = require("../rabbit/send");
const { mainQueue } = require("../utils/queues");
const { sendRequest } = require("../utils/sendRequest");
const dotenv = require("dotenv");
dotenv.config();

const objectType = "comments";
const host = process.env.comments;

const createComment = async (params) => {
  params.action = "create";
  params.object_type = objectType;

  const request = await sendMessage(mainQueue, params);

  return request;
}

const updateComment = async (params, id, userId) => {
  params.id = id;
  params.action = "update";
  params.object_type = objectType;
  const currentComment = await getComment(id);

  if (currentComment.user_id !== userId) throw new Error(`Comment does not belongs to the current user`);

  const request = await sendMessage(mainQueue, params);

  return request;
}

const getComment = async (id) => {
  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${host}/comments/${id}`,
    headers: { 
        'accept': 'application/json', 
        'Content-Type': 'application/json'
    },
    };
    const request = await sendRequest(config);

    return request;
}

const deleteComment = async (id, userId) => {
  const currentComment = await getComment(id);

  if (currentComment.user_id !== userId) throw new Error(`Comment does not belongs to the current user`);

    return await updateComment({ deletedAt: new Date()}, id, userId);
}

const getCommentsByRequest = async (id) => {
  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${host}/comments/requests/${id}`,
    headers: { 
        'accept': 'application/json', 
        'Content-Type': 'application/json'
    },
    };
    const request = await sendRequest(config);

    return request;

};

module.exports = {
    createComment, 
    updateComment, 
    getComment, 
    deleteComment,
    getCommentsByRequest
}