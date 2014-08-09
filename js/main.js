window.onload = AddListeners;

// MAGIC holds the last id that is being shown on the notes area
var MAGIC = "1";

function AddListeners () {
	RewriteFromStorage();
	
	$('new_note').setAttribute("title","Add new notes");
	$('save_note').setAttribute("title","Save notes in .csv file");
	$('del_all').setAttribute("title","Delete all notes");
	$('instruction').setAttribute("title","Instruction to use");
	
	$('sync').addEventListener("click", function(event) {
		event.preventDefault();
		var address = document.URL;
		if (localStorage.length!=0) {
			var key = JSON.stringify(localStorage);
		}
		else {
			var key = "BbSqhfYVEdUpnKrzOozCFqOqAbDeVuw5JFotwTmI9loxJUaAB8ASseSu1rvFKVYjVjVq2SD7Yf";
		}
		if (confirm("Your are about to connect to our server. Sure?")) {
			window.location.href = "http://note-making.byethost17.com/?link="+address+"&key="+encodeURIComponent(btoa(key));
		}
	},false);
	
	
	$('del_all').addEventListener("click",function() {
		if (localStorage.length>0) {
			if (confirm("Are your sure you want to delete everything?")) {
				if (confirm("About to delete EVERYTHING. Proceed??")) {
					localStorage.clear();
					$('list').innerHTML = "<h1>Well Start Fresh Now!!<h1>";
					$("notes").style.display = "block";
					$("display").style.display = "none";
					$("notes").innerHTML = '<div id=\"1\" style=\"height:370px;padding:10px 15px 10px 15px;overflow-y:auto;\"><h2>Enjoy a simple, fast and elegant way of making notes with this App</h2><span style="position:absolute;bottom:110px;left:63px;">&diams; Developed by <em><a href="http://aniruddha.byethost17.com" target="_blank">Aniruddha Nath</a></em> &diams;</span>';
				}
			}
		}
		else {
			alert("You have nothing to Delete!!");	
		}
	},false);

	$('save_note').addEventListener("click",function () {
		if(localStorage.length>0) {
			CsvDownload();
		}
		else {
			alert("You have nothing to Save!!");	
		}
	},false);


	var i = "<h2 style=\"margin:0px;\">Instructions</h2><hr/><li>&diams; To add new notes, click <em>Add New</em> and start typing on the blank Note-Pad.</li><br/><li>&diams; All the data will be saved automatically along with date. Notes can be accessed and edited any time.</li><br/><li>&diams; Each note can be deleted at any point of time by clicking the Red button that will appear right next to it. Once deleted, can't be recovered.</li><br/><li>&diams; You can save your notes online for safe keeping and for transferring to other computers. Just press <em>Connect</em> and follow along.</li><hr/>";
	
	$('instruction').addEventListener("click",function () {
		$('list').innerHTML = "";
		$('list').innerHTML = i;

		var ok_node = document.createElement("button");
		ok_node.id = "ok_node";
		ok_node.setAttribute("title","Got it");
		$('list').appendChild(ok_node);
		$("notes").style.display = "block";
		$("display").style.display = "none";
		$("notes").innerHTML = '<div id=\"1\" style=\"height:370px;padding:10px 15px 10px 15px;overflow-y:auto;\"><h2>Enjoy a simple, fast and elegant way of making notes with this App</h2><span style="position:absolute;bottom:110px;left:63px;">&diams; Developed by <em><a href="http://aniruddha.byethost17.com" target="_blank">Aniruddha Nath</a></em> &diams;</span>';
				
		ok_node.addEventListener("click",function () {
			RewriteFromStorage();
		},false);
	},false);
		
	$('new_note').addEventListener("click",NewNote,false);
}


function $ (x) {
	return document.getElementById(x);
}


function NewNote () {
	$("display").style.display = "none";
	$("notes").style.display = "block";
	var lastchild_id = $('notes').lastChild.id;
	$(lastchild_id).style.display = "none";
	
	// Creating new div for showing the typed values
	var node = document.createElement("div");
	var first_hope = LargestSubscript();
	var new_id = parseInt(first_hope) + 1;
	node.id = new_id;
	$('notes').appendChild(node);
	$(node.id).contentEditable = "true";
	$(node.id).style.height = "370px";
	$(node.id).style.padding = "10px 15px 10px 15px";
	$(node.id).style.boxShadow = "inset 0 0 35px rgba(0,42,87,0.4)";
	$(node.id).style.overflowY = "auto";
	$(node.id).onfocus = function () {
		$(node.id).style.boxShadow = "inset 0 0 50px rgba(0,42,87,0.6)";
	}
	$(node.id).onblur = function () {
		$(node.id).style.boxShadow = "inset 0 0 35px rgba(0,42,87,0.4)";
	}
	MAGIC = node.id;
	$(node.id).style.display = "block";
	
	// Starting to store in the LocalStorage
	var prefix = "local-";
	$(node.id).addEventListener('keyup',function () {
		$("new_note").style.display = "block";
		
		// Adding date
		var dt = new Date();
		var dt_str = Dated(dt);
		
		var val = "<strong class=\"txt\">" + $(node.id).innerHTML + "</strong>" + "<span>" + dt_str + "</span>";
		val = val.replace(/,/g , ";comma;");
		localStorage.setItem(prefix + node.id, val.replace(/:/g , ";colon;"));
		RewriteFromStorage();
	},false);
}

// Finds the greatest no. at the end of localstorage key
function LargestSubscript () {
	var L = localStorage.length;
	var k = 0;
	var arr = new Array(L);
	for (var j=0;j<L;j++) {
		arr[j] = localStorage.key(j);
		arr[j] = arr[j].replace("local-","");
		arr[j] = parseInt(arr[j]);
		if (arr[j]>k) {
			k = arr[j];
		}
	}
	if (k==0) {
		return k+1;
	}
	else {
		return k;
	}
}

// Function to format date
function Dated (d) {
	var m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug","Sep", "Oct", "Nov", "Dec");
	var curr_date = d.getDate();
	var sup = "";
	if (curr_date == 1 || curr_date == 21 || curr_date ==31) {
		sup = "st";
	}
	else if (curr_date == 2 || curr_date == 22) {
		sup = "nd";
	}
	else if (curr_date == 3 || curr_date == 23) {
		sup = "rd";
	}
	else {
		sup = "th";
	}
	var curr_month = d.getMonth();
	var curr_year = d.getFullYear();
	var date = curr_date + "<SUP>" + sup + "</SUP> " + m_names[curr_month] + " " + curr_year;
	return date;
}

// Function to detect data coming via url
function UrlValue () {
	var url = window.location.search.substring(1);
	var data = url.split('=');
	var notes = data[1];
	var k = "{"+atob(notes)+"}";
	var json = JSON.parse(k);
	for (var p in json) {
		var text = json[p];
		localStorage.setItem(p, text);
	}
	window.location.href = window.location.pathname;
}