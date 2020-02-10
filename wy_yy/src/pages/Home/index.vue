<template>
	<div class="home_page">
		<Nav></Nav>

		<!--banner-->
		<div class="banner">
			<swiper :options="swiperOption" v-if="banners.length>0">
				<swiper-slide v-for="item in banners">
					<router-link to="">
						<img :src="item.imageUrl" :alt="item.typeTitle" class="banner_item">
					</router-link>
				</swiper-slide>

				<div class="swiper-pagination" slot="pagination"></div>

			</swiper>
		</div>

		<!--推荐歌单-->
		<div class="recommend">
			<div class="tj-top">
				<div class="tj-title">
					<h3>推荐歌单</h3>
				</div>
				<div class="tj-more">
					<router-link to="/classify">
						更多推荐
					</router-link>
				</div>
			</div>
			<div class="tj-box">
				<div class="tj-box-item" v-for="(item,i)  in recommend_songs" :key="i">
					<router-link :to="`/details/${item.id}`">
						<div class="box-item erji">
							<span class="headset" v-text="item.playCount"></span>
							<img :src="item.picUrl" alt="">
							<div class="tj-title ellipsis" v-text="item.name"></div>
						</div>
					</router-link>
				</div>
			</div>
		</div>

		<!--最新歌曲-->
		<div class="Latest_songs">
			<div class="tj-top">
				<div class="tj-title">
					<h3>最新歌曲</h3>
				</div>
			</div>
			<div class="tj-box">
				<div class="tj-box-item" v-for="item  in Latest_songs" :key="item.id">
					<router-link :to="`/play/${item.id}`">
						<div class="box-item">
							<img :src="item.picUrl" alt="">
							<div class="tj-title ellipsis" v-text="item.name+` ${item.song.alias}`"></div>

						</div>
					</router-link>
				</div>
			</div>
		</div>

		<!--底部-->
		<div class="footer">
			<div class="footer-box">
				<div class="footer-top">
					<div>返回首页</div>
					<span></span>
					<div>关于我们</div>
				</div>
			</div>
		</div>

	</div>

</template>

<script type="text/ecmascript-6">
        import Nav from '../../components/Nav.vue';
        import cookie from 'js-cookie';

        export default {
                name: 'home',
                components: {Nav},
                data(){
                        return {
                                Latest_songs:[],
                                recommend_songs: [],//推荐歌单
                                banners: [],//保存轮播图请求内容
                                swiperOption: {//轮播图所用配置
                                        slidesPerView: 1,
                                        spaceBetween: 30,
                                        loop: true,
                                        autoplay: {
                                                disableOnInteraction: false,
                                        },
                                        pagination: {
                                                el: '.swiper-pagination',
                                                clickable: false,
                                        },

                                }
                        }
                },
                methods:{
                     payCount(number){
	                     let length = number.toString().length;
	                     switch(length){

	                     }
                     }
                },
                created(){
                        cookie.remove('gId');
                        this.$http({url: '/banner', method: 'get'}).then(result =>{
                                this.banners = result.banners;
                        });
                        this.$http({url: '/personalized?limit=6'}).then(result =>{
                                this.recommend_songs = result.result;
                        });
                        this.$http({url:'/personalized/newsong'}).then(result=>{
                                this.Latest_songs=result.result.slice(0,6);

                        })

                }
        }
</script>

<style>
	.home_page {
		width: 100%;

		background-color: #f5f5f5;
	}
	div.nav{
		background-color: #fff;
	}

	.banner {
		margin-top: 0.2rem;
		background-color: #fff;
	}

	.banner .banner_item {
		width: 100%;
		min-height: 160px;
	}

	.swiper-pagination-bullet-active {
		background: #fff !important;
	}

	/*推荐歌单*/
	.recommend {
		padding: 1rem;
		background-color: #fff;
	}

	.tj-top {
		padding: 0.5rem 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.tj-top > .tj-title {
		font-size: 1.6rem;

	}

	.tj-top > .tj-more {

		font-size: 1.2rem;
	}

	.tj-top > .tj-more > a {
		color: #ccc;
		border: 1px solid #ccc;
		padding: 0.1rem 0.6rem;
		border-radius: 0.25rem;
	}

	 .tj-box {
		display: flex;
		flex-wrap: wrap;
	}

	.tj-box > .tj-box-item {
		width: 33.333333%;
		background-color: #fff;
	}

	 .tj-box > .tj-box-item > a {
		width: 90%;
		display: block;
		margin: 0 auto;
		box-sizing: border-box;
	}

	.box-item {
		padding: 0.5rem 0.5rem;
		box-sizing: border-box;
	}

	 .tj-box > .tj-box-item > a img {
		width: 100%;
		border-radius: 0.5rem;
	}

	.tj-box > .tj-box-item > a > .box-item > .tj-title {
		padding: 0.5rem 0.1rem 0.5rem 1rem;
		color: #333;
		font-size: 1.2rem;
	}

	.Latest_songs{
		padding:1rem;
		background-color: #fff;
		margin-top: 1rem;
	}
	.footer{
		padding:2rem 1rem;
		background-color: #f5f5f5;
	}
	.footer>.footer-box{
		padding:2.5rem 2rem;
		background-color: #fff;
		box-shadow: 0.1rem 0.5rem 0.2rem #ccc;
		border-radius: 1rem;
	}
	.footer-top{
		display:flex;
		justify-content: center;
		font-size:1.4rem;
	}
	.footer-top>span{
		border-left:1px solid #333;
		margin:0 1.5rem;
	}
	.erji{
		position:relative;

	}
	.headset{
		position:absolute;
		color:#fff;
		right:1rem;
		top:1rem;

	}
</style>