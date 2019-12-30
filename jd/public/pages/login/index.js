$('.sign-in').on('click',function(){
	var name = $('.name').val();
	var pwd = $('.pwd').val();
	http({url:'/users/login/pwd',data:{name,pwd}}).then(token =>{
		
		Cookies.set('token',token);
		//跳转到登录之前的页面
		window.location.replace(Cookies.get('target') || '/pages/category/index.html');//以后要改
	});
	
})


