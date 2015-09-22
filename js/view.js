/*** Abstract View ***/

var AbstractView = function() {};

_.extend(AbstractView.prototype, {
  _instantiateInterface: function(templateId, containerId) {
    var template = $('#' + templateId),
        container = $('#' + containerId);

    this.hostElement = $('<div></div')
      .addClass('single-photo')
      .html( template.html() )
      .appendTo(container);
  }
});

/*** Photo View ***/

var PhotoView = function(containerId, model) {
  this.container = $('#' + containerId);
  this._instantiateInterface('single-photo-template', containerId);
  this.model = model;
  this.initialize();
};

_.extend(PhotoView.prototype, AbstractView.prototype, {
  initialize: function() {
    this.img = $(this.hostElement).find('.photo-img');
    this.title = $(this.hostElement).find('.photo-title');
    this.faveInput = $(this.hostElement).find('.photo-fave-checkbox');
    this.viewCount = $(this.hostElement).find('.photo-view-count');

    this.img.attr('src', this.model.image_url);
    this.title.html(this.model.name);
    this.viewCount.html(this.model.times_viewed);

    this.initEvents();
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
  },
  initListeners: function() {},
});
