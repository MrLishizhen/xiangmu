<template>
	<div class="details_page">
		<div class="details_top">
			<div class="details_bc" :style="{backgroundImage:`url(${bc})`}"></div>
			<div class="bc">
				<img :src="bc" alt="">
			</div>
			<div class="details_box">
				<div class="top_name" v-text="name"></div>
				<!--<div class="top_updateFrequency" v-text="updateFrequency"></div>-->
				<div class="top_description ellipsis2" v-text="description"></div>
				<div class="tags">
					<span class="tags_item" v-for="(item,i) in tags" :key="i" v-text="item"></span>
				</div>
			</div>
		</div>
		<div class="details_content">
			<div class="details_centent_top">
				<span class="centent_top_count" v-text="`共${tracks.length}首`"> </span>
			</div>
			<div class="details_centent_box">
				<router-link :to="fun(item)" class="details_centent_box_item" v-for="(item,i) in tracks"
				             :key="item.id">
					<div v-text="i+1" class="number"></div>
					<div class="gequ_box">
						<div class="gequ_box_top">
							<div class="gequ_top">
								<span v-text="item.name" class="name"></span>
								<span v-text="alia(item.alia)" class="alia"></span>
							</div>
							<div class="gequ_box" v-text="arFun(item.ar,item.al)">

							</div>
						</div>

					</div>
					<div class="iconfont tubiao">&#xe628;</div>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
        import Cookie from 'js-cookie';

        export default {
                name: 'defalis',
                data(){
                        return {
                                data: null,
                                bc: '',
                                name: '',
                                updateFrequency: '',
                                tracks: [],
                                description: '',
                                tags: '',
                        };
                },
                methods: {
                        fun(item){
                                Cookie.set('gId', this.data.playlist.id);
                                return `/play/${item.id}`;
                        },
                        alia(item){
                                return item.join(' ');
                        },
                        arFun(item, al){
                                let arr = [];
                                for(let i = 0; i < item.length; i++){
                                        arr.push(item[i].name);
                                }
                                return `${arr.join('/')} -${al.name}`;
                        }
                },
                watch: {
                        'data'(newValue, oldValue){
                                this.bc = newValue.playlist.coverImgUrl;
                                this.name = newValue.playlist.name;
                                this.updateFrequency = newValue.playlist.updateFrequency;
                                this.tracks = newValue.playlist.tracks;
                                this.description = newValue.playlist.description;
                                this.tags = newValue.playlist.tags;
                        }
                },
                created(){
                        this.$store.dispatch('gedan/init', this.$route.params.id).then(() =>{
                                this.data = this.$store.state.gedan.data;//得到之后直接赋值给本页面
                        });
                },
        };
</script>

<style scoped>
	a {
		color: #666;
	}

	.details_page {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.details_content {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		padding: 0 1rem;
		overflow: hidden;
	}

	.details_top {
		position: relative;
		padding: 4rem 2rem;
		overflow: hidden;
		height: 13rem;
		display: flex;
		flex-shrink: 0;
	}

	.bc {
		width: 12.6rem;
		height: 12.6rem;
		flex-shrink: 0;
	}

	.bc > img {
		width: 100%;
	}

	.details_bc {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: -1;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: 50%;
		-webkit-filter: blur(20px);
		filter: blur(20px);
		-webkit-transform: scale(1.5);
		-ms-transform: scale(1.5);
		transform: scale(1.5);
	}

	.details_bc::after {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: -1;
		content: " ";
		background-color: rgba(0, 0, 0, .25);
	}

	.details_box {
		padding: 1rem;
		color: #fff;
	}

	.details_box > .top_name {
		font-size: 1.3rem;
	}

	.top_description {
		margin-top: 1.2rem;
	}

	.tags {
		min-height: 3rem;
		margin-top: 1rem;
	}

	.tags_item {
		padding: 0.3rem 0.8rem;
		border: 0.1rem solid #ccc;
		font-size: 1.0rem;
		margin-right: 0.4rem;
		border-radius: 0.5rem;
	}

	.details_centent_top {
		height: 4rem;
		flex-shrink: 0;
		line-height: 4rem;
		font-size: 1.4rem;
		color: #ff5e5e;
		position: relative;
	}

	.centent_top_count::before {
		content: '';
		display: block;
		position: absolute;
		width: 0.4rem;
		height: 1rem;
		background-color: #ff5e5e;
		left: -1rem;
		top: 50%;
		margin-top: -0.5rem;
	}

	.details_centent_box {
		flex-grow: 1;
		overflow: auto;
	}

	.details_centent_box_item {
		display: flex;
		min-height: 5rem;
		align-items: center;
	}

	.number, .tubiao {
		width: 3.5rem;
		flex-shrink: 0;
		box-sizing: border-box;
	}

	.gequ_box {
		flex-grow: 1;
	}

	.gequ_top > .name {
		color: #333;
		font-size: 1.4rem;
	}

	.gequ_top > .alia {
		color: #999;
		font-size: 1.2rem;
		margin-left: 0.5rem;
	}

	.gequ_box {
		color: #999;
		margin-top: 0.5rem;
	}
</style>