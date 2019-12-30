var activeId = 0;
function getData(fid){
   return http({url:`/category/list/${fid}`,method:'get'});
}


function showData(data){
	data.forEach((item)=>{
		$(
		`
		<li data-id='${item.id}'>
			<span> ${ item.name } </span>
		</li>
		`).on('click',function(){
			console.log(1);
			toggle(item.id,item.avatar);
		})
		.appendTo('ul.list-main');
	})
}

function toggle(id,avatar){
	var $listSubWrapper = $('.list-sub-wrapper');
	//改变左侧的样式标志
	if(id ===activeId) return;
	$(`li[data-id = ${id}]`).addClass('active').siblings().removeClass('active');
	//遍历图片
	$listSubWrapper.empty();
	$('.avatar').attr('src',avatar);
	
	
	// 遍历二级标题
	getData(id).then(data => {
		// console.log(data);
		
		
		data.forEach((item,i) => {
			var $list = $(`<ul class='list-sub'></ul>`);
			getData(item.id).then(data2 =>{
				data2.forEach((item2) =>{
					$(`
					<li>
						<a href='/pages/list/index.html?fid=${ item2.id }'>
						<img src='${item2.avatar}'/>
						<span>${item2.name}</span>
						</a>	
					</li>
					`).appendTo($list);
				});
			});
			$(`
			<li class=''>
				<h3>${item.name}</h3>
			</li>
			`)
			.append($list)
			.appendTo($listSubWrapper);
		});
	})
	//遍历下方的内容
	activeId = id;
}

//点击显示功能页
$('.header-function>span').on('click',function(){
	$('.header-function-content').toggleClass('hide');
})



getData(0).then(data=>{
	showData(data);
	toggle(data[0].id,data[0].avatar);
});

