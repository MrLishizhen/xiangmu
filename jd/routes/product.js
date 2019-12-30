var express = require('express');
var router = express.Router();
var httpResult = require('../config').httpResult;
var query = require('../util/dbHelper.js');
var ToKen = require('../util/token.js');

/* GET home page. */
router.post('/list', function(req, res, next) {
	var {
		fid,
		name,
		pageSize,
		orderCol,
		orderDir,
		begin
	} = JSON.parse(req.body.jsonStr);
console.log(fid,name,pageSize,orderCol,orderDir,begin);
console.log(req.body.jsonStr);
	var sql = "select * from `dt_product` where `fid` = ? and `name` like '%" + name +
			  "%' order by `" + orderCol + "` " + (orderDir ? "asc" : "desc") + " limit ?,?;";
		
	res.flag = query(sql,[fid,begin,pageSize]).then(results => httpResult.success(results));
	next();
});


router.get('/model/:id',function(req,res,next){
	var id = req.params.id;
	var sql = 'select * from `dt_product` where id = ?;';
	res.flag = query(sql,[ id ]).then(results =>{
		return httpResult.success(results[0]);
	}) 
	next();
})




module.exports = router;
