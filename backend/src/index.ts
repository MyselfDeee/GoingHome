  import app from './app';
import env from './config/env';

const server = app.listen(env.port, '0.0.0.0', () => {
  console.log(`API server running on http://0.0.0.0:${env.port}`);
});

const stop = () => {
  server.close(() => {
    console.log('Server closed gracefully');
  });
};

process.on('SIGINT', stop);
process.on('SIGTERM', stop);
