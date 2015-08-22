$(document).ready(function() {
  $( '.type-text' ).each( function() {
    var items = $( this ).attr( 'title' ) + ';' + $( this ).text();
    var thing = $( this ).empty().attr( 'title', '' ).teletype( {
      text: items.split( ';' ),
      typeDelay: 10,
      backDelay: 20,
      cursor: '_',
      delay: 3000,
      preserve: true,
      prefix: '<span class="terminal__shell--path">[daktylos.net ~]</span><span class="terminal__shell--prompt">$</span>',
      loop: 1
    });
  });
});
