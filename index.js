"use strict";
(function() {
  window.keycloakRedirect = {
    authenticate: function(config, client) {
      var that = this;
      if (config.backend === void 0) {
        throw "Missing backend in config.";
      }
      if (config.clientId === void 0) {
        throw "Missing clientId in config.";
      }
      if (config.keycloakUrl === void 0) {
        throw "Missing keycloakUrl in config.";
      }

      client.withCredentials = true;
      client.open("GET", config.backend, true);
      client.send();
      client.onerror = function() {
        if (!that.getParameterByName('code').length) {
          window.location = config.keycloakUrl + encodeURI("?redirect_uri=" + window.location + "&client_id=" + config.clientId + "&response_type=code");
        }
      }
    },
    getParameterByName: function(name) {
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(window.location);
      return results === null ? "": decodeURIComponent(results[1].replace(/\+/g, " "));
    }
  }
})();