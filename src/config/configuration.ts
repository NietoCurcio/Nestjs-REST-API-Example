export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.MONGO_HOST || 'mongodb://localhost:27017/projectExample',
    port: parseInt(process.env.MONGO_PORT, 10) || 27017,
  },
});
