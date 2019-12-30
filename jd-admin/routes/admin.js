var express = require('express');
var httpResult = require('../config').httpResult;
var query = require('../util/dbHelper.js');
var ToKen = require('../util/token.js');

var router = express.Router();


router.post('/admin',function(req,res,next){
	var {name,pwd}=req.body;
	var sql='select * from `dt_admin` where name=? and pwd=?;';
	res.flag = query(sql,[name,pwd]).then(result=>{
		if(result.length>0){//判断返回的数据
			return httpResult.success(ToKen.sign(name));//有就表示应该返回token产生的秘钥
		}else{//否则的话就应该返回一个错误，表示账号或者密码错误
			return httpResult.failure(null,'账号或密码错误')
		}
	})
	next();
})

router.post('/change',ToKen.verify,function(req,res,next){
	var name = req.token.name;
	var {password,newPwd}=req.body;
	var sql = 'call p_changePwd(?,?,?);'
	res.flag=query(sql,[name,password,newPwd]).then(results=>{
		if(results[0][0].result==''){
			return httpResult.success();
		}else{
			return httpResult.failure(null,results[0][0].result);
		}
	})
	next();
	
})

module.exports = router;