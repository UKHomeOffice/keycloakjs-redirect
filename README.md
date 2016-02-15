# keycloakjs-redirect

[![Build](https://travis-ci.org/UKHomeOffice/keycloakjs-redirect.png)](https://travis-ci.org/UKHomeOffice/keycloakjs-redirect)

## Use case

A js frontend uses a backend api which, in turn,  connects to keycloak for user authentication. The frontend tries to connect to a backend url and redirects the browser to a keycloak url if the first connection returns an error (because the user isn't authenticated).

## Install

```bash
$ npm i keycloak-redirect
```

## Usage of the library

Include the dist/bundle.js or dist/bundle.min.js file in the page, then use the `keycloakRedirect` variable that was exposed using Browserify.

`keycloakRedirect` is an object that returns the method `authenticate`. Pass in a config object and a XMLHttpRequest object.

```js
    
   var config = {
       backend: "http://yourBackendUrl.com",
       clientId: "yourClientId",
       keycloakUrl: "http://yourKeycloakUrl.com"
   };
   
   keycloakRedirect.authenticate(config, new XMLHttpRequest());
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
