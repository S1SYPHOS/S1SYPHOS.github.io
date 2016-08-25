// clickEvents - navigation toggle
var body = document.body || document.documentElement,
    overlay = document.getElementById('js-nav-overlay'),
    toggle = document.getElementById('js-nav-toggle'),
    nav = document.getElementById('js-nav');

toggle.addEventListener('click', function() {
  body.classList.toggle('js-nav-overlay--is-open');
  overlay.classList.toggle('has-bgc--red');
  overlay.classList.toggle('fullscreen');
  nav.classList.toggle('nav');
  nav.classList.toggle('nav--primary');
  nav.classList.toggle('nav--secondary');
  nav.classList.toggle('column');
  nav.classList.toggle('is-centered');
}, false);



// function hasClass(el, className) {
// 	    return el.classList ? el.classList.contains(className) : new RegExp('\\b'+ className+'\\b').test(el.className);
// 	}
//
// 	function addClass(el, className) {
// 	    if (el.classList) el.classList.add(className);
// 	    else if (!hasClass(el, className)) el.className += ' ' + className;
// 	}
//
// 	function removeClass(el, className) {
// 	    if (el.classList) el.classList.remove(className);
// 	    else el.className = el.className.replace(new RegExp('\\b'+ className+'\\b', 'g'), '');
// 	}

nav.addEventListener('click', function(e) {
  if (e.target.tagName === 'A' && body.classList.contains('js-nav-overlay--is-open')) {
    body.classList.remove('js-nav-overlay--is-open');
    overlay.classList.remove('has-bgc--red');
    overlay.classList.remove('fullscreen');
    nav.classList.remove('nav--secondary');
    nav.classList.remove('column');
    nav.classList.remove('is-centered');
    nav.classList.add('nav');
    nav.classList.add('nav--primary');
  }
});
