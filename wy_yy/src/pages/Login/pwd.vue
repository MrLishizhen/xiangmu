<template>
	<div class="emil_page">
		<div class="input_emil input">
			<span class="layel">手机号：</span>
			<div class="input_box">
				<input type="text" v-model="emil" placeholder="请输入手机号....." >

			</div>
		</div>
		<div class="input_emil_pwd input">

			<span class="layel">密码：</span>
			<div class="input_box">
				<input type="password" v-model="pwd" placeholder="请输入密码" >
			</div>
		</div>
		<div class="button" :class="{oks:denglu&&clause}" @click="denglu&&clause?login():''" >手机登录</div>
		<div class="clause">
			<input type="radio" value="" name="clause" :checked="clause" @click="clause=!clause" @input="isShowFun">
			<div class="clause_text">请仔细阅读 <span class="clause_click" @click=" isClause=true">登录条款!</span></div>
		</div>
		<div class="clause_isShow" v-if="isClause" @click.self="isClause=false">
			<div class="clause_isShow_box">
				<h3>登录使用声明</h3>
				<div class="clause_box">
					<div class="clause_cont">
						本音乐网站仅是个人练习网站，不是商业性网站。所用数据来自于网易云音乐，希望各位
						在使用过程中遵循网易云公司的规则，不要出现任何违规操作。在登录过程中也是使用的网易云邮箱账号，暂不提供手机号登录。
					</div>
					<div class="clause_cont">
						如果有任何意见、提议：(请把各位的提议或者意见)发送邮箱至   <span class="red">718647063@qq.com</span>。
						我会努力添加网站的各个模块。

					</div>
					<div  class="clause_cont">
						如果本网站侵犯了您的权利，根据情况的严重与否，我会选择关闭网站或者更改网站内容两种方式来表达我的歉意。谢谢各位
					</div>
					<div class="clause_cont">
						特别感谢网络上的公用后台数据：github文档地址
						<span class="red" @click="see">https://binaryify.github.io/NeteaseCloudMusicApi</span>
					</div>

				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
        import cookie from 'js-cookie';
        export default {
                name:'emil',
                beforeRouteEnter(to,from,next){
                        cookie.set('target',from.path);
                        next();//放行
                },
                data(){
                        return {
                                emil:'',
                                pwd:'',
                                clause:false,
                                isClause:false,
                                denglu:false,
                        }
                },

                methods:{
                        see(){
                                window.location.href='https://binaryify.github.io/NeteaseCloudMusicApi'
                        },
                        login(){
                                //需要注意的点，三目绑定运算符需要在函数名后面加上()
                                this.$http({url:`/login/cellphone?phone=${this.emil}&password=${this.pwd}`}).then(result=>{
//					this.$store.dispatch('user/init',result.account);//保存到vuex中

                                        this.$store.commit('user/init',result.account);
                                        let uid=result.account.id
                                        cookie.set('uid',uid);
                                        this.$router.replace(cookie.get('target') || '/home');

                                })
                        },
                        isShowFun(){
                                if(this.emil&&this.pwd){
                                        this.denglu=true;
                                }else{
                                        this.denglu=false;
                                }
                        }
                }
        };
</script>

<style scoped>
	.button.oks{
		background-color: red;
		color:#fff;
	}
	.red{
		color:#f13e3e;
	}
	.clause_cont{
		margin-top:0.5rem;
	}
	.clause_box{
		padding:1rem;
		text-indent:2rem;
		font-size:1.2rem;
		color:#777676;
	}
	.clause_isShow_box>h3{
		text-align: center;
		height:3rem;
		line-height:3rem;
		font-size:1.4rem;
		border-bottom: 1px solid #ccc;
	}
	.clause_isShow_box{
		height:65%;
		width:100%;
		position:absolute;
		bottom:0;
		background-color: #fff;
	}
	.clause_isShow{
		position:fixed;
		width:100%;
		height:100%;
		left:0;
		top:0;
		background-color: rgba(0,0,0,.5);
	}
	.clause_click{
		color:red;
	}
	.clause_text{
		margin-left:0.5rem;
		font-size:1.2rem;
	}
	.clause{
		height:3.0rem;
		display:flex;
		align-items: center;
		padding-left:4rem;
		margin-top:1.5rem;
	}
	.emil_hz{
		padding:0.5rem 0.8rem;
		border:1px solid #ccc;
		border-radius: 0.5rem;
	}
	.input_box>input{
		border:none;
		outline:none;
		padding-left:0.5rem;
	}
	.input_box{
		flex-grow: 1;
		box-sizing: border-box;
		border-bottom:1px solid #ccc;
	}
	.layel{
		width:6rem;
		font-size:1.4rem;
		flex-shrink: 0;
	}
	.emil_page{

	}
	.input{
		padding:1rem 0.5rem;
		height:3.5rem;
		line-height: 3.5rem;
		display:flex;
	}
	.button{
		border-radius: 0.5rem;
		width:50%;
		height:3.5rem;
		border:1px solid red;
		margin:1rem auto 0;
		text-align: center;
		line-height: 3.5rem;
		color:red;
		font-size:1.4rem;
	}
</style>