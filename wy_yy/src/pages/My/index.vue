<template>
	<div class="my_page">
		<Nav></Nav>
		<div class="my_header">
			<div class="Logon_status">
				<div class="login_img"><img src="../../assets/login.jpeg" alt=""></div>
				<div class="login_geren">
					<span class="name">秋雨不良人</span>
					<span class="login_button" @click="$router.push('/login')">单击登陆</span>
				</div>
			</div>

		</div>

		<div class="my_content">
			<div class="content">
				<div class="cont_herder">
					<div class="cont_header_item" v-for="item in nav" v-text="item.name"></div>
				</div>
				<div class="cont_content"></div>
			</div>
		</div>
	</div>
</template>
<style scoped>
	.my_page {
		width: 100%;
		height: 100%;
		display:flex;
		flex-direction: column;
	}

	.my_header {
		min-height: 12rem;
		flex-shrink: 0;
		margin-top:1.0rem;

	}

	.Logon_status {
		height: 100%;
		width: 90%;
		margin:0 auto;
		position: relative;
		/*background-color: #81b2ff;*/
		background-color: #b4bcca;
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
	.login_geren{
		height:3rem;
		width:50%;
		position:absolute;
		top:30%;
		margin-top:-1.5rem;
		right:6rem;
		font-size:1.4rem;
		font-weight:600 ;
		line-height:3rem;
	}
	.my_content{
		width:100%;
		flex-grow: 1;
		display:flex;
		flex-direction: column;

	}
	.content{
		background-color: #fff;
		box-shadow: 0rem 0.5rem 1rem #ccc;
		display:flex;
		flex-direction: column;
		flex-grow: 1;
		width:90%;
		margin:1.0rem auto;
		border-radius: 0.5rem;
	}
	.cont_herder{
		min-height:5rem;
		display:flex;
		flex-shrink: 0;

	}
	.cont_content{
		min-height:20rem;
		flex-grow: 1;

	}
	.cont_header_item{
		width:25%;
		text-align: center;
		line-height:5rem;
		font-size:1.4rem;

	}
</style>
<script type="text/ecmascript-6">
        import Nav from '../../components/Nav.vue';

        export default {
                components: {Nav},
	        data(){
                        return {
                                nav:[
	                                {name:'歌手',isShow:true},
                                        {name:'专辑',isShow:false},
                                        {name:'歌单',isShow:false},
                                        {name:'歌曲',isShow:false}
                                ]
                        }
	        }
        };
</script>

