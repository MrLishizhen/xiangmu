var express = require('express');
var router = express.Router();
var httpResult = require('../config').httpResult;
var query = require('../util/dbHelper.js');
var ToKen = require('../util/token.js');


/*请求数据*/
router.post('/list', ToKen.verify, function(req, res, next) {
	//获取前台要谁的数据
	var name = req.token.name;
	var sql =
		'select T1.id,T1.pid,T1.count,T1.addTime,T2.name,T2.avatar,T2.price,T2.remark from (select * from `dt_cart` where `name` = ?) T1 inner join `dt_product` T2 on T1.pid = T2.id;';
	res.flag = query(sql, [name]).then(results => {
		return httpResult.success(results);
	})

	next();
	//进行判断前台发过来的秘钥
	// 与数据库链接
	//获取数据并且返回

});
//加一个商品
router.post('/increase/:id', ToKen.verify, function(req, res, next) {
	var id = parseInt(req.params.id);
	var sql = 'update `dt_cart` set `count` = `count` + 1 where `id` = ?;';
	res.flag = query(sql, [id])
		.then(results => {
			if (results.affectedRows === 1) return httpResult.success(1);
			else {
				return httpResult.failure(null, '操作失败');
			}
		})

	next();
});
//减少一个商品
router.post('/decrease/:id', ToKen.verify, function(req, res, next) {
	var id = parseInt(req.params.id);
	var sql = 'update `dt_cart` set `count` = `count` -1 where `id` = ?;';
	res.flag = query(sql, [id])
		.then(results => {
			if (results.affectedRows === 1) return httpResult.success(1);
			else {
				return httpResult.failure(null, '操作失败');
			}
			//一会再写+
		})
	next();
});

//删除一个
router.post('/remove', ToKen.verify, function(req, res, next) {
	var ids = JSON.parse(req.body.ids);
	var sql = 'delete from `dt_cart` where `id` in (?)'; //问号表示你要传入的数组
	res.flag = query(sql, [ids]).then(results => {
		if (results.affectedRows === ids.length) return httpResult.success();
		else return httpResult.failure(null, '从购物车删除失败...');
	})

	next();
});

router.post('/add', ToKen.verify,function(req,res,next){
	var name = req.token.name;
	var {pid,count} = JSON.parse(req.body.jsonStr);
	var addTime = new Date();
	res.flag = query('call p_addProductToCart(?,?,?,?)',[name,pid,count,addTime]).then(results=>{
		if(results){
			if(results[0][0].result==''){//返回回来是一个数组包含了一个小的数组
				return httpResult.success();
			}else{
				return httpResult.failure(null,results[0][0].result);
			}
		}
	});
	next();
})

router.get('/total', ToKen.verify,function(req,res,next){
	var name = req.token.name;
	var sql = 'select sum(`count`) as total from `dt_cart` where `name`=?;';
	res.flag = query(sql,[name]).then(num =>{
		return httpResult.success(num[0].total);
		
	})
	next();
})

//购物列表
router.post('/listSettlement', ToKen.verify,function(req,res,next){
	var ids = JSON.parse(req.body.jsonStr);
	console.log(ids);
	var sql = 'select * from (select * from `dt_cart` where `id` in (?)) T1 inner join `dt_product` on T1.pid = `dt_product`.id;';
	res.flag = query(sql,[ids]).then(results =>{
		return httpResult.success(results);
	})
	next();
})
// data:{ids:JSON.stringify([1,2])}
module.exports = router;
