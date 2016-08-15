// clickEvents - navigation toggle
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
