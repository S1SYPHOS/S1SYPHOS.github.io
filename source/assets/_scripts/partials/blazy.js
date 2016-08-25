var Blazy = require('blazy');
var lazyload = new Blazy({
  selector: '.lazy', // all images
  successClass: 'lazy--has-loaded',
  breakpoints: [{
    width: 420,  // Max-width
    src: 'data-src-small'
  }],
  success: function(element){
    setTimeout(function(){
      // We want to remove the loader gif now.
      // First we find the parent container
      // then we remove the "loading" class which holds the loader image
      var parent = element.parentNode;
      parent.className = parent.className.replace(/\bloading\b/,'');
    }, 200);
  }
});
