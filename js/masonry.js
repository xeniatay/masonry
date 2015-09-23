define(function () {
  function Masonry() {}

  Masonry.prototype = {
    // CONSTANTS
    COL_WIDTH: 256,
    COL_H_GUTTER: 10, // horizontal
    COL_V_GUTTER: 10, // vertical

    initialize: function() {
      this.coords = {};
      this.containerHeight = 0;
      this.photosContainer = $('#photos-container');

      this.initEvents();
      this.initMasonry();
    },

    initMasonry: function() {
      this.updateNumCols();
      this.calcCoords();
      this.displayPhotos();
    },

    updateNumCols: function() {
      this.numCols = Math.floor( $(window).width() / (this.COL_WIDTH + this.COL_H_GUTTER) );
      this.updateContainerWidth();
    },

    updateContainerWidth: function() {
      this.photosContainer.css({ width: (this.COL_WIDTH + this.COL_H_GUTTER) * this.numCols })
    },

    updateContainerHeight: function() {
      this.photosContainer.css({ height: this.containerHeight + this.COL_V_GUTTER });
    },

    calcCoords: function() {
      if (this.coords[this.NumCols]) {
        return;
      } else {
        var coords = this.coords[this.numCols] = [];
      }

      _.each($('.single-photo'), function(photo, i) {
        var photoabove,
            curCol = i % this.numCols;

        coords[i] = {};

        // Set width so that we can get the proportionate height
        $(photo).css({ width: this.COL_WIDTH + 'px' });

        // If first row, photo's topY = 0
        if (i < this.numCols) {
          coords[i].topY = 0;

        // Else, photo's topY = photoAbove.bottomY + vertical gutter
        } else {
          photoAbove = coords[i - this.numCols];
          coords[i].topY = photoAbove.bottomY + this.COL_V_GUTTER;
        }

        coords[i].x = (this.COL_WIDTH + this.COL_H_GUTTER) * curCol;
        coords[i].bottomY = coords[i].topY + $(photo).outerHeight();

        this.containerHeight = (this.containerHeight < coords[i].bottomY) ? coords[i].bottomY : this.containerHeight;
      }, this);
    },

    displayPhotos: function() {
      var coords = this.coords[this.numCols];

      _.each($('.single-photo'), function(photo, i) {
        $(photo).css({
          transform: 'translate3d(' + coords[i].x + 'px, ' + coords[i].topY + 'px, 0)',
          position: 'absolute'
        });
      });

      this.updateContainerHeight();
    },

    initEvents: function() {
      $(window).resize( _.debounce( _.bind(this.onResize, this), 100) );
    },

    onResize: function() {
      this.initMasonry();
    }
  }

  return Masonry;
});