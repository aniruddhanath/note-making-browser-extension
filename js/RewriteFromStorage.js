
function RewriteFromStorage () {
	
	// This checks whether the data is coming from the Server via URL
	if (window.location.search == "") {
		
		$('list').innerHTML = "";
		var largestKey = LargestSubscript(); // Larget no. found in the localhost key
		largestKey = parseInt(largestKey);
		var k = largestKey;
		
		while (k >= 1) {
			var id = k;
			
			// Displaying new item in the list
			var items = document.createElement("li");
			items.id = id + "item";
			$('list').appendChild(items);
			$(items.id).style.cssFloat = "left";
			$(items.id).style.width = "275px";
			$(items.id).style.paddingBottom = "10px";
			var content = localStorage.getItem("local-"+id);
			$(items.id).innerHTML = content+"<hr />";
			$(items.id).firstChild.addEventListener('mousedown',function () {
				if (this.id.replace("item","") != MAGIC) {
					$("new_note").style.display = "block";
					$("notes").style.display = "none";
					var strn = localStorage.getItem("local-" + this.parentNode.id.replace("item",""));
					var strn_split = strn.split("</strong><span>");
					var content_val = strn_split[0].replace("<strong class=\"txt\">","");
					content_val = content_val.replace(/;comma;/g, ",").replace(/;colon;/g, ":");
					$('display').contentEditable = "true";
					$("display").innerHTML = content_val;
					MAGIC = this.parentNode.id.replace("item","");
					$("display").style.display = "block";
					$("display").addEventListener('keyup',function () {
						localStorage.setItem("local-"+MAGIC,"<strong class=\"txt\">" + this.innerHTML + "</strong><span>" + strn_split[1]);
						RewriteFromStorage();
					},false);
				}
			},false);
			
			// Creating delete buttons for the li created above
			var btn = document.createElement("button");
			btn.id = id + "btn";
			btn.onclick = function () {
				$("notes").style.display = "none";
				$("display").style.display = "block";
				$("display").innerHTML = "";
				var strng = localStorage.getItem("local-" + this.id.replace("btn",""));
				var strng_split = strng.split("</strong><span>");
				var ctn = strng_split[0].replace("<strong class=\"txt\">","")
				$("display").innerHTML = ctn.replace(/;comma;/g, ",").replace(/;colon;/g, ":");
				$("display").style.display = "block";
				if (confirm("Once deleted, cannot be recovered")) {
					this.id = this.id.replace("btn","");
					localStorage.removeItem("local-"+this.id);
					$("notes").style.display = "block";
					$("display").style.display = "none";
					
					// Reloads the "main" position
					$("notes").innerHTML = '<div id=\"1\" style=\"height:370px;padding:10px 15px 10px 15px;overflow-y:auto;\"><h2>Enjoy a simple, fast and elegant way of making notes with this App</h2><span style="position:absolute;bottom:110px;left:63px;">&diams; Developed by <em><a href="http://aniruddha.byethost17.com" target="_blank">Aniruddha Nath</a></em> &diams;</span>';
					RewriteFromStorage();
				}
				else {
					$('display').contentEditable = "false";
				}
			};
			$('list').appendChild(btn);
			$(btn.id).setAttribute("class","button");
			$(btn.id).setAttribute("title","Delete this note");
			
			// Deleting the unwanted or blank li's
			if (localStorage.getItem("local-"+id)!=null) {
				var str = localStorage.getItem("local-" + id);
				var str_split = str.split("</strong><span>");
				var mystr = str_split[0].replace("<strong class=\"txt\">","");
				mystr = mystr.replace("<br>","");
				mystr = mystr.replace("&nbsp;","");
			}
			if (localStorage.getItem("local-"+id)==null || mystr=="") {
				var node1 = $(id+"item");
				var node2 = $(id+"btn");
				localStorage.removeItem("local-"+id);
				$('list').removeChild(node1);
				$('list').removeChild(node2);
			}

			k--;
		}
		if (localStorage.length==0) {
			document.getElementById('list').innerHTML = "<h2 style=\"margin:0px;\">Hi There...</h2><p>You don't have any notes now.</p><p>If you didn't go through the Instructions, then please do that.<br/>Otherwise start by typing your text (on the right pane) after clicking <em>Add New</em> button</p><p>Happy note-making.</p>";
		}
	}
	// If URL has 
	else {
		var url = window.location.search.substring(1);
		var data = url.split('=');
		var key = data[0];
		if (key == "data") {
			UrlValue();
		}
		else {
			alert("Do not tamper with the internal structure");
			window.location.href = window.location.pathname;
		}
	}
	
	
}