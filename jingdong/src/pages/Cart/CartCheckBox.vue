<template>
		<i class="checkbox" :class="{checked:checked}" @click="$emit('toggle')"></i>
</template>

<script type="text/ecmascript-6">

	export default {
		props:['checked'],
	}
</script>

<style scoped>
	i.checkbox.checked {
		background-position: 0 -28px;

	}

	i.checkbox {
		width: 20px;
		height: 20px;
		display: inline-block;
		background-image: url(imgs/gn.png);
		background-size: 116px 110px;
		background-position: -80px -40px;

	}
</style>
