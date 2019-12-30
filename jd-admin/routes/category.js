var express = require('express');
var router = express.Router();
var query = require('../util/dbHelper.js');
var assetsPath = require('../config').assetsPath;
var httpResult = require('../config').httpResult;
var path = require('path'); //node操作路径的包，本身自带
var upload = require('../util/upload.js');
var file = require('../util/file.js'); //这是一个删除修改文件的包
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
router.post('/all',function(req,res,next){
	var sql = 'select * from `dt_category`;';
	res.flag=query(sql,[]).then(results=>{
		return httpResult.success(results);
	})
	
	next();
})

router.post('/remove',function(req,res,next){
	var id = req.body.id;
	
	var sql = 'delete from `dt_category` where `id` = ?;';
	res.flag = query(sql,[id]).then(()=>{
		return httpResult.success();
	})
	next();
})
// router.post('/add',function(req,res,next){
// 	var {fid,name}=req.body;
	
// })


//删除后台分类
router.post('/remove',function(req,res,next){
	var {id,avatar} = req.body;
	res.flag=query('call p_removeCategory(?);',[id]).then(results=>{
		if(results[0][0].result===''){
			if(avatar){
				var imgPath=path.join(assetsPath.root,avatar);
				file.unlink(imgPath);
			}
			return httpResult.success(null,'删除成功');
		}else{
			return httpResult.failure(null,results[0][0].result);
		}
	});
	next();
	
})

//图片上传缓存，返回路径
router.post('/upload',upload.single('avatar'),function(req,res,next){
	console.log(req.file);
	console.log(upload);
	res.flag = Promise.resolve(httpResult.success(req.file.filename)); //返回的是这个图片保存的名字
	next();
})
//新增分类
router.post('/add',function(req,res,next){
	var {fid,name,newAvatar} = req.body;
	var {tmp,root,category}=assetsPath;
	res.flag=query('call p_addCategory(?,?,?);',[fid,name,newAvatar ? category + newAvatar :null ])
	.then(results=>results[0][0].result)
	.then(newId=>{
		if(newAvatar){
			var fromPath = path.join(tmp,newAvatar);
			var toPath = path.join(root,category,newAvatar);
			
			//从tmp中考培到最终目录，同时删出临时文件
			file.copy(fromPath,toPath).then(()=>file.unlink(frompath));
			
		}
		return httpResult.success(newId,'新增成功');
	});
	next();
})
//修改分类
router.post('/update', function(req, res, next) {
	var { id, fid, name, avatar, newAvatar } = req.body;
	res.flag = new Promise(function(resolve, reject) {
		if(newAvatar) {	// 如果修改了图片
			var { tmp, root, category } = assetsPath;
			var fromPath = path.join(tmp, newAvatar);
			var toPath = path.join(root, category, newAvatar);
			file.copy(fromPath, toPath)
				.then(() => file.unlink(fromPath))
				.then(() => file.unlink(path.join(root, avatar)))
				.then(() => resolve());
		}
		else resolve();
	})
		.then(() => {
			avatar = newAvatar ? (assetsPath.category + newAvatar) : avatar;
			let sqlStr = 'UPDATE `dt_category` SET `fid` = ?,`name` = ?,`avatar` = ? WHERE `id` = ?';
			return query(sqlStr, [ fid, name, avatar, id ]);
		})
		.then(() => httpResult.success(null, '修改成功'))
		.catch(message => httpResult.error(null, message));
	next();
});

module.exports = router;
