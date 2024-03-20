import 'dotenv/config';
import createExpressServer from './core/loaders/express';
import createSequelizeConnection from './core/loaders/database';
import createRedisConnection from './core/loaders/redis';

(async () => {
	try {
		createExpressServer();
		await createSequelizeConnection();
		await createRedisConnection();
	} catch(error) {
		console.error("Error starting server: ", error);
	}
})();