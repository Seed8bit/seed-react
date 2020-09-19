# Use the official image as a parent image
FROM node:12.4.0-slim
# Set the working directory in image filesystem
WORKDIR /usr/src/app
# Copy the app's source code from host to image filesystem
COPY . .
# Install app's deps
RUN npm install
RUN npm run deps
RUN npm run build
# Set port the container is listening on at runtime.
EXPOSE 8080
# Set the default command for running container
CMD [ "npm", "run", "start" ]
