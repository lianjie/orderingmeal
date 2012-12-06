/*选人界面调用的函数*/
function selectPeople(){
	var pul = "<ul data-role='listview'  data-theme='c' data-dividertheme='d'>";
	for (var i=0 ; i<users.length ; i++ )
	{
		var pli = "<li><a  href='orderingmeal.html'  rel='external' onclick=getPeople('";
		pli += users[i].name;
		pli += "');>";
		pli += users[i].name; //从users.json中提取数据
		pli += "</a></li>";
		pul += pli;
	}
	pul += "</ul>";
	$('#peoplelist').html(pul);
}

function getPeople(pname){
	//alert(pname);
	window.localStorage.people = pname;//用全局变量window.localStorage.people存储pname
}

/*选餐厅界面调用的函数*/
function selectRestau(){
	var rul = "<ul data-role='listview'  data-theme='c' data-dividertheme='d'>";
	for (var i=0 ; i<restaurants.length ; i++ )
	{
		var rli = "<li><a href='orderingmeal.html'  rel='external' onclick=getRest('";
		rli += restaurants[i].name;
		rli += "');>";
		rli += restaurants[i].name;  //从restaruant.json中提取数据
		rli += "</a></li>";
		rul += rli;
	}
	rul += "</ul>";
	$('#restaurantlist').html(rul);
}

function getRest(rname){
	window.localStorage.restaurant = rname;//用全局变量window.localStorage.restaurant存储rname
}

/*选套餐界面调用的函数*/
function selectMeal(){
	var mul = "<ul data-role='listview'  data-theme='c' data-dividertheme='d'>";
	if(window.localStorage.restaurant != null){
		//alert(window.localStorage.restaurant);
		var restaurant = window.localStorage.restaurant;
		//alert(foods[restaurant].length);
		for (var i=0 ; i<foods[restaurant].length ; i++ )
		{
			var mli = "<li><a href='orderingmeal.html'  rel='external' onclick=getMeal('";
			mli += foods[restaurant][i].name;
			mli += "','";
			mli += foods[restaurant][i].price;
			mli += "');>";
			mli += foods[restaurant][i].name;  //从foods.json中提取数据
			mli += "<p class='ui-li-aside'><strong>￥";
			mli += foods[restaurant][i].price;
			mli += "</strong></p></a></li>";
			mul += mli;
		}
		mul += "</ul>";
		$('#meallist').html(mul);
	}
}

function getMeal(mname,price){
	window.localStorage.meal = mname;//用全局变量window.localStorage.meal存储mname
	window.localStorage.price = price;
	//alert(window.localStorage.price);
}

/*订餐页面点击提交后调用的函数*/
function orderingMeal(){
	//将订单保存
	if(window.localStorage.people!="" && window.localStorage.restaurant!="" && window.localStorage.meal!=""){
		window.localStorage.orderpeople += window.localStorage.people + "*";
		window.localStorage.orderrestau += window.localStorage.restaurant + "*";
		window.localStorage.ordermeal += window.localStorage.meal + "*";
		window.localStorage.orderprice += window.localStorage.price + "*";
	}
	//执行变量的清空
	window.localStorage.people = "";
	window.localStorage.meal = "";

	//提交后对页面进行刷新
	window.history.go(0);
}

/**/
function viewList(){
	var people = new Array();
	var restaurant = new Array();
	var menu = new Array();
	var price = new Array();

	people = window.localStorage.orderpeople.split("*");
	restaurant = window.localStorage.orderrestau.split("*");
	menu = window.localStorage.ordermeal.split("*");
	price = window.localStorage.orderprice.split("*");
	
	var listul = "<ul data-role='listview'><li data-role='list-divider'>";
	listul += people.length-1;
	listul += "人已定</li>";
	var sum = 0;//记录总价格
	for (var i=0 ; i<people.length-1 ; i++ )
	{
		var listli = "<li><h3>";
		listli += people[i]; //从users.json中提取数据
		listli += "</h3><p><strong>";
		listli += restaurant[i];
		listli += menu[i];
		listli += "</strong></p><p class='ui-li-aside'>";
		if (parseFloat(price[i])>12)
		{
			listli += "<strong style='color:red'>￥";
			listli += price[i];
			var over = parseFloat(price[i])-12;
			listli += "（over￥";
			listli += over;
			listli += "）</strong>";
		}
		else{
		listli += "<strong>￥";
		listli += price[i];
		listli += "</strong>";
		}
		sum += parseFloat(price[i]);
		listli += "</p></li>";
		listul += listli;
	}
	listul += "<li data-role='list-divider'>";
	listul += users.length-people.length+1;
	listul += "人未定</li>";
	for ( var i=0; i<users.length; i++)
	{
		for (var j=0;j<people.length-1 ;j++ )
		{
			if (users[i].name==people[j])
				break;
		}
		if(j==people.length-1){
			listul += "<li>";
			listul += users[i].name;
			listul += "</li>";
		}
	}
	listul += "<div data-role='footer'><h4>";
	listul += people.length-1;
	listul += "人已定，";
	listul += users.length-people.length+1;
	listul += "人未定，总计";
	listul += sum;
	listul += "元</h4></div>";
	$('#lists').html(listul);
}
