<template>
	<div class="sousuo_page">
		<div class="search_box">
			<i class="iconfont ">&#xe646;</i>
			<input type="text" placeholder="歌名、歌词、歌手、专辑" v-model="input">
			<button class="search" @click="$router.go(-1)" v-show="input==''">取消</button>
			<button class="search" v-show="input!==''" @click="search">搜索</button>
		</div>

		<div class="hot_search" v-show="search_.length===0">
			<h3>热门搜索</h3>
			<div class="hot_search_box">
				<div v-for="(item,i) in hot_Search" v-text="item.first" class="hot_search_item"></div>
			</div>
		</div>
		<div class="search_item_box" v-show="search_.length>0">
			<div class="search-item" v-for="item in search_" :key="item.id" @click="$router.push(`/play/${item.id}`)">
				<div class="search_item_name">
					<span  v-text="item.name" class="search_name ellipsis"></span>
					<span v-text="searchPalyName(item.artists)" class="span_play_name ellipsis"></span>
				</div>
				<div class="search_item_play">
					<i class="iconfont search_item_play_button">&#xe628;</i>
				</div>
			</div>
			<div class="search_tuichu" @click="$router.back()">退出搜索</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import cookie from 'js-cookie';
        export default {
                name: "search",
                data(){
                        return {
                                input: '',//搜索的内容
                                hot_Search: [],//热搜列表
	                        search_:[],
                        }
                },
	        computed:{

	        }
	        ,
                methods: {
                        search(){
                                if(this.input !== ''){
                                        this.$http({url: `/search?keywords=${this.input}&limit=10`}).then(result =>{

                                                this.search_=result.result.songs;
                                        })
                                }
                        },
                        searchPalyName(item){
                                let gs=[];
                                item.forEach(items=>{
					gs.push(items.name);
                                });
				return gs.join('/');
                        }
                },
                created(){
                        cookie.remove('gId');
                        this.$http({url: '/search/hot'}).then(result =>{

                                this.hot_Search = result.result.hots;
                        })
                },
        };
</script>

<style scoped>


	/*搜索之后的内容*/
	.search_item_box{
		flex-grow: 1;
		padding:1.5rem;
	}
	.search_tuichu{
		width:80%;
		height:4rem;
		margin:1rem auto 0;
		border:1px solid #333;
		font-size:14px;
		text-align:center;
		line-height:4rem;
	}
	.search-item{
		height:5rem;
		font-size:1.4rem;
		color:#999;
		line-height:5rem;
		display:flex;
	}
	.sousuo_page {
		width:100%;
		height:auto;
		padding-top: 1rem;
	}
	.search_item_play{
		width:5rem;
		flex-shrink: 0;
	}
	.search_item_name{
		flex-grow: 1;
		display:flex;
		justify-content: space-around;
	}
	.search_item_play_button{
		float:right;
		width:3rem;
	}
	.span_play_name{
		width:7rem;
		text-align:right;
		font-size:1.2rem;
		margin-left:0.5rem;
	}
	.search_name{
		width:10rem;
		font-size:1.3rem;
		flex-grow: 1;
	}
	/*热搜模块*/
	.hot_search_box>.hot_search_item{
		font-size:1.2rem;
		margin:0.5rem;
		color:#e15c52;
	}
	.hot_search_box{
		display:flex;
		flex-wrap: wrap;
	}
	.hot_search > h3 {
		font-size:1.4rem;
		color: rgba(0,0,0,.6);
	}

	.hot_search {
		padding-top:1rem;
		width: 90%;
		margin: 0 auto;
		padding-left: 0.5rem;
	}

	/*搜索模块*/
	.search_box {
		flex-shrink: 0;
		width: 90%;
		margin: 0 auto;
		height: 3rem;
		display: flex;
		border: 1px solid #ccc;
		border-radius: 1.5rem;

	}

	.search_box > i {
		width: 3rem;
		height: 3rem;
		font-size: 2rem;
		text-align: center;
		line-height: 3rem;
		flex-shrink: 0;
		margin-left: 0.5rem;
	}

	.search_box > button {
		width: 5rem;
		flex-shrink: 0;
		border-left: 1px solid #ccc;
	}

	.search_box > input {
		flex-grow: 1;
		border: 0;
		outline: 0;

	}
</style>