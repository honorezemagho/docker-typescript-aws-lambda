import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';

interface ResponseData {
  status: string;
  message: string;
  timestamp: string;
  environment: string;
  nodeVersion: string;
}

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  console.log('Event: ', JSON.stringify(event, null, 2));
  console.log('Context: ', JSON.stringify(context, null, 2));

  const nodeEnv = process.env.NODE_ENV || 'development';
  
  // Create response data
  const responseData: ResponseData = {
    status: 'success',
    message: `Hello from ${nodeEnv} environment!`,
    timestamp: new Date().toISOString(),
    environment: nodeEnv,
    nodeVersion: process.version
  };

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
    body: JSON.stringify(responseData, null, 2),
  };
};
