function http(options){
	var defaultOptions = {
		method:'post',
		dataType:'json',
		headers:{
			'Authorization':Cookies.get('token')
		}
	}
	Object.assign(defaultOptions,options);
	
	return new Promise( resolve => {
		Notice.loading.show();
		setTimeout(()=>{//setTimeout两个参数，第一个是一个函数，第二个执行的时间
	
			$.ajax({
				...defaultOptions,
				success:result =>{
					if(result.message!=='')alert(result.message);
					switch(result.status){
						case 200:resolve(result.data);
						break;
						case 401://权限验证失败就删除token，然后设置tarken为当前的路径，最后跳转到登录页
						Cookies.remove('token');
						Cookies.set('target',window.location.href);
						window.location.replace('/pages/login/index.html');
						break;
						case 199:
						case 500:
						case 404:
						break;
					}
				},
				error:(xhr,textStatus)=>alert(textStatus),
				complete:()=>Notice.loading.hide()
				
			})
			
		},500);
	})
}