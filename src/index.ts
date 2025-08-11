import { createServer, IncomingMessage, ServerResponse } from 'http';

interface ResponseData {
  status: string;
  message: string;
  timestamp: string;
}

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  // Set the response header
  res.setHeader('Content-Type', 'application/json');
  
  // Create response data
  const responseData: ResponseData = {
    status: 'success',
    message: 'Hello, TypeScript!',
    timestamp: new Date().toISOString()
  };
  
  // Send the response
  res.statusCode = 200;
  res.end(JSON.stringify(responseData));
});

const PORT: number = parseInt(process.env.PORT || '3000', 10);

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
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
