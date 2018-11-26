import hapi from 'hapi';
import good from 'good';
import goodWinston from 'hapi-good-winston';

class Server {
  constructor(port, logger) {
    this.port = port;
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
}

export default Server;
