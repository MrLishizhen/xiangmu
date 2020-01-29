<template>
	<div class="list_page">
		<Nav></Nav>
		<div class="list_box">
			<div class="list_box_item_img">
				<img :src="datas.url" alt="" class="avatar">
			</div>
			<div class="list_item_box">
				<div class="list_item" v-for="(item,i) in list" :key="item.id">
					<div class="number" v-text="i+1"></div>
					<div class="list_item_box">
						<div class="music_name">
							<span  v-text="item.name"></span>
							<span v-text="originalSinging(item)" class="originalSinging"></span>
						</div>
						<div class="sing"v-text="sing(item)"></div>
					</div>
					<div class="iconfont list_item_icon">&#xe628;</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import Nav from '../../components/Nav.vue';
        export default {
		components:{Nav},
	        data(){
		        return{
		                list:[],//保存的是云音乐热歌榜
			        data:null,//保存的是完整的返回对象
			        datas:{
		                        url:'',
				        name:'',
			        },//保存的是自己想用的数据
		        }
	        },
	        methods:{
                        originalSinging(item){
                                return `${item.alia.join('')}`;
                        },
                        sing(item){
				let name=item.al.name;//名字后面的词
	                        let arr =[];
				let names = item.ar.forEach(item=>{
				       arr.push(item.name);
				});
	                        return `${arr.join('/')} -${name}`;
                        },
	        },
	        created(){
		        this.$http({url:'/top/list?idx=1'}).then(result=>{
		                console.log(result);
				this.list=result.playlist.tracks;
				this.data=result;
				this.datas.url=result.playlist.coverImgUrl;
				this.datas.name=result.playlist.name;
		        });



	        },
        };
</script>

<style scoped>
	.list_page{
		width:100%;
		height:100%;
		display: flex;
		flex-direction: column;
	}
	.list_box{
		padding:1rem;
		flex-grow: 1;
		overflow: auto;
	}
	.list_item{
		display:flex;
		min-height: 5.5rem;
		align-items: center;
	}
	.list_item_icon{
		width:2.0rem;
		flex-shrink: 0;
	}
	.number{
		width:2rem;
		flex-shrink: 0;
	}
	.list_item_box{
		flex-grow: 1;
	}
	.music_name{
		font-size:1.7rem;
	}
	.avatar{
		width:100%;
		height: 20rem;
	}
	.originalSinging{
		font-size:1.2rem;
		color:#999;
		margin-left:1.0rem;
	}
	.sing{
		font-size:1.0rem;
		color:#888;
		margin-top:0.5rem;
	}
</style>