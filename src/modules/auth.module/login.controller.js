const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { storeToken, redisDel } = require('../redis.module/redis.service');
const { Op } = require("sequelize");
const hours48 = 48 * 60 * 60;
const axios = require('axios');
const dotenv = require("dotenv");
const { sendRequest } = require('../utils/sendRequest');
const { getAcademyHost } = require('../utils/getAcademyHost');
dotenv.config();

const login = async (req, res) => {
    try {
        const { username, password, academy } = req.body;
        const data = JSON.stringify({
            username: username,
            password: password,
        });

        if (!academy) throw new Error("Please enter your academy");

        const academyHost = getAcademyHost(academy);

        console.log({academyHost})
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${academyHost}/auth/login`,
            headers: { 
                'accept': 'application/json', 
                'Content-Type': 'application/json'
            },
            data : data
        };

        const user = await sendRequest(config);
        const token = jwt.sign({ id: user.id, role: user.role, academy }, 'secret', { expiresIn: '48h' });
        await storeToken(token, user.id, hours48);

         res.status(200).send({ user, token });
    } catch (e) {
        res.status(400).send({
            error: e.message,
            data: ""
        });
    }
}

const logout = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'secret');

        await redisDel(decoded.id);

        res.status(200).send({ message: 'Successfully logged out' });
    } catch (error) {
        res.status(400).send({
            error: e.response?.data?.error || e.message,
            data: ""
        });
    }
}

const registerUser = async (req, res) => {
    try {
        const { body } = req;
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'secret');

        if (decoded.role !== 'admin') throw new Error("Only admins can register users");

        const academy = decoded.academy;
        const data = JSON.stringify({
            ...body,
        });
        const academyHost = getAcademyHost(academy);

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${academyHost}/auth/register_user`,
            headers: { 
                'accept': 'application/json', 
                'Content-Type': 'application/json'
            },
            data : data
        };
        
        const registeredUser = await sendRequest(config);

        res.status(201).send({ result: registeredUser });
      } catch (e) {
        res.status(400).send({
            error: e.response?.data?.error || e.message,
            data: ""
        });
      }
}

module.exports = {
    login,
    logout,
    registerUser,
}