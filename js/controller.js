define(function () {
  function photosController() {}

  photosController.prototype = {
    _instantiateInterface: function(templateId, containerId) {
      var template = $('#' + templateId),
          container = $('#' + containerId);

      this.hostElement = $('<div></div')
        .addClass('single-photo')
        .html( template.html() )
        .appendTo(container);
    },

    initialize: function() {

      this.initEvents();
    },

    initEvents: function() {
      this.faveInput.change( _.bind(this.setFave, this) );
      $(window).scroll( _.debounce( _.bind(this.checkScrollState(), this), 300 ) );
    },

    setModel: function (model) {
      this.model = model;
    },


    checkScrollState: function() {
      if ( $(window).scrollTop() + $(window).height() > ( $(document).height() - 50 ) ) {
        this.loadPhotos();
      }
    },

    loadPhotos: function() {
      this.model.getMorePhotos();
      this.view.displayPhotos();
    }
  };

  return photosController;
});
