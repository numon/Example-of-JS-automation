# e2e test in conatainer

## Creating image for e2e test with protractor
As example `Dockerfile` can be use  
- go to folder `protractor-jasmine-typescript`
- run command `docker build -t protractor-e2e .`

## Install dependency for selenoid
- `docker pull selenoid/chrome`
- `docker pull selenoid/video-recorder:latest-release`

## Run e2e test in docker compose
- run command `docker-compose up`
