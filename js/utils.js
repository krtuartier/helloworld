/*
 * rem
 */
function RootNodeFont() {
	if(window.screen.width <= 750) {
		this.html = document.documentElement;
		this.hWidth = this.html.getBoundingClientRect().width;
		this.html.style.fontSize = this.hWidth / 7.5 + "px";
	}
}
window.onload = function() {
	RootNodeFont();
}