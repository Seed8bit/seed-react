# Use the official image as a parent image
FROM node:12.4.0
# Set the working directory in image filesystem
WORKDIR /usr/src/app
# Copy the app's source code from host to image filesystem
COPY . .
# Install app's deps
RUN yarn install
RUN yarn run deps
RUN yarn run build-frontend
# Set port the container is listening on at runtime.
EXPOSE 5000
# Set the default command for running container
CMD [ "yarn", "run", "server" ]
