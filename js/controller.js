/**
 * Controller for Photos Module
 *
 * @author      Xenia Tay
 * @file        controller.js
 */

define(function () {
  function photosController(model, view) {
    this.initialize(model, view);
  }

  photosController.prototype = {

    /**
    * Constructor
    * @param {model} Controller must be initialized with photosModel
    * @param {view} Controller must be initialized with photosView
    * @return {void}
    */
    initialize: function(model, view) {
      this.model = model;
      this.view = view;
      this.faveCount = $('#fave-count');
      this.initEvents();
    },

    /**
    * Initialize event listeners
    * @return {void}
    */
    initEvents: function() {
      // For favouriting photos
      $(document).click( _.bind(function(e) {
        if ( $(e.target).is('.photo-fave-button') ) {
          this.setFave(e.target);
        }
      }, this) );

      // For infinite scrolling
      $(window).scroll( _.throttle( _.bind(this.loadPhotos, this), 100) );
    },

    /**
    * Update a photo's 'Favourited' state
    * @return {void}
    */
    setFave: function(faveBtn) {
      var container = $(faveBtn).closest('.single-photo'),
          faveInput = $(faveBtn).find('.photo-fave-checkbox');

      container.toggleClass('active');
      faveInput.change( _.bind(this.updateFaveCount, this) );
    },

    /**
    * Update 'Favourited Photos' count
    * @return {void}
    */
    updateFaveCount: function() {
      var count = $('.photo-fave-checkbox:checked').length;
      this.faveCount.html(count);
    },

    /**
    * Check if user is scrolled to near-bottom
    * @return {bool}
    */
    isScrolledBottom: function() {
      var scrolledBottom =  $(window).scrollTop() + $(window).height(),
          docBottom = $(document).height() - 100;

      return (scrolledBottom > docBottom);
    },

    /**
    * Load next batch of photos
    * Infinite scroll, to infinity and beyond!
    * @return {void}
    */
    loadPhotos: function() {
      if ( this.isScrolledBottom() ) {
        this.model.getMorePhotos( _.bind(function() {
          this.view.setModel(this.model);
          this.view.render();
        }, this) );
      }
    }
  };

  return photosController;
});
