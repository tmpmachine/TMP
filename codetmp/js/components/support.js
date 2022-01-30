const support = (function() {

	function checkJSZip() {
		if ('JSZip' in window) {
			// TO DO
			// show/enable file download option
		}
	}

	function checkFirebase() {
		let scope = 'https://www.googleapis.com/auth/firebase'
	  let hasScopeFirebase = gapi.auth2.getAuthInstance().currentUser.get().hasGrantedScopes(scope);
	  if (hasScopeFirebase) {
	  	auth2.addScope(scope);
	    fire.init();
	    displayFeature('firebase');
	  } else {
	  	auth2.removeScope(scope);
	    $('#project-list').innerHTML = '';
      	$('#site-list').innerHTML = '';
	  	hideFeature('firebase');
	  }
	}

	function hideFeature(name) {
		let style = $('style[data-feature="'+name+'"]')[0];
		if (style)
			style.remove();
	}

	function displayFeature(name) {
		let style = document.createElement('style');
		style.dataset.feature = name;
		style.innerHTML = 'body.is-authorized .feature-disabled[data-feature="'+name+'"]{display:none}';
		style.innerHTML += 'body.is-authorized .feature-enabled[data-feature="'+name+'"]{display:unset}';
		document.body.append(style);
	}

	function check(key) {
		switch (key) {
			case 'JSZip': checkJSZip(); break;
			case 'firebase': checkFirebase(); break;
		}
	}

	let self = {
		check,
	    showSaveFilePicker: 'showSaveFilePicker' in window,
	}

	return self;

})();