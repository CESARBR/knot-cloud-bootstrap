import Server from 'server/Server';

class ServerFactory {
  constructor(settings, loggerFactory) {
    this.settings = settings;
    this.loggerFactory = loggerFactory;
  }

  create() {
    return new Server(
      this.settings.server.port,
      this.loggerFactory.create('Server'),
    );
  }
}

export default ServerFactory;
