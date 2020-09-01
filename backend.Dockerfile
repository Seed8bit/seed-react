# Use the official image as a parent image
FROM python:3.8.5
# Update python/pip
RUN apt-get update -y && \
    apt-get install -y python3-pip
RUN pip3 install pip --upgrade
# Set the working directory in image filesystem
WORKDIR /usr/src/app
# Copy the app's source code from host to image filesystem
COPY . .
# Install app's deps
RUN cd ./backend && \ 
    pip3 install -r requirements.txt
# Set port the container is listening on at runtime.
EXPOSE 5000
# Set the default command for running container
CMD cd ./backend && python3 main.py
