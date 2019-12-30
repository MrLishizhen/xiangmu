<template>
    <div class="order-wra">
        <div class="header">
            <div class="back" onclick="javascript:history.back()">
                <span></span>
            </div>
            <h1>我的京东</h1>
            <div class='right-function'>
                <span></span>
            </div>
        </div>
        <!--基本思路  通过四个区域  全部，待付款 待收货 已完成--->
        <div class="content-wra">
            <div class="search">
                <div class="search-box">
                    <i class="magnifier"></i>
                    <input type="text" placeholder="商品名称/订单号" @focus="searchFunction" v-model="search.searchName">
                </div>
                <button class="cancel" v-show="search.isShowCancel" @click="search.isShowCancel=false">取消</button>
                <!---这个地方 要有取消和确定两种-->
                <button class="confirm" v-show="search.isShowConfirm">确定</button>
            </div>
            <div class="switch">
                <ul class="switch_nav">
                    <li v-for="item in switch_nav" :key="item.index" @click="switchFunction(item)">
                        <div :class="{active:item.isShow}" v-text="item.title"></div>
                    </li>

                </ul>
                <div class="arrow">

                </div>
            </div>
            <div class="content">
                <ul class="list">
                    <li v-for="item in list">
                        <div class="list_top">
                            <img :src="item.avatar" alt="">
                            <h3 v-text="item.productName"></h3>

                        </div>
                        <div class="subtotal">
                            <div class="count" v-text="`共${item.count}件商品`"></div>
                            <div class="price" v-text="`实付金额：${item.account}`"></div>
                        </div>
                        <div class="list_yejiao">
                            <button class="button">查看详情</button>
                            <button class="button" v-if="isShow===1">确认付款</button>
                            <button class="button" v-else-if="isShow===2">确认收货 </button>
                        </div>

                    </li>
                </ul>
                <div class="list_active" v-if="list.length==0">
                    <img src="./img/wdd.png" alt="">
                    <p class="list_active_title">您还没有相关的订单哟!</p>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "index",

        data() {
            return {

                search: {
                    searchName: '',
                    isShowCancel: false,
                    isShowConfirm: false,
                },
                isShow:0,
                list: [],//获取要用的数据
                switch_nav: [
                    {title: '全部', index: 0, isShow: true,},
                    {title: '待付款', index: 1, isShow: false,},
                    {title: '待收货', index: 2, isShow: false,},
                    {title: '已收货', index: 3, isShow: false,},
                ],


            }
        },
        methods: {
            //用来设置搜索栏
            searchFunction() {
                this.search.isShowCancel = true;
            },
            //选项卡
            switchFunction(node) {
                this.isShow=0;
                this.switch_nav.map((item) => item.isShow = false);
                this.switch_nav.find(item => item.index === node.index).isShow = true;
                //应该动态从某个地方请求数据


                switch(node.index){
                    case 0 :
                        this.list  = this.$store.state.orderList.list;
                        break;

                    case 1 :
                       this.list = this.$store.state.orderList.list.filter(item=>item.isPay===0);
                       this.isShow = 1;
                        break;
                    case 2 :
                        this.list = this.$store.state.orderList.list.filter(item=>item.isGoods===0);
                        this.isShow = 2;
                        break;
                    case 3 :
                        this.list = this.$store.state.orderList.list.filter(item=>item.isGoods===1);
                        break;
                }

            },
        },
        watch:{
          '$store.state.orderList.list'(newValue){
              this.list=newValue;
          }
        },
        created() {
            this.$store.dispatch('orderList/init');
            this.list=this.$store.state.orderList.list;
        }
    }
</script>

<style scoped>
    .order-wra {
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
        /*background: linear-gradient(180deg, #fff, #efefef);*/
        border-bottom: 1px solid #f3f3f3;
        flex-shrink: 0;
    }

    .header > * {
        line-height: 45px;
        text-align: center;
        font-size: 16px;
    }

    .header > .back {
        width: 42px;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;


    }

    .header > .right-function {
        width: 42px;
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;
    }

    .header > .back > span {
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

    .header > .right-function > span {
        width: 20px;
        height: 20px;
        display: inline-block;
        margin: 12px 0 0 0px;
        background: url(./img/right.png) no-repeat center center/100%;
    }

    .content-wra {
        flex-grow: 1;
        background: #f7f7f7;

    }

    .content-wra > .search {
        height: 46px;
        background-color: #fff;
        display: flex;
        align-items: center;
        padding: 0 10px;
        border-bottom: 1px solid #f3f3f3;
    }

    .content-wra > .search > .search-box {
        flex-grow: 1;
        height: 30px;
        background: #f7f7f7;
        display: flex;
        border-radius: 15px;
    }

    .content-wra > .search > .search-box > i {
        width: 15px;
        height: 15px;
        /*display:*/
        margin: 8px 0 0 10px;
        background: url(./img/fd.png) no-repeat center center/100%;
        flex-shrink: 0;
    }

    .content-wra > .search > .search-box > input {
        flex-grow: 1;
        padding-left: 5px;
    }

    .content-wra > .search > button {
        width: 50px;
        flex-shrink: 0;
        height: 30px;
        box-sizing: border-box;
        border: 1px solid #ccc;
        font-size: 14px;
        margin-left: 8px;
    }

    .content-wra > .switch {
        height: 44px;
        display: flex;
        background-color: #fff;
    }

    .content-wra > .switch > ul.switch_nav {
        flex-grow: 1;
        display: flex;
    }

    .content-wra > .switch > ul.switch_nav > li {
        width: 25%;
        text-align: center;
        line-height: 44px;
        font-size: 14px;
        color: #666;
    }

    .content-wra > .switch > ul.switch_nav > li > div {
        display: inline-block;
        box-sizing: border-box;
        position: relative;
    }

    .content-wra > .switch > ul.switch_nav > li > div.active::before {
        border-bottom: 3px solid #f2270c;
        content: '';
        display: block;
        color: #f2270c;
        position: absolute;
        bottom: 0px;
        width: 100%;
        z-index: 5;

    }

    .content-wra > .switch > .arrow {
        width: 43px;
        height: 100%;
    }

    .content-wra > .switch > .arrow {
        position: relative;
    }

    .content-wra > .switch > .arrow::before {
        content: "";
        position: absolute;
        left: 0;
        top: 16px;
        width: 1px;
        height: 12px;
        background-color: #e5e5e5;
    }

    .content-wra > .switch > .arrow::after {
        content: "";
        position: absolute;
        left: 50%;
        top: 50%;
        width: 10px;
        height: 6px;
        margin: -3px 0 0 -5px;
        background: url(./img/arrow.png) 50%/10px 6px no-repeat;
    }


    .content {
        background: #f7f7f7;
        padding:15px;
        overflow: hidden;
    }

    .content>.list{
        overflow: auto;
    }
    .content>.list>li{
        width:100%;
        background-color: #fff;
        margin-bottom: 10px;
        padding:10px 10px;
        box-sizing: border-box;

    }
    .content>.list>li>.list_top{
        display:flex;
    }
    .content>.list>li>.list_top>h3{
        font-size: 14px;
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        flex-grow: 1;
        align-self: center;
        padding:0 15px;
        font-weight: 500;
    }
    .content>.list>li>.list_top>img{
        width:75px;
        height:75px;
        flex-shrink: 0;

    }
.subtotal{
    font-size: 12px;
    color: #999;
    text-align: right;
    line-height: 21px;
    display:flex;
    justify-content: flex-end;
    align-items: center;
    margin-top:10px;

}

    .price{
        margin-left: 10px;
        font-size: 14px;
        color: #999;
        line-height: 21px;
        color: #151515;
    }
    .list_yejiao{
        margin-top:10px;
        text-align:right;
    }
    .button{
        text-align: center;
        width: 86px;
        height: 28px;
        line-height: 28px;
        border-radius: 4px;
        margin-left: 8px;
        border: 1px solid #ccc;
        font-size:14px;

    }
    .list_active {
        text-align: center;
        padding: 115px 10px 15px;
    }

    .list_active > img {
        width: 90px;
        height: 90px;
    }

    .list_active > .list_active_title {
        margin-top: 12px;
        font-size: 16px;
        color: #666;
        letter-spacing: .41px;
        line-height: 24px;
    }
</style>