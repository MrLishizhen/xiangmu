<template>
    <div class='page-warpper'>
        <div class="header">
            <div class="back" onclick="javascript:history.back()">
                <span></span>
            </div>
            <h1>我的京东</h1>
            <div class='right-function'>
                <span></span>
            </div>
        </div>
        <div class="content">
            <div class='personal'>
                <div class='personal-info'>
                    <div class='user-info'>
                        <img src="./img/userimg.png" alt="">
                        <div class='personal-wrap'>
                            <h3 class='user-name'>
                                用户名:<span class='name' v-text="model.users_List.name"></span>
                            </h3>
                        </div>
                    </div>
                    <div class='account-wrap' @click="hrefAccount">
                        <span></span>
                        账号管理
                    </div>
                    <div class='plus-black-wrap'>
                        <div class='inner'>
                            <div class='plus-title'>购买年卡得50元无门槛红包</div>
                            <div class='plus-subtitle'>立即前往</div>
                        </div>
                    </div>
                </div>

                <!-- 付款等 -->
                <div class='express-warpper'>
                    <div class='express'>
                        <div class='pending-payment'>
                            <div>待付款</div>
                        </div>
                        <div class='pending-received'>
                            <div>待收货</div>
                        </div>
                        <div class='after-sale'>
                            <div>退换/售后</div>
                        </div>
                        <div class='all-orders' @click="$router.push('/OrderList')">
                            <span v-text="model.shopping_List.length"></span>
                            <div>全部订单</div>
                        </div>
                    </div>
                </div>


                <div class='white-strip-warpper'>
                    <div class='white-strip'>
                        <div class=''>0张</div>
                        <span>京东卷</span>
                    </div>
                    <div class='white-strip'>
                        <div class=''>开通有礼</div>
                        <span>白条</span>
                    </div>
                    <div class='white-strip'>
                        <div class=''>0个</div>
                        <span>京豆</span>
                    </div>
                    <div class='white-strip'>
                        <div class=''>0元</div>
                        <span>红包</span>
                    </div>
                    <div class='white-strip'>
                        <div class='assets'></div>
                        <span>我的资产</span>
                    </div>
                </div>

                <div class='collection-war'>
                    <div class='collection'>
                        <div class='collection-div'>
                            <div>0</div>
                            <span>商品收藏</span>
                        </div>
                        <div class='collection-div'>
                            <div>0</div>
                            <span>店铺收藏</span>
                        </div>
                        <div class='collection-div'>
                            <div>25</div>
                            <span>我的足迹</span>
                        </div>

                    </div>
                </div>

                <div class='services'>
                    <div>
                        <img src="./img/6.png" alt="">
                        <span>我的预约</span>
                    </div>
                    <div>
                        <img src="./img/7.png" alt="">
                        <span>京东火车票</span>
                    </div>
                    <div>
                        <img src="./img/8.png" alt="">
                        <span>应用推荐</span>
                    </div>
                    <div>
                        <img src="./img/9.png" alt="">
                        <span>京东通信营业厅</span>
                    </div>
                    <div>
                        <img src="./img/10.png" alt="">
                        <span>用户福利</span>
                    </div>
                    <div>
                        <img src="./img/11.png" alt="">
                        <span>京东机票</span>
                    </div>
                    <div>
                        <img src="./img/12.png" alt="">
                        <span>京东酒店</span>
                    </div>
                </div>
            </div>


        </div>
        <div class="footer">
            <MiNav></MiNav>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    //组件相关的js代码
    //导入导航栏
    import MiNav from '../../components/MiNav.vue';
    //导出组件
    export default {
        name: 'profile',
        components: {MiNav},
        data() {
            return {
                model: {
                    users_List: [],
                    shopping_List: [],
                }
            }
        },
        methods: {
            hrefAccount(){
                this.$router.push({path:'/Account'})
            }
        },
        computed: {
            listData() {
                return this.$store.state.user.userList;
            },
            shoppingList() {
                return this.$store.state.user.shoppingList;
            }

        },
        watch: {
            listData(newValue) {
                this.model.users_List = newValue;
            },
            shoppingList(newValue) {
                this.model.shopping_List = newValue;
            }

        },

        beforeRouteUpdate(to, from, next) {
            if (this.Cookies.get('token')) {
                next();//放行
            } else {
                this.$router.replace('/Login');
            }
        },
        created() {
            this.$store.dispatch('user/userInit');
            this.$store.dispatch('user/shoppingList');
        },
    }
</script>


<style scoped>
    .page-warpper {
        width: 100%;
        height: 100%;
        flex-direction: column;
        display: flex;
    }

    /*头部*/
    .header {
        height: 44px;
        flex-shrink: 0;
        display: flex;
    }

    .header > .back {
        width: 40px;
        flex-shrink: 0;
        display: flex;
    }

    .header span {
        width: 20px;
        height: 20px;
        margin: 12px 0 0 10px;
    }

    .header > .back > span {
        background: url(./img/back.png) no-repeat center center/100%;
    }

    .header > h1 {
        flex-grow: 1;
        text-align: center;
        color: #333;
        font-size: 16px;
        line-height: 44px;
        font-weight: 400;

    }

    .header > .right-function {
        width: 40px;
        flex-shrink: 0;
        display: flex;
    }

    .header > .right-function > span {
        background: url(./img/right.png) no-repeat center center/100%;
    }

    /*中间内容区*/
    .content {
        flex-grow: 1;
        background-color: #f7f7f7;
    }

    .content > .personal {
        width: 100%;
        height: 100%;
    }

    .content > .personal > .personal-info {
        padding-top: 25px;
        background: linear-gradient(90deg, #eb3c3c, #ff7459);
        /* min-height: 110px; */
        /* display:flex; */
        position: relative;
        border-radius: 0 0 300px 300px / 0 0 20px 20px;
        overflow: hidden;

    }

    .content > .personal > .personal-info > .user-info {
        padding: 0 15px;
        display: flex;
    }

    .content > .personal > .personal-info > .user-info > img {
        width: 60px;
        height: 60px;
        flex-shrink: 0;
    }

    .content > .personal > .personal-info > .user-info > .personal-wrap {
        flex-grow: 1;
        line-height: 60px;
        padding-left: 15px;
        font-size: 16px;
        font-weight: 500;
        color: #333;
    }

    .content > .personal > .personal-info > .user-info > h3 {
    }

    .content > .personal > .personal-info > .user-info > h3 > span.name {
    }

    .content > .personal > .personal-info > .account-wrap {
        height: 40px;
        font-size: 12px;
        line-height: 40px;
        padding-left: 14px;
        color: rgba(76, 0, 0, 0.7);
        position: absolute;
        top: 0;
        right: 15px;
    }

    .content > .personal > .personal-info > .account-wrap > span {
        position: absolute;
        top: 14px;
        left: 0;
        display: block;
        width: 12px;
        height: 12px;
        background: url(./img/luo.png) no-repeat center center/100%;
    }

    .content > .personal > .personal-info > .plus-black-wrap {
        padding: 0 20px;
        height: 37px;
        margin-top: 10px;
    }

    .content > .personal > .personal-info > .plus-black-wrap > .inner {
        height: 100%;
        background: url(./img/plus.png) center center/100%;
        box-sizing: border-box;
        padding: 10px;
        display: flex;
    }

    .content > .personal > .personal-info > .plus-black-wrap > .inner > .plus-title {
        flex-grow: 1;
        font-size: 12px;
        color: #FFE678;
    }

    .content > .personal > .personal-info > .plus-black-wrap > .inner > .plus-title::before {
        display: block;
        height: 12px;
        width: 57px;
        content: '';
        float: left;
        margin-top: 3px;
        background: url(./img/zx.png) no-repeat center center/100%;
    }

    .content > .personal > .personal-info > .plus-black-wrap > .inner > .plus-title::after {
        content: '';
        width: 1px;
        height: 7px;
        background: #FFE678;
        display: block;
        float: left;
        margin: 5px 5px 0;
    }

    .content > .personal > .personal-info > .plus-black-wrap > .inner > .plus-subtitle {
        width: 58px;
        height: 18px;
        flex-shrink: 0;
        font-size: 12px;
        color: #FFE678;
    }

    /*订单*/
    .content > .personal > .express-warpper {
        margin: 15px 0;
        background-color: #fff;
    }

    .content > .personal > .express-warpper > .express {
        height: 72px;
        display: flex;

    }

    .content > .personal > .express-warpper > .express > div {
        width: 25%;
        line-height: 42px;
        text-align: center;
        color: #666;
        font-size: 12px;
    }

    .content > .personal > .express-warpper > .express > div > div {
        margin-top: 30px;
    }

    .content > .personal > .express-warpper > .express > div.pending-payment {
        background: url(./img/1.png) 50%/auto 20px no-repeat;
        background-position: 50% 25%;
    }

    .content > .personal > .express-warpper > .express > div.pending-received {
        background: url(./img/2.png) 50%/auto 20px no-repeat;
        background-position: 50% 25%;
    }

    .content > .personal > .express-warpper > .express > div.after-sale {
        background: url(./img/3.png) 50%/auto 20px no-repeat;
        background-position: 50% 25%;
    }

    .content > .personal > .express-warpper > .express > div.all-orders {
        background: url(./img/4.png) 50%/auto 20px no-repeat;
        background-position: 50% 25%;
        position: relative;
    }

    .content > .personal > .express-warpper > .express > div.all-orders > span {
        position: absolute;
        width: 15px;
        height: 15px;
        font-size: 10px;
        background-color: #E2231A;
        color: #fff;
        border-radius: 50%;
        line-height: 15px;
        text-align: center;
        right: 28px;
        top: 2px;
    }

    .content > .personal > .white-strip-warpper {
        height: 72px;
        display: flex;
        font-size: 12px;
        text-align: center;
        background-color: #fff;
    }

    .content > .personal > .white-strip-warpper > div {
        width: 25%;
        padding: 17px 0 10px;
        display: flex;
        flex-direction: column;
    }

    .content > .personal > .white-strip-warpper > div.white-strip > div {
        color: #e93b3d;
    }

    .content > .personal > .white-strip-warpper > div.white-strip > span {
        flex-grow: 1;
        text-align: center;
        line-height: 34px;
    }

    .content > .personal > .white-strip-warpper > div.white-strip > div.assets {
        height: 16px;
        flex-shrink: 0;
        background: url(./img/5.png) no-repeat center center/auto 100%;
    }

    .content > .personal > .collection-war {
        margin: 15px 0;
        background-color: #fff;
        height: 76px;
        padding: 17px 0 10px;
        box-sizing: border-box;
    }

    .content > .personal > .collection-war > .collection {
        display: flex;
        width: 100%;
        height: 100%;
    }

    .content > .personal > .collection-war > .collection > .collection-div {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        text-align: center;
    }

    .content > .personal > .collection-war > .collection > .collection-div > div {
        height: 18px;

    }

    .content > .personal > .collection-war > .collection > .collection-div > span {
        flex-grow: 1;
        font-size: 12px;
        color: #666;
        line-height: 34px;
    }

    .services {
        display: flex;
        flex-wrap: wrap;
        background-color: #fff;
    }

    .services > div {
        box-sizing: border-box;
        padding: 10px 0 8px;
        width: 25%;
        height: 65px;
        display: flex;
        flex-direction: column;
        text-align: center;
    }

    .services > div > img {
        width: 20px;
        height: 20px;
        margin: 0 auto 7px;
    }

    .services > div > span {
        font-size: 12px;
    }

    /*底部栏*/
    .footer {
        flex-shrink: 0;
        height: 55px;
    }


</style>