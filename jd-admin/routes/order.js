var express = require('express');
var router = express.Router();
var query  = require('../util/dbHelper.js');
var httpResult = require('../config').httpResult;
var token = require('../util/token.js');
var ToKen = require('../util/token.js');

router.post('/allList',token.verify,function(req,res,next){
	var name = req.token.name;
	var sql = 'select * from order_orderdetail_address_product where `name` = ?';
	res.flag=query(sql,[name]).then(results=> httpResult.success(results));
	next();
})

router.post('/confirm',token.verify,function(req,res,next){
	var name = req.token.name;
	var { ids , account , addressId} = JSON.parse(req.body.jsonStr);
	var sql = 'CALL p_orderConfirm(?,?,?,?,?);';
	
	res.flag = query(sql,[ids,account,new Date(), name , addressId]).then(results =>{
		return httpResult.success(results[0][0].orderId);
	}
	);
	next();

})


router.post('/account/:orderId',token.verify,function(req,res,next){
	
	var orderId = req.params.orderId;

	var sql = 'select * from `dt_order` where `orderId` = ?;';
	
	res.flag = query(sql,[orderId]).then(results =>{
		return httpResult.success(results[0].account);
	}
	);
	next();

})

router.post('/okaccount/:orderId',token.verify,function(req,res,next){
	
	var orderId = req.params.orderId;

	var sql = 'update `dt_order` set `isPay`=1 where `orderId` = ?;';
	
	res.flag = query(sql,[orderId]).then(results =>{
		return httpResult.success();
	}
	);
	next();

})

router.post('/number',token.verify,function(req,res,next){
	var name = req.token.name;
	
	var sql = 'select * from `dt_order` where `name`=?';
	
	res.flag = query(sql,[name]).then(results =>{
		return httpResult.success(results);
	}
	);
	next();

})

module.exports = router;
