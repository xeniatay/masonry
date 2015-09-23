define(["masonry"], function() {
  function photosView(model) {
    this.model = model;
  }

  photosView.prototype = {
    _cloneTemplate: function(templateId, containerId) {
      var template = $('#' + templateId),
          container = $('#' + containerId),
          clonedTemplate = $('<div></div')
            .addClass('single-photo')
            .html( template.html() );
            // .appendTo(container);

      return clonedTemplate;
    },

    initialize: function(containerId) {
      this.containerId = containerId;
      this.container = $('#' + containerId);
      var masonry = require('./masonry');
      this.mason = new masonry();

      this.render();

      // TODO this
      // this.initEvents();
    },

    render: function() {
      _.each(this.model.photos, function(photo) {
        this.renderPhoto(photo);
      }, this);

      this.mason.initialize();
    },

    renderPhoto: function (photo) {
      var template = this._cloneTemplate('single-photo-template', this.containerId);

      var img = $(template).find('.photo-img'),
          title = $(template).find('.photo-title'),
          faveInput = $(template).find('.photo-fave-checkbox'),
          viewCount = $(template).find('.photo-view-count');

      // this.img.attr('src', photo.image_url);
      var h = photo.height,
          w = photo.width;

      img.css({
        backgroundImage: 'url(' + photo.image_url + ')',
        paddingBottom: (h > w) ? '100%' : ( (h / w * 100) + '%' ),
        height: 0,
        width: (h > w) ? ( (256 / h * w) + 'px' ) : '100%'
      });

      title.html(photo.name);
      viewCount.html(photo.times_viewed);

      this.container.append(template);
    },

    initEvents: function() {
      this.faveInput.change( _.bind(this.setFave, this) );
    },

    setFave: function() {
      this.hostElement.toggleClass('active');
      this.updateFaveCount();
    },

    updateFaveCount: function() {
      $('#fave-count').html( $('.photo-fave-checkbox:checked').length );
    }


  };

  return photosView;
});
