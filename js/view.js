/*** Abstract View ***/

var AbstractView = function () {
};

_.extend(AbstractView.prototype, {
    _instantiateInterface: function (templateId, containerId) {
        var template = document.getElementById(templateId),
            containerElem = document.getElementById(containerId);
        this.hostElement = document.createElement('div');
        this.hostElement.innerHTML = template.innerHTML;
        containerElem.appendChild(this.hostElement);
    }
});

/*** Photo View ***/

var PhotoView = function (container, model) {
    this._instantiateInterface('single-photo-view', container);
    this.container = document.getElementById(container);
    this.model = model;
    this.initialize();
};

_.extend(photoView.prototype, AbstractView.prototype, {
    initialize: function() {
    },
    initEvents: function() {
    },
    initListeners: function() {
    },
});

