# Use Node.js 18 AWS Lambda base image
FROM public.ecr.aws/lambda/nodejs:18 as builder

# Set working directory
WORKDIR /var/task

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Build TypeScript
RUN npm run build

# Create a production image
FROM public.ecr.aws/lambda/nodejs:18

# Copy built files from builder
COPY --from=builder /var/task/package*.json ./
COPY --from=builder /var/task/dist/ ./

# Install production dependencies only
RUN npm install --only=production

# Set the CMD to your handler
CMD ["index.handler"]

