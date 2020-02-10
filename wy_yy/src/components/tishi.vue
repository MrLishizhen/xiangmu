<template>
	<div class="tishi_box" :class="isShow?'show':'hide'">{{ title }}</div>
</template>

<script type="text/ecmascript-6">
        export default {};
</script>

<style scoped>
	.tishi_box{
		position: fixed;
		left: 50%;
		bottom:50%;
		background: rgba(0,0,0,0.5);
		padding:0 2rem;
		border-radius: 0.5rem;
		line-height:2rem;
		transform: translate(-55%,-50%);
		color:#fff;
		font-size:16px;
	}
	.hide{
		animation: animate_out 0.35s;
	}
	.show{
		animation:animate_in 0.35s;
	}
	@keyframes animate_in {
		0% {
			opacity: 0;
		}
		100%{
			opacity: 1;
		}
	}
	@keyframes animate_out {
		0% {
			opacity: 1;
		}
		100%{
			opacity: 0;
		}
	}
</style>