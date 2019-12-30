<template>

    <div class="page-wra">
        <div class="header">
            <a onclick="javascript:history.back()">
                <span></span>
            </a>
            <h1>手机号验证</h1>
        </div>
        <div class="content">
            <div class='modify'>
                <span>输入手机号</span>
                <input type="text" placeholder="请输入电话号码" v-model="input">
            </div>
            <button class='submission' @click='verification'>提交验证</button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {
                input:null,
            }
        },
        methods:{
            verification(){
                this.$http({url:'/users/modify',data:{jsonStr:JSON.stringify(this.input)}}).then(result=>{
                    if(result.length>0){
                        this.$router.push({path:'/Phonemodify'});
                    }else{
                        this.$confirm('手机号错误','提示',{type:'info'})
                    }

                })

            }
        },
    }
</script>

<style scoped>
    .page-wra {

        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
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

    .header > a > span {
        width: 20px;
        height: 20px;
        display: inline-block;
        margin: 12px 0 0 10px;
        background: url(./img/left.png) no-repeat center center/100%;
    }

    .header > h1 {
        font-weight: normal;
        width: 100%;
    }


    .content {
        flex-grow: 1;
        /* background-color: #ccc; */
    }

    .content > .modify {
        height: 60px;
        margin-top: 40px;
        display: flex;
    }

    .content > .modify > span {
        width: 20%;
        text-align: center;
        line-height: 60px;
        font-size:14px;
        padding-right: 5px;
        margin-left: 15px;
        flex-shrink: 0;
    }

    .content > .modify > input {
        height: 30px;
        margin-top: 15px;
        margin-right: 15px;
        border: 1px solid #ccc;
        padding-left: 5px;
        outline: none;
        font-size: 15px;
        flex-grow: 1;
    }

    .submission {

        display: block;
        width: 80%;
        border-radius: 10px;
        box-sizing: border-box;
        margin: 15px auto 0;
        height: 45px;

        background-color: #F10000;
        color: #fff;
    }
</style>