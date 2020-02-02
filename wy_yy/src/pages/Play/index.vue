<template>
	<div class="play-page">
		<div class="play-top">
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
				<div class="picUrl-box">
					<div class="url">
						<img :src="picUrl" alt="" @click="play">
					</div>
				</div>
			</div>
		</div>
		<div class="audio">
			<div class="audio_box">
				<div class="audio_top">
					<span class="iconfont gz" @click="xh_gedan" :class="{red:redShow}">&#xe61d;</span>
					<span class="iconfont xz">&#xe624;</span>
				</div>
				<div class="audio_cent">
					<audio class='audio' ref="audio" :src="url" autoplay ></audio>

					<div class="music-box">
						<span class="start" v-text="minDate"></span>
						<div class="load_box">
							<div class="music-bar musics"></div>
							<div class="music-play musics"></div>
							<div class="music musics"></div>
							<div class="music-play-circular" ref="play_circular"></div>
						</div>
						<span class="end" v-text="maxDate"></span>
					</div>
				</div>
				<div class="audio_bottom">
					<div class="iconfont broadcast-mode" v-html="`${iconMode}`"
					     @click="iconFunt"></div>
					<div class="iconfont last-song" @click="last">&#xe60b;</div>
					<div class="iconfont play" ref="start" >&#xe600;</div>
					<div class="iconfont next-song" @click="next">&#xe60b;</div>
					<div class="iconfont song-sheet" @click="show=!show">&#xe636;</div>
				</div>
			</div>
		</div>
		<div class="gedanShow" v-show="show" @click.self="show=!show">
			<div class="gedan">
				<div class="list">
					<h3>播放列表</h3>
				</div>
				<div class="list_item">
					<div class="gedan_item" v-for="item in data_gedan" :key="item.id"
					     @click="music(item.id)">
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
                data(){
                        return {
                                like_data:[],//保存的是用户喜欢的音乐列表
                                data_gedan: [],//保存歌曲列表
                                show: false,//歌单的显示
                                ar: [],//歌唱者名字
                                alia: '',//
                                data: [],//保存歌曲数据
                                name: '',//歌曲的名字
                                maxDate: 0,
                                minDate: '00:00',
                                start: '&#xe600;',
                                url: '',//歌曲的url
                                picUrl: '',//图片
                                id: '',//当前歌曲的id
                                mode: '0',//0表示随机，1表示循环
                                iconMode: '&#xe77d;',
	                        biaoshi:false,
	                        redShow:false,//判断是不是添加了喜欢
                        }
                },
	        watch:{
                        'id'(newValue,oldValue){
                                this.redShow=false;
                                      if(newValue&&cookie.get('MUSIC_U')){
	                                      this.like_data.forEach(item=>{
                                                      if(item==newValue){
                                                              //如果当前的歌曲id在用户喜欢的歌单中能找到，则把标识符变为true
                                                              this.redShow=true;
                                                      }
                                              });

                                      }
                        },
	        }
	        ,
                mounted(){
                        let th = this;
                        let audio = this.$refs.audio;
                        let date = 0;
                        let start = this.$refs.start;
			//判断是不是刷新了界面
                        if(sessionStorage.getItem("isReload")){
                                this.$refs.start.innerHTML = '&#xe618;';
                                this.start = '&#xe618;';

                        }else{
                                sessionStorage.setItem("isReload", true);

                        }
                        audio.addEventListener('canplay', function(){
                                date = audio.duration;
                                th.maxDate = th.dateConversion(audio.duration);
                        }, false);

                        start.addEventListener('click', () =>{
                                if(this.start == '&#xe618;'){
                                        this.$refs.start.innerHTML = "&#xe600;";
                                        this.start = '&#xe600;';
                                        audio.play();
                                }else{
                                        this.$refs.start.innerHTML = '&#xe618;';
                                        this.start = '&#xe618;';
                                        audio.pause();
                                }
                        }, false)


                },
                created(){

	                if(cookie.get('MUSIC_U')){
	                        this.$http({url:`/likelist?uid=${cookie.get('uid')}`}).then(result=>{
	                                this.like_data=result.ids;//拿到用户的喜欢歌单的列表
	                        })
	                }
                        //请求歌曲详情
                        this.$http({url: `/song/detail?ids=${this.$route.params.gid}`}).then(result =>{
                                this.data = result.songs;
                                this.id = this.$route.params.gid;
                                this._fuzhi();

                        });
                        //请求歌曲的url
                        this.$http({url: `/song/url?id=${this.$route.params.gid}`}).then(result =>{

                                this.url = result.data[0].url;//获取歌曲的url
                        });
                        //这里少了一个if 在cookie中存一个歌单的id 通过id找歌单详情，如果没有 就说明不是从歌单来的 就不用找歌单了
                        if(cookie.get('gId')){
                                this.$http({url: `/playlist/detail?id=${cookie.get('gId')}`}).then(result =>{

                                        this.data_gedan = result.playlist.tracks;

                                });
                        }else{
                                //表示只有当前是直接从歌曲进来的  就不需要请求歌单，直接只显示当前的歌曲就可以了
                                this.data_gedan.push(this.data[0]);
                        }


                }
                ,
                methods: {
                        xh_gedan(){
				if(cookie.get('MUSIC_U')){
					if(!this.redShow){
                                                this.$http({url:`/like?id=${this.id}`}).then(result=>{
                                                        if(result.code==200){
                                                                console.log('添加成功');
                                                                this.redShow=true;
                                                        }
                                                })
					}else{
                                                this.$http({url:`/like?id=${this.id}&like=false`}).then(result=>{
                                                        if(result.code==200){
                                                                console.log('取消成功');
                                                                this.redShow=false;
                                                        }
                                                })
					}
				}else{
				        console.log('您还未登录！');
				        this.$router.push('/login');
				}
                        },
                        _fuzhi(){
                                this.name = this.data[0].name;
                                this.picUrl = this.data[0].al.picUrl;
                                this.alia = this.data[0].alia[0];
                                let arr = [];
                                this.data[0].ar.forEach(item =>{
                                        arr.push(item.name);
                                });
                                this.ar = arr.join('/');
                        },
                        //生成0-随机的随机数
                        _random(max){
                                let i = Math.random() * (max + 1);
                                return Math.floor(i);
                        },
	                //上一曲
	                last(){
				if(this.mode==0){
                                        let arr = JSON.parse(sessionStorage.getItem('_play'));
                                        let id  = arr[arr.length-1];
                                        if(arr.length!=0){
                                                //请求歌曲详情
                                                this.$http({url: `/song/detail?ids=${id}`}).then(result =>{
                                                        this.data = result.songs;
                                                        this.id = id;
                                                        this._fuzhi();

                                                });
                                                //请求歌曲的url
                                                this.$http({url: `/song/url?id=${id}`}).then(result =>{
                                                        this.url = result.data[0].url;//获取歌曲的url
                                                });

                                                //删除arr的最后一个元素
                                                arr.pop();
                                                sessionStorage.setItem('_play',JSON.stringify(arr));
                                        }else{
                                                console.log('这是你最开始听得一首歌呦!');
                                        }
				}else if(this.mode==1){
				        //这是循环模式
                                        let i = this.data_gedan.findIndex((item,i)=>{
                                                return item.id==this.id;
                                        });
                                        if(i==0){
                                                i=this.data_gedan.length-1;
                                        }else{
                                                i=i-1;
                                        }
                                        //请求歌曲详情
                                        this.$http({url: `/song/detail?ids=${this.data_gedan[i].id}`}).then(result =>{
                                                this.data = result.songs;
                                                this.id = this.data[0].id;
                                                this._fuzhi();

                                        });
                                        //请求歌曲的url
                                        this.$http({url: `/song/url?id=${this.data_gedan[i].id}`}).then(result =>{
                                                this.url = result.data[0].url;//获取歌曲的url
                                        });
				}
	                },
                        next(){
                                if(this.mode==0){
                                        if(sessionStorage.getItem('_play')){
                                                let arr = JSON.parse(sessionStorage.getItem('_play'));
                                                arr.push(this.id);
                                                sessionStorage.setItem('_play',JSON.stringify(arr));

                                        }else{
                                                let arr=[];
                                                arr.push(this.id);
                                                sessionStorage.setItem('_play',JSON.stringify(arr));
                                        }

                                        let length = this.data_gedan.length - 1;
                                        let i = this._random(length);
                                        this.data = [];
                                        this.data.push(this.data_gedan[i]);
                                        this._fuzhi();//调用赋值
                                        this.id = this.data[0].id;
                                        this.$http({url: `/song/url?id=${this.id}`}).then(result =>{
                                                this.url = result.data[0].url;//获取歌曲的url
                                                this.$refs.start.innerHTML = "&#xe600;";
                                                this.start = '&#xe600;';
                                        });
                                }else if(this.mode==1){
                                        //表示这是循环结构

                                        let i = this.data_gedan.findIndex((item,i)=>{
					        return item.id==this.id;
					});
                                        if(i==(this.data_gedan.length-1)){
                                                i=0;
                                        }else{
                                                i=i+1;
                                        }
                                        //请求歌曲详情
                                        this.$http({url: `/song/detail?ids=${this.data_gedan[i].id}`}).then(result =>{
                                                this.data = result.songs;
                                                this.id = this.data[0].id;
                                                this._fuzhi();

                                        });
                                        //请求歌曲的url
                                        this.$http({url: `/song/url?id=${this.data_gedan[i].id}`}).then(result =>{
                                                this.url = result.data[0].url;//获取歌曲的url
                                        });
                                }
                        }
                        ,
                        music(id){

                                this.id=id;
                                this.$http({url: `/song/url?id=${id}`}).then(result =>{
                                        if(result.data[0].url==null){
                                                console.log('抱歉这首歌还没有获取到版权');
                                        }else{
                                                this.url = result.data[0].url;

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
                        }
	                ,
                        //点击时改变播放方式
                        iconFunt(){
                                if(this.mode == 0){
                                        this.mode = 1;
                                        this.iconMode = '&#xe61e;';
                                }else{
                                        this.mode = 0;
                                        this.iconMode = '&#xe77d;';
                                }
                        },
                        //点击图片显示歌词
                        play(){

                        },
                        //计算总时间
                        dateConversion(item){
                                let i = 0, s = parseInt(item);
                                if(s > 60){
                                        i = parseInt(s / 60);
                                        s = parseInt(s % 60);
                                        if(i > 60){
                                                h = parseInt(i / 60);
                                                i = parseInt(i % 60);
                                        }
                                }
                                // 补零
                                let zero = function(v){
                                        return (v >> 0) < 10?"0" + v:v;
                                };
                                return [zero(i), zero(s)].join(":");
                        }
                }
        };
</script>

<style scoped>
	.red{
		color:#dd4c4c !important;
	}
	@keyframes myfirst {
		from {
			transform: rotate(0deg)
		}
		to {
			transform: rotate(360deg);
		}
	}

	.url > img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.url {
		width: 15rem;
		height: 15rem;
		animation: myfirst 20s linear infinite;

	}

	.picUrl-box {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 20rem;
		border-radius: 50%;
		height: 20rem;
		background-color: rgba(0, 0, 0, .5);
	}

	.content {
		flex-grow: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.list > h3 {
		font-weight: 600;
	}

	.list {
		flex-shrink: 0;
		height: 4rem;
		line-height: 4rem;
		font-size: 1.4rem;
		color: #666;
		padding-left: 0.5rem;
		/*border-bottom: 1px solid #ccc;*/
	}

	.bf {
		width: 4rem;
		flex-shrink: 0;
		text-align: right;
	}

	.name {
		flex-grow: 1;
	}

	.gedan_item {
		padding: 1rem 1.5rem;
		font-size: 1.4rem;
		color: #333;
		display: flex;
		min-height: 2rem;
	}

	.list_item {
		flex-grow: 1;
		overflow: auto;
	}

	.gedan {
		display: flex;
		flex-direction: column;
		height: 50%;
		background-color: #fff;
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
	}

	.gedanShow {
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .5);
	}

	.next-song {
		transform: rotate(180deg);
	}

	.last-song, .next-song {
		font-size: 2.5rem;
	}

	.broadcast-mode, .song-sheet {
		font-size: 2.0rem;
	}

	.play {
		font-size: 2.8rem;
	}

	.audio_bottom > div {
		color: #fff;
	}

	.audio_bottom {
		padding: 0 1.5rem;
		height: 4rem;
		margin-top: 1.5rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.music-play-circular {
		width: 0.5rem;
		height: 0.5rem;
		background-color: red;
		position: absolute;
		left: 0;
		border-radius: 50%;
	}

	.music-play {
		background-color: #000;
	}

	.music-bar {
		background-color: #5b5757;
	}

	div.music {
		background-color: #b8b6b6;
	}

	.load_box .musics {
		position: absolute;
		width: 98%;
		height: 0.1rem;

	}

	.load_box {
		position: relative;
		flex-grow: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.start, .end {
		width: 3rem;
		height: 100%;
		line-height: 1.5rem;

	}

	.music-box {
		display: flex;
		width: 100%;
		height: 1.5rem;
		background-color: #fff;

	}

	.audio_cent {

		padding-top: 0.5rem;
	}

	.gz {
		margin-left: 1.5rem;
	}

	.gz, .xz {
		margin-right: 2rem;
		color: #fff;
		font-size: 2rem;
	}

	.audio_top {
		height: 2.4rem;
		line-height: 2.4rem;
	}

	.audio_box {
		padding: 1.5rem;

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
		padding: 0.5rem 1rem;
	}

	.play-top {
		flex-grow: 1;
		background-color: rgba(0, 0, 0, .4);
		display: flex;
		flex-direction: column;
	}

	.audio {
		background-color: rgba(0, 0, 0, .4);
		flex-shrink: 0;
	}

	.play-page {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;

	}
</style>