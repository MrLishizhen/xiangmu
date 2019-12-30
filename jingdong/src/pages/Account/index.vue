<template>
    <div class='page-warpper'>
        <div class="header">
            <div class="back" @click="$router.replace('/Home')">
                <span></span>
            </div>
            <h1>账号设置</h1>
            <div class='right-function'>
                <span></span>
            </div>
        </div>
        <div class="content">
            <div class='account-section'>
                <div class='administration'>账号管理</div>
                <div class='account-title'>
                    <img src="./img/userimg.png" alt="">
                    <h3>用户名: <span v-text="userList.name"></span></h3>
                    <div class='account-tips'>当前登录用户</div>
                </div>

            </div>

            <div class='address-war'>
                <router-link to="/Address">
                    <span class='address-title'>收货地址管理</span>
                    <span class='address'>管理我的地址</span>
                </router-link>

            </div>

            <ul class='address-ul'>
                <li class='item'>
					<router-link to="/Testing">
						<span class='address-title'>修改手机号</span>
						<span class='address phone' v-text="userList.phone"></span>
					</router-link>
                </li>
                <li class='item'>
                    <router-link to="">
                        <span class='address-title'>账号密码更改</span>
                        <span class='address'></span>
                    </router-link>
                </li>
                <li class='item'>
                    <router-link to="">
                        <span class='address-title'>支付密码</span>
                        <span class='address'>未设置</span>
					</router-link>

                </li>
                <li class='item'>
                    <router-link to="">
                        <span class='address-title'>关联账号</span>
                        <span class='address'></span>
					</router-link>
                </li>
            </ul>

        </div>
        <div class='footer'>
            <button class='sign-out' @click="sign_out">退出登录</button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {
                userList: [],
            }
        }

        ,
        methods:{
            sign_out(){
                this.$Cookies.remove('token');
                this.$router.replace('/Home');
            }
        }
        ,
        computed: {
            // listData() {
            //     return this.$store.state.user.userList;
            // },

        }
        ,
        watch: {
            // listData(newValue) {
            //     this.userList = newValue;
            // },
            //可以直接监听仓库中的内容
            '$store.state.user.userList'(newValue) {
                this.userList=newValue;
            },
            'userList.phone'(){//把值改为****
                let str=this.userList.phone.trim();
                let newStr=str.replace(str.substring(4,8),"****");
                this.userList.phone=newStr;

            }
        },

        created() {
            this.$store.dispatch('user/userInit');
        },
    };
</script>

<style scoped>
    .page-warpper {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    a {
        color: #999;
    }

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


    .content {
        flex-grow: 1;
        background-color: #f7f7f7
    }

    .content > .account-section {
        background: #fff;
        position: relative;
        padding: 12px 10px 0;
        margin-bottom: 15px;

    }

    .content > .account-section > .administration {
        color: #333;
        font-size: 16px;
    }

    .content > .account-section > .account-title {
        background: #fff9f9;
        border: 1px solid #e93b3d;
        height: 85px;
        padding: 15px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        overflow: hidden;
        font-size: 12px;
        border-radius: 10px;
        margin-top: 10px;
        position: relative;
    }

    .content > .account-section > .account-title > img {
        width: 45px;
        height: 45px;
    }

    .content > .account-section > .account-title > h3 {
        margin-left: 15px;
        flex-grow: 1;
        font-weight: 500;
    }

    .content > .account-section > .account-title > h3 > span {
        color: #333;
    }

    .content > .account-section > .account-title > .account-tips {
        position: absolute;
        right: 0;
        top: 0;
        padding: 1px 10px;
        background-color: #ffe4e4;
        color: #e2231a;
        border-top-right-radius: 10px;
        border-bottom-left-radius: 10px;
    }

    .content > .address-war {
        line-height: 44px;
        height: 44px;
        padding: 0 27px 0 10px;
        position: relative;
        background-color: #fff;
    }

    .content > .address-war::after {
        content: "";
        position: absolute;
        display: inline-block;
        right: 10px;
        width: 12px;
        height: 12px;
        background-size: 12px;
        background-image: url(./img/you.png);
        top: 50%;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
    }

    .content > .address-war > a {
        justify-content: space-between;
        display: flex;
        color: #999;
    }

    .content > .address-war > a > .address-title {
        color: #666;
    }

    .content > .address-war > .address {
        font-size: 12px;
        color: #999;
    }

    .content > ul.address-ul {
        height: auto;
        margin-top: 15px;


    }

    .content > ul.address-ul::after {
        display: none;
    }

    .content > ul.address-ul > li.item {
        line-height: 44px;
        height: 44px;
        padding: 0 27px 0 10px;
        position: relative;
        background-color: #fff;
    }

    .content > ul.address-ul > li.item::after {
        content: "";
        position: absolute;
        display: inline-block;
        right: 10px;
        width: 12px;
        height: 12px;
        background-size: 12px;
        background-image: url(./img/you.png);
        top: 50%;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
    }

    .content > ul.address-ul > li.item > a {
        display: flex;
        justify-content: space-between;
    }

    .content > ul.address-ul > li.item > a {
    }

    .content > ul.address-ul > li.item > a > .address-title {
        color: #666;
    }

    .footer {
        height: 50px;
        padding: 0 15px;
        background-color: #f7f7f7
    }

    .footer > .sign-out {
        width: 100%;
        height: 100%;
        border: 1px solid #e93b3d;
        border-radius: 10px;
        background-color: #e93b3d;
        color: #fff;
    }

</style>