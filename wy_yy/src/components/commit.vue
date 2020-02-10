<template>
	<div class="box" v-show="show">
		<div class="text" >{{text}}</div>
		<div class="button_box">
			<button class="qx" @click="noClick">取消</button>
			<button class="qr" @click="yesClick">确认</button>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
        export default {

		data(){
		        return {
				show:false,
			        data:null,
		        }
		},
	        methods:{
                        confirm(){
				this.show=true;
				return new Promise((resolve,reject)=>{
					this.data={resolve,reject};
				})
                        },
                        noClick(){
				this.show=false;
				this.data.reject();

                        },
		        yesClick(){
                                this.show=false;
                                this.data.resolve();
		        }
	        },
        };
</script>

<style scoped>
.box{
	width:50%;
	height:10rem;
	position:fixed;
	left:50%;
	top:50%;
	margin-top:-5rem;
	margin-left:-25%;

}
</style>