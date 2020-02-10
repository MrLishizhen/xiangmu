<template>
	<div class="f-box">
		<h3>不好意思!走丢了呢？</h3>
		<button class="back" @click="$router.push('/home')">回到首页</button>
	</div>

</template>

<script type="text/ecmascript-6">
        export default {};
</script>

<style scoped>
.f-box{
	width:100%;
	height:100%;
	display:flex;
justify-content: center;
	flex-direction: column;

}
	.f-box>h3{
		text-align: center;
		color:#000;
		padding-top:1.5rem;
	}
	.back{
		color:red;
		width:30%;
		margin:1rem auto;
		border:1px solid red;
	}
</style>