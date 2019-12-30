var jwt = require('jsonwebtoken');
var httpResult = require('../config').httpResult;
var tokenkey = 'qublr';

module.exports = {
	sign:function(name){
		return jwt.sign({name}, tokenkey, { expiresIn:'1h' });
	},
	//还有验证
	verify:function(req,res,next){
		var token = req.get('Authorization');
		
		return jwt.verify(token,tokenkey,function(err,decoded){
			if(err)res.send(httpResult.untoken());
			else{
				req.token = decoded;
				next();
			}
			
		})
	}
}

