# Dockerizing app

In order to build the docker application run the following:

### Docker build

```shell
docker build . --build-arg BUILD_ENV=production -t starkgate:frontend-latest
```

### Run image

```shell
$ docker run -P -d starkgate:frontend-latest
bc60c8488c9e6a32ef76c307b12e1efb6e750f769f29f850b7d5ebe006fed69d

$ docker ps
CONTAINER ID   IMAGE                            COMMAND                  CREATED         STATUS        PORTS                                         NAMES
bc60c8488c9e   starkgate:frontend-latest   "docker-entrypoint.s…"   5 seconds ago   Up 1 second   0.0.0.0:49154->6000/tcp, :::49154->6000/tcp   awesome_sutherland
```

### Display logs

```shell
$ docker logs bc60c8488c9e
2022-03-03T12:02:40.586Z [info] : ::ffff:172.17.0.1 - - [03/Mar/2022:12:02:40 +0000] "GET /is_alive HTTP/1.1" 200 16 "-" "curl/7.79.1"
 {}
```
