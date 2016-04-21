# keycloakjs-redirect

[![Build](https://travis-ci.org/UKHomeOffice/keycloakjs-redirect.png)](https://travis-ci.org/UKHomeOffice/keycloakjs-redirect)

## Use case

A Frontend Javascript service that integrates with the [Keycloak authentication service](http://keycloak.jboss.org/), guiding users to a login portal when a 401 Unauthorised response is received from an API.

## Install

```bash
$ npm i keycloak-redirect
```

## Configuration

Import the package, then use the object exposed to return the function `authenticate`, passing in all mandatory arguments: a config object, a XMLHttpRequest object, and window.

```js
    
   import keycloakRedirect from 'keycloak-redirect';
   
   var config = {
       backend: "http://yourBackendUrl.com",
       clientId: "yourClientId",
       keycloakUrl: "http://yourKeycloakUrl.com"
   };
   
   keycloakRedirect.authenticate(config, new XMLHttpRequest(), $window);
```
