window.onload=function(){
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