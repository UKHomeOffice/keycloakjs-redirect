(function () {
  const UNAUTHORIZED = 401;
  var keycloakRedirect = {
    authenticate: (config, client, window) => {
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
      client.open("GET", config.backend + "/oauth/expired", true);
      client.send();
      if (client.status === UNAUTHORIZED) {
        window.location = config.keycloakUrl + encodeURI(`?redirect_uri="${window.location}"&client_id="${config.clientId}"&response_type=code`);
      }
    }
  };
  module.exports = keycloakRedirect;
}());
