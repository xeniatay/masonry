## Zenreach Frontend Coding Challenge

### See it in action

Open `index.html`, or go to [http://xeniatay.com/masonry/](http://xeniatay.com/masonry/)!

### Project Setup

- RequireJS for MVC setup
- Underscore and jQuery (Using CDNs with local fallback)
- Grunt for compiling LESS
- Bootstrap (managed with bower) - some helpers 
- Mocha, Chai, Sinon for attempted tests

#### js/app/model.js

The photo model, contains code that gets photo data from 500px's API.

#### js/app/controller.js

The photo controller, contains logic for event listeners (faving & scrolling) and post-event handlers. 

#### js/app/view.js

The photo view, includes masonry.js as a dependency. Renders each photo using a clone of `template#single-photo-template` from `index.html`.

The `<template>` was used as a partial, which sufficed because it was the only partial needed in this app. A more complicated app might require integration of a templating library to help with code organization.

### Features

- Masonry layout 
- Photo title, view count on hover
- Faving photos & favourite count (non-persistent across page load)
- Infinite scroll
- Fixed topbar
- **Bonus:** Responsive layout (including masonry grid)

### Masonry layout

The masonry plugin `(js/app/masonry.js)` was written fom scratch. The plugin calculates the coordinates of each photo tile based on the position of the tile above it. 

The tile is then positioned using `translate3d` which is supported in all major browsers and IE10+. 

If IE<10 support were needed, I would use Modernizr to check `translate3d` support, with the following fallback:

    position: absolute;
    left: 100px; // x coord
    top: 100px; // y coord

Originally, Masonry was implemented with [CSS columns](https://css-tricks.com/masonry-css/). 
Unfortunately, CSS columns work by distributing the given elements vertically, which interfered with infinite scrolling. Illustrated below: 


    With 6 elements:
    1 | 3 | 5
    2 | 4 | 6

    On scroll, with 12 elements:
    1 | 5 | 9
    2 | 6 | 10 
    3 | 7 | 11
    4 | 8 | 12

This was bad UI and so I re-implemented Masonry with JS instead.

### Favouriting 

Implemented using `<labels>` wrapped around `<input type="checkbox">`.

The favourite count is done by summing the number of `:checked` inputs.

### Infinite Scroll

The Masonry plugin is written so that coordinate calculation and photo rendering is only done on new photos. 

The existing photos have their coordinates preserved and are not re-painted during infinite scroll. The coordinates are re-calculated if the number of columns changes (during resize), but the previous grid calculations are preserved and reused if the grid is restored. 

### Bootstrap

Some bootstrap helpers were used. The list of helpers used can be found in `styles/less/_bootstrap-imports.less`.

Bootstrap variable overrides and additional LESS variables are in `styles/less/_variables.less`.

### To compile LESS

Run `grunt` in the root directory. `styles/less/main.less` outputs to `styles/css/main.css`.

### Tests

Unfortunately, tests aren't implemented for this challenge. 

There are *a few* tests written (`js/tests`), but I was unable to get them to run in `unit_tests.html`.

##### What went wrong

I used these test frameworks previously in a controlled assignment environment ([example1](https://github.com/xeniatay/cs349/blob/master/a2/js/unit_tests/provided_unit_tests.js), [example2](https://github.com/xeniatay/cs349/blob/master/a1/js/unit_tests/provided_unit_tests.js)), and thought I could use them again with no problem.

Turns out, integrating these test libraries with Require broke *something*, and lack of experience with Mocha and Chai stumped me with debugging. 

The problem: none of the `it()` tests are being called in `js/tests/tests.js`. 
