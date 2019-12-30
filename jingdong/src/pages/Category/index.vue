<template>
	<div class="page-wrapper">
		<div class="header">
			<Serach></Serach>
		</div>
		<div class="content">
			<div class="left hide-scroll-bar">
				<Left :list=" mainList" :active-id="activeId" @toggle="toggleId"></Left>
			</div>
			<div class="right hide-scroll-bar">
				<Right :avatar="avatar" :list="subList" :list2="subList2"></Right>
			</div>
		</div>
		<div class="footer">
			<MiNav></MiNav>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	//组件的相关代码

//	导入组件
	import MiNav from '../../components/MiNav.vue';
	import Left from './Left.vue';
	import Right from './Right.vue';
	import Serach from "../../components/Serach";
	import axios from 'axios';


	//导出组件
	export default {
		components:{MiNav,Left,Right,Serach},
		data(){
		         return {
		                 mainList:[],
			         activeId:0,
			         subList:[],//保存的是右侧二级菜单
			         subList2:[],//三级菜单栏

		         }
		},
		computed:{
		        avatar(){
		                let target = this.mainList.find(item =>{return item.id === this.activeId});
		                return target ? target.avatar : '';
		        },
		},
		watch:{
			activeId(newValue,oldValue){//新的值，旧的值
				this.subList2 =[];
				this.getData(newValue).then(data => this.subList = data);
			},
                        subList(newValue,oldValue){
                               newValue.forEach(item =>{
					this.getData(item.id).then(data=>this.subList2 =this.subList2.concat(data));
                               })
                        }
		},
		methods:{
                        toggleId(id){this.activeId = id},
			getData(fid){
                                return this.$http({method:'get',url:`/category/list/${fid}`});
			}
		},

		beforeCreate(){


		},
		created(){
			this.getData(0).then(data=>{
			        this.mainList = data;
				this.activeId = data[0].id;
			})
		},
		beforeMount(){

		},
		mounted(){

		},
		beforeUpdate(){

		},
		updated(){

		},
		beforeDestroy(){},
		destroyed(){

		}
	}
</script>

<style scoped>
	/*样式*/
	.page-wrapper{
		width:100%;
		height:100%;
		display:flex;
		flex-direction: column;
	}

	.header{
		flex-shrink: 0;
		height:44px;
		display:flex;
	}
	.content{
		flex-grow: 1;
		border-bottom: 1px solid #e5e5e5;
		border-top: 1px solid #e5e5e5;
		display:flex;
		overflow: hidden;

	}
	.content>.left{
		width:85px;
		flex-shrink: 0;
		overflow:auto;
	}
	.content>.right{
		flex-grow: 1;
		background-color: rgb(246,246,246);
		border-left:1px solid #e5e5e5;
		overflow:auto;
		padding:7px;
	}
	.footer{
		flex-shrink: 0;
		height:55px;
	}
</style>