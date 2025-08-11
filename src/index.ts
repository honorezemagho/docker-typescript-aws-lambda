import { createServer, IncomingMessage, ServerResponse } from 'http';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

interface ResponseData {
  status: string;
  message: string;
  timestamp: string;
  environment: string;
  nodeVersion: string;
}

// Server configuration
const config = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  host: process.env.HOST || '0.0.0.0',
};

// Create HTTP server
const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');
  
  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Set response header
  res.setHeader('Content-Type', 'application/json');
  
  // Create response data
  const responseData: ResponseData = {
    status: 'success',
    message: `Hello from ${config.nodeEnv} environment!`,
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
    nodeVersion: process.version
  };
  
  // Send the response
  res.statusCode = 200;
  res.end(JSON.stringify(responseData, null, 2));
});

// Start the server
server.listen(config.port, config.host, () => {
  console.log(`Server is running on http://${config.host}:${config.port}`);
  console.log(`Environment: ${config.nodeEnv}`);
  console.log(`Node.js version: ${process.version}`);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error: Error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason: {} | null | undefined, promise: Promise<any>) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
