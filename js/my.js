// shortcut console.log to l for dev
function l(data) {
	console.log(data);
}

// JQuery doc ready - you can use the $ shortcut inside here:
jQuery(document).ready(function() {

	// hide safari menu in iOS
	/mobile/i.test(navigator.userAgent) && !window.location.hash && setTimeout(function() {
		window.scrollTo(0, 1);
	}, 0);

	// use .svg files freely but provide a fallback png with the same name in same folder
	if (!Modernizr.svg) {
		$('img[src*="svg"]').attr('src', function() {
			return $(this).attr('src').replace('.svg', '.png');
		});
	}

});