var chai = require('chai').use(require('sinon-chai'));
var expect = chai.expect;
var sinon = require('sinon');
var EventEmitter = require('events').EventEmitter;
var keycloakRedirect = require('./');
var client;
var window;

describe("UNIT keycloak-redirect index.js", function() {
  before(function() {
    var config = {};
    window = {location: "WL"};

    client = new EventEmitter;
    client.withCredentials = false;
    client.open = sinon.stub();
    client.send = sinon.stub();
  });

  describe('authenticate', function() {
    describe('Errors on missing config.', function() {

      it("should throw errors when config keys are undefined.", () => {
        config = {keycloakUrl: 'a', clientId: 'b'};
        expect(function() {
          keycloakRedirect.authenticate(config, client)
        }).to.throw('Missing backend in config.');
      });

      it("should throw errors when config keys are undefined.", () => {
        config = {backend: 'a', clientId: 'b'};
        expect(function() {
          keycloakRedirect.authenticate(config, client)
        }).to.throw('Missing keycloakUrl in config.');
      });

      it("should throw errors when config keys are undefined.", () => {
        config = {backend: 'a', keycloakUrl: 'b'};
        expect(function() {
          keycloakRedirect.authenticate(config, client)
        }).to.throw('Missing clientId in config.');
      });

    });

    describe('Call and modify client.', function() {
      before(function() {
        config = {
          backend: 'backend',
          clientId: 'clientId',
          keycloakUrl: 'keycloakUrl'
        };
        keycloakRedirect.authenticate(config, client);
      })

      it("should call client.open() and client.send.", function() {
        expect(client.open).to.have.been.calledWith("GET", 'backend', true);
        expect(client.send).to.have.been.called;
      });

      it('should set client.withCredentials', function() {
        expect(client.withCredentials).to.be.true;
      });

    });

    describe('Redirect if query parameter "code" is not set.', function() {
      it('should redirect if there is no "code" parameter.', function() {
        keycloakRedirect.authenticate(config, client, window);
        client.onerror();
        expect(window.location).to.equal(
          'keycloakUrl' + encodeURI("?redirect_uri=WL&client_id=clientId&response_type=code")
        );
      });
      it('should not redirect if the "code" parameter is set', function() {
        window.location = "WL?code=abc";
        keycloakRedirect.authenticate(config, client, window);
        client.onerror();
        expect(window.location).to.equal("WL?code=abc");
      })
    });

  });

  describe('getParameterByName', function() {
    before(function() {
      window.location = "http://abc.com?par1=a&par2=b";
    })
    it('should return the values of the parameters passed.', function() {
      expect(keycloakRedirect.getParameterByName('par1', window.location)).to.equal('a');
      expect(keycloakRedirect.getParameterByName('par2', window.location)).to.equal('b');
    });
    it('should return the empty string for missing parameters.', function() {
      expect(keycloakRedirect.getParameterByName('par3', window.location)).to.equal('');
    })
  });
});