<template>
	<div class="paly_page">
		<div class="header">
			<div class="header_logo"></div>
			<div class="header_cont">
				<div class="header_name">
					<span v-text="name"></span>
					<span v-text="alia" class="alia"></span>
				</div>
				<div class="ar" v-text="ar"></div>
			</div>
			<div class="search"></div>
		</div>
		<div class="content">
			<div class="pic_box">
				<div class="pic">
					<img :src="picUrl" alt="">
				</div>

			</div>


			<div class="audio">
				<div class="function">
					<span class="iconfont xh" :class="{red:xh_isShow}" style="font-size:2.2rem" @click="xh_gedan">&#xe6bb;</span>
					<span class="iconfont">&#xe61c;</span>

				</div>
				<audio :src="src" controls autoplay>
				</audio>
				<span class="gn iconfont" @click="gedan">&#xe7d9;</span>

			</div>
		</div>
		<div class="bc" :style="{backgroundImage:`url(${picUrl})`}"></div>
		<div class="gedan_box" v-show="isShow" @click.self="isShow=!isShow">
			<div class="gedan">
				<div class="list">
					<h3>播放列表</h3>
				</div>
				<div class="list_item">
					<div class="gedan_item" v-for="item in data_gedan" :key="item.id" @click="music(item.id)">
						<div v-text="item.name" class="name"></div>
						<div class="iconfont bf">&#xe628;</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
        import cookie from 'js-cookie';

        export default {
                name: "paly",
                data(){
                        return {
                                xh_data:null,//用户喜欢的音乐
                                isShow:false,
                                id: '',
                                data_gedan: [],
                                name: '',//歌名
                                data: [],//保存歌曲数据
                                ar: [],//歌唱者名字
                                alia: '',
                                picUrl: '',//图片
                                src: '',
	                        xh_isShow:false,
                        }
                },
	        watch:{
			'id'(newValue,oldValue){
			        this.xh_isShow=false;
				if(newValue&&cookie.get('MUSIC_U')){
                                        this.xh_data.forEach(item=>{
                                                if(item.id==newValue){
                                                        //如果当前的歌曲id在用户喜欢的歌单中能找到，则把标识符变为true
                                                        this.xh_isShow=true;
                                                }
                                        })
				}
			},
	        },
                methods: {
                        xh_gedan(){
                                //如果用户已经登录则通过上面保存的标识符来判断用户是否已经添加了这首歌到喜欢的音乐，
                                if(cookie.get('MUSIC_U')){
					if(this.xh_isShow){
                                                this.$http({url:`/playlist/tracks?op=del&pid=${cookie.get('xh_id')}&tracks=${this.id}`}).then(result=>{
                                                        console.log('取消添加');//取消用户添加到喜欢的歌曲
	                                                let x = this.xh_data.findIndex(item=>{//找出你要删除的元素下标
	                                                        return item.id==this.id;
	                                                });
	                                                this.xh_data.splice(x,1);
	                                                this.xh_isShow=false;

                                                })
					}else{
                                                this.$http({url:`/playlist/tracks?op=add&pid=${cookie.get('xh_id')}&tracks=${this.id}`}).then(result=>{
                                                        console.log('添加成功');//添加到我的喜欢中
	                                                this.xh_data.push({id:this.id});
	                                                this.xh_isShow=true;
                                                })
					}
                                }else{
                                        console.log('您还未登录?请登录');
					this.$router.push('/login');
                                }
                        },
                        music(id){

				this.id=id;
                                this.$http({url: `/song/url?id=${id}`}).then(result =>{
					if(result.data[0].url==null){
						console.log('抱歉这首歌还没有获取到版权');
					}else{
                                                this.src = result.data[0].url;

					}

                                });
	                        let arrMusic=this.data_gedan.find(item=>{
	                                return item.id===id;
	                        });
                                this.name = arrMusic.name;
                                this.picUrl =arrMusic.al.picUrl;
                                this.alia = arrMusic.alia[0];
                                let arr = [];
                                arrMusic.ar.forEach(item =>{
                                        arr.push(item.name);
                                });
                                this.ar = arr.join('/');
                        },
                        gedan(){
                                this.isShow=true;

                                this.$http({url: `/playlist/detail?id=${cookie.get('gId')}`}).then(result =>{
                                        this.data_gedan = result.playlist.tracks;//请求歌单

                                })

                        },
                },
                created(){
                        //判断是不是登录了
                        if(cookie.get('MUSIC_U')){
                                this.$http({url:`/playlist/detail?id=${cookie.get('xh_id')}`}).then(result=>{
					this.xh_data=result.playlist.trackIds;
                                });
                        };
                        this.$http({url: `/song/detail?ids=${this.$route.params.gid}`}).then(result =>{
                                this.data = result.songs;
                                this.name = this.data[0].name;
                                this.picUrl = this.data[0].al.picUrl;
                                this.alia = this.data[0].alia[0];
                                this.id=this.$route.params.gid;
                                let arr = [];
                                this.data[0].ar.forEach(item =>{
                                        arr.push(item.name);
                                });
                                this.ar = arr.join('/');
                        });
                        this.$http({url: `/song/url?id=${this.$route.params.gid}`}).then(result =>{
                                this.src = result.data[0].url;
                        })
                }

        };
</script>

<style scoped>
	.red{
		color:red;
	}
	.list_item{
		flex-grow: 1;
		overflow:auto;
	}
	.list>h3{
		font-weight: 600;
	}
	.list{
		flex-shrink: 0;
		height:4rem;
		line-height:4rem;
		font-size:1.4rem;
		color:#666;
		padding-left:0.5rem;
		/*border-bottom: 1px solid #ccc;*/
	}
	.name{
		flex-grow: 1;
	}
	.bf{
		width:4rem;
		flex-shrink: 0;
		text-align: right;
	}
	.gedan_item{
		padding:1rem 1.5rem;
		font-size:1.4rem;
		color:#333;
		display:flex;
		min-height:2rem;
	}
	.gedan{
		display:flex;
		flex-direction: column;
		height:50%;
		background-color: #fff;
		position:absolute;
		bottom:0;
		left:0;
		width:100%;
	}
	.gedan_box{
		position: fixed;
		width:100%;
		height:100%;
		background-color: rgba(0,0,0,.5);
	}
	.function > span {
		width: 4rem;
		height: 4rem;
		text-align: center;
	}

	.function {
		min-height: 4rem;
		line-height: 4rem;
		display: flex;
		justify-content: flex-end;
	}

	.gn {
		width: 2rem;
		height: 2rem;
		position: absolute;
		top: 6.3rem;
		right: 1.5rem;
		background-color: #f1f3f4;

	}

	audio {
		width: 100%;
		height: 6rem;

	}

	.audio {
		height: 5rem;
		background: #f5f5f5;
		flex-grow: 1;
		border-radius: 1rem;
		position: relative;
	}

	.bc::after {
		content: " ";
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		background-color: rgba(0, 0, 0, .5);
	}

	.bc {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: -1;
		background-size: 100% 100%;

	}

	.pic > img {
		width: 100%;
		height: 100%;

	}

	.pic {
		width: 15rem;
		height: 15rem;
		margin: 0 auto;
		border-radius: 50%;
		overflow: hidden;
	}

	.pic_box {
		padding: 10rem 0;
		position: relative;
		flex-shrink: 0;
	}

	.content {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
	}

	.ar {
		margin-top: 0.5rem;
		color: #ccc;
	}

	.alia {
		margin-left: 0.5rem;
		color: #ccc;
	}

	.header_name {
		height: 2rem;
		font-size: 1.4rem;
		color: #fff;

	}

	.header_cont {
		flex-grow: 1;
		height: 100%;
		text-align: center;
	}

	.search {
		width: 4rem;
		height: 4rem;
	}

	.header_logo {
		width: 2.5rem;
		height: 2.5rem;
		background: url(./circle_logo.png) no-repeat center/100%;
	}

	.header {
		height: 4rem;
		display: flex;
		align-items: center;
		flex-shrink: 0;

		padding:0.5rem 1rem;
	}

	.paly_page {
		/*padding: 1rem;*/
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		/*background-color: #f9f7f1;*/
		position: relative;
	}
</style>