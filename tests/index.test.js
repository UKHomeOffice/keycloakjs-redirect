var config, window, lib, client;
var EventEmitter = require('events').EventEmitter;

describe("UNIT keycloak-redirect index.js", function() {
  before(function() {
    config = {};
    global.window = {location: "WL"}
    require('../index.js');
    lib = global.window.keycloakRedirect;

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
          lib.authenticate(config, client)
        }).to.throw('Missing backend in config.');
      });

      it("should throw errors when config keys are undefined.", () => {
        config = {backend: 'a', clientId: 'b'};
        expect(function() {
          lib.authenticate(config, client)
        }).to.throw('Missing keycloakUrl in config.');
      });

      it("should throw errors when config keys are undefined.", () => {
        config = {backend: 'a', keycloakUrl: 'b'};
        expect(function() {
          lib.authenticate(config, client)
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
        lib.authenticate(config, client);
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
      before(function() {
      });
      it('should redirect if there is no "code" parameter.', function() {
        lib.authenticate(config, client);
        client.onerror();
        expect(global.window.location).to.equal('keycloakUrl' + encodeURI("?redirect_uri=WL&client_id=clientId&response_type=code"));
      });
      it('should not redirect if the "code" parameter is set', function() {
        global.window.location = "WL?code=abc";
        lib.authenticate(config, client);
        client.onerror();
        expect(global.window.location).to.equal("WL?code=abc");
      })
    });

  });

  describe('getParameterByName', function() {
    before(function() {
      global.window.location = "http://abc.com?par1=a&par2=b";
    })
    it('should return the values of the parameters passed.', function() {
      expect(lib.getParameterByName('par1')).to.equal('a');
      expect(lib.getParameterByName('par2')).to.equal('b');
    });
    it('should return the empty string for missing parameters.', function() {
      expect(lib.getParameterByName('par3')).to.equal('');
    })
  });

});