var express = require('express');
var router = express.Router();
var query  = require('../util/dbHelper.js');
var httpResult = require('../config').httpResult;
var token = require('../util/token.js');
var ToKen = require('../util/token.js');



/* GET users listing. */
router.post('/login/pwd',function(req,res,next){
	var { name , pwd } = req.body;
	var sql = 'select * from `dt_user` where `name`= ? and `pwd` = ?';
	res.flag = query(sql,[name,pwd])
		.then(results =>{
			if(results.length>0){
				return httpResult.success(token.sign(name));
			}
			else{
				return httpResult.failure(null,'用户名或密码错误');
			}
		})
		next();
})

//用户请求当前的个人信息
router.post('/info',token.verify,function(req,res,next){
	var name = req.token.name;

	var sql = 'select * from `dt_user` where `name` = ?;';
	
	res.flag = query(sql,[name]).then(results=>{

		var infos = {
			name:results[0].name,
			phone:results[0].phone,
		}
		return httpResult.success(infos);
		});
		
	next();
})
//注册
router.post('/adduser',function(req,res,next){
	var {name,pwd,phone} = req.body;

	var sql = 'select * from `dt_user` where `name` = ? or `phone` =?;';
	res.flag = query(sql,[name,phone]).then(retule =>{
		
	if(retule.length === 0){
		var sqlm = 'insert into `dt_user`(`name`,`pwd`,`phone`) values(?,?,?)';
		res.flag = query(sqlm,[name,pwd,phone])
		
		return httpResult.success(token.sign(name));
		}else{
			return httpResult.success(0);
		}
	})
	
	next();
})


//验证手机号
router.post('/modify',ToKen.verify,function(req,res,next){
	var name = req.token.name;

	var phone = JSON.parse(req.body.jsonStr);
	
	var sql = 'select * from `dt_user` where `name` = ? and `phone` =?;';
	res.flag = query(sql,[name,phone]).then(retule =>{

		return httpResult.success(retule);
	
	});
	next();
})


//设置手机号
router.post('/modifyphone',ToKen.verify,function(req,res,next){
	var name = req.token.name;
	var phone = JSON.parse(req.body.jsonStr);
	var sql = 'update `dt_user` set  `phone` =? where `name`=?;';
	res.flag = query(sql,[phone,name]).then(retule =>{

		return httpResult.success();
	
	});
	next();
})
module.exports = router;
