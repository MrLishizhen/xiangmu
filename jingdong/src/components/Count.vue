
<template>
	<div class="jd-count">
		<span class="decrease" @click="decrease">-</span>
		<span class="count" v-text="count"></span>
		<span class="increase" @click="increase">+</span>
	</div>
</template>


<script type="text/ecmascript-6">
        export default{
                props:['count'],
                methods:{//组件的方法
                        increase(){
                                if(this.count<5)this.$emit('increase');
                        },
                        decrease(){
                                if(this.count>1)this.$emit('decrease');
                        }
                },
        }
</script>

<style scoped>
	.jd-count{ display: flex; width: 78px; }
	.jd-count>span{
		flex-grow: 1;
		height: 20px; line-height: 20px;
		text-align: center; font-weight: bold;
	}
	.jd-count>span.count{ font-size: 12px; background-color: rgba(0,0,0,0.05); }
	.jd-count>span.disabled{ color: rgba(0,0,0,0.1); }
	.jd-count {
		position: absolute;
		right: 15px;
		bottom: 20px;
		font-size: 0;
	}

	.jd-count>span {
		font-size: 14px;
		display: inline-block;
		width: 20px;
		height: 20px;
		background-color: #f7f7f7;
		text-align: center;
	}

	.jd-count>span.count {
		width: 30px;
		background-color: #ccc;
		border-radius: 3px;
	}
</style>
