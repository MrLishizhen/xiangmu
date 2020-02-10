<template>
	<div class="set_page">
		<button class="setUp_bun" @click="tuichu">退出登录</button>
	</div>
</template>

<script type="text/ecmascript-6">
	import cookie from 'js-cookie';
        export default {
                methods:{
                        tuichu(){
                                this.$http({url: '/logout'}).then(result =>{
                                        if(result.code == 200){
                                                this.data = null;
                                                this.isShow = false;
                                                cookie.remove('uid');
                                                this.$router.replace('/my');
                                        }
                                });
                        }
                }
        };
</script>

<style scoped>
.set_page{
	width:100%;
	height:100%;
	padding-top:1rem;
	box-sizing: border-box;
}
	.setUp_bun{
		width:50%;
		border:1px solid red;
		display:block;
		/*margin:0 auto;*/
		padding:0.8rem 1rem;
		border-radius: 0.5rem;
		color:red;
		position:fixed;
		bottom:1rem;
		left:50%;
		margin-left:-25%;
	}

</style>