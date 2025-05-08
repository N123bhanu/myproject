# Use official Node.js image as a base
FROM node:16

# Set working directory inside container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json from the backend folder
COPY backend/package*.json ./

# Install dependencies using npm ci for clean install
RUN npm ci

# Copy the rest of the project files
COPY . .

# Expose the correct port (match with Jenkins pipeline)
EXPOSE 9090

# Command to run your app
CMD ["npm", "start"]
