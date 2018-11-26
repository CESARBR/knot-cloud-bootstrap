import Server from 'server/Server';

class ServerFactory {
  constructor(settings, bootstrapInteractor, loggerFactory) {
    this.settings = settings;
    this.bootstrapInteractor = bootstrapInteractor;
    this.loggerFactory = loggerFactory;
  }

  create() {
    return new Server(
      this.settings.server.port,
      this.bootstrapInteractor,
      this.loggerFactory.create('Server'),
    );
  }
}

export default ServerFactory;
