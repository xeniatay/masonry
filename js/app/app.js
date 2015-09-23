/**
 * App Config
 *
 * @author      Xenia Tay
 * @file        app.js
 */

requirejs.config({
  paths: {
      jquery: [
        "https://code.jquery.com/jquery-1.11.3.min",
        "../lib/jquery.min"
      ],
      underscore: [
        "https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min",
        "../lib/underscore"
      ],
      chai: ["../lib/chai"],
      sinon: ["../lib/sinon"],
      sinonChai: ["../lib/sinon-chai"],
      mocha: ["../lib/mocha"]
  },
  shim: {
  'mocha': {
    init: function () {
      this.mocha.setup('bdd');
      return this.mocha;
    }
  }
}
});

// Load the main app module to start the app
requirejs(['./main']);
requirejs(['../tests/tests']);
