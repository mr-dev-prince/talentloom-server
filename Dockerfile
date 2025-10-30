# Use an official lightweight Node image
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files first (to leverage Docker cache)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the source code
COPY . .

# Expose your API port
EXPOSE 5000

# Use environment variables from .env if you mount it
# (Don't copy .env directly for security reasons)

# Run the server
CMD ["npm", "run", "dev"]
