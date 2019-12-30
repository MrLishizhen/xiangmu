<template>
	<el-container>
		<!--左侧-->
		<el-aside width="200px">

			<el-menu @select="add" text-color="#333" active-text-color="#000">
				<el-submenu index="1">
					<template slot="title" style="height:50px">
						<i class="el-icon-s-goods"></i>
						<span>商品管理</span>
					</template>

					<el-menu-item index="category">
						<i class="el-icon-menu"></i>
						<span>商品分类</span>
					</el-menu-item>
					<el-menu-item index="product">
						<i class="el-icon-chat-line-square"></i>
						<span>商品信息</span>
					</el-menu-item>

				</el-submenu>
				<el-submenu index="2">
					<template slot="title" style="height:50px">
						<i class="el-icon-s-custom"></i>
						<span>个人中心</span>
					</template>
					<el-menu-item index="password">
						<i class="el-icon-lock"></i>
						<span>密码修改</span>
					</el-menu-item>
				</el-submenu>
			</el-menu>
		</el-aside>
		<el-container>
			<el-header height="50px">欢迎来到模拟商城后台管理系统</el-header>
			<el-main>
				<el-tabs type="border-card" closable @tab-remove="remove" v-model="activeTab">
					<el-tab-pane v-for="tab in Lists" :key="tab" :name="tab">
						<span slot="label"><i
							:class="listTabs[tab]. icon"></i> {{listTabs[tab].label}}</span>
						<component :is="listTabs[tab].component"></component>
					</el-tab-pane>

				</el-tabs>

			</el-main>
			<el-footer height="45px">
				<p>本后台系统制作者：李世镇</p>
			</el-footer>
		</el-container>
	</el-container>
</template>

<script type="text/ecmascript-6">
        import Category from './Category';
        import Password from './Password';
        import Product from './Product';
        import Welcome from './Welcome';

        export default {
                data(){
                        return {
                                activeTab: 'welcome',//表示激活的标签页
                                Lists: ['welcome'],//表示打开的标签页
                                listTabs: {
                                        welcome: {
                                                label: "欢迎",
                                                icon: 'el-icon-chat-line-round',
                                                component: Welcome,
                                        },
                                        product: {
                                                label: '商品信息',
                                                icon: 'el-icon-chat-line-square',
                                                component: Product,
                                        },
                                        category: {
                                                label: '商品分类',
                                                icon: 'el-icon-menu',
                                                component: Category,
                                        },
                                        password: {
                                                label: '密码管理',
                                                icon: 'el-icon-lock',
                                                component: Password,
                                        },

                                },
                        }
                },
                methods: {
                        remove(index){//这里的index就是上面el-tabs中的name
                                let i = this.Lists.indexOf(index);
                                this.Lists.splice(i, 1);
                                if(this.activeTab === index){
                                        this.activeTab = this.Lists.length > 0?this.Lists[0]:'';
                                }
                        },
                        add(index){
                                if(this.Lists.indexOf(index) === -1){
                                        this.Lists.push(index);
                                        this.activeTab = index;
                                }


                        },
                },
                watch: {
                        //监控Lists数组，如果值变为空就把页面中显示欢迎界面
                        'Lists'(newValue,oldVale){
                                if(newValue.length==0){
									this.Lists.push('welcome');
                                        this.activeTab='welcome';
                                }

                        },
                },
                created(){
                        if(!this.$cookies.get('token')){
                               this.$router.replace('/login');
                        }
                },

        }
</script>


<style scoped>
	.el-container {
		width: 100%;
		height: 100%;
		color: rgb(51, 51, 51);
	}

	.el-aside, .el-submenu {
		background-color: rgb(234, 237, 241);

	}

	.el-header {
		line-height: 50px;
		font-size: 20px;
		border-bottom: 1px solid rgb(234, 237, 241);

	}

	.el-main>.el-tabs{
		min-height:100%;

	}

	.el-menu-item {
		font-size: 13px;
	}


	.el-footer {
		font-size: 12px;
		line-height: 44px;
		text-align: right;
		border-top: 1px solid rgb(234, 237, 241);
		box-sizing: border-box;
	}

</style>