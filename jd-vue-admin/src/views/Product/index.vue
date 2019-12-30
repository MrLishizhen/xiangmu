<template>
	<div class="page-war">
		<!--搜索-->
		<el-form :inline="true">
			<el-form-item label="商品名：">
				<el-input v-model="search.name" placeholder="商品名"></el-input>
			</el-form-item>
			<el-form-item label="所属分类：">
				<el-select v-model="search.mId" class="width">
					<el-option :value="0" label="-请选择-"></el-option>
					<el-option v-for="item in mainCategoryList" :value="item.id" :key="item.id"
					           :label="item.name"></el-option>
				</el-select>
				<el-select v-model="search.sId" class="width">
					<el-option :value="0" label="-请选择-"></el-option>
					<el-option v-for="item in subCategoryList" :value="item.id" :key="item.id"
					           :label="item.name"></el-option>
				</el-select>
				<el-select v-model="search.cId" class="width">
					<el-option :value="0" label="-请选择-"></el-option>
					<el-option v-for="item in categoryList" :value="item.id" :key="item.id"
					           :label="item.name"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button @click="newSearchGetData">重置</el-button>
				<el-button @click="searchGetData">搜索</el-button>
				<el-button type="primary" @click="beginAdd">新增</el-button>
			</el-form-item>
		</el-form>
		<!--表格数据-->
		<el-table :data="productList" style="width:100%" border>
			<el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
			<el-table-column label="商品名" align="center" width="250" prop="name"
			                 show-overflow-tooltip></el-table-column>
			<el-table-column label="分类" width="210" align="center">
				<template slot-scope="scope">
					<span v-text="scope.row.mainCategoryName"></span>-
					<span v-text="scope.row.subCategoryName"></span>-
					<span v-text="scope.row.categoryName"></span>
				</template>
			</el-table-column>
			<el-table-column label="商品简介" align="center" prop="remark"
			                 show-overflow-tooltip></el-table-column>
			<el-table-column label="价格">
				<template slot-scope="scope">
					￥<span v-text="scope.row.price"></span>
				</template>
			</el-table-column>
			<el-table-column label="操作" align="center">
				<template slot-scope="scope">
					<el-button size="mini" round @click="beginEdit(scope.row)">修改</el-button>
					<el-button size="mini" round v-if="scope.row.status===1"
					           @click="productPullOffShelves(scope.row.id)">下架
					</el-button>
					<el-button size="mini" round type="info" v-else class="button-sj"
					           @click="putProductOnSale(scope.row.id)">上架
					</el-button>
				</template>
			</el-table-column>

			<el-table-column label="banner" align="center">
				<template slot-scope="scope">
					<i class="el-icon-picture" @click="beginBannerEdit(scope.row)"></i>
				</template>
			</el-table-column>
			<el-table-column label="avatar" align="center">
				<template slot-scope="scope">
					<i class="el-icon-picture" @click="beginAvatarEdit(scope.row)"></i>
				</template>
			</el-table-column>
		</el-table>

		<!--avatar弹窗-->
		<el-dialog :visible.sync="avatarDialog.isShow">
			<el-upload
				:multiple="true"
				:file-list="avatarDialog.fileList"
				action="/product/upload/avatar"
				name="avatar"
				list-type="picture-card"
				:data="{id:avatarDialog.id}"
				accept=".jpg,.png"
				:before-upload=" beforeAvatarUpload"
				:on-success="avatarUploadSuccessHandler"
				:before-remove="avatarBeforeRemoveHandler"

				ref="avatarUpload"
			>
				<i class="el-icon-plus"></i>
			</el-upload>
		</el-dialog>

		<!--banner更改-->
		<el-dialog :visible.sync="bannerDialog.isShow">
			<el-upload
				:multiple="true"
				:file-list="bannerDialog.fileList"
				action="/product/upload/banner"
				name="banner"
				list-type="picture-card"
				:data="{id:bannerDialog.id}"
				accept=".jpg,.png"
				:before-upload=" beforeBannerUpload"
				:on-success="bannerUploadSuccessHandler"
				:on-remove="bannerUploadRemoveHandler"

			>
				<i class="el-icon-plus"></i>
			</el-upload>
		</el-dialog>

		<!--修改和新增-->
		<el-dialog
			width="800px"
			:visible.sync="edit.isShow"
			:show-close="false"
			:title="edit.mode?'新增':'修改'"
			:close-on-press-escape="false"
			:close-on-click-modal='false'
		>
			<el-form
				:model="edit.model"
				labelWidth="100px"
				:rules="rules"
				ref="form"
			>
				<el-form-item label="商品名称：" prop="name">
					<el-input v-model="edit.model.name" placeholder="请输入商品名"></el-input>
				</el-form-item>
				<el-form-item label="商品分类：" prop="cid">
					<el-select v-model="edit.mId" style='width: 200px'>
						<el-option label="-请选择-" :value="0"></el-option>
						<el-option v-for="item in mainCategoryList" :key="item.id" :value="item.id" :label="item.name"></el-option>
					</el-select>

					<el-select v-model="edit.sId" style='width: 200px;margin:0 20px'>
						<el-option label="-请选择-" :value="0"></el-option>
						<el-option v-for="item in editSubCategoryList" :key="item.id" :value="item.id" :label="item.name"></el-option>
					</el-select>

					<el-select v-model="edit.model.cid" style='width: 200px'>
						<el-option label="-请选择-" :value="0"></el-option>
						<el-option v-for="item in editCategoryList" :key="item.id" :value="item.id" :label="item.name"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="商品简介：" prop="remark">
					<el-input v-model="edit.model.remark"></el-input>
				</el-form-item>
				<el-form-item label="价格：" prop="price">
					<el-input v-model="edit.model.price"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer">
				<el-button @click="edit.isShow=false">取消</el-button>
				<el-button type="primary" @click="save">确定</el-button>
			</div>
		</el-dialog>

		<!--下方分页器-->
		<el-pagination
			:page-sizes="[6, 8, 10, 12]"
			:page-size="pagination.count"
			:current-page="pagination.index"
			background
			@size-change="numberGeData"
			@current-change="pagingGeData"
			layout="total, sizes, prev, pager, next, jumper"
			:total=" pagination.total">
		</el-pagination>
	</div>
</template>

<script type="text/ecmascript-6">
        export default {
                name: 'product',
                data(){
                        return {
                                productList: [],
                                ajaxData: {name: '', mId: 0, sId: 0, cId: 0},//等于0是根据数据库来的，0表示请求全部的数据
                                search: {name: '', mId: 0, sId: 0, cId: 0},
                                pagination: {total: 0, index: 1, count: 6},//表示分页，total表示总共的数据，index 表示第几页，count表示要展示多少条
                                bannerDialog: {isShow: false, id: 0, fileList: []},//上传图片时要用的参数isShow表示是否显示，id表示你要给那个商品上传图片，fileList表示文件数组
                                avatarDialog: {isShow: false, id: 0, fileList: []},
                                edit: {
                                        isShow: false,
                                        mode: true,
                                        model: {id: 0, cid: 0, name: '', remark: '', price: 0},
                                        mId: 0,
                                        sId: 0,
                                },
                                rules:{
                                        name:[
                                                { required: true, message: '请输入商品名称', trigger: 'blur' },
                                                { min: 3, max: 100, message: '长度在 3到 100 个字符', trigger: 'blur' }
                                        ],
	                                price:[
                                                {
                                                        validator:(rule,value,callback)=>{
                                                                if(value === '')
                                                                        callback(new Error('价格必填'));
                                                                else if(!/^\d+$/.test(value))
                                                                        callback(new Error('请输入数字值'));
                                                                else
                                                                        callback();
                                                        },
                                                        trigger:'blur'
                                                }
	                                ],
                                        remark:[
	                                        {required:true,message:'请输入商品简介',trigger:'blur'},
	                                        {min:10,max:100,message:'商品简介不能低于10',trigger:'blur'}
                                        ],
                                        cid:[
                                                {validator:(rule,value,callback)=>{
                                                        if(value===0){
                                                                callback(new Error('商品分类不能为空'))
                                                        }else callback();
                                                },trigger:'change'}
                                        ]
                                }

                        }
                },
                computed: {
                        mainCategoryList(){//一级分类
                                return this.$store.state.category.list.filter(item => item.fid === 0);//找出所有的fid为0的一级数据

                        },
                        subCategoryList(){
                                return this.search.mId?this.$store.state.category.list.filter(item => item.fid === this.search.mId):[];
                        },
                        categoryList(){
                                return this.search.sId ? this.$store.state.category.list.filter(item => item.fid === this.search.sId):[];
                        },

                        //编辑的计算属性
                        editSubCategoryList(){
                                return this.edit.mId ?  this.$store.state.category.list.filter(item=>item.fid===this.edit.mId):[];
                        },
                        editCategoryList(){
                                return this.edit.sId? this.$store.state.category.list.filter(item=>item.fid===this.edit.sId):[];
                        }

                },

                methods: {
                        //注意一个事情：一个在使用watch的值重新赋值一个跟它一样的值的时候他不会调用
                        //什么时候会调用这个函数？
                        //1.页面刚进来的时候
                        //2.页数发生改变的时候
                        //3.选完条件点击查询的时候会发生改变
                        //4.页容量发生改变的时候
                        getProductList(index = 1){//获取商品数据,上面的四种条件只有第三个才会需要改变index的值，所以给他一个默认值，默认值为1
                                this.$http({
                                        url: '/product/admin/list',
                                        data: {
                                                ...this.ajaxData,
                                                begin: (this.pagination.index - 1) * this.pagination.count,
                                                count: this.pagination.count,
                                        }
                                }).then(data =>{
                                        this.productList = data.list;//把从数据库请求来的数据赋值到本地的数组中
                                        this.pagination.total = data.total;//把从数据库拿到的总数据赋值给total
                                        this.pagination.index = index;
                                })
                        },//begin 表示每一页请求数据要截取的位置，每一页显示六条数据，所以begin就是通过count来得到的

	                //新增按钮要做的事情
                        beginAdd(){
                                this.edit.isShow = true;
                                this.edit.mode = true;
                        },
	                //修改按钮
	                beginEdit(row){
                                this.edit.model.name=row.name;
				this.edit.model.id=row.id;
				this.edit.model.price=row.price;
				this.edit.model.remark=row.remark;
				let sId = this.$store.state.category.list.find(item=>item.id===row.fid).fid;
				this.edit.mId = this.$store.state.category.list.find(item=>item.id===sId).fid;
				this.$nextTick(()=>{
				        this.edit.sId=sId;
				        this.$nextTick(()=>{
				                this.edit.model.cid=row.fid;
				        })

				});

				this.edit.mode=false;
				this.edit.isShow=true;
	                },
	                save(){
				if(this.edit.mode){
				        this.$http({url:'/product/add',data:this.edit.model})
					        .then(newProduct=>{
					                console.log(newProduct);
					                this.productList.push(newProduct);
					                this.edit.isShow=false;
					                this.$message('新增成功','提示',{type:'success'})
					        })
				}else{
					this.$http({url:'/product/update',data:this.edit.model})
						.then(updateProduct=>{
							let i = this.productList.findIndex(item=>item.id===this.edit.model.id);
							this.productList.splice(i,1,updateProduct);
							this.$message('修改成功','提示',{type:'success'});
							this.edit.isShow=false;
						})
				}
	                },
                        //搜索请求数据
                        searchGetData(){
                                this.ajaxData = Object.assign({}, this.search);
                                this.getProductList()
                        },
                        newSearchGetData(){
                                this.ajaxData = {name: '', mId: 0, sId: 0, cId: 0};
                                this.search = {name: '', mId: 0, sId: 0, cId: 0};
                                this.getProductList();
                        },

                        //每页显示的数量改变时
                        numberGeData(count){
                                this.pagination.count = count;
                                this.getProductList();


                        },
                        pagingGeData(index){
                                this.pagination.index = index;
                                this.getProductList(index);
                        },
                        //商品下架
                        productPullOffShelves(id){
                                this.$confirm('确定要下架这个商品吗？', '提示', {type: 'warning'}).then(() =>{
                                        this.$http({url: `/product/putonsale/${id}`}).then(() =>{
                                                this.productList.find(item => item.id === id).status = 0;
                                                this.$message({
                                                        message: '商品下架成功',
                                                        type: 'success'
                                                });
                                        })
                                }).catch(() =>{
                                });
                        },
                        //商品上架
                        putProductOnSale(id){
                                this.$confirm('确定要上架这个商品吗？', '提示', {type: 'warning'}).then(() =>{
                                        this.$http({url: `/product/pulloffshelves/${id}`}).then(() =>{
                                                this.productList.find(item => item.id === id).status = 1;
                                                this.$message({
                                                        message: '商品上架成功',
                                                        type: 'success'
                                                });
                                        })
                                }).catch(() =>{
                                });
                        },
                        //banner图片的格式检测
                        beforeBannerUpload(file){
                                const isJPG = file.type === 'image/jpeg';
                                const isPNG = file.type === 'image/png';
                                const isLt2M = file.size / 1024 / 1024 < 2;

                                if(!isJPG && !isPNG){//
                                        this.$message.error('上传的图片只可以是jpg或者png格式的');
                                }
                                if(!isLt2M){
                                        this.$message.error('上传的图片大小不能超过 2MB!');
                                }
                                return (isJPG || isPNG) && isLt2M;
                        },
                        //成功之后要做的事情
                        bannerUploadSuccessHandler({status, data, message}, file, fileList){
                                if(status === 200){
                                        this.$message('banner上传成功', '提示', {type: 'success'});
                                        let target = this.productList.find(item => item.id === this.bannerDialog.id);
                                        target.banner = target.banner?`${target.banner},${data}`:data;//把新的内容加到数组中去
//					console.log(status,data,message)//状态，返回的路径，错误信息
                                }else{
                                        this.$message(message, '提示', {type: 'error'})//如果错误就返回报的错误；
                                }
                        },
                        //设置上传时本地要做的事情
                        beginBannerEdit(row){//点击的时候给他把id赋值
                                this.bannerDialog.id = row.id;
                                if(row.banner){
                                        row.banner.split(',').forEach(item =>{
                                                this.bannerDialog.fileList.push({
//                                                        上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]
                                                        name: item.slice(item.lastIndexOf('/') + 1),
                                                        url: item
                                                })
                                        });
                                }

                                this.bannerDialog.isShow = true;
                        },
                        //删除banner操作
                        bannerUploadRemoveHandler(file, fileList){
                                let filePath = file.response?file.response:file.url,
                                        target = this.productList.find(item => item.id === this.bannerDialog.id),
                                        bannerArr = target.banner.split(','),
                                        i = bannerArr.indexOf(filePath);
                                bannerArr.splice(i, 1);
                                let newBanner = bannerArr.length > 0?bannerArr.join(','):null;
                                return this.$confirm('删除后不可恢复，不可撤销，您确定要删除吗？', '警告', {type: 'warning'})
                                        .then(() =>{
                                                return this.$http({
                                                        url: '/product/banner/remove',
                                                        data: {
                                                                id: this.bannerDialog.id,
                                                                filePath,
                                                                newBanner
                                                        },
                                                });
                                        })
                                        .then(() =>{
                                                target.banner = newBanner;
                                                this.$message('删除成功', '提示', {type: 'success'})
                                        })
                                        .catch(() =>{
                                                this.bannerDialog.isShow = false;
                                                return Promise.reject();
                                        })//取消错误
                        },
                        //avatar修改
                        beginAvatarEdit(row){//数据的初始赋值，把自己定义的数据赋值到自己定义的对象中
                                this.avatarDialog.id = row.id;
                                if(row.avatar!==''){
                                        this.avatarDialog.fileList.push({
                                                name: row.avatar.slice(row.avatar.lastIndexOf('/') + 1),
                                                url: row.avatar,
                                        });
                                }

                                this.avatarDialog.isShow = true;
                        },

                        beforeAvatarUpload(file){
                                return this.$confirm('确认上传新图片替换原图片?', '提示', {type: 'info'})
                                        .then(() =>{
                                                const isJPG = file.type === 'image/jpeg';
                                                const isPNG = file.type === 'image/png';
                                                const isLt2M = file.size / 1024 / 1024 < 2;

                                                if((!isJPG) && (!isPNG)){
                                                        this.$message.error('上传头像图片必须是jpg或者png 格式!');
                                                }
                                                if(!isLt2M){
                                                        this.$message.error('上传头像图片大小不能超过 2MB!');
                                                }
                                                return (isJPG || isPNG) && isLt2M?Promise.resolve():Promise.reject();
                                        })
                                        .catch(() => Promise.reject())
                        },
	                //avatar上传成功之后
                        avatarUploadSuccessHandler({status, data, message}, file, fileList){
                                if(status === 200){
                                        if(fileList.length > 1) fileList.splice(0, 1);
                                        this.$message('上传替换成功', '提示', {type: 'success'});
                                        let target = this.productList.find(item => item.id === this.avatarDialog.id);
                                        target.avatar = data;
                                }else this.$message(message, '提示', {type: 'error'});
                        },
	                //
                        avatarBeforeRemoveHandler(){
                                if(this.$refs.avatarUpload.uploadFiles.length > 1){
                                        return true;
                                }else{
                                        return false;
                                }
                        }


                },
                watch: {
                        'search.mId'(){
                                this.search.sId = 0;
                        },
                        'search.sId'(){
                                this.search.cId = 0;
                        },
	                'edit.mId'(){
                                this.edit.sId=0;
	                },
	                'edit.sId'(){
	                        this.edit.cid=0;
	                },
                        'avatarDialog.isShow'(newValue){
                                if(!newValue){
                                        this.avatarDialog.id = 0;
                                        this.avatarDialog.fileList = [];
                                }
                        }
                        ,
                        'bannerDialog.isShow'(newValue){
                                if(!newValue){//当关闭banner上传组件的时候
                                        this.bannerDialog.id = 0;
                                        this.bannerDialog.fileList = [];

                                }
                        },
                        //新增关闭之后的数据初始化
                        'edit.isShow'(newValue){
                                if(!newValue){
                                        this.$refs.form.resetFields();
	                                //关闭后，数据初始化
                                        this.edit.mId = 0;
                                        this.edit.sId = 0;
                                        this.edit.model.name ='';
                                        this.edit.model.price = 0;
                                        this.edit.model.id = 0;
                                        this.edit.model.cid = 0;
                                        this.edit.model.remark = '';
                                }
                        },
                },
                created(){
                        this.$store.dispatch('category/init');
                        this.getProductList();
                },


        };
</script>

<style scoped>

	.width {
		width: 150px;
	}

	.button-sj {
		background-color: rgba(0, 0, 0, .1);
		border-color: rgba(0, 0, 0, .1);
	}
</style>