define(function () {
  function photosModel(page) {
    this.page = page;
    this.allPhotos = [];
    this.photos = [];

  }

  photosModel.prototype = {

    // constants
    API_500_PHOTOS: 'https://api.500px.com/v1/photos',

    getPhotos: function(callback) {
      $.get(this.API_500_PHOTOS, {
        consumer_key: 'yxaXMCw9aobTttp9xGIS5ejH8ynzUMTWN2CQz0WI',
        feature: 'popular',
        image_size: 30,
        page: this.page
      }).done( _.bind(function(data) {
        console.log(data);
        this.allPhotos.push(data.photos);
        this.photos = data.photos;
        callback();
      }, this) );
    },

    getMorePhotos: function() {
      this.page += 1;
      this.getPhotos();
    }
  };

  return photosModel;
});

