
function CsvDownload () {
	
	var largestKey = largestSubscript();
	largestKey = parseInt(largestKey);
	var k = largestKey;

	var csv = '';
	
	while (k >= 1) {
		var id = k;
		var content = localStorage.getItem("local-"+id);
		
		if (content != null) {
			// Parsing contents from LocalStorage
			var content_split = content.split("</strong><span>");
			
			//var content_note = content_split[0].replace("<strong class=\"txt\">","");
			//content_note = content_note.replace(/;comma;/g, ",").replace(/;colon;/g, ":");
			var content_note = strip(content_split[0]);
			var content_date = content_split[1].replace("</span>","").replace("<SUP>","").replace("</SUP>","");
			
			csv += '"' + id + '", "' + content_date + '", "' + content_note + '",\r\n';
		}

		k--;
	}

	console.log(csv);

	// Creating downloads
	var link = document.createElement('a');
	link.href = 'data:text/csv;charset=utf-8,' + escape(csv);
	link.target = '_blank';
	link.download = 'NoteMaking_' + Date() + '.csv';

	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}

function strip (html) {
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
}
