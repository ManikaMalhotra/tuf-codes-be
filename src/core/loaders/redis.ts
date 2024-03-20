import { createClient } from 'redis';
import config from '../config';

const { redisURL } = config;

export const client = createClient({
	url: redisURL
});

client.on('error', (error) => {
	console.error('Error connecting to Redis: ', error);
});

export default async function createRedisConnection() {
	await client.connect();
	console.log('Connected to Redis');
};