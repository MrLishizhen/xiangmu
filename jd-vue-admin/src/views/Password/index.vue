<template>

	<el-form labelWidth="100px" status-icon :rules="rules" ref="form" :model="model">

		<el-form-item label="原密码" prop="password">
			<el-input type="password" v-model="model.password"></el-input>
		</el-form-item>
		<el-form-item label="新密码" prop="newPwd">
			<el-input type="password" v-model="model.newPwd"></el-input>
		</el-form-item>
		<el-form-item label="确认密码" prop="confirmPwd">
			<el-input type="password" v-model="model.confirmPwd"></el-input>
		</el-form-item>

		<el-form-item>
			<el-button type="primary" @click="newChangePwd">确认修改</el-button>
			<el-button @click="$refs.form.resetFields()">取消</el-button><!--清空整个表单-->
		</el-form-item>
	</el-form>
</template>

<script type="text/ecmascript-6">
        export default {
                data(){

                        return {
                                model: {
                                        password: '',
                                        newPwd: '',
                                        confirmPwd: '',
                                },
                                rules: {
                                        password: [
                                                {required: true, message: '请输入密码', trigger: 'blur'},
                                                {min: 5, max: 20, message: '请输入5-20个字符', trigger: 'blur'}
                                        ],
                                        newPwd: [
                                                {
                                                        validator: (rule, value, callback) =>{
                                                                if(value === '') callback(new Error('新密码不能为空'));
                                                                else if(value.length < 5 || value.length > 20) callback(new Error('密码长度为5-20'));
                                                                else{
                                                                        if(this.model.confirmPwd !== '') this.$refs.form.validateField('confirmPwd');
                                                                        callback();
                                                                }

                                                        }, trigger: 'blur'
                                                }
                                        ],
                                        confirmPwd: [
                                                {
                                                        validator: (rule, value, callback) =>{
                                                                if(value === '') callback(new Error('确认密码不能为空...'));
                                                                else if(value !== this.model.newPwd) callback(new Error('两次输入密码不一致！'));
                                                                else callback();
                                                        }, trigger: 'blur'
                                                }
                                        ]
                                },
                        }
                },
                methods: {
                        newChangePwd(){
                                this.$refs.form.validate().then(flag =>{//对整个表单进行验证的方法，可以传入一个回调函数作为参数,函数内可以传入两个参数，1验证通过的，2验证不通过的
                                        if(flag){   // ，如果不传，则返回一个promise对象，返回的是是否通过验证，是则为true，否则就是false
						this.$http({url:'/admin/change',data:this.model}).then(()=>{
                                                                this.$message({
                                                                message:'密码修改成功',
                                                                type:'success',

						        });
							this.$refs.form.resetFields();
//
						}).catch(()=>{});
                                        }

                                })
                        }
                }
        };
</script>

<style scoped>
	.el-form {
		width: 700px;
		margin: 100px auto 0;
	}
	.el-main>.el-tabs{
		height:100%;
	}
	.el-tabs__content,.el-tabs--border-card{
		height:100%;
	}
</style>