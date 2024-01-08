const { sendRequest } = require("../utils/sendRequest");
const { mainQueue } = require("../utils/queues");
const { sendMessage } = require("../rabbit/send");
const objectType = "files";
const dotenv = require("dotenv");
const secretKey = 'your-secret-key';
const crypto = require('crypto');

dotenv.config();
const host = process.env.files;

const create = async (params) => {
  if (!params.data || !params.filename) throw new Error("params is incorrect");
  
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${host}/files`,
    headers: { 
        'accept': 'application/json', 
        'Content-Type': 'application/json'
    },
    data: JSON.stringify(params),
    };
  const result = await sendRequest(config);

  return result;
}

const decryptData = (encryptedData) => {
  const decipher = crypto.createDecipher('aes-256-cbc', secretKey);
  let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
  decryptedData += decipher.final('utf8');
  return decryptedData;
}

const getFile = async (id) => {
  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${host}/files/${id}`,
    headers: { 
        'accept': 'application/json', 
        'Content-Type': 'application/json'
    },
    };
    const { data, filename } = await sendRequest(config);

    return {
      data: decryptData(data),
      filename,
    }
}

const deleteFile = async (id, userId) => {
  const params = {
    id,
    action: 'delete',
    object_type: objectType,
  }

  const currentComment = await getFile(id);

  if (currentComment.user_id !== userId) throw new Error(`File does not belongs to the current user`);

  const request = await sendMessage(mainQueue, params);

  return request;
}

module.exports = {
    create, 
    getFile, 
    deleteFile
  }