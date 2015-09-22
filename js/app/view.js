/**
 * View for Photos Module
 *
 * @author      Xenia Tay
 * @file        view.js
 */

define(['masonry'], function() {

  function photosView(model) {
    this.initialize(model);
  }

  photosView.prototype = {

    /**
    * Constructor
    * @param {model} View must be initialized with photosModel
    * @return {void}
    */
    initialize: function(model) {
      this.setModel(model);
      this.containerId = 'photos-container';
      this.container = $('#' + this.containerId);
      this.initMasonryPlugin();
      this.render();
    },

    /**
    * Initialize Masonry Plugin
    * @return {void}
    */
    initMasonryPlugin: function() {
      var masonryPlugin = require('./masonry');
      this.masonry = new masonryPlugin();
      this.masonry.initialize();
    },

    /**
    * Clone template#single-photo-template for rendering
    * @return {jqueryObject} Returns the cloned template
    */
    cloneTemplate: function() {
      var template = $('#single-photo-template'),
          clonedTemplate;

      clonedTemplate = $('<div></div')
        .addClass('single-photo')
        .html( template.html() );

      return clonedTemplate;
    },

    /**
    * Update model
    * @param {object} Model object
    * @return {void}
    */
    setModel: function(model) {
      this.model = model;
    },

    /**
    * Render the latest batch of photos from the model
    * @return {void}
    */
    render: function() {
      _.each(this.model.photos, function(photo) {
        this.renderPhoto(photo);
      }, this);

      this.masonry.initMasonry(this.model);
    },

    /**
    * Render a single photo
    * @param {object} Single photo, e.g. this.model.photos[0]
    * @return {void}
    */
    renderPhoto: function (photo) {
      var template = this.cloneTemplate(),
          img = template.find('.photo-img'),
          title = template.find('.photo-title'),
          faveInput = template.find('.photo-fave-checkbox'),
          viewCount = template.find('.photo-view-count');

      title.html(photo.name);
      viewCount.html(photo.times_viewed);
      this.setImageDimensions(img, photo);
      this.container.append(template);
    },

    /**
    * Style and render the image proportionately
    * @param {jqueryObject} $(.photo-img)
    * @param {object} Single photo, e.g. this.model.photos[0]
    * @return {void}
    */
    setImageDimensions: function(img, photo) {
      var w = photo.width,
          h = photo.height,
          url = photo.image_url;

      // Workaround for images with height > width:
      // Set height using padding-bottom, calculated relative to width
      img.css({
        paddingBottom: (h > w) ? '100%' : ( (h / w * 100) + '%' ),
        width: (h > w) ? ( (this.masonry.COL_WIDTH / h * w) + 'px' ) : '100%',
        height: 0,
        backgroundImage: 'url(' + url + ')',
      });
    }

  };

  return photosView;
});
