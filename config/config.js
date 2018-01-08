
const env = process.env.NODE_ENV || 'development';
console.log('enviroment: ', env);

if (env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/simplenotes';
}