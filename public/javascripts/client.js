(function( portal, $, undefined ) {

$( document ).ready(function() {
	var socket = io.connect('ws://localhost:7080');

	$('#post').on('click', function() {

		var title=$('#titleid').val();
		var timestamp = Date();

		if (title.length > 300)
		  {
			  alert("Status message should be less than 300 characters");
			  return false;
		  }
		  
		   var myMessageObject = {title:title,timestamp: timestamp}
		   socket.emit('save', myMessageObject);
		   alert('Status Saved in Database! Check the index page to see it.')
	});


	socket.on('msg', function(data) {
	 $("#ele").append("<p> Status: "+ data.title +"<p>");
	});

});
})(window.portal = window.portal || {}, jQuery);
