<template>
    <div class='page-warpper'>

        <div class="header">
            <!-- 头部内容 -->
            <a href="#" onclick="javascript:history.back()"></a>
            <h1>购物车</h1>
            <div class=''></div>
        </div>
        <div class="content">
            <!-- 下面内容区 -->
            <div class="content-hd" v-show="isLoad && list.length>0">
                <div class='region'>北京朝阳区</div>
                <div class='btn-edit' v-text="isEdit? '完成' : '编辑商品'" @click="isEdit=!isEdit"></div>
            </div>
            <div class="content-body">
                <ul class='list' v-show="isLoad">
                    <li v-for="item in list" :key="item.id">
                        <CartCheckBox :checked="item.check1" @toggle="item.check1=!item.check1" v-show="!isEdit"/>
                        <!--判断给子组件发送布尔值，初始显示-->
                        <!--通过子组件给父组件暴露的方法，来改变当前这个的check1的状态 从而改变选没选中-->
                        <CartCheckBox :checked="item.check2" @toggle="item.check2=!item.check2" v-show="isEdit"/>
                        <img :src='item.avatar'/>
                        <div class='product-info'>
                            <h3 class='name' v-text="item.name"></h3>
                            <span class='remark' v-text="item.remark"></span>
                            <p class='price' v-text="item.price"></p>
                        </div>

                        <Count :count="item.count"
                               @increase="increase(item)"
                               @decrease="decrease(item)"
                        ></Count>
                    </li>
                </ul>

                <div class="login-tips" v-show="!isLoad">
                    登录后可同步购物车哦!
                    <router-link to="/Login" class='login-button' @click="this.$Cookies.set('target','/Cart')">
                        登录
                    </router-link>
                    <!--<a href="/pages/login/index.html"  onclick="">登录</a>-->
                </div>
                <div class='login-tips-img' v-show="!isLoad">
                    <img src="./imgs/c1.png" alt="">
                    <p>登录后可同步购物车中商品</p>
                </div>
                <div class='empty-cart' v-show="isLoad && list.length===0">
                    <img src="./imgs/c1.png" alt="">
                    <p>你还没有选购商品哦~~</p>
                    <router-link to="/Category">去逛逛</router-link>
                </div>
            </div>
        </div>
        <div class="footer normal" v-show="!isEdit && isLoad && list.length>0">
            <div class='checkbox-all-wrapper'>
                <CartCheckBox :checked="isChecked1All" @toggle="toggleAllChecked1"/>
                <span>全选</span>
            </div>
            <div class='account-wrapeer'>
                总计:<span class='account' v-text="`￥${account}`"></span>
            </div>
            <div class='settlement' @click="settlement">去结算<span class='total-normal' v-text="`(${count})`"></span></div>
        </div>
        <div class='footer edit' v-show="isEdit && isLoad && list.length>0">
            <div class='checkbox-all-wrapper'>
                <CartCheckBox :checked="isChecked2All" @toggle="toggleAllChecked2"/>
                <span>全选</span>
            </div>
            <button class='btn-remove disabled' @click="remove">
                删除
            </button>
        </div>

    </div>

</template>

<script type="text/ecmascript-6">
    import CartCheckBox from './CartCheckBox.vue';
    import Count from '../../components/Count.vue';
    //	import http from '../../util/http.js';
    //	import Cookies from 'js-cookie';


    export default {

        components: {CartCheckBox, Count},//注册
        data() {
            return {
                isEdit: false,//是不是编辑状态
                list: [],
                isLoad: false,//判断是不是登录状态
				EditCheck:false,//编辑状态下的全选
				check:false,//普通状态的下的全选
            }
        },
        computed: {

            account() {//计算总价
                let result = 0;
                this.list.forEach(item => {
                    if (item.check1) result += item.price * item.count;
                })
                return result;
            },
            count() {//计算所有的个数
                let countAll = 0;
                this.list.forEach(item => {
                    if (item.check1) countAll += item.count;
                })
                return countAll;
            },
            //控制普通页面下的全选
            isChecked1All() {
                return this.list.every(item => item.check1);
            },
            //控制编辑状态下的全选
            isChecked2All() {
                return this.list.every(item => item.check2);
            }
        }
        ,
        methods: {
            //结算成功
            settlement(){//最后结算
                let id_s=[];
                this.list.forEach(item=>{
                    if(item.check1===true){
                        id_s.push(item.id);
                    }
                })
                sessionStorage.setItem('ids',JSON.stringify(id_s));
                this.$toast('结算成功，正在跳转结算页');
                this.$router.replace('/Orderconfirm')

            },

            toggleAllChecked1() {//绑定普通状态下的全选
                let flag = this.isChecked1All;
                console.log(1);
                console.log(flag);
                this.list.forEach(item => {
                    item.check1 = !flag;
                })
            },
            toggleAllChecked2() {//编辑转台下的全选
                let flag = this.isChecked2All;//得到当前所有i的状态
                console.log(this.isChecked2All);
                this.list.forEach(item => {
                    item.check2 = !flag;//取反
                })
            },
            decrease(item) {//点击- 发送ajax到服务器，在完成这一步之后再给item中的item的count-1，使子组件中的数据改变
                this.$http({url: `/cart/decrease/${item.id}`}).then(() => {
                    item.count = item.count - 1
                });
            },
            increase(item) {//+
                this.$http({url: `/cart/increase/${item.id}`}).then(() => {
                    item.count = item.count + 1
                });
            }
            ,
            remove() {
                if (!confirm('真删')) return;
                let ids = [];

                this.list.forEach(item => {
                    if (item.check2) ids.push(item.id);
                });
                this.$http({url: '/cart/remove', data: {ids: JSON.stringify(ids)}}).then(() => {
                    ids.forEach(item => {
                        let i = this.list.findIndex(item2 => item2.id === item);
						this.list.splice(i, 1);
                    })
                })

            },
        },
        created() {
            if (this.$Cookies.get('token')) {
                this.isLoad = true;
                this.$http({url: '/cart/List'}).then((item) => {
                    item.forEach(item => {
                        item.check1 = true;
                        item.check2 = false;
                    });
                    this.list = item;
                })
            }
        }
    }
</script>

<style scoped>

    .page-warpper {
        width: 100%;
        height: 100%;
        overflow: auto;
        display: flex;
        flex-direction: column;
    }

    .header {
        height: 44px;
        flex-shrink: 0;
        display: flex;
    }

    .header > a {
        width: 44px;
        height: 44px;
        background: url(./imgs/header-left.png) no-repeat center center/20px;
    }

    .header > h1 {
        flex-grow: 1;
        text-align: center;
        font-size: 18px;
        color: #333;
        height: 44px;
        line-height: 44px;
        font-weight: 400;
    }

    .header > div {
        width: 44px;
        height: 44px;
        background: url(./imgs/header-right.png) no-repeat center center/20px;
    }

    .content {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        overflow:hidden;
    }

    .content > .content-hd {
        height: 45px;
        flex-shrink: 0;
        padding: 0 10px;
        display: flex;
        justify-content: space-between;
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #eae9e9;
    }

    .content > .content-hd > .region {
        padding-left: 18px;
        position: relative;
        color: #999;
        font-size: 14px;
        height: 100%;
        line-height: 45px;
    }

    .content > .content-hd > .region::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 0;
        margin-top: -8px;
        background-image: url(//wq.360buyimg.com/wxsq_trade/cart_vue/main/images/sprite.img_default_437_1ecf6ebc.png);
        background-position: -100px -62px;
        background-size: 116px 110px;
        width: 13px;
        height: 15px;
    }

    .content > .content-hd > .btn-edit {
        font-size: 14px;
        height: 100%;
        line-height: 45px;
    }

    .content > .content-body {
        flex-grow: 1;
        background-color: #f7f7f7;
        overflow:auto;
    }

    .content > .content-body > .login-tips {
        height: 60px;
        text-align: center;
        line-height: 60px;
        background-color: #fff;
    }

    .content > .content-body > .login-tips > a {
        display: inline-block;
        margin-left: 10px;
        padding: 0 21px;
        height: 30px;
        border-radius: 4px;
        line-height: 30px;
        text-align: center;
        color: #fff;
        background-color: #f2270c;
    }

    .content > .content-body > .login-tips-img {
        padding: 70px 0 65px;
        text-align: center;

    }

    .content > .content-body > .login-tips-img > img {
        width: 90px;
        height: 90px;
    }

    .content > .content-body > .login-tips-img > p {
        font-size: 16px;
        color: #333;
        line-height: 16px;
        margin-top: 15px;
    }

    .content > .content-body > ul.list {
        background-color: #fff;
    }

    .content > .content-body > ul.list > li {
        display: flex;
        margin-bottom: 10px;
        align-items: center;
        padding: 10px 0;
        position: relative;
        border-bottom: 1px solid #f7f7f7;
    }

    .content > .content-body > ul.list > li > i {
        margin-left: 10px;
        flex-shrink: 0;
    }

    .content > .content-body > ul.list > li > img {
        width: 80px;
        height: 80px;
        flex-shrink: 0;
        margin-left: 40px;
    }

    .content > .content-body > ul.list > li > .product-info {
        padding-left: 20px;
        flex-grow: 1;

    }

    .content > .content-body > ul.list > li > .product-info > h3.name {
        font-size: 16px;
        padding-right: 10px;
        margin-bottom: 3px;
        isplay: -webkit-box;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        color: #333;
        font-weight: 500;
    }

    .content > .content-body > ul.list > li > .product-info > span.remark {
        display: inline-block;
        font-size: 12px;
        margin: 10px 0;
        color: #666;
        background-color: #f7f7f7;
        padding: 3px 5px;
    }

    .content > .content-body > ul.list > li > .product-info > p.price {
        color: #f2270c;
        font-size: 16px;
    }

    .footer {
        height: 50px;
        flex-shrink: 0;
    }

    .footer > .checkbox-all-wrapper {
        width: 40px;
        height: 100%;
        flex-shrink: 0;
        text-align: center;
        float: left;
        padding-top:10px;
        box-sizing: border-box;
    }

    .footer > .checkbox-all-wrapper > span {
        font-size: 12px;
        display: block;
        color: #999;
    }

    .footer > .account-wrapeer {
        float: left;
        width: calc(100% - 160px);
        text-align: right;
        line-height: 50px;
        font-size: 16px;
        font-weight: 700;
    }

    .footer > .account-wrapeer > span {
        color: #f2270c;
    }

    .footer > .settlement {
        float: right;
        width: 110px;
        height: 50px;
        background-image: linear-gradient(135deg, #f2140c, #f2270c 70%, #f24d0c);
        text-align: center;
        line-height: 50px;
        color: #fff;
        font-weight: 700;
        margin-left: 10px;
    }

    .footer > .btn-remove {
        width: 76px;
        height: 30px;
        float: right;
        margin-right: 10px;
        background-color: #f2270c;
        color: #fff;
        border-radius: 5px;
        margin-top:10px;
    }


    .empty-cart {
        padding: 0 30px;
        text-align: center;
    }

    .empty-cart > img {
        width: 80px;
        height: 80px;

    }

    .empty-cart > a {
        display: inline-block;
        margin-left: 10px;
        padding: 0 21px;
        height: 30px;
        border-radius: 4px;
        line-height: 30px;
        text-align: center;
        color: #fff;
        background-color: #f2270c;
    }
</style>