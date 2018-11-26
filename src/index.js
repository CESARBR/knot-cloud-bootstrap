import SettingsFactory from 'data/SettingsFactory';
import LoggerFactory from 'LoggerFactory';
import KeyPairGenerator from 'data/KeyPairGenerator';
import MeshbluHttpFactory from 'network/MeshbluHttpFactory';
import Bootstrap from 'interactors/Bootstrap';
import ServerFactory from 'server/ServerFactory';
import BootstrapController from './controllers/BootstrapController';

async function main() {
  try {
    const settings = new SettingsFactory().create();
    const loggerFactory = new LoggerFactory(settings);
    const meshbluHttp = new MeshbluHttpFactory(settings).create();
    const keyPairGenerator = new KeyPairGenerator();
    const bootstrapInteractor = new Bootstrap(meshbluHttp, keyPairGenerator);
    const bootstrapController = new BootstrapController(
      bootstrapInteractor,
      loggerFactory.create('BootstrapController'),
    );
    const server = new ServerFactory(settings, bootstrapController, loggerFactory).create();

    await server.start();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error.message);
    process.exit(1);
  }
}

main();
