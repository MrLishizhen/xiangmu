<template>
	<div class="classify_page">
		<Nav></Nav>
		<div class="song_sheet_page">
			<div class="song_sheet">
				<h3 class="song_sheet_h3">热门分类</h3>
				<div class="song_sheet_span_page hide-scroll-bar">
					<span v-for="item in SongSheet" :key="item.id" class="song_sheet_span"
					      :style="{color:item.color?'red':'#999'}"
					      v-text="item.name" @click="fl_show(item)"></span>
				</div>
			</div>
		</div>
		<div class="song_list_xoa_page ">
			<div class="song_list_xoa-top">
				<h3 v-text="qbfl" v-on:click="hide=!hide"></h3>
			</div>
			<div class="gedan_box ">
				<div class="gedan_overflow  hide-scroll-bar">
					<div class="gedan clearfix  hide-scroll-bar">
						<router-link class="gedan_item" v-for="item in playArr" :key="item.id" :to="`/details/${item.id}`">
							<img :src="item.coverImgUrl" :alt="item.name">
							<div class="name_box">
								<div class="copywriter ellipsis"
								     v-text="item.copywriter"></div>
								<div class="name ellipsis2" v-text="item.name"></div>
							</div>
						</router-link>
					</div>
				</div>
			</div>
			<div class="geren_show" v-show="gedan_show">
				<p>很抱歉，没有符合条件的歌单</p>
			</div>
		</div>
		<div class="show" v-show="hide" @click.self="hide=!hide">
			<div class="show_box hide-scroll-bar">
				<div class="qb" @click='allCategories'>精品推荐</div>
				<div class="show_fl" v-for="(item,i) in categories" :key="i">
					<h3 v-text="item"></h3>
					<div class="show_fl_box">
						<span v-for="(item2,i2) in subComputed(i)" :key="i2" v-text="item2.name"
						      @click="show(item2.name)"></span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
        import Nav from '../../components/Nav.vue';

        export default {
                components: {Nav},
                name: "classify",

                data(){
                        return {
                                SongSheet: [],
                                categories: null,
                                sub: [],
                                hide: false,
                                qbfl: '精品推荐',//全部分类
                                playlists: null,
                                playArr: [],
                                gedan_show: false,//控制没有歌单内容时提示用户
                        }
                },
                methods: {
                        subComputed(i){
                                let b = this.sub.filter(item =>{
                                        return item.category == i;
                                });
                                return b;
                        },
                        show(name){
                                this.qbfl = name;
                                this.hide = !this.hide;
                                this.$http({url: `/top/playlist/highquality?cat=${name}&limit=12`}).then(result =>{
                                        this.playArr = result.playlists;
                                        if(this.playArr.length > 0){

                                                this.gedan_show = false;
                                                this.playlists = result;
                                        }else{
                                                this.gedan_show = true;
                                        }

                                })
                        },
                        allCategories(){
                                this.qbfl = '精品推荐';
                                this.hide = !this.hide;
                                this.$http({url: '/top/playlist/highquality?limit=20'}).then(results =>{
                                        this.playArr = results.playlists;
                                        this.playlists = results;
                                });
                                this.SongSheet.forEach(item =>{
                                        item.color = false;
                                });

                        },
                        fl_show(item){
                                this.SongSheet.forEach(item =>{
                                        item.color = false;
                                });
                                item.color = true;
                                this.$http({url: `/top/playlist/highquality?cat=${item.name}&limit=12`}).then(result =>{
                                        this.playArr = result.playlists;
                                        if(this.playArr.length > 0){
                                                this.gedan_show = false;
                                                this.playlists = result;
                                        }else{
                                                this.gedan_show = true;
                                        }

                                })
                        },
                },
                created(){
                        //热门分类
                        this.$http({url: '/playlist/hot'}).then(result =>{
                                result.tags.forEach(item =>{
                                        item.color = false;
                                });
                                this.SongSheet = result.tags;
                        });
                        //全部分类
                        this.$http({url: "/playlist/catlist"}).then(result =>{
                                this.categories = result.categories;
                                this.sub = result.sub;
                        });
//		        歌单
                        this.$http({url: '/top/playlist/highquality?limit=30'}).then(result =>{
                                this.playlists = result;
                                this.playArr = this.playlists.playlists;

                        })


                }

        };
</script>

<style scoped>
	.geren_show {

		display: flex;
		justify-content: center;
		margin: 2.0rem auto;
	}

	/*遍历出来的歌单*/
	.name_box > .name {
		color: #333;
		margin-bottom: 2rem;
	}

	.name_box > .copywriter {
		padding: 0.5rem 0.2rem;
		color: #ccc6c6;
		font-size: 1.0rem;
	}

	.gedan_item > .name_box {
		font-size: 1.2rem;

	}

	.gedan_item > img {
		width: 100%;
		border-radius: 0.5rem;

	}

	.gedan_item {
		width: 33.333333%;
		box-sizing: border-box;
		float: left;
		padding: 0 0.5rem 0.5rem 0;
		min-height: 20rem;
		margin-top: 0.5rem;
	}

	.gedan_box .gedan {
		width: 102%;

	}

	.gedan_box {
		overflow-y: auto;
		flex-grow: 1;
	}

	/*隐藏的内容*/

	.qb {
		width: 10rem;
		height: 3rem;
		border: 1px solid #ccc;
		font-size: 1.6rem;
		line-height: 3rem;
		text-align: center;
		margin: 1rem auto 0;
		border-radius: 2.5rem;
		color: #666;

	}

	.show_fl_box > span {
		padding: 0.2rem 0.6rem;
		display: inline-block;
		border-radius: 0.5rem;
		height: 2rem;
		line-height: 2rem;
		font-size: 1.2rem;
		border: 1px solid #9c9c9c;
		margin: 0.5rem 0.8rem 0.5rem 1rem;
		color: #999;
	}

	.show_fl_box {
		margin-top: 0.5rem;
	}

	.gedan_overflow {
		overflow: hidden;
	}

	.show_box {
		height: 60%;
		width: 100%;
		position: absolute;
		background-color: #fff;
		bottom: 0;

	}

	.show_fl > h3 {
		font-size: 1.4rem;
	}

	.show_fl {
		padding: 1rem;
	}

	.show {
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .4);
	}

	.song_list_xoa-top > h3::after {
		content: '';
		position: absolute;
		top: 50%;
		transform: translateY(-25%);
		border: 0.5rem solid;
		border-color: #000 transparent transparent;
		margin-left: 0.2rem;
	}

	.song_list_xoa-top > h3 {
		font-size: 1.6rem;
		position: relative;
		height: 2rem;
	}

	.song_list_xoa-top {
		display: flex;
		align-items: center;
		height: 4rem;
		flex-shrink: 0;
	}

	.song_list_xoa_page {
		padding: 1rem 1rem 0;
		margin-top: 1rem;
		flex-grow: 1;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.song_sheet_span {
		padding: 0 1rem;
		font-size: 1.4rem;
		color: #999;
	}

	.song_sheet_span_page {
		flex-grow: 1;
		overflow: auto;
		white-space: nowrap;

	}

	.song_sheet_h3 {
		font-size: 1.6rem;
		width: 7rem;
		flex-shrink: 0;
	}

	.song_sheet {
		padding: 1rem 0rem 1rem 0;
		display: flex;
		align-items: center;
		overflow: hidden;
	}

	.song_sheet_page {
		padding: 1rem;
		background-color: #fff;
		flex-shrink: 0;
		margin-top: 0.5rem;

	}

	.classify_page {
		height: 100%;
		width: 100%;
		background-color: #f5f5f5;
		display: flex;
		flex-direction: column;
	}
</style>