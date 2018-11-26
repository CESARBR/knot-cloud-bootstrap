class Bootstrap {
  constructor(meshbluHttp, keyPairGenerator) {
    this.meshbluHttp = meshbluHttp;
    this.keyPairGenerator = keyPairGenerator;
  }

  async execute() {
    const authenticator = await this.createAuthenticator();
    return { authenticator };
  }

  async createAuthenticator() {
    const params = this.createAuthenticatorParams();
    const device = await this.createAuthenticatorDevice(params);
    return {
      uuid: device.uuid,
      token: device.token,
    };
  }

  createAuthenticatorParams() {
    const { privateKey, publicKey } = this.keyPairGenerator.generate();
    return {
      type: 'authenticator',
      name: 'KNoT Authenticator',
      meshblu: {
        version: '2.0.0',
      },
      privateKey,
      publicKey,
    };
  }

  async createAuthenticatorDevice(params) {
    return new Promise((resolve, reject) => {
      this.meshbluHttp.register(params, (error, device) => {
        if (error) {
          reject(error);
        } else {
          resolve(device);
        }
      });
    });
  }
}

export default Bootstrap;
