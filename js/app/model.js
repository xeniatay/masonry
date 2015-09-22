/**
 * Model for Photos Module
 *
 * @author      Xenia Tay
 * @file        model.js
 */

define(function () {
  function photosModel() {
    this.pageNum = 1;
    this.allPhotos = [];
    this.photos = [];
  }

  photosModel.prototype = {

    // CONSTANTS
    API_500_PHOTOS: 'https://api.500px.com/v1/photos',

    /**
    * Get a paged set of 20 photos from 500px's Popular Stream
    * @param {callback} Execute this callback on success
    * @return {void}
    */
    getPhotos: function(onSuccess) {
      $.get(this.API_500_PHOTOS, {
        consumer_key: 'yxaXMCw9aobTttp9xGIS5ejH8ynzUMTWN2CQz0WI',
        feature: 'popular',
        image_size: 30, // longest edge of image = 256px
        page: this.pageNum
      }).done( _.bind(function(data) {

        // concat data.photos onto this.allPhotos
        this.allPhotos.push.apply( this.allPhotos, data.photos );
        this.photos = data.photos;

        onSuccess();
      }, this) );
    },

    /**
    * Increment pageNum and get next set of photos
    * @return {void}
    */
    getMorePhotos: function(onSuccess) {
      this.pageNum += 1;
      this.getPhotos(onSuccess);
    }

  };

  return photosModel;
});

