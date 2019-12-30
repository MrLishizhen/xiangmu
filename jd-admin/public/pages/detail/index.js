var id = parseInt(location.search.slice(1).split('=')[1]) || 14;
var scroll = null;
var interval = 5000;
var duration = 1000;
var timer = null;
http({url:`/product/model/${id}`,method:'get'}).then(data =>{
	$('.price').text(`${data.price}`);
	$('.name').text(`${data.name}`);
	$('.remark').text(`${data.remark}`);
	$('.avatar').attr('src',`${data.avatar}`);
	if(data.banner) initBanner(data.banner.split(','));
})


function initBanner(data){
	var length = data.length;
	$('ul.scroll').css({width:`${length+2}00%`});
	
	$(`<li><img src='/${data[length-1]}'></li>`).appendTo($('ul.scroll'));
	data.forEach((item,i) =>{
		$(`
		<li>
			<img src='/${item}' />
		</li>
		`).appendTo($('ul.scroll'));
		
		$(`
			<span></span>
		`).appendTo($('.banner-tips'));
	})
	$(`<li><img src='/${data[0]}'></li>`).appendTo($('ul.scroll'));
	
	
	
	setTimeout(()=>{
		imagesLoaded($('.banner')[0],()=>{
			setTimeout(()=>{
				scroll=new IScroll($('.banner')[0],{
					scrollY:false,
					scrollX:true,
					snap:true,
					momentum:false,
				});
				scroll.on('scrollStart',function(){
					clearTimeout(timer);//开始滚动前清除所有已经存在timer任务，避免发生滚动混乱
				})
				scroll.on('scrollEnd',function(){
					scroll.disable();//调用前禁用；
					if(scroll.currentPage.pageX==length+1){
						scroll.goToPage(1,0,0);
						$('.banner-tips>span').eq(0).addClass('active').siblings().removeClass('active');
					}else if(scroll.currentPage.pageX==0){
						scroll.goToPage(length,0,0);
						$('.banner-tips>span').eq(length-1).addClass('active').siblings().removeClass('active');
					}else{
						$('.banner-tips>span').eq(scroll.currentPage.pageX-1).addClass('active').siblings().removeClass('active');
					}
					scroll.enable();
					timer = setTimeout(()=>scroll.next(duration),interval);
				})
				$('.banner-tips>span').eq(0).addClass('active');
				scroll.goToPage(1,0,0);//必须snap为true才可以使用
				timer = setTimeout(()=>scroll.next(duration),interval);
			},20)
		})
	},20)
}

var count=1;
//点击数量加加
$('.incentive').click(function(){
	if(count==5){
		Notice.message('最多只能购买5个哦！');
		return;
	}
	count++;
	$(this).next().text(count);
})

//点击数量减减
$('.decrease').click(function(){
	if(count == 1){
		Notice.message('最少购买1个哦！');
		return;
	}
	count--;
	$(this).prev().text(count);
})


$('.dialog-btn').click(function(){
	
})




$('.cart-btn').click(function(){
	$('.dialog-wrapper').toggle();
});


$('.dialog-wrapper').click(function(e){
	if(e.target == e.currentTarget){
		$('.dialog-wrapper').hide();
	} 
})


//点击加入购物车
$('.dialog-btn').click(function(){
	http({url:'/cart/add',data:{jsonStr:JSON.stringify({pid:id,count})}}).then(()=>{
		Notice.message('加入购物车成功....');//成功的话就调用弹窗动画表示购物车加入成功
		$('.dialog-wrapper').toggle();//改变遮罩层的状态，隐藏遮罩层
		console.log($('.number'));
		$('i.number').text(parseInt($('i.number').text())+count).show();
		
	})
});

if(Cookies.get('token')){
	http({url:'/cart/total',method:'get'}).then(total=>{
		total==null? total=0 : total;//如果他是null就变成0 
		$('.number').text(total);
		if(total>0)$('.number').show();
		})
}



$('.buy').click(function(){
	Notice.message('这个功能还没开通呦!请点击购物车')
})

