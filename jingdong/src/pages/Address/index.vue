<template>
    <div class="address">
        <div class='page-warpper list' v-show="model.isShows.editIsShow">
            <div class="header">
                <a href="#" onclick="javascript:history.back()"><span>&lt;</span></a>
                <h1>收货地址</h1>
            </div>
            <div class='content'>
                <div class='address-list' v-if="model.isShows.emptyIsShow">
                    <ul class='ul-list'>

                        <li v-for="item in model.list" :key="item.id" @click="model.isAddress?jump(item.id):null">
                            <div class='list-left'>
                                <p class='list-info'>
                                    <span class='name' v-text="item.receiveName"></span>
                                    <span class='phone' v-text="item.receivePhone"></span>
                                </p>
                                <p class='adress-p' v-text="`${item.receiveRegion} ${item.receiveDetail}`"></p>
                                <button class='btn-default' :class="item.isDefault==0 ? '':'default'"
                                        v-text="item.isDefault ? '默认地址' : '设为默认地址'" @click.stop="address_default(item.id)"></button>
                            </div>
                            <div class='list-button' @click.stop="edit(item.id)">编辑</div>


                        </li>
                    </ul>
                </div>
                <div class='address-empty' v-else>
                    <img src="./empty.png" alt="">
                    <p>该账号还没有收货地址</p>
                </div>
            </div>
            <div class="footer">
                <button class='add-address' @click="editIsShow">新增地址</button>
            </div>
        </div>

        <!--编辑转态-->
        <div class='page-warpper edit' v-show="!model.isShows.editIsShow">
            <div class="header">
                <a href="#" class='edit-back' @click="model.isShows.editIsShow=true"><span>&lt;</span></a>
                <h1>编辑地址</h1>

            </div>
            <div class='content'>
                <form action="">
                    <div class='edit-address'>
                        <span>收货人:</span>
                        <input type="text" class='receiveName' placeholder="请输入收货人的姓名" value=''
                               v-model="model.editAddress.receiveName">
                    </div>
                    <div class='edit-address'>
                        <span>电话:</span>
                        <input type="text" class='receivePhone' placeholder="请输入收货人的电话" value=''
                               v-model="model.editAddress.receivePhone">
                    </div>
                    <div class='edit-address'>
                        <span>所在地区:</span>
                        <input type="text" class='receiveRegion' placeholder="请输入收货人的所在地区" value=''
                               v-model="model.editAddress.receiveRegion">
                    </div>
                    <div class='edit-address'>
                        <span>详细地址:</span>
                        <input type="text" class='receiveDetail' placeholder="请输入收货人的详细地址" value=''
                               v-model="model.editAddress.receiveDetail">
                    </div>
                </form>


                <div class='remove-war'>
                    <button class='deposit' @click="save">保存</button>
                    <button class='btn-remove' v-if="!model.isEdit" @click="remove">删除当前地址</button>
                </div>
            </div>

        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import tishi from '../../components/Tishi.vue'

    export default {

        name: 'Address',
        data() {
            return {
                model: {
                    isAddress:false,//是否是从结算页过来的
                    isEdit: true,//true表示新增
                    list: [],//用户的所有地址
                    isShows: {//保存的是显示和隐藏
                        emptyIsShow: true,
                        editIsShow: true,
                    },
                    editAddress: {//保存的是地址
                        id: null,
                        isDefault: 0,
                        name: this.$store.state.user.userList.name,
                        receivePhone: '',
                        receiveName: '',
                        receiveRegion: '',
                        receiveDetail: '',
                    },
                },

            }
        },
        methods: {
            //跳转会结算页面
            jump(id){
                this.$router.push({path:'/Orderconfirm',query:{id:id}});
            },
            //改变编辑或者正常模式
            editIsShow() {//编辑  新增模式
                this.model.isShows.editIsShow = false;

            },
            edit(id){
                this.model.isShows.editIsShow = false;
                this.model.isEdit=false;
                let item = this.model.list.find(item=>item.id===id);
                this.model.editAddress.id=item.id;
                this.model.editAddress.isDefault=item.isDefault;
                this.model.editAddress.receivePhone=item.receivePhone;
                this.model.editAddress.receiveName=item.receiveName;
                this.model.editAddress.receiveRegion=item.receiveRegion;
                this.model.editAddress.receiveDetail=item.receiveDetail;
            },
            remove(){
                this.$http({url:`/address/remove/${this.model.editAddress.id}`,method:'get'}).then(()=>{
                    //提示用户删除成功

                    let i = this.model.list.findIndex(item=>item.id===this.model.editAddress.id);
                    this.model.list.splice(i,1);
                    this.$toast('删除成功');
                    this.model.isShows.editIsShow=true;

                })
            }
            ,
            save(id) {//用来新增或者修改地址
                if (this.model.isEdit) {
                    this.$http({
                        url: '/address/add',
                        data: {jsonStr: JSON.stringify(this.model.editAddress)}
                    }).then(newId => {
                        this.model.editAddress.id = newId;
                        this.model.list.push(this.model.editAddress);
                        this.model.isShows.editIsShow = true;
                        //提示用户成功
                        this.$toast('新增成功！！');
                    })
                } else {
                    this.$http({url: '/address/update', data: {jsonStr: JSON.stringify(this.model.editAddress)}}).then(item => {
                        this.model.isShows.editIsShow = true;

                        let i = this.model.list.findIndex(item=>item.id===this.model.editAddress.id);
                        this.model.list.splice(i,1,this.model.editAddress);
                        //提示用户成功
                        this.$toast('修改成功！！');
                    })
                }
            },
            //设置默认地址
            address_default(id){

                this.$http({url:`/address/default/${id}`,method:'get'}).then(()=>{
                    this.$toast('默认地址修改成功');
                    this.model.list.find(item=>item.isDefault===1).isDefault=0;
                    this.model.list.find(item=>item.id===id).isDefault=1;


                })
            }

        },
        watch: {
            'model.list'(newValue) {
                this.model.list = newValue;
            },

        },
        created() {
            this.$http({url: '/address/list'}).then(result => {
                return this.model.list = result;
            });
            let address = this.$route.query.address;
            if(address){
                this.model.isAddress=true;
            }
        }
    }
</script>

<style scoped>
    .address {
        width: 100%;
        height: 100%;
    }

    .page-warpper {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        background: #f7f7f7;
    }

    .header {
        flex-shrink: 0;
        height: 45px;
        display: flex;
        position: relative;
        background: linear-gradient(180deg, #fff, #efefef);
    }

    .header > * {
        line-height: 45px;
        text-align: center;
        font-size: 16px;
    }

    .header > a {
        width: 42px;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;


    }

    .header > h1 {
        font-weight: normal;
        width: 100%;
    }


    .list > .content {
        flex-grow: 1;
    }

    .list > .content > .address-empty {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .list > .content > .address-empty > img {
    }

    .list > .content > .address-empty > p {
    }

    .list > .footer {
        height: 46px;
        padding: 0 15px;
    }

    .list > .footer > button {
        width: 100%;
        color: #fff;
        border-radius: 10px;
        background: #e4393c;
        height: 46px;
        flex-shrink: 0;
    }

    .list > .content > .address-list {
        width: 100%;
        height: 100%;
    }

    .list > .content > .address-list > .ul-list {

        background-color: #fff;
    }

    .list > .content > .address-list > .ul-list > li {
        display: flex;
        padding: 10px 0px 10px 15px;
        border-bottom: 1px solid #b0b0b0;
    }

    .list > .content > .address-list > .ul-list > li > .list-left {
        flex-grow: 1;

    }

    .list > .content > .address-list > .ul-list > li > .list-left > p.list-info {
        height: 24px;
        margin-top: 5px;
        color: #333;
    }

    .list > .content > .address-list > .ul-list > li > .list-left > p.list-info > span.name {
        float: left;
        font-size: 16px;


    }

    .list > .content > .address-list > .ul-list > li > .list-left > p.list-info > span.phone {
        /*float: right;*/
        font-size: 14px;
        margin-left: 15px;
    }

    .list > .content > .address-list > .ul-list > li > .list-left > p.adress-p {
        color: #666;
        font-size: 14px;
    }

    .list > .content > .address-list > .ul-list > li > .list-button {
        width: 50px;
        flex-shrink: 0;
        line-height: 70px;
        text-align: center;
        font-size: 14px;
        color: #e93b3d;
    }

    .default {
        color: red;
    }


    .edit > .content {
        background-color: #fff;
    }

    .edit > .content > from {
    }

    .edit > .content > form > .edit-address {
        padding: 10px;
        display: flex;
        line-height: px;
        background-color: #fff;
        height: 40px;
        border-bottom: 1px solid #cbcbcb;
    }

    .edit > .content > form > .edit-address > span {
        padding: 0 10px;
        font-size: 14px;
        color: #999;
        width: 65px;
        display: inline-block;
        flex-shrink: 0;
        line-height: 40px;
    }

    .edit > .content > form > .edit-address > input {
        border: 0 none;
        font-size: 14px;
        flex-grow: 1;
        outline: none;
        color: #333;
        line-height: 40px;
    }

    .edit > .content > .remove-war {
        padding: 0 10px;
    }

    .edit > .content > .remove-war > .btn-remove,
    .edit > .content > .remove-war > .deposit {
        width: 100%;
        height: 46px;
        margin: 20px 0;
        border-radius: 4px;
        border-color: #ddd;
        font-size: 16px;
        color: #333;
        background: #f3f3f3;

    }

    .edit > .content > .remove-war > .deposit {
        background: #e4393c;
        color: #fff;
        margin-bottom: 0;
    }

</style>