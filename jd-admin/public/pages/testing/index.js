$('.submission').click(function(){
	var jsonStr = JSON.stringify($('.modify>input').val());
	http({url:'/users/modify',data:{jsonStr}}).then(result=>{
			if(result.length>0){
				window.location.href='/pages/phonemodify/index.html';
				
			}else{
				alert('手机号不是当前用户哟...');
			}
		})
		
})