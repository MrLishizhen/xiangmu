<template>
	<ul class="list-main">
		<li  v-for="item in list" :key="item.i"  :class="{active:item.id === activeId}" @click="$emit('toggle',item.id)">
			<span v-text="item.name"> </span>
		</li>
	</ul>
</template>


<script type="text/ecmascript-6">

	export default {
	        props:['list','activeId']
	}

</script>

<style scoped>
	ul.list-main {

	}
	ul.list-main>li{
		height:50px;
		display:flex;
		justify-content: center;
		align-items: center;
	}
	ul.list-main>li>span{
		font-size:13px;
		color:#666;
		width:76px;
		height:24px;
		border-radius: 12px;
		text-align:center;
		line-height:24px;

	}
	ul.list-main>li.active>span{
		background-color: rgb(241,83,65);
		color:#fff;
	}

</style>