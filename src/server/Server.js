import hapi from 'hapi';
import good from 'good';
import goodWinston from 'hapi-good-winston';

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

    const options = {
      ops: false,
      reporters: {
        winston: [goodWinston(this.logger)],
      },
    };
    await server.register({
      plugin: good,
      options,
    });

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
