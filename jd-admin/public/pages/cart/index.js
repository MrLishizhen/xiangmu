
if(Cookies.get('token')){
	http({url:'/cart/list'}).then(data =>{
		if(data.length>0){
			showData(data);
			$('.list,.footer.normal,.content-hd').show();
			$('.login-tips,.login-tips-img,.empty-cart').hide();
			bindEvent();
		}else{
			$('.content-hd,.login-tips,.login-tips-img,.footer,.list,.content-hd').hide();
			
		}
	})
}else{
	$('.login-tips-img,.login-tips').show();
	$('.content-hd,.footer,.empty-cart').hide();
	
}

function updateAccount(){
	var account = 0;
	
	$('.content-body i.checkbox.normal.checked').each(function(i,item){
		var price = $(this).parent().find('.price').text();
		var count = $(this).parent().find('.count').text();
		account += parseFloat(price)*parseFloat(count);
	});
	$('.account').text(`￥${account}`);
}

function updateTotal(){
		var total = 0;
		$(`.content i.checkbox.normal.checked`).each(function(i,item){
			var count = $(this).parent().find('span.count').text();
			total += parseInt(count);
		});
		if(total > 0){
			$(`span.total-normal`).text(`(${total})`)
			.parent().attr('disabled',false).removeClass('disabled');
		}else{
			$(`span.total-normal`).text('')
			.parent().attr('disabled',true).addClass('disabled');
		}
}

function updateFooter(){ updateAccount();updateTotal();}

function showData(data){
	data.forEach(item =>{
		$(`
			<li data-id = ${item.id} data-pid=${item.pid}>
				<i class='checkbox normal checked'></i>
				<i class='checkbox edit'></i>
				<img src='${item.avatar}' />
				<div class='product-info'>
					<h3 class='name'>${item.name}</h3>
					<span class='remark'>${item.remark}</span>
					<p class='price'>${item.price}</p>
				</div>
				
				<div class='count-wrapeer'>
					<span class='decrease ${item.count !==1 ? '' : 'disabled'}' >-</span>
					<span class='count'>${item.count}</span>
					<span class='increase ${item.count !==5 ? '' : 'disabled'}' >+</sapn>
				</div>
			</li>
		`).appendTo($('ul.list'));
	})
	updateFooter();
}






function bindEvent(){
	$('.content-body i.checkbox').on('click',function(){
		$(this).toggleClass('checked');
		var groupName = $(this).hasClass('normal') ? 'normal' : 'edit';
		$(`.content-body i.checkbox.${ groupName }:not(".checked")`).length === 0 ? $(`.footer i.checkbox.${groupName}`).addClass('checked') : $(`.footer i.checkbox.${groupName}`).removeClass('checked')
		updateFooter();
	});
	
	//点击加减
	$(".count-wrapeer>span.decrease").on('click',function(){
		var $count = $(this).next();
		var count = parseInt($count.text());
		if(count ===1){
			Notice.message('最少需要购买一个哦！');
			return;
		}
		var id= $(this).closest('li').get(0).dataset.id;
		http({url:`/cart/decrease/${id}`}).then((re) =>{
			count--;
			if(count==1)$(this).addClass('disabled');
			$count.text(count).next().removeClass('disabled');
			updateFooter();
		})
	})
	
	//点击加加
	$(".count-wrapeer>span.increase").on('click',function(){
		var $count = $(this).prev();
		var count = parseInt($count.text());
		
		if(count ===5){
			Notice.message('最多只能购买五个哟！');
			return;
		}
		var id= $(this).closest('li').get(0).dataset.id;
		http({url:`/cart/increase/${id}`}).then((re) =>{
			count++;
			if(count==5)$(this).addClass('disabled');
			$count.text(count).next().removeClass('disabled');
			updateFooter();
		})

	})
	
	
	
	
}
//全选和反选
	$('i.checkbox.all').on('click',function(){//获取所有的全选按钮注册点击事件，
		$(this).toggleClass('checked');//判断当前有没有checked这个class，有就删除，没有就添加
		var groupName = $(this).hasClass('normal') ? 'normal' : 'edit';//判断当前的this是哪一个
		$(this).hasClass('checked') ? $(`.content i.checkbox.${ groupName }`).addClass('checked')://通过判断自身有没有注册选中事件，然后给跟自己有相同的类名的i注册同样的状态
		$(`.content i.checkbox.${ groupName }`).removeClass('checked');
		updateFooter();
	})
	
	
//切换编辑,普通状态
$('.btn-edit').on('click',function(){
	$(this).text($(this).text()==='编辑商品'? '完成' : '编辑商品');
	$('.footer,.content-body>ul.list>li>i.checkbox').toggle();
})

//点击删除
$('button.btn-remove').on('click',function(){
	console.log(1);
	var ids = [];
	var $lis = $('ul.list>li:has(i.checkbox.edit.checked)');
	console.log($lis);
	$lis.each((i,item) => ids.push(parseInt(item.dataset.id)));
	http({url:'/cart/remove',data:{ids:JSON.stringify(ids)}})
	.then(() => {
	
			$lis.remove();
			if($('ul.list>li').length === 0 ){
				$('.footer,button.btn-edit,ul.list,.content-hd').hide();
				$('.empty-cart').show();
			}else{
				updateFooter();
				if($(`content i.checkbox.normal:not('.checked')`).length ===0){
					$('i.checkbox.all.normal').addClass('checked');
				}
			}
			// updateFooter();
			//全选状态的维护
		
	})
})


$('.settlement').click(function(){
	var arr = [];
	$('ul.list li:has(i.checkbox.normal.checked)').each((i,item)=>{
		arr.push(parseInt(item.dataset.id));
	})
	
	sessionStorage.setItem('ids',JSON.stringify(arr));
	window.location.href = '/pages/orderconfirm/index.html';
})