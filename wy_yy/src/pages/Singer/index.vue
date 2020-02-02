<template>
	<div class="singer_page">
		<Nav></Nav>
		<div class="tishi">工程师正在抓紧制作中，请浏览别的界面</div>
	</div>
</template>

<script type="text/ecmascript-6">
        import Nav from '../../components/Nav.vue';
        export default {
                components:{Nav}
        };
</script>

<style scoped>
	.singer_page{
		height:100%;
		width:100%;
	}
.tishi{
	text-align: center;
	line-height:4.5rem;
	font-size:1.3rem;

	color:#ccc;
}
</style>