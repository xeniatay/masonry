$(document).ready(function() {

  var API_500_PHOTOS = 'https://api.500px.com/v1/photos';

  $.get(API_500_PHOTOS, {
    feature: 'popular',
    page: 1,
    consumer_key: 'yxaXMCw9aobTttp9xGIS5ejH8ynzUMTWN2CQz0WI'
  }).done(function(data) {
    _.each(data.photos, function(photo) {
      displayPhoto(photo);
    });
  });


    // // Initialize models
    // activityModel = new ActivityStoreModel();
    // graphModel = new GraphModel();

    // // Initialize views
    // activityView = new activityFormView('activity-form-container', activityModel);
    // graphView = new GraphView('graph-container', graphModel);

});

function displayPhoto(photo) {
  console.log(photo);
}