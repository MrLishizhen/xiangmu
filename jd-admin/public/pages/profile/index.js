
	http({url:'/users/info'}).then(resolve=>{
		$('.name').text(resolve.name);
		// $('.address.phone').text(resolve.phone);
	})
	
	
	$('.sign-out').click(function(){
		Cookies.remove('token');
		location.replace('/pages/home/index.html');
	})



http({url:'/order/number'}).then((number)=>{
	if(number.length>0){
		$(`<span>${number.length}</span>`).appendTo('.all-orders');
	}
})