# Overview

This repository contains a web application to provide vegetable planting guideline.

The tech stack includes *React*, *Express* and *Azure* as cloud service.

# Development

1. Install dependency
```
yarn run deps-backend #install backend deps
yarn run deps-frontend #install frontend deps
```
2. Develop localhost
```
yarn run server #serve backend
yarn run client #serve frontend
```

Check [package.json](./package.json) for more npm script

# Deployment

## Docker
1. Build image
```
docker build --tag garden:{version} .
```

2. Run Image
```
docker run --publish 8000:5000 --detach --name garden {image_name}`
```

Check [Dockerfile](./Dockerfile) for image build reference

## Azure App Service

Azure App Service is integrated with Github Action.

1. Build & deploy with Github Action
- Check [workflow](./.github/workflows) for reference

2. Config startup command in Azure App Service portal
- Check [how to config startup command via Azure console](https://docs.microsoft.com/en-us/azure/developer/python/tutorial-deploy-app-service-on-linux-04#create-a-startup-file)
