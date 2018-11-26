import MeshbluHttp from '@cesarbr/meshblu-http';

class MeshbluHttpFactory {
  constructor(settings) {
    this.settings = settings;
  }

  create() {
    return new MeshbluHttp({
      protocol: this.settings.meshblu.protocol,
      hostname: this.settings.meshblu.hostname,
      port: this.settings.meshblu.port,
    });
  }
}

export default MeshbluHttpFactory;
