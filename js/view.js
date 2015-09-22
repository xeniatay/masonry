/*** Abstract View ***/

var AbstractView = function() {};

_.extend(AbstractView.prototype, {
  _instantiateInterface: function(templateId, containerId) {
    var template = $('#' + templateId),
        container = $('#' + containerId);

    // this.hostElement = $('div').html(template.clone().html());
    this.hostElement = $('<div></div').html( template.html() );
    container.append(this.hostElement);
  }
});

/*** Photo View ***/

var PhotoView = function(containerId, model) {
  this.container = $('#' + containerId);
  this._instantiateInterface('single-photo-view', containerId);
  this.model = model;
  this.initialize();
};

_.extend(PhotoView.prototype, AbstractView.prototype, {
  initialize: function() {
    this.img = $(this.hostElement).find('.photo-img');
    this.title = $(this.hostElement).find('.photo-title');
    this.faveIcon = $(this.hostElement).find('.photo-fave-icon');
    this.viewCount = $(this.hostElement).find('.photo-view-count');

    this.img.attr('src', this.model.image_url);
    this.title.html(this.model.name);
    this.viewCount.html(this.model.times_viewed);
  },
  initEvents: function() {},
  initListeners: function() {},
});
