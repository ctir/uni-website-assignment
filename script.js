//Adapted from examples given
//Author Charles Tiriamai

//======================================= TABS =======================================\\
//Adapted from TabExample.html
    var currentTab = "";
//Show About Tab
    function showAboutTab() {
        if (currentTab != "AboutTab") {
			currentTab = "AboutTab";
            showNoTabs();
            document.getElementById("AboutTab").style.backgroundColor = "DeepSkyBlue";
			document.getElementById("BookTab").style.backgroundColor = "Blue";
			document.getElementById("BlurayTab").style.backgroundColor = "Blue";
			document.getElementById("CommentTab").style.backgroundColor = "Blue";
			document.getElementById("RegisterTab").style.backgroundColor = "Blue";
            document.getElementById("AboutSection").style.display = "inline";
        }
    }
	
//Show Book Tab
    function showBookTab() {
        if (currentTab != "BookTab") {
            currentTab = "BookTab";
            showNoTabs();
            document.getElementById("AboutTab").style.backgroundColor = "Blue";
			document.getElementById("BookTab").style.backgroundColor = "DeepSkyBlue";
			document.getElementById("BlurayTab").style.backgroundColor = "Blue";
			document.getElementById("CommentTab").style.backgroundColor = "Blue";
			document.getElementById("RegisterTab").style.backgroundColor = "Blue";
            document.getElementById("BookSection").style.display = "inline";
			getBooks();
        }
    }
//Show Bluray Tab
	function showBlurayTab() {
        if (currentTab != "BlurayTab") {
            currentTab = "BlurayTab";
            showNoTabs();
            document.getElementById("AboutTab").style.backgroundColor = "Blue";
			document.getElementById("BookTab").style.backgroundColor = "Blue";
			document.getElementById("BlurayTab").style.backgroundColor = "DeepSkyBlue";
			document.getElementById("CommentTab").style.backgroundColor = "Blue";
			document.getElementById("RegisterTab").style.backgroundColor = "Blue";
            document.getElementById("BluraySection").style.display = "inline";
			var term = document.getElementById("searchBluray");
			searchBlurays();
        }
    }
//Show Comment Tab
    function showCommentTab() {
        if (currentTab != "CommentTab") {
            currentTab = "CommentTab";
            showNoTabs();
            document.getElementById("AboutTab").style.backgroundColor = "Blue";
			document.getElementById("BookTab").style.backgroundColor = "Blue";
			document.getElementById("BlurayTab").style.backgroundColor = "Blue";
			document.getElementById("CommentTab").style.backgroundColor = "DeepSkyBlue";
			document.getElementById("RegisterTab").style.backgroundColor = "Blue";
            document.getElementById("CommentSection").style.display = "inline";
        }
    }

//Show Register Tab
    function showRegisterTab() {
		if (currentTab != "RegisterTab") {
            currentTab = "RegisterTab";
            showNoTabs();
            document.getElementById("AboutTab").style.backgroundColor = "Blue";
			document.getElementById("BookTab").style.backgroundColor = "Blue";
			document.getElementById("BlurayTab").style.backgroundColor = "Blue";
			document.getElementById("CommentTab").style.backgroundColor = "Blue";
			document.getElementById("RegisterTab").style.backgroundColor = "DeepSkyBlue";
            document.getElementById("RegisterSection").style.display = "inline";
        }
    }
//Show No Tabs
    function showNoTabs() {
         document.getElementById("AboutTab").style.backgroundColor = "transparent";
         document.getElementById("BookTab").style.backgroundColor = "transparent";		 
		 document.getElementById("BlurayTab").style.backgroundColor = "transparent";
         document.getElementById("CommentTab").style.backgroundColor = "transparent";
		 document.getElementById("RegisterTab").style.backgroundColor = "transparent";

         document.getElementById("AboutSection").style.display = "none";
         document.getElementById("BookSection").style.display = "none";
		 document.getElementById("BluraySection").style.display = "none";
         document.getElementById("CommentSection").style.display = "none";		 
		 document.getElementById("RegisterSection").style.display = "none";		 
    }
    window.onload = function () {
        showAboutTab();
    }
	
//======================================= BOOKS =======================================\\
//Adapted from ShowOrders.js
//Get full book list
	function getBooks() {
		var uri = "http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/booklist";
		var xhr = new XMLHttpRequest();
		xhr.open("GET", uri, true);
		xhr.setRequestHeader("Accept", "application/json");
		xhr.onload = function () {
			var booL = JSON.parse(xhr.responseText);
			searchBooks(booL);
		}
		xhr.send(null);
	}
	
//Search books
	function searchBooks(booL) {		
		var term = document.getElementById("bookSearch").value;
		//alert(term);		
		var uri = "http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/booksearch?term=" + term;
		//alert(uri);
		var xhr = new XMLHttpRequest();
		xhr.open("GET", uri, true);
		xhr.setRequestHeader("Accept", "application/json");
		xhr.onload = function () {	
			//alert(xhr.responseText);
			var auth = JSON.parse(xhr.responseText);
			showBooks(booL, auth);			
		}
		xhr.send(null);
	}
	
//Show books	
	function showBooks(book, auth) {
		var booT = "";
		var uri1 = '<tr><td><img class="productImage" src="http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/bookimg?id=';
		var uri2 = '" alt="pic"></td><td class="center"><a href="http://redsox.uoa.auckland.ac.nz/BC/Closed/Service.svc/bookbuy?id=';
		for (var x = 0; x < auth.length; ++x) {
			for (var i = 0; i < book.length; ++i) {				
				if(auth[x].Title == book[i].Title){
					//alert(book[i].Id);
					booT += uri1 + book[i].Id + uri2  + book[i].Id + '"> &#128722; Buy ' + book[i].Title + "</a></td></tr>\n";
					//alert(booT);
				}
			}
		}		
		document.getElementById("showBooks").innerHTML = booT;
		showBookTab();
	}

//======================================= BLURAYS =======================================\\
//Adapted from ShowOrders.js
//Get full bluray list
	function getBlurays() {
		var uri = "http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/brlist";
		var xhr = new XMLHttpRequest();
		xhr.open("GET", uri, true);
		xhr.setRequestHeader("Accept", "application/json");
		xhr.onload = function () {
			var bluL = JSON.parse(xhr.responseText);
			showBlurays(bluL);
		}
	   xhr.send(null);
	}
	
//Search blurays
	function searchBlurays() {		
		var term = document.getElementById("bluraySearch").value;	
		//alert(term);
		var uri = "http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/brsearch?term=" + term;
		//alert(uri);
		var xhr = new XMLHttpRequest();
		xhr.open("GET", uri, true);
		xhr.setRequestHeader("Accept", "application/json");
		xhr.onload = function () {			
			//alert(xhr.responseText);
			var blu = JSON.parse(xhr.responseText);			
			showBlurays(blu);
		}
		xhr.send(null);
	}
	
//Show blurays
	function showBlurays(blu) {
		var bluT = "";
		var i;
		var uri1 = '<tr><td><img class="productImage" src="http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/brimg?id=';
		var uri2 = '" alt="pic"></td><td class="center"><a href="http://redsox.uoa.auckland.ac.nz/BC/Closed/Service.svc/brbuy?id=';
		for (i = 0; i < blu.length; ++i ){
			bluT += uri1 + 
			blu[i].Id + uri2 + blu[i].Id + '"> &#128722; Buy ' + blu[i].Title + "</a></td></tr>\n";	
			//alert(bluT);
		}
		document.getElementById("showBlurays").innerHTML = bluT;
		showBlurayTab();
	}

//======================================= COMMENTS =======================================\\
//Adapted from XMLHttpRequest - Example #4
	function postComment(){
		var xhr = new XMLHttpRequest();
		var name = document.getElementById("name").value;
		var comment = document.getElementById("comment").value;
		var jCom = JSON.stringify(comment);		
		//alert(name); alert(comment); alert(jCom);
		
        var uri = "http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/comment?name=" + name;
        xhr.open("POST", uri, true);
		xhr.setRequestHeader("Content-Type", "application/json;");
		xhr.setRequestHeader("Content-Length", comment.length);
        xhr.onload = function () {
			document.getElementById("frame").src = document.getElementById("frame").src; //Adapted from https://stackoverflow.com/a/2064863
        }
        xhr.send(jCom);
		showCommentTab();	
	}
	
//======================================= REGISTER =======================================\\
//Adapted from XMLHttpRequest - Example #4
	function register(){
		var name = document.getElementById("regUser").value;
		var pass = document.getElementById("regPass").value;
		var address = document.getElementById("address").value;
		var req = JSON.stringify({Address: address, Name:name, Password:pass});
		//alert(name); alert(pass); alert(address); alert(req);
		
		var xhr = new XMLHttpRequest();
		var uri = "http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/register";
		xhr.open("POST", uri, true);
		xhr.setRequestHeader("Content-Type", "application/json;");
		xhr.setRequestHeader("Content-Length", req.length);
		xhr.onload = function() {
			alert(xhr.responseText);			
		}
		//alert("showRegisterTab");
		showRegisterTab();
		xhr.send(req);	
	}