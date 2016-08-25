/* Animate on Scroll (AOS) - Small library to animate elements on your page as you scroll
 * https://github.com/michalsnik/aos
 *
 * by Michał Sajnóg
 */
var aos = require('aos');
aos.init({
  offset: 250,
  // once: true,
});

/*
 * Gumshoe - A simple, framework-agnostic scrollspy script
 * https://github.com/cferdinandi/gumshoe
 *
 * Smooth Scroll - A lightweight script to animate scrolling to anchor links
 * https://github.com/cferdinandi/smooth-scroll
 *
 * by Chris Ferdinandi
 */

var gumshoe = require('gumshoe');
gumshoe.init({
  offset: 200,
  activeClass: 'is-active'
});

var smoothScroll = require('smooth-scroll');
smoothScroll.init({
  offset: 99,
  activeClass: 'is-active'
});
