import SettingsFactory from 'data/SettingsFactory';
import LoggerFactory from 'LoggerFactory';
import ServerFactory from 'server/ServerFactory';

async function main() {
  try {
    const settings = new SettingsFactory().create();
    const loggerFactory = new LoggerFactory(settings);
    const server = new ServerFactory(settings, loggerFactory).create();

    await server.start();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error.message);
    process.exit(1);
  }
}

main();
