const mockery = require('mockery');
const chai = require('chai');
const sinon = require('sinon');

// eslint-disable-next-line prefer-destructuring
const expect = chai.expect;

let logger;
// eslint-disable-next-line no-undef
describe('UserController', () => {
  // eslint-disable-next-line no-undef
  beforeEach(() => {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true,
    });
    // eslint-disable-next-line no-undef
    logger = {
      info: () => { },
      error: () => { },
    };
    mockery.registerMock('../config/winston', logger);
  });

  // eslint-disable-next-line no-undef
  afterEach(() => {
    mockery.disable();
    mockery.deregisterAll();
    sinon.restore();
  });

  // eslint-disable-next-line no-undef
  describe('getUsersDev', () => {
    // eslint-disable-next-line no-undef
    it('should return response ok', async () => {
      const loggerInfoSpy = sinon.spy(logger, 'info');

      const response = {
        users: [
          {
            id: 2,
            first_name: 'Andrés11111',
            last_name: 'Duarte',
            username: 'aduartem',
          },
          {
            id: 3,
            first_name: 'Franco',
            last_name: 'Porra',
            username: 'franco1',
          },
          {
            id: 5,
            first_name: 'Esperanza',
            last_name: 'Gutierrez',
            username: 'prueba',
          },
        ],
      };

      const apiAuthenticationServiceMock = {
        getUsersDev: () => response,
      };
      mockery.registerMock('../services/api-authentication', apiAuthenticationServiceMock);

      // eslint-disable-next-line global-require
      const userController = require('./user-controller');

      const res = {
        json: () => response,
      };

      const result = await userController.getUsersDev({}, res);
      expect(loggerInfoSpy.args[0][0].includes('init'));
      expect(loggerInfoSpy.args[1][0].includes('success'));
      expect(result).to.equals(response);
    });

    // eslint-disable-next-line no-undef
    it('should return a error', async () => {
      const loggerInfoSpy = sinon.spy(logger, 'info');

      const apiAuthenticationServiceMock = {
        getUsersDev: () => () => {
          throw new Error('500');
        },
      };
      mockery.registerMock('../services/api-authentication', apiAuthenticationServiceMock);

      // eslint-disable-next-line global-require
      const userController = require('./user-controller');

      const res = {
        sendStatus: (code) => code,
      };

      const result = await userController.getUsersDev(null, res);
      expect(loggerInfoSpy.args[0][0].includes('init'));
      expect(loggerInfoSpy.args[1][0].includes('error'));
      expect(result).to.equals(500);
    });
  });
});
