/*
 * Waypoints - Waypoints is a library that makes it easy to execute a function whenever you scroll to an element
 * https://github.com/imakewebthings/waypoints
 *
 * by Caleb Troughton
 */

//
require('waypoints/lib/noframework.waypoints.js');

// Shrinking header
var header = document.getElementById('site-header'),
    teaser = document.getElementById('teaser'),
    headerShrink = new Waypoint({
      element: teaser,
      handler: function(direction) {
        header.classList.toggle('is-maximized');
      },
      offset: '-60%'
    });


// Back to top link
var services = document.getElementById('welcome'),
    toTop = document.getElementById('js-beam-me-up'),
    backToTop = new Waypoint({
      element: services,
      handler: function(direction) {
        toTop.classList.toggle('is-visible');
      },
      offset: 'bottom-in-view'
    });
