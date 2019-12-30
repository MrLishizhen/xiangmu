var orderId = window.location.search.slice(1).split('=')[1];

http({
	url: `/order/account/${orderId}`
}).then(account => {
	
	$('.price').text(`${account}.00`);
})

$('footer>button').click(function() {
	http({
		url: `/order/okaccount/${orderId}`
	}).then(() => {
		Notice.message('支付成功！！即将返回主页');
	})
	setTimeout(function() {
		window.location.replace('/pages/home/index.html');
	}, 2000);
})

$('.checkbox').click(function(){
	$('.checkbox').each(function(i,item){
		$(item).removeClass('checked');
	})
	
	$(this).addClass('checked');
})


