$('.sign-in').click(function(){
	var name = $('.list-input>li>.name').val();
	var pwd = $('.list-input>li>.pwd').val();
	var pwd_v = $('.list-input>li>.pwd-verification').val();
	var phone = $('.list-input>li>.phone').val();
	if(name&&pwd&&pwd_v&&phone){
		if(pwd != pwd_v){
			Notice.message('两次密码不一致哦！');
			return;
		}
		if(phone[0] =='1' && phone.length == 11){
			http({url:'/users/adduser',data:{name,pwd,phone}}).then(retules =>{
				if(retules == 0){
					Notice.message('抱歉!该用户或者电话已经被注册');
					return;
				}else{
					Notice.message('注册成功,已为您自动登录');
					Cookies.set('token',retules);
					setTimeout(()=>{location.href='/pages/home/index.html';}, 500);
				}
			})
		
		}else{
			Notice.message('请输入正确的电话！！');
		}
	}else{
		Notice.message('请完整的输入信息！！');
	}
})
