requirejs.config({
  paths: {
      jquery: [
        "https://code.jquery.com/jquery-1.11.3.min",
        "../bower_components/jquery/dist/jquery.min"
      ],
      underscore: [
        "https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min",
        "ext/underscore"
      ]
  }
});

// Load the main app module to start the app
requirejs(['main']);
