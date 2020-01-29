<template>

	<div class="Nav-page">
		<div class="nav-tu">
			<router-link to="/home">
				<img src="../assets/home.jpg" alt="">
			</router-link>
		</div>
		<div class="nav">
			<router-link to="/classify">分类</router-link>
			<router-link to="/singer">歌手</router-link>
			<router-link to="/sousuo">搜索</router-link>
			<router-link to="/list">榜单</router-link>
			<router-link to="/my">我的</router-link>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
        export default {};
</script>

<style scoped>
	.Nav-page{
		box-shadow: 0 0.3rem 0.5rem #eee;
		width:100%;
		height:4.5rem;
		display:flex;
		flex-shrink: 0;

	}
	div.nav-tu{
		width:4.5rem;
		height:100%;
		flex-shrink: 0;
	}
	div.nav-tu>a{
		width:100%;
		height:100%;
		display:block;
	}
	div.nav-tu>a>img{
		width:100%;
	}
	div.nav{
		flex-grow: 1;
		height:100%;
		display:flex;
		justify-content: flex-end;
	}
	div.nav>a{
		line-height:4.5rem;
		color:#999;
		font-size: 1.4rem;
		margin-left:2.0rem;
		box-sizing: border-box;
	}
	div.nav>a:last-child{
		margin-right:1.0rem;
	}
	div.nav>a.router-link-active{
		color:#dd001b;
		border-bottom:0.2rem solid #dd001b;
	}
</style>