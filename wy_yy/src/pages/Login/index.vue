<template>
	<div class="login_page">
		<div class="login_header">
			<span class="back" @click="$router.back()">返回</span>
			<h3>登录</h3>
			<span class="zc" @click="$router.push('/register')">注册</span>
		</div>
		<div class="login_box">
			<div class="login_box_nav">
				<span :class="{red:!isShow}" @click="isShow=!isShow">手机登录</span>
				<span :class="{red:isShow}" @click="isShow=!isShow">邮箱登录</span>

			</div>
			<div class="login">
				<emil v-if="isShow"></emil>
				<pwd v-else></pwd>
			</div>
		</div>
	</div>
</template>
<style scoped>
	.zc {
		width: 4.5rem;
		height: 4.5rem;
		position: absolute;
		right: 0;
		top: 0
	}

	.red {
		color: #ff4545;
		border-bottom: 1px solid #ff4545;
	}

	.login_page {
		width: 100%;
		height: 100%;
	}

	.login_header {
		height: 4.5rem;
		position: relative;
		line-height: 4.5rem;
		text-align: center;
		font-size: 1.4rem;
		border-bottom: 1px solid #f7f7f7;
	}

	.login_header > h3 {

	}

	.back {
		width: 4.5rem;
		height: 4.5rem;
		position: absolute;
		left: 0;
		top: 0
	}

	.login_box_nav {
		height: 4rem;
		line-height: 4rem;
		text-align: center;
	}

	.login_box_nav > span {
		display: inline-block;
		padding: 0 1rem;
		font-size: 1.2rem;
	}

	.login {
		margin-top: 0.5rem;
		display: flex;
		justify-content: center;
	}
</style>
<script type="text/ecmascript-6">
        import emil from './emil.vue';
        import pwd from './pwd';
        import cookie from 'js-cookie';

        export default {
                components: {emil, pwd},
                data(){
                        return {
                                isShow: false,
                        }
                },
                beforeRouteEnter(to, from, next){
                        cookie.set('target',from.path);
                        next();
                }
        };
</script>

