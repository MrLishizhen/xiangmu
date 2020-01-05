<template>
    <div class="page-warpper">


        <div class="header">
            <!-- 分类跳转 -->
            <div class='catrgory-btn'>
                <span class='catrgory-btn-title'></span>
            </div>
            <!-- 中间搜索 -->
            <div class='search-warpper'>
                <div class='search'>
                    <i class='search-left-logo'></i>
                    <i class='search-left-img'></i>
                    <input type="text" class='search-input' placeholder="请输入商品名!">
                </div>
            </div>
            <!-- 右侧 -->
            <div class='not-sign-in header-right' v-show="!isLogin">
                <span class='not-sign-in-title' @click="$router.push('/Login')">登录</span>
            </div>
            <div class='sign-in header-right' @click="$router.push('/Profile')" v-show="isLogin"></div>
        </div>
        <div class="content-warpper  hide-scroll-bar">
            <div class="content">
                <div class="banner" ref="banner">
                    <ul class="scroll" ref="banner_ul">
                        <li v-for="(item,i) in banner" :key="i">
                            <router-link to="">
                                <img :src="item.path" alt="">
                            </router-link>
                        </li>
                    </ul>
                    <div class='indicator'>
                        <span v-for="(item,i) in banner.length-2" :key="i" :class="{active:i===index}"></span>
                    </div>
                </div>

                <div class='box_list' ref="box_list">
                    <div class='scroll'>
                        <div class=''>
                            <router-link to='./Category'>
                                <img src="./imgs/h-3.png" alt="">
                                <span>京东超市</span>
                            </router-link>
                            <router-link to='./Category'>
                                <img src="./imgs/h-4.png" alt="">
                                <span>数码电器</span>
                            </router-link>
                            <router-link to='./Category'>
                                <img src="./imgs/h-5.png" alt="">
                                <span>京东服饰</span>
                            </router-link>
                            <router-link to='./Category'>
                                <img src="./imgs/h-6.png" alt="">
                                <span>京东生鲜</span>
                            </router-link>
                            <router-link to='./Category'>
                                <img src="./imgs/h-7.png" alt="">
                                <span>京东到家</span>
                            </router-link>
                            <router-link to='./Category'>
                                <img src="./imgs/h-8.png" alt="">
                                <span>充值缴费</span>
                            </router-link>
                            <router-link to='./Category'>
                                <img src="./imgs/h-9.png" alt="">
                                <span>9.9元拼</span>
                            </router-link>
                            <router-link to='./Category'>
                                <img src="./imgs/h-10.png" alt="">
                                <span>领券</span>
                            </router-link>
                            <router-link to='./Category'>
                                <img src="./imgs/h-11.png" alt="">
                                <span>赚钱</span>
                            </router-link>
                            <router-link to='./Category'>
                                <img src="./imgs/h-12.png" alt="">
                                <span>PLUS会员</span>
                            </router-link>
                        </div>
                        <div class=''>
                            <router-link to='./Category'>
                                <img src="./imgs/h-13.png" alt="">
                                <span>海囤全球</span>
                            </router-link>
                            <router-link to='./Category'>
                                <img src="./imgs/h-14.png" alt="">
                                <span>京东拍卖</span>
                            </router-link>
                            <router-link to='./Category'>
                                <img src="./imgs/h-15.png" alt="">
                                <span>唯品会</span>
                            </router-link>
                            <router-link to='./Category'>
                                <img src="./imgs/h-16.png" alt="">
                                <span>玩3C</span>
                            </router-link>
                            <router-link to='./Category'>
                                <img src="./imgs/h-17.png" alt="">
                                <span>沃尔玛</span>
                            </router-link>
                            <router-link to='./Category'>
                                <img src="./imgs/h-18.png" alt="">
                                <span>美妆馆</span>
                            </router-link>
                            <router-link to='./Category'>
                                <img src="./imgs/h-19.png" alt="">
                                <span>京东旅行</span>
                            </router-link>
                            <router-link to='./Category'>
                                <img src="./imgs/h-20.png" alt="">
                                <span>拍拍二手</span>
                            </router-link>
                            <router-link to='./Category'>
                                <img src="./imgs/h-21.png" alt="">
                                <span>物流查询</span>
                            </router-link>
                            <router-link to='./Category'>
                                <img src="./imgs/h-22.png" alt="">
                                <span>全部</span>
                            </router-link>
                        </div>
                    </div>
                    <div class='indicator'>
                        <span :class="{active:isNav.isNav1}"></span>
                        <span :class="{active:isNav.isNav2}"></span>
                    </div>
                </div>

                <!-- 京东秒杀 -->
                <div class='seckill-warpper'>
                    <div class='seckill'>
                        <div class='seckill-header'>
                            <router-link to="" class='seckill-header-left'>
                                <span class=''></span>
                                <strong>20点场</strong>
                                <div class='time'>
                                    <span>08</span>
                                    <i>:</i>
                                    <span>24</span>
                                    <i>:</i>
                                    <span>00</span>
                                </div>
                            </router-link>
                            <router-link to="" class='seckill-header-right'>
                                更多秒杀
                                <i class='seckill-header-right-img'></i>
                            </router-link>
                        </div>
                        <div class='seckill-content  hide-scroll-bar'>
                            <ul class='seckill-list'>
                                <li>
                                    <router-link to='./Category'>
                                        <img src="./imgs/h-23.png" alt="">
                                        <span>￥<em>3555</em></span>
                                        <del>￥4555</del>
                                    </router-link>
                                </li>
                                <li>
                                    <router-link to='./Category'>
                                        <img src="./imgs/h-24.jpg" alt="">
                                        <span>￥<em>3555</em></span>
                                        <del>￥4555</del>
                                    </router-link>
                                </li>
                                <li>
                                    <router-link to='./Category'>
                                        <img src="./imgs/h-25.jpg" alt="">
                                        <span>￥<em>3555</em></span>
                                        <del>￥4555</del>
                                    </router-link>
                                </li>
                                <li>
                                    <router-link to='./Category'>
                                        <img src="./imgs/h-27.jpg" alt="">
                                        <span>￥<em>3555</em></span>
                                        <del>￥4555</del>
                                    </router-link>
                                </li>
                                <li>
                                    <router-link to='./Category'>
                                        <img src="./imgs/h-31.jpg" alt="">
                                        <span>￥<em>3555</em></span>
                                        <del>￥4555</del>
                                    </router-link>
                                </li>
                                <li>
                                    <router-link to='./Category'>
                                        <img src="./imgs/h-33.jpg" alt="">
                                        <span>￥<em>3555</em></span>
                                        <del>￥4555</del>
                                    </router-link>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>

                <!-- 新人专享 -->
                <div class='xr-vip-warpper'>
                    <div class='xr-vip'>
                        <router-link to='./Category'>
                            <img src="./imgs/h-34.png" alt="">
                        </router-link>
                        <router-link to='./Category'>
                            <img src="./imgs/h-35.png" alt="">
                        </router-link>
                    </div>
                </div>


                <!-- 低价通栏 -->
                <div class='low-price'>
                    <div>
                        <router-link to='./Category'>
                            <img src="./imgs/h-36.jpg" alt="">
                        </router-link>
                    </div>
                    <div>
                        <router-link to='./Category'>
                            <img src="./imgs/h-37.jpg" alt="">
                        </router-link>
                    </div>
                    <div>
                        <router-link to='./Category'>
                            <img src="./imgs/h-38.jpg" alt="">
                        </router-link>
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

    //导入
    import MiNav from '../../components/MiNav.vue';
    import imagesloaded from 'imagesloaded';
    import IScroll from 'iscroll';
    //导出组件
    export default {
        name: 'home',
        components: {MiNav},
        data() {
            return {
                banner: [
                    {path: require('./imgs/h-b8.jpg')},
                    {path: require('./imgs/h-b1.jpg')},
                    {path: require('./imgs/h-b3.jpg')},
                    {path: require('./imgs/h-b4.jpg')},
                    {path: require('./imgs/h-b5.jpg')},
                    {path: require('./imgs/h-b6.jpg')},
                    {path: require('./imgs/h-b7.jpg')},
                    {path: require('./imgs/h-b8.jpg')},
                    {path: require('./imgs/h-b1.jpg')},
                ],
                isLogin: false,
                bannerLis: null,
                interval: 3000,
                duration: 1000,
                index: 0,
                isNav: {
                    index: 0,
                    isNav1: true,
                    isNav2: false,
                },


            }
        },
        methods:{
            init(){
                this.$nextTick(() => {//banner下方的nav
                    this.scroll = new IScroll(this.$refs.box_list, {
                        scrollY: false, //关闭纵向滚动
                        scrollX: true, //开启横向滚动
                        snap: true, //开启scroll轮播图滚动模式
                        momentum: false, //关闭scroll惯性滚动
                    });
                    this.scroll.on('scrollEnd', () => {

                        if (this.scroll.currentPage.pageX === 0) {
                            this.isNav.isNav1 = true;
                            this.isNav.isNav2 = false;
                        } else if (this.scroll.currentPage.pageX === 1) {
                            this.isNav.isNav1 = false;
                            this.isNav.isNav2 = true;
                        }
                    })
                });

                //banner
                this.$nextTick(() => {
                    this.bannerScroll = new IScroll(this.$refs.banner, {
                        scrollY: false, //关闭纵向滚动
                        scrollX: true, //开启横向滚动
                        snap: true, //开启scroll轮播图滚动模式
                        momentum: false, //关闭scroll惯性滚动
	                    click:true,//开启默认点击事件
                    });

                    this.bannerScroll.on('scrollStart', () => {
                        // clearTimeout(timer);
                    });
                    this.bannerScroll.on('scrollEnd', () => {
                        console.log(this.bannerScroll.currentPage.pageX);
                        this.bannerScroll.disable(); //调整前禁用

                        let length = this.banner.length - 1;
                        if (this.bannerScroll.currentPage.pageX == length) {
                            this.bannerScroll.goToPage(1, 0, 0);
                            this.index = 0;
                        } //如果现在的图片下标的序号是存储图片的长度+1的话，表示现在要进行复位，让他到下标为1的图片
                        else if (this.bannerScroll.currentPage.pageX == 0) {
                            this.bannerScroll.goToPage(length, 0, 0);
                            this.index = length;
                        } else {
                            this.index = this.bannerScroll.currentPage.pageX - 1;
                        } //如果现在图片的下标的序号是第零位的图片的话，表示要进行复位，让他到第三个图片哪里，
                        this.bannerScroll.enable(); //调整后重新启用iscroll

                        timer = setTimeout(() => this.bannerScroll.next(this.duration), this.interval);
                    });

                    this.bannerScroll.goToPage(1, 0, 0);
                    let timer = setTimeout(() => this.bannerScroll.next(this.duration), this.interval);
                });

                //获取登录状态
                if (this.$Cookies.get('token')) {
                    this.isLogin = true;
                }
            }
        }
        ,


        created() {
            this.init();
        },

    }
</script>

<style scoped>

    body {

    }

    .page-warpper {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        background: url(./imgs/beijing.jpg) no-repeat left top/100%;
    }

    .header {
        height: 44px;
        flex-shrink: 0;
        display: flex;
    }

    /*左侧按钮*/
    .header > .catrgory-btn {
        width: 40px;
        flex-shrink: 0;
    }

    .catrgory-btn-title {
        margin: 14px 0 0 15px;
        display: inline-block;
        width: 20px;
        height: 18px;
        background: url(./imgs/h-1.png) no-repeat center center/100%;
    }

    /*头部中间搜索框*/
    .header > .search-warpper {
        flex-grow: 1;
        padding: 0 10px;
        display: flex;
        align-items: center;
    }

    .header > .search-warpper > .search {
        width: 100%;
        height: 30px;
        background-color: #fff;
        border-radius: 15px;
        font-size: 0;
        display: flex;
        align-items: center;
    }

    .header > .search-warpper > .search > i {
        height: 15px;
    }

    .header > .search-warpper > .search > i.search-left-logo {
        width: 20px;
        margin: 0 8px 0 15px;
        background: url(./imgs/h-2.png) no-repeat center/100%;
        position: relative;

    }

    .header > .search-warpper > .search > i.search-left-logo::before {
        content: '';
        display: inline-block;
        width: 1px;
        height: 16px;
        background-color: #CCCCCC;
        position: absolute;
        right: -8px;
        top: 0;
    }

    .header > .search-warpper > .search > i.search-left-img {
        width: 18px;
        margin: 0 0 0 5px;
        background: url(./imgs/h-xuebi.png) no-repeat -80px 0/200px;

    }

    .header > .search-warpper > .search > input.search-input {
        margin-left: 5px;
        padding-left: 5px;
        border: none;
        outline: none;
        font-size: 12px;
    }

    /*头部右侧*/
    .header > .header-right {
        width: 40px;
        flex-shrink: 0;
        line-height: 44px;
        text-align: left;

    }

    .header > .header-right.sign-in {
        background: url('./imgs/yes.png') no-repeat center center/20px 22px;
    }

    .header > .header-right > .not-sign-in-title {
        font-size: 14px;
        color: #fff;
    }

    .content-warpper {
        overflow: auto;
        flex-grow: 1;
    }

    .content {
        flex-grow: 1;
        overflow: hidden;

    }

    .content > .banner {
        overflow: hidden;
        position: relative;
        font-size: 0;
        touch-action: pan-x;
        margin-bottom: 5px;
    }

    .content > .banner > ul.scroll {
        width: 900%;
        display: flex;
    }

    .content > .banner > ul.scroll > li {
        flex-grow: 1;
        font-size: 0;
        width: 100%;
    }

    .content > .banner > ul.scroll > li > a {

        display: block;
        width: 100%;
        height: 140px;
        box-sizing: border-box;
        padding: 0 10px;


    }

    .content > .banner > ul.scroll > li > a > img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
    }

    .content > .banner > .indicator {
        width: 100%;
        text-align: center;
        position: absolute;
        bottom: 10px;
    }

    .content > .banner > .indicator > span {
        display: inline-block;
        width: 8px;
        height: 3px;
        margin: 0 2px;
        background: hsla(0, 0%, 92.9%, .4);
    }

    .content > .banner > .indicator > span.active {
        background-color: #fff;
        width: 10px;
    }


    .box_list {
        background-color: #f6f6f6;
        overflow: hidden;
        touch-action: pan-x;
    }

    .box_list > .scroll {
        width: 200%;
        display: flex;
    }

    .box_list > .scroll > div {

        flex-grow: 1;
    }

    .box_list > .scroll > div > a {
        width: 20%;
        float: left;
        text-align: center;
        display: block;
        color: #666;
    }

    .box_list > .scroll > div > a > img {
        width: 40px;
        display: block;
        margin: 10px auto 0;
    }

    .box_list > .scroll > div > a > span {
        font-size: 12px;
        margin-top: 6px;
    }

    .box_list > .indicator {
        text-align: center;
    }

    .box_list > .indicator > span {
        width: 5px;
        height: 5px;
        opacity: 1;
        background-color: rgba(0, 0, 0, .2);
        box-sizing: border-box;
        border-radius: 50%;
        display: inline-block;
        vertical-align: middle;
        margin: 0 3px;
    }

    .box_list > .indicator > span.active {
        background-color: #e93b3d;
        width: 10px;
        height: 5px;
        border-radius: 3px;
        opacity: .7;
    }


    .seckill-warpper {
        padding: 0 10px 10px;
        background-color: #f6f6f6;

    }

    .seckill {
        border-radius: 10px;
        background-color: #fff;

    }

    .seckill > .seckill-header {
        height: 35px;
        background: url(./imgs/msb.png) no-repeat center center/100%;
    }

    .seckill > .seckill-header > a {
        display: inline-block;
        line-height: 35px;
    }

    .seckill > .seckill-header > .seckill-header-left > span {
        display: inline-block;
        float: left;
        margin-left: 10px;
        width: 75px;
        height: 30px;
        background: url(./imgs/ms.png) no-repeat left center/100%;
    }

    .seckill > .seckill-header > .seckill-header-left > strong {
        font-weight: normal;
        font-size: 12px;
        margin-left: 5px;
    }

    .seckill > .seckill-header > a > .time {
        display: inline-block;
        margin-left: 5px;
    }

    .seckill > .seckill-header > a > .time > span {
        font-size: 12px;
        width: 18px;
        line-height: 17px;
        border: 1px solid #dfdfdf;
        background-color: #fff;
    }

    .seckill > .seckill-header > a > .time > i {
    }


    .seckill > .seckill-header > .seckill-header-right {
        font-size: 10px;
        color: #f23030;
        float: right;
        padding-right: 24px;
        position: relative;
    }

    .seckill > .seckill-header > .seckill-header-right > .seckill-header-right-img {
        position: absolute;
        width: 12px;
        height: 12px;
        background: url(./imgs/right.png) center center/100%;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
    }

    .seckill > .seckill-content {
        overflow-y: hidden;
        height: 120px;
    }

    .seckill > .seckill-content > .seckill-list {
        width: 550px;
        overflow-y: auto;
    }

    .seckill > .seckill-content > .seckill-list > li {
        width: 84px;
        padding: 0 5px;
        box-sizing: border-box;
        float: left;
    }

    .seckill > .seckill-content > .seckill-list > li > a {
        display: block;
        text-align: center;
        font-size: 0;
    }

    .seckill > .seckill-content > .seckill-list > li > a > img {
        width: 100%;
    }

    .seckill > .seckill-content > .seckill-list > li > a > span {
        font-size: 12px;
        display: block;
        color: #e93b3d;
    }

    .seckill > .seckill-content > .seckill-list > li > a > span > em {
        font-style: normal;
        font-size: 16px;

    }

    .seckill > .seckill-content > .seckill-list > li > a > del {
        font-size: 12px;
        color: #999;
    }


    /* 新人 */
    .xr-vip-warpper {
        padding: 0 10px;
        background-color: #f6f6f6;
    }

    .xr-vip-warpper > .xr-vip {
        display: flex;
        border-radius: 10px;
        overflow: hidden;
    }

    .xr-vip-warpper > .xr-vip > a {
        width: 50%;
    }

    .xr-vip-warpper > .xr-vip > a > img {
        width: 100%;
    }

    .low-price {
        display: flex;
        padding: 10px 10px 0;

        background-color: #f6f6f6;
    }

    .low-price > div {
        width: 33.333333%;
    }

    .low-price > div > a {

    }

    .low-price > div > a > img {
        width: 100%;
    }

    /*底部*/
    .footer {
        height: 55px;
        flex-shrink: 0;
    }

</style>