/**
 * Main App Module
 *
 * @author      Xenia Tay
 * @file        main.js
 */

require(['jquery', 'underscore', 'model', 'view', 'controller'], function($, _) {

  $(document).ready(function() {

    var model = require('./model'),
        view = require('./view'),
        controller = require ('./controller'),
        photosModel,
        photosView,
        photosController;

    photosModel = new model();

    // Get photos, then initialize view & controller
    photosModel.getPhotos(function() {
      debugger;
      photosView = new view(photosModel);
      photosController = new controller(photosModel, photosView);
    });

  });

});
