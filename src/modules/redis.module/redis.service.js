const Redis = require('ioredis');
const redis = new Redis(); // Конфигурация по умолчанию подключается к 127.0.0.1:6379

// Функция для сохранения токена в Redis
const storeToken = async (token, userId, expiration) => {
    await redis.set(`authToken:${userId}`, token, 'EX', expiration);
}

// Функция для проверки токена в Redis
const verifyToken = async (userId) => {
    return await redis.get(`authToken:${userId}`);
}

const redisDel = async (userId) => {
    return await redis.del(`authToken:${userId}`);
}

module.exports = {
    storeToken,
    verifyToken,
    redisDel,
}