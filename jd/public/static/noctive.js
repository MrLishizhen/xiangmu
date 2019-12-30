var Notice = {};
Notice.message = (str,time = 2000) =>{
	var $p = $(`<p>${str}</p>`).css({
		position:'fixed',
		top:'50%',
		left:'50%',
		transform:'translate(-50%,-50%)',
		backgroundColor: '#000',
		color: '#fff',
		padding: '0 15px',
		borderRadius: '4px',
		// height: '30px',
		lineHeight: '30px',
		textAlign:'center',
		
	}).appendTo('body');
	setTimeout(()=>$p.fadeOut('fast', () => $p.remove()), time)//fadeOut动画函数，一段时间后改变元素的透明度，在动画执行完之后删除该元素
}

Notice.loading ={
	show:() =>{
		$(`<div class='mi-loading'><div>`).css({
			position:'fixed',
			left:0,
			top:0,
			width:'100%',
			height:'100%',
			backgroundColor:'#fff',
			backgroundImage:'url(/static/images/loading.gif)',
			backgroundPosition:'center center',
			backgroundRepeat:'no-repeat',
		})
		.appendTo('body');
	},
	hide:() => $('.mi-loading').remove()
}