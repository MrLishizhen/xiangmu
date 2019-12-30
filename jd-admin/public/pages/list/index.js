var fid = parseInt(window.location.search.slice(1).split('=')[1]);

//为了防止用户直接进入到列表页
if(!fid){
	window.location.href = '/pages/category/index.html'
}
//商品名
var name = '';
//最大加载数量
var pageSize=6;
//加载的依据
var orderCol = 'price';

//加载的升降序
var orderDir = true;//默认升序
//是否处于加载阶段
var isLoading = false;
//是否有更多的数据供用户加载
var hasMore = true;
//是否触发加载事件

var isTriggerLoding = false;

//scroll对象
var scroll = null;

function getData(){
	isLoading = true;//表示正在加载
	$('p.info').text('加载中...');
	var jsonStr = JSON.stringify({
		fid,//父集id
		name,//商品名
		pageSize,//加载的条数
		orderCol,//用来作为加载依据
		orderDir,//用来排序
		begin:$('ul.list>li').length//用于截取数据
	})
	return http({url:'/product/list',data:{ jsonStr }}).then(resulove =>{
		hasMore = resulove.length === pageSize;
		isLoading = false;
		if(hasMore){
			$('p.info').text('上拉加载更多...');
		}else if($('ul.list>li').length == 0){
			$('p.info').text('暂无数据，敬请期待...');
		}else{
			$('p.info').text('已到达底部...');
		}
		return resulove;
	});
	
}


function setData(data){
	console.log(data);
	data.forEach(item =>{
		$(
		`
		<li>
			<a href='/pages/detail/index.html?id=${item.id}'>
				<img src='${item.avatar}' />
				<div>
					<h3>${item.name}</h3>
					<h5><span>${item.remark}</span></h5>
					<p class='price-p'>
						<strong>
						￥
							<span>${item.price}.00</span>
						</strong>
					</p>
					<p class='rate-p'>
						${item.rate}条评论
					</p>
				</div>
			</a>
		</li>
		
		
		`
		).appendTo($('ul.list'));
		
	});
	initOrReshScroll()
}


function initOrReshScroll(){
	imagesLoaded($('.content')[0],function(){
		setTimeout(function(){
			if(scroll){
				scroll.refresh();
			}else{
				scroll = new IScroll($('.content')[0],{
					deceleration:0.003,//滚动阻尼系数，(0.00006-0.01)之间，数值越大，惯性越小。
					bounce:false,//关闭边界回弹效果
					click:true,//设置默认的取消的点击事件，true设置为可以被点击
					probeType:2//有效值为1，2，3数值越高，探测频率越高，
				});
				
				scroll.on('scroll',function(){
					if(hasMore && !isLoading){
						if(this.y === this.maxScrollY){
							isTriggerLoding = true;
							$('p.info').text('放手加载更多...');
						}else{
							isTriggerLoding = false;
							$('p.info').text('上拉加载更多...');
						}
					}
				});
				
				
				scroll.on('scrollEnd',function(){
					if(isTriggerLoding){
						isTriggerLoding = false;
						getData().then(setData);
					}
				})
			}
		},20)
	})
}
getData().then(setData);

//点击弹出功能菜单
$('.header-function').click(function(){
	$(this).find('.header-function-content').toggle();
})

//堆排序进行事件绑定
$('.header-screen>.click').click(function(){//点击排序
	/*判断是否处于刷新状态*/
	if(isLoading){
		/*能进来就删除之前的这个p标签*/
		$('.notice').remove();
		/*创建新的p标签*/
		var $notice = $('<p class="notice">你的操作太频繁了</p>').appendTo('body');
		/**/
		setTimeout(()=>$notice.remove(),2000);
		return;
	}
	$(this).find('i').addClass('screen-img');
	$(this).siblings().find('i').removeClass('screen-img');
	$('ul.list').empty();
	hasMore = true;
	if(this.dataset.col === orderCol){
		orderDir = !orderDir;
		if($(this).find('i').hasClass('reversal')){
			$(this).find('i').removeClass('reversal');
		}else{
			$(this).find('i').addClass('reversal');
		}
	} 
	else{
		orderCol = this.dataset.col;
		
	} 
	getData().then(setData);
})