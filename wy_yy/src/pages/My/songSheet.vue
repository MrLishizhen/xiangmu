<template>
	<!--这个页面暂时不用-->
	<div class="song_sheet_page">
		<div class="song_sheet_box">
			<div class="song_sheet_item" v-for="item in data">
				<div class="img">
					<img :src="item.coverImgUrl" alt="">
				</div>
				<div class="song_sheet_item_cent">
					<span v-text="item.name" class="name"></span>
					<span v-text="item.description" class="ellipsis2 box"></span>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
        export default {
                props: ['list'],
                data(){
                        return {
                                data: [],
                        }
                },
                watch: {
                        list(newValue, oldValue){
                                this.data = newValue.playlist;
                        }
                },

        };
</script>

<style scoped>
	.song_sheet_page {
		width: 100%;
		height: 100%;

	}

	.song_sheet_box {
		padding:0.5rem;

	}

	.song_sheet_item {
		box-shadow: 0 0.2rem 0.3rem #cecece;
		height:7.0rem;
		padding:1.5rem 1rem;
		display:flex;
		align-items: center;
	}
	.img{
		height:5.0rem;
		width:5.0rem;
		flex-shrink: 0;
	}
	.img>img{
		height:100%;
	}
	.song_sheet_item_cent{
		flex-grow: 1;
		padding:1.5rem 1rem;
		height:100%;
	}
	.name{
		font-size:1.2rem;

		padding-left:1.5rem;
	}
	.box{
		padding-left:1.5rem;
		margin-top:0.5rem;
		color:#ccc;
	}
</style>