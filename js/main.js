var PhotoView;

$(document).ready(function() {

  var page = 1;
  getPhotos(1);
  $(window).scroll(_.debounce(function(e) {
      if ( $(window).scrollTop() + $(window).height() > ( $(document).height() - 50 ) ) {
        page += 1;
        infiniteScroll(page);
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

function updateFaveCount() {
  console.log($('.photo-fave-checkbox:checked').length);
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
    console.log(data);
    _.each(data.photos, function(photo) {
      displayPhoto(photo);
    });
  });
}