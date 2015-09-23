/**
 * Masonry Plugin
 *
 * @author      Xenia Tay
 * @file        masonry.js
 */

define(function () {
  function Masonry() {}

  Masonry.prototype = {
    // CONSTANTS
    COL_WIDTH: 256,
    COL_H_GUTTER: 10, // horizontal
    COL_V_GUTTER: 10, // vertical

    /**
    * Constructor
    * @return {void}
    */
    initialize: function() {
      this.coords = {};
      this.containerHeight = 0;
      this.photosContainer = $('#photos-container');
      this.updateNumCols();
      this.initEvents();
    },

    /**
    * Initialize masonry for this batch of photos
    * @param {number} Page number for this batch
    * @param {array} Array of photos
    * @return {void}
    */
    initMasonry: function(model) {
      if (model) {
        this.photos = model.photos;
        this.allPhotos = model.allPhotos;
      }

      var photoElems = this.getPhotoElems();

      if ( this.hasNewPhotos() ) {
        this.calcAllCoords(photoElems);
      }

      this.displayPhotos(photoElems);
    },

    /**
    * Initialize event listeners
    * @return {void}
    */
    initEvents: function() {
      $(window).resize( _.throttle( _.bind(this.onResize, this), 100) );
    },

    /**
    * Update number of columns to use for Masonry layout
    * @return {void}
    */
    updateNumCols: function() {
      this.numCols = Math.floor( $(window).width() / (this.COL_WIDTH + this.COL_H_GUTTER) );
      this.updateContainerWidth();
    },

    /**
    * Update width of #photos-container
    * @return {void}
    */
    updateContainerWidth: function() {
      this.photosContainer.css({ width: (this.COL_WIDTH + this.COL_H_GUTTER) * this.numCols })
    },

    /**
    * Update height of #photos-container
    * @return {void}
    */
    updateContainerHeight: function() {
      this.photosContainer.css({ height: this.containerHeight + this.COL_V_GUTTER });
    },

    /**
    * Return the set of HTML elements corresponding to the
    * current batch of photos
    * @return {jqueryObject}
    */
    getPhotoElems: function() {
      // var sliceStart = this.allPhotos.length - this.photos.length,
      //     sliceEnd = this.allPhotos.length;

      // return $('.single-photo').slice(sliceStart, sliceEnd);

      return $('.single-photo');
    },

    /**
    * Check if any photos need their coordinates (re)calculated
    * @param {array} Array of all photos from the model
    * @return {bool}
    */
    hasNewPhotos: function() {
      if (this.coords[this.numCols]) {
        var coords = this.coords[this.numCols];
        return (coords.length !== this.allPhotos.length);
      }
      return true;
    },

    /**
    * Calculate the {x, y} coordinates of each new photo
    * @param {array} Array of .single-photo elements corresponding to this.photos
    * @return {void}
    */
    calcAllCoords: function(photoElems) {
      var coords,
          sliceStart = this.allPhotos.length - photoElems.length;

      if (this.coords[this.numCols]) {
        coords = this.coords[this.numCols];
      } else {
        coords = this.coords[this.numCols] = [];
      }

      _.each(photoElems, function(photo, index) {
        var i = sliceStart + index;
        this.calcCoords(photo, coords, i);
      }, this);
    },

    /**
    * Calculate the {x, y} coordinates of a photo
    * @return {void}
    */
    calcCoords: function(photo, coords, i) {
        var curCol = i % this.numCols,
            photoAbove;

        coords[i] = {};

        // Set width so that we can get the proportionate height
        $(photo).css({ width: this.COL_WIDTH + 'px' });

        if (i < this.numCols) {
          coords[i].topY = 0; // first row of images
        } else {
          photoAbove = coords[i - this.numCols];
          coords[i].topY = photoAbove.bottomY + this.COL_V_GUTTER;
        }

        coords[i].x = (this.COL_WIDTH + this.COL_H_GUTTER) * curCol;
        coords[i].bottomY = coords[i].topY + $(photo).outerHeight();

        // Keep track of the lowest bottomY coordinate
        this.containerHeight = Math.max(coords[i].bottomY, this.containerHeight);
    },

    /**
    * Position all the new photos using calculated coordinates
    * @return {void}
    */
    displayPhotos: function(photoElems) {
      var coords = this.coords[this.numCols],
          sliceStart = this.allPhotos.length - photoElems.length;

      _.each(photoElems, function(photo, index) {
        var i = sliceStart + index;

        $(photo).css({
          transform: 'translate3d(' + coords[i].x + 'px, ' + coords[i].topY + 'px, 0)',
          position: 'absolute'
        });
      });

      this.updateContainerHeight();
    },

    /**
    * Resize listener for responsive Masonry
    * @return {void}
    */
    onResize: function() {
      this.updateNumCols();
      this.initMasonry();
    }
  }

  return Masonry;
});