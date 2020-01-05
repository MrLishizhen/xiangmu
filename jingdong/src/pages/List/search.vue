<template>
	<div class='search-wrapper'>
		<form action="">
			<i class='search' @click="search"></i>
			<input type="text" placeholder="保险箱" v-model="name">
		</form>
	</div>
</template>

<script type="text/ecmascript-6">
        export default {

			data(){
				return {
					name:'',
				}
			},
			methods:{
				search(){
					this.$emit('searchName',this.name);

				}
			},
        };
</script>

<style scoped>
	.header>.search-wrapper {
		flex-grow: 1;

	}

	.header>.search-wrapper>form {
		display: flex;
		height: 30px;
		align-items: center;
		border-radius: 15px;
		margin-top: 6px;
		background-color: #f7f7f7;
	}

	.header>.search-wrapper>form>i.search {
		width: 18px;
		height: 15px;
		margin-left: 15px;
		background-image: url(imgs/jd_sprites.png);
		background-position: -120px 0;
		background-size: 200px;
	}

	.header>.search-wrapper>form>input {
		border: none;
		outline: none;
		height: 30px;
		padding: 0 0 0 5px;
		margin: 0 0 0 5px;
		background-color: transparent;
	}
</style>