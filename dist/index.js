"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const server = (0, http_1.createServer)((req, res) => {
    // Set the response header
    res.setHeader('Content-Type', 'application/json');
    // Create response data
    const responseData = {
        status: 'success',
        message: 'Hello, TypeScript!',
        timestamp: new Date().toISOString()
    };
    // Send the response
    res.statusCode = 200;
    res.end(JSON.stringify(responseData));
});
const PORT = parseInt(process.env.PORT || '3000', 10);
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});
// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});
