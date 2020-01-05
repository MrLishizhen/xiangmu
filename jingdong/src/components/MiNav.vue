<!--公用的导航栏-->
<template>
	<ul class="jd-nav">
		<li>
			<router-link to="/Home">
				<i></i>
			</router-link>
		</li>
		<li>
			<router-link to="/Category">
				<i></i>
			</router-link>
		</li>
		<li>
			<router-link to="./Category">
				<i></i>
			</router-link>
		</li>
		<li>
			<router-link to="/Cart">
				<i></i>
			</router-link>

		</li>
		<li>
			<router-link to="/Profile">
				<i></i>
			</router-link>
		</li>
	</ul>
</template>
<script type="text/ecmascript-6">
        export default {}
</script>

<style scoped>

	ul.jd-nav {
		display: flex;
		height: 55px;
	}

	ul.jd-nav>li {
		width: 20%;
		display: flex;
	}

	ul.jd-nav>li>a {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	ul.jd-nav>li:nth-child(1)>a>i {
		width: 66px;
		height: 55px;
		background: url(../assets/footer1.png);
		background-size: cover;
	}

	ul.jd-nav>li:nth-child(2)>a>i {
		width: 66px;
		height: 55px;
		background: url(../assets/footer2.png);
		background-size: cover;
	}

	ul.jd-nav>li:nth-child(3)>a>i {
		width: 66px;
		height: 55px;
		background: url(../assets/footer3.png);
		background-size: cover;
	}

	ul.jd-nav>li:nth-child(4)>a>i {
		width: 66px;
		height: 55px;
		background: url(../assets/footer4.png);
		background-size: cover;
	}

	ul.jd-nav>li:nth-child(5)>a>i {
		width: 66px;
		height: 55px;
		background: url(../assets/footer5.png);
		background-size: cover;
	}

	ul.jd-nav>li:nth-child(1)>a.router-link-active>i {
		width: 66px;
		height: 55px;
		background: url(../assets/footer1-active.png);
		background-size: cover;
	}

	ul.jd-nav>li:nth-child(2)>a.router-link-active>i {
		width: 66px;
		height: 55px;
		background: url(../assets/footer2-active.png);
		background-size: cover;
	}

	ul.jd-nav>li:nth-child(5)>a.router-link-active>i{
		width: 66px;
		height: 55px;
		background: url(../assets/footer5-active.png);
		background-size: cover;
	}
</style>