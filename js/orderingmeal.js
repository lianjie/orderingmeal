//ҳ�������Ϻ�
window.onload = function (){
	var orderpeople = document.getElementById("people");
	orderpeople.value = window.localStorage.people;

	var orderrestau = document.getElementById("restaurant");
	orderrestau.value = window.localStorage.restaurant;	

	var ordermenu = document.getElementById("menu");
	ordermenu.value = window.localStorage.meal;	
}