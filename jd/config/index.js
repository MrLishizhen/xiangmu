//定义与数据库链接的基本参数
exports.dbConfig={
	host:'localhost',//链接的那台电脑ip
	database:'jd',//数据库的名字
	user:'root',//什么身份进去的
	password:'123'//密码
}


exports.httpResult = {
	//成功
	success: (data = null,message = '') => ({status:200,data,message}),
	//逻辑失败
	failure: (data = null,message = '') => ({status:199,data,message}),
	
	//物理失败
	error:(data = null,message = '') => ({status:500,data,message}),
	//权限验证失败
	untoken: (data =null,message = '') => ({status:401,data,message}),
	//不存在
	notFound:(data=null,message = '') =>({status:404,data,message})
}

