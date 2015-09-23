var Masonry = function() {
  // this._instantiateInterface('template-friends-list', container);
  this.initialize();
};

_.extend(Masonry.prototype, {
  _instantiateInterface: function(templateId, containerId) {
    // var template = document.getElementById(templateId),
    //     containerElem = document.getElementById(containerId);

    // this.hostElement = document.createElement('div');
    // this.hostElement.classList.add('friends-list-host');
    // this.hostElement.innerHTML = template.innerHTML;
    // containerElem.appendChild(this.hostElement);

  },

  initialize: function() {
    this.initEvents();
  },

  initEvents: function() {
  },

  calcCoords: function() {
    // given a list of all the elements
    // all their widths are 256px

  },

  /**
  * Calculate list of element coordinates using width, height and margin
  * Attach coordinates to each element as a data attribute
  * @return {void}
  * @method calcCoords
  */
  calcCoords: function() {

    var numCols = Math.floor(this.viewportWidth / this.itemSize.w),
        x, y, coord;

    for (var i = 0, j = this.items.size(); i < j; i++) {
        x = (i % numCols) * (this.itemSize.w + MARGIN_LEFT) + MARGIN_LEFT;
        y = Math.floor(i / numCols) * (this.itemSize.h + MARGIN_BOTTOM);

        this.coords[i] = {
            x: x,
            y: y
        };

        this.items.item(i).setAttribute('data-pos', x + ',' + y);
    }

  },

  /**
   * Initialize element positions
   * @return {void}
   * @method initPositions
   */
  initPositions: function() {

    var item, x, y, i;
    for (i = 0; i < this.items.size(); i++) {
        x = this.coords[i].x;
        y = this.coords[i].y;
        item = this.items.item(i);
        item.addClass('list-item-abs');
        this.displayItem(item, x, y);
    }

  },

  /**
   * Display items with transition to fade in if hidden, and slide into position
   * @return {void}
   * @method displayItems
   */
  displayItems: function(items) {

    var x, y;

    for (var i = 0, j = items.length; i < j; i++) {
        this.displayItem(items[i], this.coords[i].x, this.coords[i].y);
    }

    if (items.length > 0) {
        this.itemList.setStyle('height', (this.coords[items.length - 1].y + this.itemSize.h) + 'px');
    } else {
        this.itemList.setStyle('height', 0);
    }

  },

  /**
   * Display a single item
   * @return {void}
   * @method displayItem
   */
  displayItem: function(item, x, y) {

    if (this.filtersInited && !item.hasClass('list-item-move')) {
      item.addClass('list-item-move');
    }

    item.setAttribute('data-pos', x + ',' + y);
    if (this.has3dTransforms) {
      item.setStyles({
        'opacity': 1,
        'visibility': 'visible'
      }).setStyle(this.tS, 'translate3d(' + x + 'px, ' + y + 'px, 0 )');
    } else if (item.getStyle('transform')) {
      var animDur = this.filtersInited ? 0.6 : 0;

      item.transition({
        transform: 'translate(' + x + 'px, ' + y + 'px)',
        duration: animDur,
        easing: 'ease-in-out',
        opacity: 1,
        visibility: 'visible'
      });
    } else {
      item.setStyles({
        'left': (x - 20) + 'px',
        'top': y + 'px',
        'opacity': 1,
        'visibility': 'visible'
      });
    }

  }

});
