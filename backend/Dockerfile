# Use the Node.js base image
FROM node:14

# Create and set the working directory inside the container
WORKDIR /app/backend

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy all backend files to the working directory
COPY . .

# Expose the port where your application will run
EXPOSE 8080

# Command to start your application when the container is started
CMD ["node", "server.js"]
