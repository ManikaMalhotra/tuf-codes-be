import express from 'express';
import { Server, createServer } from 'http';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import config from '../config';
import errorHandler from '../../middlewares/error-handler';
import formRouter from '../../form/form.controller';

const app = express();
const { port } = config;

export default function createExpressServer() {
	const serverListener: Server = createServer(app);

	app.use(cors());
	
	app.use(cookieParser());
	app.use(express.json());

	app.use(formRouter);

	app.use(errorHandler);

	serverListener.listen(port, () => {
		console.log(`Server listening on port ${port}`);
	});

	return serverListener;
}