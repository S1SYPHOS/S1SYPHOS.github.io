/*
 * Super simple AJAX forms powered by Formspree -- http://jdp.org.uk/ajax/2015/05/20/ajax-forms-without-jquery.html
 */

	var message = {};
	message.loading = 'Laden ...';
	message.success = 'Vielen Dank!';
	message.failure = 'Fehler!';

	var form = document.forms[0];
	var submitForm = document.getElementById('submit-form');

	var statusMessage = document.createElement('span');

	// Set up the AJAX request
	var request = new XMLHttpRequest();
	request.open('POST', '//formspree.io/lets@dance.agency', true);
	request.setRequestHeader('accept', 'application/json');

	// Listen for the form being submitted
	form.addEventListener('submit', function(evt) {
	    evt.preventDefault();

	    // Create a new FormData object passing in the form's key value pairs (that was easy!)
	    var formData = new FormData(form);

	    // Send the formData
	    request.send(formData);

	    // Watch for changes to request.readyState and update the statusMessage accordingly
	    request.onreadystatechange = function () {
	        // <4 =  waiting on response from server
	        if (request.readyState < 4) {
						statusMessage.className = 'btn btn--loading loading mono-ui';
						statusMessage.innerHTML = message.loading;
						submitForm.parentNode.replaceChild(statusMessage, submitForm);

					// 4 = Response from server has been completely loaded.
	        } else if (request.readyState === 4) {
	            // 200 - 299 = successful
	            if (request.status === 200 && request.status < 300) {
								statusMessage.className = 'btn btn--success mono-ui';
								statusMessage.innerHTML = message.success;
								submitForm.parentNode.replaceChild(statusMessage, submitForm);
	          	} else {
								statusMessage.className = 'btn btn--error mono-ui';
								statusMessage.innerHTML = message.failure;
								submitForm.parentNode.replaceChild(statusMessage, submitForm);
							}
	        }
	    };
	});
