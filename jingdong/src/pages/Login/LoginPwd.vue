<template>
    <div class="list-wra">
        <ul class='list-input'>
            <li>
                <input type="text" placeholder="用户/邮箱/手机号" class='name' v-model="loginAll.name">
            </li>
            <li>
                <input type="password" placeholder="密码" class='pwd' v-model="loginAll.pwd">
                <span class='Fg-pwd'>忘记密码</span>
            </li>
        </ul>
        <span class='tips'></span>
        <a href="javascript:void(0);" class='sign-in' @click="login" :class="{ loginys:ipt1&&ipt2 }">登 录</a>
        <a href="" class='one-click-login'>一键登录</a>
    </div>
</template>

<script type="text/ecmascript-6">
    //        import Cookies from 'js-cookie';
    //        import http from '../../util/http.js'
    export default {
        data() {
            return {
                loginAll: {name: '', pwd: ''},
                ipt1: false,
                ipt2: false,
            }
        },

        computed: {},
        watch: {
            'loginAll.name': function (newVal) {
                if (newVal) {
                    this.ipt1 = true;
                }
            },
            'loginAll.pwd': function (newVal) {
                if (newVal) {
                    this.ipt2 = true;
                }
            }
        },
        methods: {
            login() {
                this.$http({url: '/users/login/pwd', data: this.loginAll}).then(token => {
                    this.$Cookies.set('token', token);//设置返回后的token
                    this.$router.replace(this.$Cookies.get('target') || '/Category');
                    this.$Cookies.remove('target');
                })
            },
        },
    }
</script>

<style scoped>
    .content > .list-wra > ul.list-input {

    }

    .content > .list-wra > ul.list-input > li {
        height: 30px;
        margin-top: 20px;
        padding: 10px 0;
        border-bottom: 1px solid #ccc;
        position: relative;
    }

    .content > .list-wra > ul.list-input > li > input {
        height: 100%;
        width: 100%;
        border: none;
        outline: none;
        font-size: 16px;
    }

    .content > .list-wra > ul.list-input > li > input.name {

    }

    .content > .list-wra > ul.list-input > li > input.pwd {

    }

    .content > .list-wra > ul.list-input > li > span.Fg-pwd {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        padding: 0 10px;
        border-left: 1px solid #ccc;
    }

    .content > .list-wra > span.tips {
        display: block;
        padding: 5px 0;
        height: 15px;
        line-height: 15px;
        font-size: 12px;
        color: #f23030;
    }

    .content > .list-wra > a {
        display: block;
        width: 100%;
        height: 50px;
        text-align: center;
        line-height: 50px;
        border-radius: 25px;
        font-size: 16px;
    }

    .content > .list-wra > a.sign-in {
        background-image: linear-gradient(90deg, #fab3b3, #ffbcb3 73%, #ffcaba);
        color: #fff;
    }

    .content > .list-wra > a.one-click-login {
        color: #f10000;
        margin-top: 10px;
        border: 1px solid #f23030;
        box-sizing: border-box;
    }

    .content > .list-wra > a.sign-in.loginys {
        background-image: linear-gradient(90deg, #f10000, #ff2000 73%, #ff4f18);
    }
</style>