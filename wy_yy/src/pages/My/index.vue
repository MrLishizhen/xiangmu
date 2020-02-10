<template>
	<div class="my_page">
		<Nav></Nav>
		<div class="my_header">
			<div class="logon_status">
				<div class="login_img">
					<img :src="isShow?data.profile.avatarUrl:url" alt="">
				</div>
				<div class="login_geren">
					<span class="name" v-text="data?data.profile.nickname:''"
					      v-show="data!=null"></span>
					<span class="login_button" @click="$router.push('/login')" v-show="data==null">单击登陆</span>

				</div>
				<span class="tuichu" @click="$router.push('/setUp')" v-if="tuichu_is">设置</span>
			</div>

		</div>

		<div class="my_content">

			<div class="cont_herder">
				<div class="cont_header_item" v-for="(item,i) in nav" v-text="item.name"
				     :class="{red:item.isShow}" @click="gr_fun(item,i)"></div>
			</div>
			<div class="cont_content" v-if="login">
				<!--<songSheet :list="list" class="song"></songSheet>-->
				<!--喜欢的音乐-->
				<div class="song_sheet_box" v-if="i==0">
					<div class="song_sheet_item" v-for="item in gedan_data" @click="$router.push(`/details/${item.id}`)">
						<div class="img">
							<img :src="item.coverImgUrl" alt="">
						</div>
						<div class="song_sheet_item_cent">
							<span v-text="item.name" class="name"></span>
							<span v-text="item.description" class="ellipsis2 box"></span>
						</div>
					</div>
							

				</div>
				<!--喜欢的歌曲-->
				<div class="gequ_box" v-if="i==3">
					<div class="gequ_item" v-for="(item,i) in xh_gequ" :key="item.id" @click="$router.push(`/play/${item.id}`)">
						<div class="gequ_item_left">
							<span v-text="item.name" class="itemName"></span>
							<span v-text="ar(item)" class="gequ_ar"></span>
						</div>
						<div class="gequ_item_right item_red iconfont" @click="quXiao(item,i)">&#xe61d;</div>
					</div>
				</div>

				<div class="cw" v-show="cw">
					<div class="">抱歉您还没有添加这个模块的数据</div>
				</div>
			</div>
			<div class="no_login" v-else>
				亲还没有登录呦，登录之后能看到您的个人收藏哦！！
			</div>
		</div>


	</div>
</template>
<script type="text/ecmascript-6">
        import Nav from '../../components/Nav.vue';
        import songSheet from './songSheet.vue';
        import cookie from 'js-cookie';

        export default {
                components: {Nav, songSheet},
                data(){
                        return {
                                list: null,//保存的是歌单的数据
                                login: false,
                                url: require('./login.jpeg'),
                                data: null,
                                gedan_data: null,
                                isShow: false,
                                tuichu_is: false,
	                        xh_gequ:[],
	                        i:0,//
                                nav: [
                                        {name: '歌单', isShow: true},
                                        {name: '专辑', isShow: false},
                                        {name: '歌手', isShow: false},
                                        {name: '歌曲', isShow: false}
                                ],
	                        cw:false,
                        }
                },

                watch: {
                        list(newValue, oldValue){
                                this.gedan_data = newValue.playlist;
                        }
                },
                methods: {
                        quXiao(item,i){
				this.$http({url:`/like?id=${item.id}&like=false`}).then(result=>{
				        if(result.code==200){
				                this.xh_gequ.splice(i,1);
				                this.$tiShi('移除成功');
				        }
				})
                        },
                        ar(item){
                                let arr=[];
                                item.ar.forEach(item=>{
                                        arr.push(item.name);
                                });
				return arr.join('/');
                        },
                        gr_fun(item,i=0){
                                this.nav.forEach(item =>{
                                        item.isShow = false;
                                });
                                item.isShow = true;
                                switch(i){
	                                case 0:
	                                        this.i=0;
                                                this.cw=false;
	                                        return;
	                                case 3:
	                                        this.i=3;
                                                this.cw=false;
	                                        this.$http({url:`/playlist/detail?id=${cookie.get('xh_id')}`}).then(result=>{
	                                                console.log(result);
	                                                this.xh_gequ=result.playlist.tracks;

	                                        });
		                                return ;

                                        default:
                                                this.i=4;
	                                        this.cw=true;

                                }

                        }
                },
                created(){
                        if(cookie.get('uid')){
                                this.login = true;
                                let uid = cookie.get('uid');
                                this.$http({url: `/user/detail?uid=${uid}`}).then(result =>{
                                        this.data = result;
                                        this.isShow = true;
                                        this.tuichu_is = true;
                                });
                                this.$http({url: `/user/playlist?uid=${uid}`}).then(result =>{//获取用户的歌单
                                        this.list = result;
                                        cookie.set('xh_id', this.list.playlist[0].id);
                                });
                                this.$http({url: `/user/detail?uid=${uid}`}).then(result =>{//获取用户的歌单
                                        console.log(result);
                                })
                        }
                },
        };
</script>
<style scoped>
	.cw{
		width:100%;
		height:100%;
		display:flex;
		justify-content: center;
		align-items: center;
	}
	.item_red{
		color:red;
	}
	.itemName{
		height:3rem;
		font-size:1.3rem;
		line-height:3rem;

	}
	.gequ_ar{
		height:2rem;
		line-height:2rem;
		color:#e0e0e0;
	}
	.gequ_item_right{
		width:5rem;
		flex-shrink: 0;
		line-height: 5rem;
		text-align: center;
	}
	.gequ_item_left{
		padding-left:0.5rem;
		flex-grow: 1;
		overflow:auto;
		display:flex;
		flex-direction: column;
	}
	.gequ_item{
		height:5.0rem;
		display:flex;
		box-shadow: 0rem 0.1rem 0.3rem #e0e0e0;
		margin:0.5rem 0;

	}
	.gequ_box{
		padding:1.0rem;
	}
	.song_sheet_page {
		width: 100%;
		height: 100%;

	}

	.song_sheet_box {
		padding: 0.5rem;

	}

	.song_sheet_item {
		box-shadow: 0 0.2rem 0.3rem #cecece;
		height: 7.0rem;
		padding: 1.5rem 1rem;
		display: flex;
		align-items: center;
	}

	.img {
		height: 5.0rem;
		width: 5.0rem;
		flex-shrink: 0;
	}

	.img > img {
		height: 100%;
	}

	.song_sheet_item_cent {
		flex-grow: 1;
		padding: 1.5rem 1rem;
		height: 100%;
	}

	.name {
		font-size: 1.2rem;

		padding-left: 1.5rem;
	}

	.box {
		padding-left: 1.5rem;
		margin-top: 0.5rem;
		color: #ccc;
	}

	.song {
		width: 100%;
		height: 100%;

	}

	.cont {
		height: 100%;
		overflow: auto;
	}

	.login_button {
		/*登录按钮*/
		border: 1px solid #fff;
		border-radius: 0.5rem;
		padding: 0.8rem 1rem;
		font-size: 1.3rem;
		font-weight: 500;
		color: #fff;
	}

	.red {
		color: red;
		border-bottom: 1px solid red;
	}

	.tuichu {
		padding: 0.5rem 1rem;
		border: 1px solid #ccc;
		border-radius: 0.5rem;
		font-size: 1.2rem;
		font-weight: 400;
		position: absolute;
		right: 0.5rem;
		top: 0.5rem;

	}

	.my_page {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.my_header {
		height: 12rem;
		flex-shrink: 0;
		margin-top: 1.0rem;

	}

	.logon_status {
		height: 100%;
		width: 90%;
		margin: 0 auto;
		position: relative;
		/*background-color: #81b2ff;*/
		background: #ccc;
		border-radius: 0.5rem;
	}

	.login_img {
		width: 6rem;
		border-radius: 50%;
		height: 6rem;
		position: absolute;
		left: 1.5rem;
		top: 2rem;
		overflow: hidden;
	}

	.login_img > img {
		width: 100%;
		height: 100%;

	}

	.login_geren {
		height: 6rem;
		width: 50%;
		position: absolute;
		top: 30%;
		margin-top: -1.5rem;
		right: 6rem;
		font-size: 1.4rem;
		font-weight: 600;

		text-align: right;
		line-height: 6rem;
	}

	.my_content {
		width: 100%;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		overflow: hidden;

	}

	.content {
		background-color: #fff;
		box-shadow: 0rem 0.5rem 1rem #ccc;
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		width: 90%;
		margin: 1.0rem auto;
		border-radius: 0.5rem;
		overflow: hidden;
	}

	.cont_herder {
		min-height: 5rem;
		display: flex;
		flex-shrink: 0;
		border-bottom: 1px solid #f5f4f4;

	}

	.cont_content {
		min-height: 20rem;
		flex-grow: 1;
		overflow: auto;

	}

	.no_login {
		min-height: 20rem;
		flex-grow: 1;
		text-align: center;
		line-height: 26rem;
		color: #828282;
	}

	.cont_header_item {
		width: 25%;
		text-align: center;
		line-height: 5rem;
		font-size: 1.4rem;

	}
</style>

