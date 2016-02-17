# keycloakjs-redirect

[![Build](https://travis-ci.org/UKHomeOffice/keycloakjs-redirect.png)](https://travis-ci.org/UKHomeOffice/keycloakjs-redirect)

## Use case

A js frontend uses a backend api which, in turn,  connects to keycloak for user authentication. The frontend tries to connect to a backend url and redirects the browser to a keycloak url if the first connection returns an error (because the user isn't authenticated).

## Install

```bash
$ npm i keycloak-redirect
```

## Usage of the library

Require the package, then use the object that was exposed using Browserify to return the function `authenticate`, passing in all mandatory arguments: a config object, a XMLHttpRequest object, and window.

```js
    
   const keycloakRedirect = require('keycloak-redirect');
   
   var config = {
       backend: "http://yourBackendUrl.com",
       clientId: "yourClientId",
       keycloakUrl: "http://yourKeycloakUrl.com"
   };
   
   var client = new XMLHttpRequest();
   
   keycloakRedirect.authenticate(config, client, window);
```

the `backend`, `clientId` and `keycloakUrl` keys on the config object are mandatory.

## Run the build scripts

Create the debug build of the library:

```bash
$ npm run build-debug
```

Create the minified build:

```bash
$ npm run build-min
```

Create both the debug and minified builds:

```bash
$ npm run build
```

Watch the main file for changes and automatically regenerate the debug build:

```bash
$ npm run watch
```

## Run Tests

```bash
$ npm test
```
