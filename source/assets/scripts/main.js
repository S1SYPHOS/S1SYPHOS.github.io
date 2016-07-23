// Feature detection for JS & SVG -- by npostulart - https://gist.github.com/npostulart/ad21c3133771a1860074
// window.Detection = (function(window, document) {
  var className, html;
  html = document.documentElement;
  className = html.className.replace('no-js', 'js');
  html.className = className;
  // return Detection;
// })(window, document);

window.onscroll = function() {
  var header = document.getElementById('site-header');
  if (window.pageYOffset > 350) {
    header.classList.remove('is-maximized');
  } else {
    header.classList.add('is-maximized');
  }
  var toTop = document.getElementById('js-beam-me-up');
  if (window.pageYOffset > 500) {
    toTop.classList.add('is-visible');
  } else {
    toTop.classList.remove('is-visible');
  }
};

var body = document.body || document.documentElement,
  toggle = document.getElementById('js-nav-toggle'),
  nav = document.getElementById('js-nav');

toggle.addEventListener('click', function() {
  body.classList.toggle('js-nav-overlay--is-open');
  nav.classList.toggle('nav--primary');
  nav.classList.toggle('nav--secondary');
}, false);

nav.addEventListener('click', function(e) {
  if (e.target.tagName === 'A') {
    body.classList.remove('js-nav-overlay--is-open');
    nav.classList.remove('nav--secondary');
    nav.classList.add('nav--primary');
  }
});

smoothScroll.init({
  offset: 40,
  activeClass: 'is-active'
});

gumshoe.init({
  offset: 240,
  activeClass: 'is-active'
});

var myTabs = new Frtabs();

myTabs.init();

AOS.init();
