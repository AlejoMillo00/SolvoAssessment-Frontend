# Use an official Node.js runtime as a parent image
FROM node:20.10.0-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that your app will run on
EXPOSE 3000

# Define the command to run your application
CMD ["npm", "run", "dev"]