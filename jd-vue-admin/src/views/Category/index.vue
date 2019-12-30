<template>
	<div>
		<el-tree :data="dataList" :expand-on-click-node="false" node-key="id" :default-expanded-keys="[0]">
			<div slot-scope="{ node, data }" class="custom-tree-node">
				<span v-text="data.name"></span>
				<div class="right">
					<!--新增-->
					<i class="el-icon-plus" v-if="!data.avatar||data.id==0||data.fid==0" @click="setUpAdd(data)"></i>
					<!--修改-->
					<i class="el-icon-edit-outline" v-if="data.id!=0" @click="setUpBegin(data)"></i>
					<!--删除-->
					<i class="el-icon-delete" v-if="!data.children" @click="remove(data)"></i>
					<!--查看-->
					<el-popover trigger="hover"  width="200" placement="right"  v-if="data.avatar">
						<el-image :src="data.avatar" style="width:200px"></el-image>
						<i class="el-icon-picture" slot="reference"></i>
					</el-popover>

				</div>
			</div>
		</el-tree>


		<el-dialog :visible.sync="isShow"  :title="mode?'新增':'修改'">
			<el-form :model=" model" labelWidth="100px">
				<el-form-item label="选择分类：" >
					<el-select v-model="select.main.value" placeholder="请选择" v-show="select.main.isShow" :disabled="select.main.disabled">
						<el-option v-for="item in mainList" :value="item.id" :label="item.name" :key="item.id"></el-option>
					</el-select>
					<el-select v-model="select.sub.value" placeholder="请选择" v-show="select.sub.isShow" :disabled="select.sub.disabled">
						<el-option v-for="item in subList" :value="item.id" :label="item.name" :key="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="分类名称：">
					<el-input v-model="model.name"></el-input>
				</el-form-item>
				<el-form-item label="分类图片：" v-show="level!==2">
					<div class="avatar-wra">
						<div class="old-avatar" v-show="!mode" v-if="model.avatar">
							<el-image :src="model.avatar" style="width:148px"></el-image>
						</div>

						<div class="new-avatar">
							<el-upload
								list-type="picture-card"
								action="/category/upload"
								accept=".jpg,.png"
								name="avatar"
								:beforeUpload="beforeUploadHandler"
								:on-success="uploadSuccessHandler"
								:on-remove="uploadRemoveHandler"
								ref="upload"
							>
							<i class="el-icon-plus"></i>
							</el-upload>

						</div>

					</div>
				</el-form-item>

			</el-form>
			<div slot="footer">
				<el-button @click="isShow=false">取消</el-button>
				<el-button type="primary" :disabled="button" @click="save">确认</el-button>
			</div>
		</el-dialog>
	</div>

</template>

<script type="text/ecmascript-6">
        export default {
                name:'category',
               data(){
                       return {
	                       isShow:false,
	                       mode:true,
	                       button:true,//这是提交按钮的禁用
	                       model:{id:-1,name:'',fid:-1,avatar:'',newAvatar:''},
	                       level:0,
	                       select:{
	                               main:{isShow:true,value:'',disabled:false},
		                       sub:{isShow:true,value:'',disabled:false},
	                       }
                       }

               },
	        computed:{
                        dataList(){
                                let Root = {id:0,name:'Root'};
				this.getDate(Root);
				return [ Root ];
                        },
		        mainList(){
				return this.$store.state.category.list.filter(item=>item.fid===0);//找出一级
		        },
                        subList(){
				return this.$store.state.category.list.filter(item=>item.fid===this.select.main.value);
                        }
	        }
	        ,
	        methods:{
                       //初始获取数据
			getDate(root){
			let children= this.$store.state.category.list.filter(item=>item.fid===root.id);//通过传入的root开始递归，然后找出fid等于当前的id的哪一个数据
			if(children.length===0)return//判断数组有没有值，有值就表示还有数据可以遍历，没有就表示没有数据，要么退出递归，要么开始下一次递归
			else{//构建一个属性，为一个空数组，存储每次找出的数据
			        root.children=[];
			        let childNode=null;//构建一个对象，初始值为null
			        children.forEach(item=>{//遍历children找出其中的数据
			                childNode=Object.assign({},item);//让构建的对象等于当前循环出来的数据
			                this.getDate(childNode);//把当前的数据放到自身的函数中，开始下一次
			                root.children.push(childNode);//在最后把刚刚找到的值放到数组的children中
			        })
			}},
			//点击弹窗增加，增加的时候不能让选择栏更改
                        setUpAdd(data){
				this.select.main.disabled=true;
				this.select.sub.disabled=true;
				if(data.id===0){
				        this.select.main.isShow=false;
				        this.select.sub.isShow=false;
				        this.level=1;
				}else if(data.fid===0){
				        this.select.main.isShow=true;
				        this.select.sub.isShow=false;
				        this.select.main.value=data.id;
				        this.level=2;
				}else{
				        this.model.avatar=data.avatar;
				        this.select.main.isShow=true;
				        this.select.sub.isShow=true;
				        this.select.sub.value=data.id;
				        this.select.main.value = data.fid;
				        this.level=3;
				}
				this.model.fid=data.id;
				this.model.name='';
				this.isShow=true;
                        },
                        setUpBegin(data){
                                if(data.fid===0){
                                        this.select.main.isShow=false;
                                        this.select.sub.isShow=false;
					this.level=1;
                                }else if(!data.avatar){
                                        this.level=2;
                                        this.select.sub.isShow=false;
                                        this.select.main.isShow=true;
                                        this.select.main.disabled=false;
					this.select.main.value = data.fid;

                                }else{
                                        //表示这是三级分类
	                                this.level=3;
	                                this.select.sub.isShow=true;
	                                this.select.main.isShow=true;
	                                this.select.main.disabled=false;
	                                this.select.sub.disabled=false;
	                                this.select.sub.value=data.fid;
	                                this.select.main.value=this.$store.state.category.list.find(item=>item.id===data.fid).fid;

                                }
                                this.model.name = data.name;
                                this.model.id = data.id;
                                this.model.fid = data.fid;
                                this.model.avatar = data.avatar;
                                this.mode=false;
                                this.isShow=true;


                        },
                        beforeUploadHandler(file){
                                const isJPG = file.type === 'image/jpeg';
                                const isPNG = file.type === 'image/png';
                                const isLt2M = file.size / 1024 / 1024 < 2;

                                if((!isJPG) && (!isPNG)){
                                        this.$message.error('上传头像图片必须是jpg或者png 格式!');
                                }
                                if(!isLt2M){
                                        this.$message.error('上传头像图片大小不能超过 2MB!');
                                }
                                return (isJPG || isPNG) && isLt2M;
                        },
//			图片上传
                        uploadSuccessHandler(response, file, fileList){
				if(response.status===200){
				        this.model.newAvatar=response.data;
				        if(fileList.length>1){
				                fileList.splice(0,1);
				        }
				}
                        },
		        //图片删除
                        uploadRemoveHandler(file, fileList){
                                this.model.newAvatar=null;
                        },
		        //新增或者修改
                        save(){
                           if(this.mode){
	                          this.$store.dispatch('category/add',this.model).then(()=>{
		                          this.isShow=false;
	                          });

                           }else{
	                           this.$store.dispatch('category/update',this.model).then(()=>{
		                           let {id,fid,avatar,newAvatar,name} = this.model;
		                           if(this.level===2)avatar=null;
		                           else if(newAvatar) avatar=`/images/category/${newAvatar}`;
		                           let model={id,fid,avatar,name};
		                           this.isShow=false;
		                           return model

	                           }).then(model=>{
	                                   this.$store.commit('category/update',model);
	                           })
                           }
                        },
		        //删除
                        remove(data){
				this.$confirm(`您确定要删除${data.name}吗`,'警告',{showClose:false,type:'warning'}).then(()=>{
				        //删除的时候用category.js仓库去删，然后要带着的内容是id和avatar路径 这样如果有图片的话，在后台就可以把图片一起删掉，
				        return this.$store.dispatch('category/remove',{id:data.id,avatar:data.avatar});
				})
                        },
	        }
	        ,
	        watch:{


                        'select.main.value'(newValue, oldValue){
                                if(!this.mode && this.level === 3){
                                        this.select.sub.value = this.subList.length > 0?this.subList[0].id:'';
                                }
                                if(!this.mode && this.level === 2){
                                        this.model.fid = newValue;
                                }
                        },
                        'select.sub.value'(newValue, oldValue){
                                if(!this.mode && this.level === 3){
                                        this.model.fid = newValue;
                                }
                        },
                       //关闭弹窗之后把所有东西关闭恢复初始
                        'isShow'(newValue){

                                       if(!newValue){
                                               this.$refs.upload.clearFiles();//重置表单上传
                                               //把自定义数据归空
                                               this.model.id=-1;
                                               this.model.fid=-1;
                                               this.model.name='';
                                               this.model.avatar=null;
                                               this.model.newAvatar=null;
                                       }

                        },

		        'model.name'(newValue){
                                if(newValue!==''){
					this.button=false;
                                }
		        }
	        },
	        created(){
                        this.$store.dispatch('category/init');
	        },
        };
</script>

<style scoped>
	.el-tree {
		width: 500px;
	}

	.custom-tree-node {
		flex-grow: 1;
		display: flex;
		justify-content: space-between;
	}

	.custom-tree-node > .right > * {
		margin: 0 10px;
	}

	.avatar-wrapper > .old-avatar-wrapper {
		width: 148px;
	}
</style>