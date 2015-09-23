
var PhotoView,
    MasonryPlugin;

$(document).ready(function() {

  var page = 1;
  MasonryPlugin = new Masonry();

  getPhotos(1);
  $(window).scroll(_.debounce(function(e) {
      if ( $(window).scrollTop() + $(window).height() > ( $(document).height() - 50 ) ) {
        page += 1;
        infiniteScroll(page);
      }
  }, 300));


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
    MasonryPlugin.initMasonry();
  });
}

