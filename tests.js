var chai = require('chai').use(require('sinon-chai'));
var expect = chai.expect;
var sinon = require('sinon');
var EventEmitter = require('events').EventEmitter;
var keycloakRedirect = require('./src/main.js');

describe("UNIT keycloak-redirect", function () {
  var client;
  var config;

  before(function () {
    client = new EventEmitter();
    client.withCredentials = false;
    client.open = sinon.stub();
    client.send = sinon.stub();
  });

  describe('authenticate', () => {
    describe('Errors on missing config.', () => {
      it("should throw errors when config keys are undefined.", () => {
        config = {keycloakUrl: 'a', clientId: 'b'};
        expect(() => keycloakRedirect.authenticate(config, client)).to.throw('Missing backend in config.');
      });

      it("should throw errors when config keys are undefined.", () => {
        config = {backend: 'a', clientId: 'b'};
        expect(() => keycloakRedirect.authenticate(config, client)).to.throw('Missing keycloakUrl in config.');
      });

      it("should throw errors when config keys are undefined.", () => {
        config = {backend: 'a', keycloakUrl: 'b'};
        expect(() => keycloakRedirect.authenticate(config, client)).to.throw('Missing clientId in config.');
      });
    });

    describe('Call and modify client.', () => {
      before(() => {
        config = {
          backend: 'backend',
          clientId: 'clientId',
          keycloakUrl: 'keycloakUrl'
        };
        keycloakRedirect.authenticate(config, client);
      });

      it("should call client.open() and client.send.", () => {
        expect(client.open).to.have.been.calledWith("GET", 'backend' + "/oauth/expired", true);
        expect(client.send).to.have.been.called;
      });

      it('should set client.withCredentials', () => {
        expect(client.withCredentials).to.equal(true);
      });
    });
  });
});
