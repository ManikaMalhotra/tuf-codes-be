export default {
	port: process.env.PORT || "8080",
	databaseURL: process.env.DATABASE_URL ? process.env.DATABASE_URL : "postgres://tufcodes:local@localhost:5432/tufcodes",
	redisURL: process.env.REDIS_URL ? process.env.REDIS_URL : "redis://localhost:6379",
};