window.onload = addListeners;
var magic = "1"; //this will hold the last id that is being shown on the notes area
function addListeners(){
	RewriteFromStorage();
	$('new_note').setAttribute("title","Add new notes");
	$('del_all').setAttribute("title","Delete all notes");
	$('instruction').setAttribute("title","Instruction to use");
	
	$('del_all').addEventListener("click",function(){
		if(localStorage.length>0){
			if(confirm("Are your sure you want to delete everything?")){
				if(confirm("About to delete EVERYTHING. Proceed??")){
					localStorage.clear();
					$('list').innerHTML = "<h1>Well Start Fresh Now!!<h1>";
				}
			}
		}
		else{
			alert("You have nothing to delete!!");	
		}
	},false);
	
	var i = "<h2 style=\"margin:0px;\">Instructions</h2><hr/><li>&diams; By clicking Add New button new notes can be added by typing them on the blank Note-Pad.</li><br/><li>&diams; All your data will be saved automatically along with the date. Your notes can be accessed and edited at any point of time.</li><br/><li>&diams; Each note can be deleted at any point of time by clicking a Red button that will appear right next to it. Once deleted, can't be recovered.</li><br/><li>&diams; Please use this on the same browser. It is not a cross-browser application since it uses local-storage of your browser.</li><hr/>";
	
	$('instruction').addEventListener("click",function(){
		$('list').innerHTML = "";
		$('list').innerHTML = i;
		var ok_node = document.createElement("button");
		ok_node.id = "ok_node";
		ok_node.setAttribute("title","Got it");
		$('list').appendChild(ok_node);
		ok_node.addEventListener("click",function(){
			RewriteFromStorage();
		},false);
	},false);
		
	$('new_note').addEventListener("click",new_note,false);
	
}

function $(x){
	return document.getElementById(x);
}

function new_note(){
	$("display").style.display = "none";
	$("notes").style.display = "block";
	var lastchild_id = $('notes').lastChild.id;
	$(lastchild_id).style.display = "none";
	//creating new div for holding the typed values
	var node = document.createElement("div");
	var first_hope = largest_subscript();
	var new_id = parseInt(first_hope) + 1;
	node.id = new_id;
	$('notes').appendChild(node);
	$(node.id).contentEditable = "true";
	$(node.id).style.height = "370px";
	$(node.id).style.padding = "10px 15px 10px 15px";
	$(node.id).style.boxShadow = "inset 0 0 35px rgba(0,42,87,0.4)";
	$(node.id).style.overflowY = "auto";
	$(node.id).onfocus = function(){
		$(node.id).style.boxShadow = "inset 0 0 50px rgba(0,42,87,0.6)";
	}
	$(node.id).onblur = function(){
		$(node.id).style.boxShadow = "inset 0 0 35px rgba(0,42,87,0.4)";
	}
	magic = node.id;
	$(node.id).style.display = "block";
	//start storing
	var prefix = "local-";
	$(node.id).addEventListener('keyup',function(){
		$("new_note").style.display = "block";
		//adding date
		var dt = new Date();
		var dt_str = dated(dt);
		
		var val = "<strong class=\"txt\">" + $(node.id).innerHTML + "</strong>" + "<span>" + dt_str + "</span>";
		localStorage.setItem(prefix + node.id, val);
		RewriteFromStorage();
	},false);
}
	
function RewriteFromStorage(){
	$('list').innerHTML = "";
	var last_hope = largest_subscript();
	last_hope = parseInt(last_hope);
	var k = last_hope;
	while(k >= 1){
		var id = k;
		//display new item in the list
		var items = document.createElement("li");
		items.id = id + "item";
		$('list').appendChild(items);
		$(items.id).style.cssFloat = "left";
		$(items.id).style.width = "275px";
		$(items.id).style.paddingBottom = "10px";
		$(items.id).innerHTML = localStorage.getItem("local-"+id)+"<hr />";
		$(items.id).firstChild.addEventListener('mousedown',function(){
			//if($('main').style.marginLeft=="0px"){
				//$('main').style.marginLeft = "320px";
			//}
			if(this.id.replace("item","")!=magic){
				$("new_note").style.display = "block";
				$("notes").style.display = "none";
				var strn = localStorage.getItem("local-" + this.parentNode.id.replace("item",""));
				var strn_split = strn.split("</strong><span>");
				$("display").innerHTML = strn_split[0].replace("<strong class=\"txt\">","");
				magic = this.parentNode.id.replace("item","");
				$("display").style.display = "block";
				$("display").addEventListener('keyup',function(){
					localStorage.setItem("local-"+magic,"<strong class=\"txt\">" + this.innerHTML + "</strong><span>" + strn_split[1]);
					RewriteFromStorage();
				},false);
			}
		},false);
		//creating delete buttons for the li just created
		var btn = document.createElement("button");
		btn.id = id + "btn";
		btn.onclick = function(){
			$("notes").style.display = "none";
			$("display").style.display = "block";
			$("display").innerHTML = "";
			var strng = localStorage.getItem("local-" + this.id.replace("btn",""));
			var strng_split = strng.split("</strong><span>");
			$("display").innerHTML = strng_split[0].replace("<strong class=\"txt\">","");
			$("display").style.display = "block";
			if(confirm("Once deleted, cannot be recovered")){
				this.id = this.id.replace("btn","");
				localStorage.removeItem("local-"+this.id);
				$("notes").style.display = "block";
				$("display").style.display = "none";
				//reload the "main" position
				$("notes").innerHTML = '<div id=\"1\" style=\"height:370px;padding:10px 15px 10px 15px;overflow-y:auto;\"><h2>Enjoy a simple, fast and elegant way of making notes with this App</h2><span style=\"position:absolute;bottom:110px\">Designed and Developed by Aniruddha Nath</span></div>';
				RewriteFromStorage();
			}
		};
		$('list').appendChild(btn);
		$(btn.id).setAttribute("class","button");
		$(btn.id).setAttribute("title","Delete this note");
		//deleting the unwanted or blank li's
		if(localStorage.getItem("local-"+id)!=null){
			var str = localStorage.getItem("local-" + id);
			var str_split = str.split("</strong><span>");
			var mystr = str_split[0].replace("<strong class=\"txt\">","");
			mystr = mystr.replace("<br>","");
			mystr = mystr.replace("&nbsp;","");
		}
		if(localStorage.getItem("local-"+id)==null || mystr==""){
			var node1 = $(id+"item");
			var node2 = $(id+"btn");
			localStorage.removeItem("local-"+id);
			$('list').removeChild(node1);
			$('list').removeChild(node2);
		}
		k--;
	}
	if(localStorage.length==0){
		document.getElementById('list').innerHTML = "<h2 style=\"margin:0px;\">Hi There...</h2><p>You don't have any notes now.</p><p>If you din't go through the Instructions, then please do that.<br/>Otherwise start by typing your text (on the right pane) after clicking Add New button</p><p>Happy note-making.</p>";
	}
}
//function to find out the greatest no. at the end of localstorage key
function largest_subscript(){
	var L = localStorage.length;
	var k = 0;
	var arr = new Array(L);
	for(var j=0;j<L;j++){
		arr[j] = localStorage.key(j);
		arr[j] = arr[j].replace("local-","");
		arr[j] = parseInt(arr[j]);
		if(arr[j]>k){
			k = arr[j];
		}
	}
	if(k==0){
		return k+1;
	}
	else{
		return k;
	}
}
//function to format date
function dated(d){
	var m_names = new Array("January", "February", "March", "April", "May", "June", "July", "August","September", "October", "November", "December");
	var curr_date = d.getDate();
	var sup = "";
	if (curr_date == 1 || curr_date == 21 || curr_date ==31){
		sup = "st";
	}
	else if (curr_date == 2 || curr_date == 22){
		sup = "nd";
	}
	else if (curr_date == 3 || curr_date == 23){
		sup = "rd";
	}
	else{
		sup = "th";
	}
	var curr_month = d.getMonth();
	var curr_year = d.getFullYear();
	var date = curr_date + "<SUP>" + sup + "</SUP> " + m_names[curr_month] + " " + curr_year;
	return date;
}
