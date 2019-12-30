var express = require('express');
var router = express.Router();
var query = require('../util/dbHelper.js');
var httpResult = require('../config').httpResult;
/* GET users listing. */
router.get('/list/:fid', function(req, res, next) {
	var fid = parseInt(req.params.fid);//获取ajax传过来的fid
	//跟数据库连结筛选数据
	var sql = 'select * from `dt_category` where `fid` = ?';//sql语句
	res.flag = query(sql,[ fid ]).then(results => {
		return httpResult.success(results);
	});
	next();
});

module.exports = router;
