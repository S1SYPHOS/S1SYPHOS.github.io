// Animate on Scroll (AOS) - Small library to animate elements on your page as you scroll. -- https://github.com/michalsnik/aos
var aos = require('aos');
aos.init();

// Gumshoe - A simple, framework-agnostic scrollspy script. -- https://github.com/cferdinandi/gumshoe
var gumshoe = require('gumshoe');
gumshoe.init({
  offset: 240,
  activeClass: 'is-active'
});

// Smooth Scroll - A lightweight script to animate scrolling to anchor links. -- https://github.com/cferdinandi/smooth-scroll
var smoothScroll = require('smooth-scroll');
smoothScroll.init({
  offset: 40,
  activeClass: 'is-active'
});
