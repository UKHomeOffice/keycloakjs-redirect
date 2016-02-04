# keycloakjs-redirect

[![Build](https://travis-ci.org/UKHomeOffice/keycloakjs-redirect.png)](https://travis-ci.org/UKHomeOffice/keycloakjs-redirect)

## Use case

A js frontend uses a backend api which, in turn,  connects to keycloak for user authentication. The frontend tries to connect to a backend url and redirects the browser to a keycloak url if the first connection returns an error (because the user isn't authenticated).

## Install

```bash
$ bower install UKHomeOffice/keycloakjs-redirect -S
```

## Usage
Makes available a global `keycloakRedirect` object with an `authenticate` method. Pass in a config object and a XMLHttpRequest object.

```js
    
   var config = {
       backend: "http://yourBackendUrl.com",
       clientId: "yourClientId",
       keycloakUrl: "http://yourKeycloakUrl.com"
   };
   
   keycloakRedirect.authenticate(config, new XMLHttpRequest());
```

the `backend`, `clientId` and `keycloakUrl` keys on the config object are mandatory.

## Tests

```bash
$ npm install
$ npm test
```
