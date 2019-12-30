var id=0;
var isAdd = true;  

http({url:'/address/list'}).then(data=>{
	data.length>0?$('.address-list').show() : $('.address-empty').show();
	if(data.length>0){
		data.forEach(item => {
			generateLi(item);
		});
	}
})

function generateLi(item){
		$(`
		<li data-id=${item.id}>
			<div class='list-left'>
				<p class='list-info'>
					<span class='name'>${item.receiveName}</span>
					<span class='phone'>${item.receivePhone}</span>
				</p>
				<p class='adress-p'>${item.receiveRegion} ${item.receiveDetail}</p>
				<button class='btn-default ${item.isDefault==0 ? '':'default'}'>${ item.isDefault ? '默认地址' : '设为默认地址' }</button>	
			</div>
			<div class='list-button'>编辑</div>
			
		
		</li>
		`).appendTo($('ul.ul-list'));
}

function beginEdit(item){
	$('.page-warpper').toggle();
	if (item) { //进入编辑修改模式
		isAdd = false;
		$('button.btn-remove').show();
		//根据是新增还是修改
		$('input.receiveName').val(item.receiveName);
		$('input.receivePhone').val(item.receivePhone);
		$('input.receiveRegion').val(item.receiveRegion);
		$('input.receiveDetail').val(item.receiveDetail);
	} else { //进入编辑新增模式
		isAdd = true;
		$('form').get(0).reset();//让form中的内容清空
	}
}
function endEdit(){
	$('.btn-remove').hide();
	$('.page-warpper').toggle();
	if($('.ul-list').length===0){
		$('.address-list').hide();
		$('.address-empty').show();
	}else{
		$('.address-list').show();
		$('.address-empty').hide();
	}
	
}

//设为默认
$('ul.ul-list').click(function(e){

	
	
	if($(e.target).hasClass('btn-default')){
		id = parseInt($(e.target).closest('li').get(0).dataset.id);
		http({url:`/address/default/${id}`,method:'get'}).then(()=>{
			Notice.message('默认地址设置成功...');
			$('.btn-default').text('设为默认').removeClass('default');
			$(e.target).text('默认地址').addClass('default');
		})
		
	}
	//判断是不是要编辑内容
	else if($(e.target).hasClass('list-button')){
		console.log(110);
		var $li = $(e.target).closest('li');
		id = parseInt($li.get(0).dataset.id);
		
		beginEdit({
			receiveName:$li.find('.name').text(),
			receivePhone:$li.find('.phone').text(),
			receiveRegion:$li.find('.adress-p').text().split(' ')[0],
			receiveDetail:$li.find('.adress-p').text().split(' ')[1],
		});
	}
	//判断是不是从订单确认页传过来的
	else{
		if(location.search && location.search.slice(1) === 'address=orderconfirm'){
			var ids = e.target.tarName === 'LI' ?  e.target.dataset.id : $(e.target).closest('li')[0].dataset.id;//
			window.location.href=`/pages/orderconfirm/index.html?id=${ids}`;
		}
		
	}
	
	// if(window.location.search && window.location.search.slice(1)==='address=orderconfirm'){
	// 	var ids = e.target.tarName ==='LI'? e.target.dataset.id : $(e.target).closest('li')[0].dataset.id;
	// 	window.location.replace(`/pages/orderconfirm/index.html?addressId=${ids}`);
	// }
})

$('.edit-back').click(function(){
	$('.page-warpper').toggle();
})

$('.add-address').click(function(){
	$('.page-warpper').toggle();
})


$('.deposit').click(function(){
	var model = {
		id: isAdd ? 0 : id,//判断是新增还是更改
		receiveName: $('input.receiveName').val(),
		receivePhone: $('input.receivePhone').val(),
		receiveRegion: $('input.receiveRegion').val(),
		receiveDetail: $('input.receiveDetail').val(),
	}
	
	if(isAdd){//新增
		http({url:'/address/add',data:{jsonStr:JSON.stringify(model)}}).then(newID =>{
			model.id=newID;
			model.isDefault=0;
			Notice.message('新增地址成功...');
			generateLi(model);
			endEdit();
			
		})
	}else{//修改
		http({url:'/address/update',data:{jsonStr:JSON.stringify(model)}}).then((item)=>{
			var $li = $(`.ul-list li[data-id = ${id}]`);
		
			$li.find('.name').text(model.receiveName);
			$li.find('.phone').text(model.receivePhone);
			$li.find('.adress-p').text(`${model.receiveRegion} ${model.receiveDetail}`);
			Notice.message('修改地址成功...');
			endEdit();
		})
	}
})

$('.btn-remove').click(function(){
	http({url:`/address/remove/${id}`,method:'get'}).then(()=>{
		Notice.message('删除成功...');
		endEdit();
		$(`li[data-id=${id}]`).remove();
	})
})

/*引入插件*/
function focusHandler(self){
	Address.show().then(region => $(self).val(region));
}

Address.init();


