require(['jquery', 'underscore', 'model', 'view', 'controller', 'masonry'], function($, _) {

  $(document).ready(function() {
    var model = require('./model'),
        view = require('./view'),
        controller = require ('./controller');

    var page = 1;

    // here is the logic:
    var m = new model(page);
    m.getPhotos(function() {
      var v = new view(m);
      var c = new controller(m, v);
      v.initialize('photos-container');
    });

  });

});

