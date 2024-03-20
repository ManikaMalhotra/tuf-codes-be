import { Sequelize } from "sequelize";
import config from "../config";

const { databaseURL } = config;
export const sequelize = new Sequelize(databaseURL);

export default async function createSequelizeConnection() {
	try {
		await sequelize.authenticate();
		console.log('Connection to the database has been established successfully.');
		await sequelize.sync({ alter: true });
		console.log('All models were synchronized successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
};