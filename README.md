# TypeScript AWS Lambda with Docker

This project provides a template for building and deploying TypeScript-based AWS Lambda functions using Docker. It includes everything you need to develop, test, and deploy serverless functions with TypeScript.

## Features

- 🚀 **TypeScript** - Write type-safe Lambda functions
- 🐳 **Docker** - Containerized development and deployment
- 🔄 **Multi-stage builds** - Optimized production images
- ⚡ **Fast builds** - Efficient dependency management
- 🔒 **Environment variables** - Secure configuration management

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [Docker](https://www.docker.com/)
- [AWS CLI](https://aws.amazon.com/cli/) (for deployment)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/honorezemagho/docker-typescript-aws-lambda.git
cd docker-typescript-aws-lambda
```

### 2. Install dependencies

```bash
npm install
```

### 3. Build the project

```bash
# Build TypeScript
docker buildx build --platform linux/amd64 --provenance=false -t lambda-ts .
```

### 4. Run locally with Docker

```bash
docker run -p 9000:8080 lambda-ts
```

### 5. Test the Lambda function

In a new terminal, send a test event:

```bash
curl -XPOST "http://localhost:9000/2015-03-31/functions/function/invocations" -d '{}'
```

## Project Structure

```
.
├── src/
│   └── index.ts          # Lambda function handler
├── .env                  # Environment variables (not committed to git)
├── .env.example          # Example environment variables
├── Dockerfile            # Multi-stage Dockerfile
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md             # This file
```

## Available Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run watch` - Watch for changes and recompile
- `npm start` - Run the compiled Lambda function
- `npm run dev` - Run with ts-node for development
- `npm run package` - Create a deployment package

## Environment Variables

Create a `.env` file based on `.env.example`:

```env
NODE_ENV=development
# Add other environment variables here
```

## Deployment

### 1. Build the Docker image

```bash
docker buildx build --platform linux/amd64 --provenance=false -t your-ecr-repo/lambda-ts .
```

### 2. Push to Amazon ECR

```bash
# Authenticate Docker with ECR
aws ecr get-login-password --region your-region | docker login --username AWS --password-stdin your-account-id.dkr.ecr.your-region.amazonaws.com

# Tag and push the image
docker tag your-ecr-repo/lambda-ts:latest your-account-id.dkr.ecr.your-region.amazonaws.com/your-ecr-repo/lambda-ts:latest
docker push your-account-id.dkr.ecr.your-region.amazonaws.com/your-ecr-repo/lambda-ts:latest
```

### 3. Update your Lambda function

Update your AWS Lambda function to use the new container image from ECR.

## Best Practices

- Keep your Lambda functions small and focused
- Use environment variables for configuration
- Implement proper error handling
- Add logging for debugging
- Use AWS Parameter Store or Secrets Manager for sensitive data

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
