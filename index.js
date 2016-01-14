"use strict";
module.exports = {
  authenticate: function (config, client) {
    var that = this;
    if (config.backend === undefined) {
      throw "Missing backend in config.";
    }
    if (config.clientId === undefined) {
      throw "Missing clientId in config.";
    }
    if (config.keycloakUrl === undefined) {
      throw "Missing keycloakUrl in config.";
    }

    client.withCredentials = true;
    client.open("GET", config.backend, true);
    client.send();
    client.onerror = function () {
      if (!that.getParameterByName('code').length) {
        window.location = config.keycloakUrl + encodeURI("&redirect_uri=" + window.location + "&client_id=" + config.clientId);
      }
    }
  },
  getParameterByName: function (name) {
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(window.location);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }
}