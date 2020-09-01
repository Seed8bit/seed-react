# Overview

This repository contains a web application to provide vegetable planting guideline.

The tech stack includes *React*, *FastAPI* and *Azure* as cloud service.

# Development

Check [Frontend doc](./frontend/README.md)

Check [Backend doc](./backend/README.md)

Check [package.json](./package.json) for some npm scripts

# Deployment
## Deploy to Azure Virtual Machine
Deploy application to Azure virtual machine. 

### Start watchtower container in VM
We use [Watchtower](https://github.com/containrrr/watchtower) to automatically pulling latest image from docker hub and deploy on VM. Watchtower monitors all running contianers in docker and automatically pulling the latest image from docker hub and deploy in VM.

To start watchtower:
```
docker run -d \
    --name watchtower \
    -v /var/run/docker.sock:/var/run/docker.sock \
    containrrr/watchtower
```

Run the image in VM:
```
docker run --publish {host_port}:{container_port} {repository:tag}

for example:
docker run --publish 8000:5000 rectcream/garden:latest
```

### Application Docker Image Deployment
1. Build image
```
docker build --tag garden:{version} --file {docker_compose_yml_file} .

for example:
# please not miss the last argument `.` (refer to build context path)
docker build -t rectcream/garden:latest -f frontend.Dockerfile .
```

2. Run Image on local host
```
docker run --publish 8000:5000 --detach --name garden {image_name}
or
docker run --publish 8000:5000 {repository:tag}

for example
docker run --publish 8000:5000 rectcream/garden:latest
```

--publish flag connect container's 5000 port to host's 8000 port.

Check [Dockerfile](./Dockerfile) for image build reference


3. Push the Image to Docker Hub
```
docker push {repository:tag}

for example
docker push rectcream/garden:latest
```

### Adding new login user to Azure Virtual Machine
* Login Azure Portal, and select Virtual Machine
* Select `Reset password'
  * We can then select `Reset password` to add a login username and password
  * Or we can select `Reset SSH public key` to add a SSH public key which generated in the local host.
  * Or we can manually use the following command to add public key directly to VM's user:
```
ssh-copy-id (Linux)
type $env:USERPROFILE\.ssh\id_rsa.pub | ssh "IP_ADDR" -l "USER_NAME" "cat >> .ssh/authorized_keys" (Windows)
```
* Then use the following command to login
```
ssh "IP_ADDR" -l "USER_NAME"
```

## Deploy to Azure App Service
## Azure App Service
Azure App Service is integrated with Github Action.

1. Build & deploy with Github Action
- Check [workflow](./.github/workflows) for reference

2. Config startup command in Azure App Service portal
- Check [how to config startup command via Azure console](https://docs.microsoft.com/en-us/azure/developer/python/tutorial-deploy-app-service-on-linux-04#create-a-startup-file)
