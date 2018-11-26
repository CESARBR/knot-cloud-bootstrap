import NodeRSA from 'node-rsa';

class KeyPairGenerator {
  constructor() {
    this.crypto = new NodeRSA();
  }

  generate() {
    this.crypto.generateKeyPair(1024);
    return {
      privateKey: this.crypto.exportKey('private'),
      publicKey: this.crypto.exportKey('public'),
    };
  }
}

export default KeyPairGenerator;
