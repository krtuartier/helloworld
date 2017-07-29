window.onload=function(){
	txt = "<p>Browser CodeName: " + navigator.appCodeName + "</p>";
	txt+= "<p>Browser Name: " + navigator.appName + "</p>";
	txt+= "<p>Browser Version: " + navigator.appVersion + "</p>";
	txt+= "<p>Cookies Enabled: " + navigator.cookieEnabled + "</p>";
	txt+= "<p>Platform: " + navigator.platform + "</p>";
	txt+= "<p>User-agent header: " + navigator.userAgent + "</p>";
	txt+= "<p>User-agent language: " + navigator.systemLanguage + "</p>";
	
	document.getElementById("example").innerHTML=txt;
	if(navigator.appVersion.indexOf('UCBrowser')>-1) {
		document.body.style.backgroundColor='#000000';
		document.body.style.color='#FFFFFF';
	}
	var oH1=document.querySelector('h1');
	setInterval(function(){	
		var array=[0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'];
		oH1.style.color='#'+
		array[parseInt(Math.random()*16)]+
		array[parseInt(Math.random()*16)]+
		array[parseInt(Math.random()*16)]+
		array[parseInt(Math.random()*16)]+
		array[parseInt(Math.random()*16)]+
		array[parseInt(Math.random()*16)];
	},200);
}