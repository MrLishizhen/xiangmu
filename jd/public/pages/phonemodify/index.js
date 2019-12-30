$('.submission').click(function(){
	var jsonStr = JSON.stringify($('.modify>input').val());
	http({url:'/users/modifyphone',data:{jsonStr}}).then(result=>{
				window.location.replace('/pages/account/index.html');
		})
})