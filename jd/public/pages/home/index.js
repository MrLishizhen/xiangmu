var scroll = null;
var listscroll = null;
var interval = 3000;
var duration = 1000;
var index = 0;
var timer = null;

if (Cookies.get('token')) {
	$('.not-sign-in-title').text('');
	$('.not-sign-in-title').css({
		background: 'url(imgs/login.png)',
		width: '20px',
		height: '22px',
		display: 'inline-block',
		backgroundSize: '20px',
		margin: '10px 10px 12px 10px'
	})
	$('.not-sign-in-title').click(function(){
		window.location.href='/pages/profile/index.html'
	})
}

var length = $('.scroll>li').length - 1;
imagesLoaded($('.banner')[0], () => { //保证图片加载完毕
	setTimeout(() => { //保证图片相关的css样式渲染完毕
		scroll = new IScroll($('.banner')[0], {
			scrollY: false, //关闭纵向滚动
			scrollX: true, //开启横向滚动
			snap: true, //开启scroll轮播图滚动模式
			momentum: false, //关闭scroll惯性滚动
		});
		//IScroll默认是纵向滚动，
		scroll.on('scrollStart', function() {
			clearTimeout(timer); //开始滚动前清除所有已经存在timer任务，避免发生滚动混乱
		})
		scroll.on('scrollEnd', function() {
			scroll.disable(); //调整前禁用
			//0 1 2 3 4
			if (scroll.currentPage.pageX == length) {
				scroll.goToPage(1, 0, 0);
				$(`.indicator>span:eq(0)`).addClass('active').siblings().removeClass('active');
			} //如果现在的图片下标的序号是存储图片的长度+1的话，表示现在要进行复位，让他到下标为1的图片
			else if (scroll.currentPage.pageX == 0) {

				scroll.goToPage(length, 0, 0);
				$(`.indicator>span:eq(length)`).addClass('active').siblings().removeClass('active');
			} else {
				$('.indicator>span').eq(scroll.currentPage.pageX - 1).addClass('active').siblings().removeClass('active');
			} //如果现在图片的下标的序号是第零位的图片的话，表示要进行复位，让他到第三个图片哪里，
			scroll.enable(); //调整后重新启用iscroll

			timer = setTimeout(() => scroll.next(duration), interval); //重新播放下一张.next滚动完成的时间
		});

		scroll.goToPage(1, 0, 0) //必须snap为true才可以用，三个参数

		timer = setTimeout(() => scroll.next(duration), interval); //播放下一张
	}, 20)
})




imagesLoaded($('.box_list')[0], () => { //保证图片加载完毕
	setTimeout(() => { //保证图片相关的css样式渲染完毕
		listscroll = new IScroll($('.box_list')[0], {
			scrollY: false, //关闭纵向滚动
			scrollX: true, //开启横向滚动
			snap: true, //开启scroll轮播图滚动模式
			momentum: false, //关闭scroll惯性滚动
		});

		listscroll.on('scrollEnd', function() {
			index = listscroll.currentPage.pageX;
			$('.box_list>.indicator>span').eq(index).addClass('active').siblings().removeClass('active');
		});
		listscroll.goToPage(0, 0, 0) //必须snap为true才可以用，三个参数

	}, 20)
})
