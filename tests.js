var chai = require('chai').use(require('sinon-chai'));
var expect = chai.expect;
var sinon = require('sinon');
var EventEmitter = require('events').EventEmitter;
var keycloakRedirect = require('./');
var client;
var window;

describe("UNIT keycloak-redirect index.js", function () {
  before(function () {
    var config = {};
    window = {location: "WL"};

    client = new EventEmitter;
    client.withCredentials = false;
    client.open = sinon.stub();
    client.send = sinon.stub();
  });

  describe('authenticate', function () {
    describe('Errors on missing config.', function () {

      it("should throw errors when config keys are undefined.", () => {
        config = {keycloakUrl: 'a', clientId: 'b'};
        expect(function () {
          keycloakRedirect.authenticate(config, client)
        }).to.throw('Missing backend in config.');
      });

      it("should throw errors when config keys are undefined.", () => {
        config = {backend: 'a', clientId: 'b'};
        expect(function () {
          keycloakRedirect.authenticate(config, client)
        }).to.throw('Missing keycloakUrl in config.');
      });

      it("should throw errors when config keys are undefined.", () => {
        config = {backend: 'a', keycloakUrl: 'b'};
        expect(function () {
          keycloakRedirect.authenticate(config, client)
        }).to.throw('Missing clientId in config.');
      });

    });

    describe('Call and modify client.', function () {
      before(function () {
        config = {
          backend: 'backend',
          clientId: 'clientId',
          keycloakUrl: 'keycloakUrl'
        };
        keycloakRedirect.authenticate(config, client);
      })

      it("should call client.open() and client.send.", function () {
        expect(client.open).to.have.been.calledWith("GET", 'backend', true);
        expect(client.send).to.have.been.called;
      });

      it('should set client.withCredentials', function () {
        expect(client.withCredentials).to.be.true;
      });

    });
  });
});