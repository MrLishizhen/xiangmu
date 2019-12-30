var express = require('express');
var path = require('path');
var httpResult = require('../config').httpResult;
var query = require('../util/dbHelper.js');
var ToKen = require('../util/token.js');
var file = require('../util/file.js');//文件的一些操作，增删改查
var assetsPath = require('../config').assetsPath;//保存着文件夹中的一些主要文件路径
var upload = require('../util/upload.js');

var router = express.Router();
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

//按照条件请求数据
router.post('/admin/list',function(req,res,next){
	
	var {name,mId,sId,cId,begin,count} = req.body;
	var sql = 'call p_getProductByCondition(?,?,?,?,?,?);';
	res.flag=query(sql,[name,mId,sId,cId,begin,count])
	.then(results=>{
		return httpResult.success({total:results[0][0].total,list:results[1]});
	})
	
	next();
})

//商品下架
router.post('/putonsale/:id',function(req,res,next){
	var id = req.params.id;
	var sql = 'update `dt_product` set `status`=0 where id=?' 
	res.flag=query(sql,[id]).then(()=>{
		return httpResult.success('下架ok');
	})

	next();
})

//商品上架
router.post('/pulloffshelves/:id',function(req,res,next){
	var id = req.params.id;
	var sql = 'update `dt_product` set `status`= 1 where id=?' 
	res.flag=query(sql,[id]).then(()=>{
		return httpResult.success('上架ok');
	})

	next();
})



//banner图片上传
router.post('/upload/banner',upload.single('banner'),function(req,res,next){
	var { id } = req.body;
		var { tmp, root, product: { banner } } = assetsPath;
		var fileName = req.file.filename;//图片的名字，保存在tmp文件夹中的名字
		var filePath = banner + fileName;
		var fromPath = path.join(tmp, fileName);//临时目录的绝对路径
		var toPath = path.join(root, banner, fileName);//到哪去的路径
		res.flag = file.copy(fromPath, toPath)					// 从temp中拷贝到最终目录中
			.then(() => file.unlink(fromPath))		// 从temp中删除临时文件
			.then(() => query('CALL p_uploadProductBanner(?,?);', [ filePath, id ]))
			.then(data => httpResult.success(filePath))
			.catch(message => httpResult.error(null, message));
		next();
})

//删除banner
router.post('/banner/remove', function(req, res, next) {
	var { id, filePath, newBanner } = req.body;
	res.flag = query('UPDATE `dt_product` SET `banner` = ? WHERE `id` = ?', [ newBanner, id ])
		.then(() => file.unlink(path.join(assetsPath.root, filePath)))
		.then(() => httpResult.success())
		.catch(message => httpResult.error(null, message));
	next();
});
//替换avatar
router.post('/upload/avatar', upload.single('avatar'), function(req, res, next) {
	var fileName = req.file.filename;
	var { id } = req.body;
	var { tmp, root, product: { avatar } } = assetsPath;
	var fromPath = path.join(tmp, fileName);
	var toPath = path.join(root, avatar, fileName);
	var filePath = avatar + fileName;
	res.flag = file.copy(fromPath, toPath)
		.then(() => file.unlink(fromPath))
		.then(() => query('CALL p_uploadProductAvatar(?, ?);', [ filePath, id ]))
		.then(results => {
			if(results[0][0].avatar !== '') {
				var oldAvatarPath = path.join(root, results[0][0].avatar);
				return file.unlink(oldAvatarPath);
			}
			else 
				return Promise.resolve();
		})
		.then(data => httpResult.success(filePath))
		.catch(message => httpResult.error(null, message));
	next();
});

//新增商品
router.post('/add',function(req,res,next){
	let{cid,name,remark,price} = req.body;
	var sql='call p_addProduct(?,?,?,?);';
	res.flag=query(sql,[cid,name,remark,price]).then(results=>{
		console.log(results);
		//返回的是一个数组包含数组，想要返回的数据被包含在内部，所以才要像下方这样返回数据
		 return httpResult.success(results[0][0]);
	})
	next();
})

//修改商品
router.post('/update',function(req,res,next){
	var {id,cid,name,remark,price} = req.body;
	var sql = 'call p_updateProduct(?,?,?,?,?)';
	res.flag=query(sql,[cid,name,remark,parseInt(price),id]).then(results=>{
		return httpResult.success(results[0][0]);
	});
	next();
	})



module.exports = router;
