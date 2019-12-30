var express = require('express');
var router = express.Router();
var httpResult = require('../config').httpResult;
var query = require('../util/dbHelper.js');
var ToKen = require('../util/token.js');

router.post('/list',ToKen.verify,function(req,res,next){
	var name = req.token.name;
	var sql = 'select * from `dt_address` where name = ?;';
	res.flag = query(sql,[name]).then(results => {
		return httpResult.success(results);
	})
	next();
})

router.get('/default/:id',ToKen.verify,function(req,res,next){
	var id = req.params.id;
	var name = req.token.name;
	var sql = 'call p_setDefaultAddress(?,?);';
	res.flag = query(sql,[id,name]).then(results => {
		return httpResult.success();
	})
	next();
})
//删除
router.get('/remove/:id',ToKen.verify,function(req,res,next){
	var id = req.params.id;
	var sql = 'delete from `dt_address` where `id` = ?;';
	res.flag = query(sql,[id]).then(results => {
		return httpResult.success();
	})
	next();
})

//新增
router.post('/add',ToKen.verify,function(req,res,next){
	var name = req.token.name;
	var {receiveName,receivePhone,receiveRegion,receiveDetail} = JSON.parse(req.body.jsonStr);
	
	var sql = 'insert into `dt_address` (name,receiveName,receivePhone,receiveRegion,receiveDetail) values(?,?,?,?,?);';
	res.flag = query(sql,[name,receiveName,receivePhone,receiveRegion,receiveDetail]).then(results => {
		return httpResult.success(results.insertId);
	})
	next();
})
//修改
router.post('/update',ToKen.verify,function(req,res,next){
	var name = req.token.name;
	var {id,receiveName,receivePhone,receiveRegion,receiveDetail} = JSON.parse(req.body.jsonStr);
	
	var sql = 'update `dt_address` set `receiveName` = ?,`receivePhone`=? ,`receiveRegion`=?, `receiveDetail`=? where `id` = ?;';
	res.flag = query(sql,[receiveName,receivePhone,receiveRegion,receiveDetail,id]).then(() => {
		return httpResult.success();
	})
	next();
})






// 获取默认地址

router.post('/getdefault',ToKen.verify,function(req,res,next){
	var name = req.token.name;
	var sql = 'select * from `dt_address` where `name`= ? and `isDefault` = 1 ;';
	res.flag = query(sql,[name]).then(result=>{
		return httpResult.success(result[0]);
	});
	next();
})

router.post('/obtain/:id',ToKen.verify,function(req,res,next){
	var id = req.params.id;
	var sql = 'select * from `dt_address` where `id`= ?;';
	res.flag = query(sql,[id]).then(result=>{
		return httpResult.success(result[0]);
	});
	next();
})
//获取用户设置的地址 
module.exports = router;