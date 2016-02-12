(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.keycloakRedirect = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
(function() {
  var keycloakRedirect = {
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
  };
  module.exports = keycloakRedirect;
})();
},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXCJ1c2Ugc3RyaWN0XCI7XG4oZnVuY3Rpb24oKSB7XG4gIHZhciBrZXljbG9ha1JlZGlyZWN0ID0ge1xuICAgIGF1dGhlbnRpY2F0ZTogZnVuY3Rpb24oY29uZmlnLCBjbGllbnQpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIGlmIChjb25maWcuYmFja2VuZCA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHRocm93IFwiTWlzc2luZyBiYWNrZW5kIGluIGNvbmZpZy5cIjtcbiAgICAgIH1cbiAgICAgIGlmIChjb25maWcuY2xpZW50SWQgPT09IHZvaWQgMCkge1xuICAgICAgICB0aHJvdyBcIk1pc3NpbmcgY2xpZW50SWQgaW4gY29uZmlnLlwiO1xuICAgICAgfVxuICAgICAgaWYgKGNvbmZpZy5rZXljbG9ha1VybCA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHRocm93IFwiTWlzc2luZyBrZXljbG9ha1VybCBpbiBjb25maWcuXCI7XG4gICAgICB9XG5cbiAgICAgIGNsaWVudC53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgICAgY2xpZW50Lm9wZW4oXCJHRVRcIiwgY29uZmlnLmJhY2tlbmQsIHRydWUpO1xuICAgICAgY2xpZW50LnNlbmQoKTtcbiAgICAgIGNsaWVudC5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghdGhhdC5nZXRQYXJhbWV0ZXJCeU5hbWUoJ2NvZGUnKS5sZW5ndGgpIHtcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSBjb25maWcua2V5Y2xvYWtVcmwgKyBlbmNvZGVVUkkoXCI/cmVkaXJlY3RfdXJpPVwiICsgd2luZG93LmxvY2F0aW9uICsgXCImY2xpZW50X2lkPVwiICsgY29uZmlnLmNsaWVudElkICsgXCImcmVzcG9uc2VfdHlwZT1jb2RlXCIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBnZXRQYXJhbWV0ZXJCeU5hbWU6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIHZhciByZWdleCA9IG5ldyBSZWdFeHAoXCJbXFxcXD8mXVwiICsgbmFtZSArIFwiPShbXiYjXSopXCIpLFxuICAgICAgICByZXN1bHRzID0gcmVnZXguZXhlYyh3aW5kb3cubG9jYXRpb24pO1xuICAgICAgcmV0dXJuIHJlc3VsdHMgPT09IG51bGwgPyBcIlwiOiBkZWNvZGVVUklDb21wb25lbnQocmVzdWx0c1sxXS5yZXBsYWNlKC9cXCsvZywgXCIgXCIpKTtcbiAgICB9XG4gIH07XG4gIG1vZHVsZS5leHBvcnRzID0ga2V5Y2xvYWtSZWRpcmVjdDtcbn0pKCk7Il19
