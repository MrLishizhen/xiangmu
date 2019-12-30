<template>
	<div class="page-warpper">
		<div class="header">
			<div class='back' onclick="javascript:history.back()"></div>
			<div class='header-title'>京东登录注册</div>
		</div>
		<div class='content'>
			<LoginPwd></LoginPwd>
			<div class='vr-ligon clearfix'>
				<span class='registration' @click="$router.push('/Register')">手机快速注册</span>
			</div>
			<div class='other-signin'>
				<p>其他登录方式</p>
				<a href="" class='qq'>QQ</a>
				<a href="" class='wechat'>微信</a>
			</div>
			<p class='notes'>登录即代表您已同意<a href="" class=''>京东隐私政策</a></p>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
import LoginPwd from './LoginPwd.vue';
import Cookies from 'js-cookie';


	export default {

                components: { LoginPwd},

                //组件路由守卫，to，到哪里去，from，从哪里来
                beforeRouteEnter(to,from,next){
                        Cookies.set('target',from.path);
                        next();//放行
                },
	}
</script>

<style scoped>
	.page-warpper{
		width:100%;
		height:100%;
		display:flex;
		flex-direction: column;

	}
	.header{
		height:44px;
		padding:0 20px;
		/* display:flex; */
		align-items: center;
		position:relative;
	}
	.header>.back{
		width:24px;
		height:24px;
		position:absolute;
		top:50%;
		left:20px;
		transform: translateY(-50%);
		background:url(img/back.png);
		background-size: 100%;
	}
	.header>.header-title{
		position:absolute;
		top:50%;
		left:50%;
		transform: translate(-50%,-50%);

	}
	.content{
		flex-grow:1;
		padding:0 20px;
	}


	.content>.vr-ligon{
		margin-top:20px;
	}
	.content>.vr-ligon>span{
		font-size:14px;
		color:rgba(0,0,0,.4);
	}
	.content>.vr-ligon>span.verification{
		float:left;
	}
	.content>.vr-ligon>span.registration{
		float:right;
	}
	.content>.other-signin{
		margin-top:80px;
		border-top:1px solid rgba(0,0,0,.1);
		font-size:12px;
		text-align:center;
	}
	.content>.other-signin>p{
		width:140px;
		text-align:center;
		margin:-9px auto 0;
		background-color: #fff;
	}
	.content>.other-signin>a{
		display:inline-block;
		width:48px;
		padding-top:53px;
		background-image: url(img/qq.png);
		background-repeat: no-repeat;
		background-size: 100% auto;
		margin:15px 15px;
	}
	.content>.other-signin>a.wechat{
		background-image: url(img/wx.png)
	}
	.content>.notes{
		text-align: center;
		font-size:12px;
		color:rgba(0,0,0,.2);
	}
	.content>.notes>a{
		color: #4a90e2;
	}
</style>