import Boom from 'boom';

class BootstrapController {
  constructor(bootstrapInteractor, logger) {
    this.bootstrapInteractor = bootstrapInteractor;
    this.logger = logger;
  }

  async bootstrap(request, h) {
    try {
      const data = await this.bootstrapInteractor.execute();
      return h.response(data).code(201);
    } catch (error) {
      this.logger.error(`Unexpected error at bootstrap(): ${error.message}`);
      throw Boom.internal();
    }
  }
}

export default BootstrapController;
