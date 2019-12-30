<template>
    <div class="search">
        <div class="search-left">
            <div class="left"></div>
        </div>
        <div class="content">
            <div class='search-wra'>
                <i class="search-content"></i>
                <input type="text" placeholder="请输入搜索内容" class="search-input">
            </div>
        </div>
        <div class="search-right">
            <div class="right" @click="isShow_ul"></div>
            <ul class="search-ul" v-show="model.ul_isShow">
                <li>
                    <router-link to="">
                        <i class='function-list-i'></i>
                        <span>首页</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="">
                        <i class='function-list-i'></i>
                        <span>分类搜索</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="">
                        <i class='function-list-i'></i>
                        <span>购物车</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="">
                        <i class='function-list-i'></i>
                        <span>我的京东</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="">
                        <i class='function-list-i'></i>
                        <span>浏览记录</span>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "serach",
        data(){
            return {
                model:{
                    ul_isShow:false,
                }
            }
        },
        methods:{
            isShow_ul(){
                this.model.ul_isShow=!this.model.ul_isShow;
            }
        }

    }
</script>

<style scoped>
    .search {
        height: 44px;
        display: flex;
        width: 100%;
    }

    .search-left {
        width: 40px;
        display: flex;
        align-items: center;
        flex-shrink: 0;
    }

    .content {
        flex-grow: 1;
    }

    .left {
        width: 20px;
        height: 20px;
        margin: auto auto;
        background: url(../assets/back.png) no-repeat center center/100%;
    }

    .search-right {
        width: 40px;
        height: 44px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        position: relative;
    }

    .search-ul {
        position: absolute;
        width: 125px;
        top: 53px;
        right: 10px;
        display: block;
        background-color: rgba(0, 0, 0, .7);
        border-radius: 5px;
    }
    .search-ul:before{
        position:absolute;
        top:-8px;
        right:5px;
        content:'';
        border-width:4px;
        border-style:solid;
        border-left-color:transparent;
        border-top-color:transparent;
        border-right-color:transparent;
        border-bottom-color: rgba(0,0,0,.9);
    }
    .search-ul > li {
        height: 40px;
    }

    .search-ul > li > a {
        display: block;
        line-height: 40px;
        color: #fff;
        font-weight: 400;
        font-size: 14px;
    }

    .search-ul > li > a > i {
        width: 40px;
        height: 40px;
        display: inline-block;
        vertical-align: middle;
    }

    .search-ul > li:nth-child(1) > a > i {
        background: url(../assets/c2.png) no-repeat center center/50%;
    }

    .search-ul > li:nth-child(2) > a > i {
        background: url(../assets/c3.png) no-repeat center center/50%;
    }

    .search-ul > li:nth-child(3) > a > i {
        background: url(../assets/c5.png) no-repeat center center/50%;
    }

    .search-ul > li:nth-child(4) > a > i {
        background: url(../assets/c6.png) no-repeat center center/50%;
    }

    .search-ul > li:nth-child(5) > a > i {
        background: url(../assets/c7.png) no-repeat center center/50%;
    }

    .right {
        width: 20px;
        height: 20px;
        background: url(../assets/right-dian.png) no-repeat center center/100%;
        margin: auto;
    }

    .search-content {
        flex-shrink: 0;
        height: 15px;
        width: 18px;
        display: block;
        margin: 8px 0 0 15px;
        background: url('../assets/jd-sprites.png') no-repeat center center/100%;
        background-position: -80px 0;
        background-size: 200px;
        float: left;
    }

    .search-wra {
        height: 30px;
        margin-top: 7px;
        background-color: #f7f7f7;
        border-radius: 15px;
        display: flex;
    }

    .search-input {
        margin-left: 10px;
        height: 30px;
        font-size: 12px;
        width: auto;
        flex-grow: 1;
    }
</style>