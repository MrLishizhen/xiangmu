<template>
	<el-dialog title="京东项目-后台管理" :visible="true" :showClose="false" center  width="600px">
		<el-form labelWidth="80px" :model="model" ref="form" :rules="rules">
			<el-form-item label="账号：" prop="name">
				<el-input placeholder="请输入账号" v-model="model.name"></el-input>
			</el-form-item>
			<el-form-item label="密码：" prop="pwd">
				<el-input placeholder="请输入密码" v-model="model.pwd"></el-input>
			</el-form-item>
		</el-form>
		<!--footer	Dialog 按钮操作区的内容 ， 效果可以是按钮居中-->
		<div slot="footer">
			<el-button type="primary" :disabled="model.name!=''&&model.pwd!=''? false:true" @click="login" >确认</el-button>
			<el-button>取消</el-button>
		</div>
	</el-dialog>
</template>

<script type="text/ecmascript-6">
	export default{
		data(){
		        return {
		                model:{name:'',pwd:''},
			        rules:{
		                        name:[
			                        {required:true,message:'账号输入有误',trigger:'blur'},
			                        {min:5,max:20,message:'长度在5到20个字符',trigger:'blur'}
		                        ],
				        pwd:[
					        {required:true,message:'密码不能为空',trigger:'blur'},
					        {min:5,max:20,message:'长度在5到20个字符',trigger:'blur'}
				        ]
			        }
		        }

		},
		methods:{
		        login(){
				this.$refs.form.validate().then(flag=>{
				        if(flag){
                                                console.log(1);
                                                return this.$http({url: '/admin/admin', data: this.model});

                                        }
				        else return new Promise(()=>{});//永远响应的一个promise对象
				})
					.then(token=>{
					        this.$cookies.set('token',token);
					        this.$router.replace('/home');
					}).catch(()=>{});//消除失败的promise在浏览器中报的错误
		        }
		},
		watch:{

		},

	}
</script>

<style scoped>
	.el-dialog__wrapper{
		/*background: url(./bg.jpg) no-repeat center center/100% 100%  ;*/
		background-color: #fff;
	}
	.el-dialog__header::before{
		content:'';
		display:block;
		border-bottom:1px solid #b0b0b0;
	}
	.el-dialog{
		/*background: url(./bg.jpg) no-repeat center center/100% 100%  ;*/

	}

</style>
