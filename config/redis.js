// const redis = require('redis');
// require('dotenv').config();

// const redisClient = redis.createClient({
//   url: process.env.REDIS_URL,
// });

// redisClient.on('connect', () => {
//   console.log('Redis client connected...');
// });

// redisClient.on('error', (err) => {
//   console.log('Redis client error: ', err);
// });

// module.exports = redisClient;

const redis = require('redis');

const redisClient = redis.createClient({
    password: 'sKtU9HmQWgCKdRxdwfWY39WBICi9p2xU',
    host: 'redis-19897.c212.ap-south-1-1.ec2.redns.redis-cloud.com',
    port: 19897
});
redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
  console.error('Redis error: ', err);
});

module.exports = redisClient;

