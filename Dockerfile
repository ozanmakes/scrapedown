# Use a Node.js 16 image based on Debian Bullseye.
FROM node:16-bullseye

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install production dependencies and wrangler.
RUN npm install --only=development
RUN npm install -g wrangler

# Copy the local code to the container
COPY . .

# Expose the port the app runs on
EXPOSE 8787

# Run the application
CMD ["npm", "start"]

