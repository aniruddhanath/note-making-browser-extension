
function CsvUpload (argument) {
	// Creating overlay
	var overlay = $('overlay');
	$('upload').onClick(function (event) {
		alert('re');
		event.preventDefault();
		event.stopPropagation();

		var fileInput = $('uploaded_file')[0];
		console.log(fileInput.files[0]);

		var status = $('status');
			
		//$status.css("display", "block");
		status.innerHtml('Uploading image...');
	});
}