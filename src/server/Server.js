import hapi from 'hapi';
import good from 'good';
import goodWinston from 'hapi-good-winston';
import hapiAndHealthy from 'hapi-and-healthy';

class Server {
  constructor(port, bootstrapController, logger) {
    this.port = port;
    this.bootstrapController = bootstrapController;
    this.logger = logger;
  }

  async start() {
    const server = hapi.server({
      port: this.port,
      router: {
        stripTrailingSlash: true,
        isCaseSensitive: false,
      },
      routes: {
        cors: true,
      },
    });

    const routes = this.createRoutes();
    server.route(routes);

    const goodOptions = {
      ops: false,
      reporters: {
        winston: [goodWinston(this.logger)],
      },
    };
    const hapiAndHealthyOptions = {
      path: '/healthcheck',
    };
    await server.register([
      {
        plugin: good,
        options: goodOptions,
      },
      {
        plugin: hapiAndHealthy,
        options: hapiAndHealthyOptions,
      },
    ]);

    await server.start();
    this.logger.info(`Listening on ${this.port}`);
  }

  createRoutes() {
    return [
      {
        method: 'POST',
        path: '/bootstrap',
        handler: this.bootstrapController.bootstrap.bind(this.bootstrapController),
      },
    ];
  }
}

export default Server;
