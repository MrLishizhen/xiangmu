var mysql = require('mysql');//导入mysql
var dbConfig = require('../config').dbConfig;//导入config中的index.js中的方法
function query(sql,params){
	return new Promise((resolve,reject)=>{
		//链接数据库
		var connection = mysql.createConnection(dbConfig);
		connection.query(sql,params,function(err,results,fields){
			connection.end();//断开连接
			if(err){
				reject(err.message);
			}else{
				console.log(results);
				resolve(results);
			}
		})
	})
	
}

module.exports = query;//挂载出去