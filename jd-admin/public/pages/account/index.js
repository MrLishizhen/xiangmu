if(Cookies.get('token')){
	http({url:'/users/info'}).then(resolve=>{
		$('.account-title span').text(resolve.name);
		$('.address.phone').text(resolve.phone);
	})
	
	
	$('.sign-out').click(function(){
		Cookies.remove('token');
		location.replace('/pages/home/index.html');
	})
}else{
	location.replace('/pages/login/index.html');
}