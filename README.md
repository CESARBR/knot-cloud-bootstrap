# knot-cloud-bootstrap

KNoT Cloud bootstrap service. Provides an endpoint to perform first time use configuration.

## Installation and usage

This service is part of the KNoT Cloud and requires the a subset of its service to work.

### Configuration

Either create a [configuration file](https://github.com/lorenwest/node-config/wiki/Configuration-Files) in the `config` (`./config/local.json` is ignored by Git in this repository) or use environment variables to configure your installation. In case you are running the published Docker image, you'll need to stick with the environment variables.

The configuration parameters are the following (the environment variable name is in parenthesis):

* `server`
  * `port` (`PORT`) **Number** Server port number. (Default: 80)
* `meshblu`
  * `protocol` (`MESHBLU_PROTOCOL`) **String** Meshblu HTTP adapter protocol, either **http** or **https** (Default: **http**).
  * `hostname` (`MESHBLU_HOSTNAME`) **String** Meshblu HTTP adapter hostname.
  * `port` (`MESHBLU_PORT`) **Number** Meshblu HTTP adapter port.
* `logger`
  * `level` (`LOGGER_LEVEL`) **String** Logger level, one of: **error**, **warn**, **info**, **verbose**, **debug**, **silly**. (Default: **info**)

### Build and run (local)

First, install the dependencies:

```
npm install --production
```

Then:

```
npm run build
npm start
```

### Build and run (local, development)

First, install the dependencies:

```
npm install
```

Then, start the server with auto-reload:

```
npm run start:watch
```

or, start the server in debug mode:

```
npm run start:debug
```

### Run (Docker)

Containers built from the master branch and the published tags in this repository are available on [DockerHub](https://hub.docker.com/r/cesarbr/knot-cloud-bootstrap/).

1. Create a file containining the configuration as environment variables.
1. Run the container:

```
docker run --env-file bootstrap.env -p 4000:80 -ti cesarbr/knot-cloud-bootstrap
```

### Verify

To verify if the service is running properly, execute:

```
curl http://<hostname>:<port>/healthcheck
```
