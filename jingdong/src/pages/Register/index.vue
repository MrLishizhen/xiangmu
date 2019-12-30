<template>

    <div class="page-warpper">
        <div class="header">
            <div class='back' @click="$router.back()"></div>
            <div class='header-title'>京东账号注册</div>
        </div>
        <div class='content'>
            <ul class='list-input'>
                <li>
                    <input type="text" placeholder="用户名" class='name' v-model="model.name">
                </li>
                <li>
                    <input type="password" placeholder="密码" class='pwd' v-model="model.pwd">
                </li>
                <li>
                    <input type="password" placeholder="确认密码" class='pwd-verification' v-model="model.pwd_v">
                </li>
                <li>
                    <input type="text" placeholder="电话" maxlength='11' class='phone' v-model="model.phone">
                </li>
            </ul>
            <span class='tips'></span>
            <button  class='sign-in' @click="add">注册</button>
            <p class='notes'>注册即代表您已同意<a href="" class=''>京东隐私政策</a></p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return{
                model:{
                    name:'',
                    pwd:'',
                    pwd_v:'',
                    phone:'',
                }
            }
        },

        methods:{
            add(){
                if(this.model.name&&this.model.pwd&&this.model.pwd_v&&this.model.phone){
                    if(this.model.pwd != this.model.pwd_v){
                        this.$toast('两次密码不一致哦！');
                        return;
                    }
                    if(this.model.phone[0] =='1' && this.model.phone.length == 11){
                        this.$http({url:'/users/adduser',data:{name:this.model.name,pwd:this.model.pwd,phone:this.model.phone}}).then(retules =>{
                            if(retules == 0){
                                this.$toast('抱歉!该用户或者电话已经被注册');
                                return;
                            }else{
                                this.$toast('注册成功,已为您自动登录');
                                this.$Cookies.set('token',retules);
                                setTimeout(()=>{this.$router.push('/Home')}, 500);
                            }
                        })

                    }else{
                        this.$toast('请输入正确的电话！！');
                    }
                }else{
                    this.$toast('请完整的输入信息！！');
                }
            }
        }
    }
</script>

<style scoped>
    .page-warpper{
        width:100%;
        height:100%;
        display:flex;
        flex-direction: column;

    }
    .header{
        height:44px;
        padding:0 20px;
        /* display:flex; */
        align-items: center;
        position:relative;
        border-bottom: 1px solid #efefef;
    }
    .header>.back{
        width:24px;
        height:24px;
        position:absolute;
        top:50%;
        left:20px;
        transform: translateY(-50%);
        background-image:url(./img/back.png);
        background-size: 100%;
    }
    .header>.header-title{
        position:absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);

    }
    .content{
        flex-grow:1;
        padding:0 20px;
    }
    .content>ul.list-input{
        margin-top:20px;
    }
    .content>ul.list-input>li{
        height:30px;
        margin-top:20px;
        padding:10px 0;
        border-bottom: 1px solid #ccc;
        position:relative;
    }
    .content>ul.list-input>li>input {
        height:100%;
        width:100%;
        border:none;
        outline:none;
        font-size:16px;
    }
    .content>ul.list-input>li>input.name{

    }
    .content>ul.list-input>li>input.pwd{

    }

    .content>span.tips{
        display:block;
        padding:5px 0;
        height:15px;
        line-height:15px;
        font-size:12px;
        color:#f23030;
    }
    .content>button{
        display:block;
        width:100%;
        height:50px;
        text-align: center;
        line-height:50px;
        border-radius: 25px;
        font-size:16px;
    }
    .content>.sign-in{
        display:block;
        background-image: linear-gradient(90deg,#f10000,#ff2000 73%,#ff4f18);
        color:#fff;
    }

    .content>.notes{
        text-align: center;
        font-size:12px;
        color:rgba(0,0,0,.2);
    }
    .content>.notes>a{
        color: #4a90e2;
    }
  </style>