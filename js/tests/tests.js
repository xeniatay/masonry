/**
 * Unit Tests
 *
 * @author      Xenia Tay
 * @file        tests.js
 */

require([
  'jquery',
  'underscore',
  'chai',
  'mocha',
  'sinon',
  'sinonChai',
  'model',
  'view',
  'controller',
  'masonry'
],
function($, _, chai) {

  var model = require('./model'),
      view = require('./view'),
      controller = require ('./controller'),
      masonry = require ('./masonry');

  var expect = chai.expect;
  describe('Unit Tests', function() {

    describe('Photos Model', function() {
      var photosModel;

      beforeEach(function() {
          photosModel = new model();
      })

      afterEach(function() {
          photosModel = null;
      })

      describe('500px API', function() {
        it('New photo model', function() {
          expect(photosModel.photos).to.eql([]);
        });

        it('Should GET photos from 500px API and callback correctly', function() {
          photosModel.getPhotos(callback);

          function callback() {
            expect(photosModel.photos.length).to.eql(20);
            expect(photosModel.allPhotos.length).to.eql(20);
            expect(photosModel.photos).to.eql(photosModel.allPhotos);
          }
        });
      });
    });
  });

});
