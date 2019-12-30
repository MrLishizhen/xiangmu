var addressId = window.location.search ? parseInt(window.location.search.slice(1).split('=')[1]):0;
	http({url:addressId=== 0?'/address/getdefault':`/address/obtain/${addressId}`}).then(showAccount);
var moneys;

console.log(addressId);


function count(){
	moneys = 0;
	$('ul.list>li').each((i,item)=>{
		var money = parseInt($(item).find('.price').text());
		var count = parseInt($(item).find('.count').text());
		
		moneys += money * count;
	})
	$('.money,.subtotal').text(`￥ ${moneys}`);
}
function showAccount(data){
	if(data){
		addressId=data.id
		$(`
			<span class='address-name'>${data.receiveName}</span>
			<span class='address-phone'>${data.receivePhone}</span>
			<p class='address'>${data.receiveRegion} ${data.receiveDetail}</p>
		`).appendTo('.address-wra');
	}else{
		$('.address-wra').addClass('empty');
	}
}

function showList(data){
	$(`
	<li>
		<div class='commodity'>
			<img src="${data.avatar}" alt="">
			<div>
				<h4 class='name'>${data.name}</h4>
				<span class='crat-remark'>${data.remark}</span>
				<p>
					<span class='price-warpper'>
						￥<em class='price'>${data.price}</em>
					</span>
					<span class='number'>X<span class='count'>${data.count}</span></span>
				</p>
			</div>
		</div>
		<div class='delivery-wra'>
			<p class='delivery-hd'>
				<span>配送服务</span>
				<span>快递服务</span>
			</p>
			<p class='delivery-btm'>
				<span>中小件送货时间</span>
				<span>工作日、双休日与节假日均可送货</span>
			</p>
		</div> 
	</li>
	`).appendTo($('ul.list'));
}
var ids = sessionStorage.getItem('ids');
console.log(1);
http({url:'/cart/listSettlement',data:{jsonStr:ids}}).then(data=>{

	data.forEach(data=>{
		
		showList(data);
		count();
	})
});
$('button.btn-generate-order').on('click',function(){
		if(addressId ===0){
			Notice.message('地址不能为空');
			return;
		}
		console.log(addressId);
		var ids = JSON.parse(sessionStorage.getItem('ids')).join(',');
		var account = moneys;//价格
		var jsonStr = JSON.stringify({ids,account,addressId});
		http({url:'/order/confirm',data:{jsonStr}}).then(orderId =>{
			window.location.replace(`/pages/pay/index.html?orderId=${orderId}`);
		})
		
	})