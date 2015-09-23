var PhotoView;

$(document).ready(function() {

  var page = 1;
  getPhotos(1);
  $(window).scroll(_.debounce(function(e) {
      if ( $(window).scrollTop() + $(window).height() > ( $(document).height() - 50 ) ) {
        page += 1;
        // infiniteScroll(page);
      }
  }, 300));


    // // Initialize models
    // activityModel = new ActivityStoreModel();
    // graphModel = new GraphModel();

    // // Initialize views
    // activityView = new activityFormView('activity-form-container', activityModel);
    // graphView = new GraphView('graph-container', graphModel);

});

function displayPhoto(photoModel) {
  var curPhotoView = new PhotoView('photos-container', photoModel);
}

function infiniteScroll(page) {
  getPhotos(page);
}

function getPhotos(page) {
  var API_500_PHOTOS = 'https://api.500px.com/v1/photos';

  $.get(API_500_PHOTOS, {
    consumer_key: 'yxaXMCw9aobTttp9xGIS5ejH8ynzUMTWN2CQz0WI',
    feature: 'popular',
    image_size: 30,
    page: page
  }).done(function(data) {
    _.each(data.photos, function(photo) {
      displayPhoto(photo);
    });
    masonry();
  });
}

function masonry() {
  var COL_WIDTH = 256,
      COL_HORIZONTAL_GAP = 10,
      COL_VERTICAL_GAP = 10;

  var numCols = 3;

  this.coords = [];

  _.each($('.single-photo'), function(photo, i) {
    this.coords[i] = {};

    var currentCol = i % numCols;

    if (i < numCols) {
      this.coords[i].topY = 0;
    } else {
      this.coords[i].topY = this.coords[i - numCols].bottomY + COL_VERTICAL_GAP;
    }

    this.coords[i].x = (COL_WIDTH * currentCol) + (COL_HORIZONTAL_GAP * currentCol);
    this.coords[i].height = $(photo).outerHeight();
    console.log(this.coords[i].height);
    this.coords[i].bottomY = this.coords[i].topY + this.coords[i].height;

    $(photo).css({
      transform: 'translate3d(' + this.coords[i].x + 'px, ' + this.coords[i].topY + 'px, 0)',
      // height: this.coords[i].height,
      position: 'absolute',
      // padding: '0 18px',
      width: COL_WIDTH + 'px'
    });
  }, this);

  console.log(this.coords);
}