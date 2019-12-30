<template>
    <div class="page-wrapper">
        <div class="header-wrapper">
            <!-- 顶部搜索 -->
            <div class="header">
                <div class='back-off' onclick="javascript:history.back()">
                    <span></span>
                </div>
                <Search @searchName="getSearch"></Search>
                <div class='header-function'>
                    <span></span>
                    <div class='header-function-content'>
                        <ul>
                            <li>
                                <a href="/pages/home/index.html">
                                    <i class='function-list-i'></i>
                                    <span>首页</span>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <i class='function-list-i'></i>
                                    <span>分类搜索</span>
                                </a>
                            </li>
                            <li>
                                <a href="/pages/cart/index.html">
                                    <i class='function-list-i'></i>
                                    <span>购物车</span>
                                </a>
                            </li>
                            <li>
                                <a href="/pages/profile/index.html">
                                    <i class='function-list-i'></i>
                                    <span>我的京东</span>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <i class='function-list-i'></i>
                                    <span>浏览记录</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- 下面筛选 -->
            <div class="header-screen">
                <div class='header-screen-child click' @click="  toggleOrder('price')"><span
                        class='price-click'>价格</span><i></i></div>
                <div class='header-screen-child click' @click="  toggleOrder('sale')"><span class='sale-click'>销量</span><i></i>
                </div>
                <div class='header-screen-child click' @click="  toggleOrder('rate')"><span class='rate-click'>评论</span><i></i>
                </div>
                <div class='header-screen-child'><span class='screen-child'>筛选</span><i class='screen-child-img'></i>
                </div>
            </div>


        </div>


        <div class='content' ref="scroll">
            <div class='scroll'>
                <ul class='list clearfix'>
                    <li v-for="item in list" :key="item.id">
                        <router-link :to="`/Detail/${item.id}`">
                            <img :src='item.avatar'/>
                            <div>
                                <h3 v-text="item.name"></h3>
                                <h5><span v-text="item.remark"></span></h5>
                                <p class='price-p'>
                                    <strong>
                                        ￥
                                        <span v-text="`${item.price}.00`"></span>
                                    </strong>
                                </p>
                                <p class='rate-p' v-text="`${item.rate}条评论`">

                                </p>
                            </div>
                        </router-link>
                        <!--<a href='/pages/Detail/index.html?id=${item.id}'>-->

                        <!--</a>-->
                    </li>
                </ul>
                <p class='info' v-text=" tipInfo">上拉加载更多</p>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import Search from './search.vue';
    import IScroll from 'iscroll/build/iscroll-probe';
    import imagesLoaded from 'imagesloaded';

    export default {
        components: {Search},
        data() {
            return {
                search: {
                    fid: 0,
                    name: "",
                    pageSize: 6,//每次请求的数量
                    orderCol: 'price',//排序方式
                    orderDir: 'true',//正序还是倒叙
                    begin: 0,//截取的位置

                },
                list: [],//保存回来的数据
                hasMore: true,//判断还有没有数据
                isLoading: false,//判断是不是处于加载状态
                showlsTableMode: true,//以什么形式来展示数据，在这用不到  因为我没有
                isTriggerLoding: false,//是不是要加载，是个临界值判定
                screenImg: '',
                reversal: '',

            }

        },
        computed: {
            tipInfo() {//用来判断加载的显示文字
                if (this.isLoading) return '正在加载...';
                else if (this.isTriggerLoding) return '放手立即加载...';
                else if (this.hasMore) return '上拉加载更多';
                else if (this.list.length > 0) return '已到达底部';
                else return '暂无相关商品，敬请期待...';
            }
        }
        ,
        methods: {
            //获取search传过来的值
            getSearch(name){
                this.search.name=name;
                console.log(name);
            },
            //表示正在加载
            getData(loadMore = false) {
                this.search.begin = loadMore ? this.list.length : 0;
                this.isLoading = true;//表示正在加载
                this.$http({url: '/product/list', data: {jsonStr: JSON.stringify(this.search)}}).then(data => {

                    this.isLoading = false;//终止加载状态
                    this.list = this.list.concat(data);//把获取来的数据拼接到原数组中
                    this.hasMore = data.length === this.search.pageSize;//判断这次请求的数量是不是等于自己设定的为此
                })

            },
            toggleOrder(orderCol) {
                if (this.isLoading) {
                    alert('操作过于频繁');
                    return;
                }


                if (this.search.orderCol === orderCol) this.search.orderDir = !this.search.orderDir;
                else this.search.orderCol = orderCol;

                this.list = [];
                this.hasMore = true;
                this.getData();
            }
            ,
            initOrRefreshScroll() {
                //将content托管给iscroll
                imagesLoaded(this.$refs.scroll, () => {
                    //专门用于延时加载的this.$nextTick
                    this.$nextTick(() => {
                        if (this.scroll) {
                            this.scroll.refresh();//如果有的话   就表示要刷新
                        } else {//表示要创建
                            this.scroll = new IScroll(this.$refs.scroll, {
                                deceleration: 0.003,//滚动阻尼系数，(0.00006-0.01)之间，数值越大，惯性越小。
                                bounce: false,//关闭边界回弹效果
                                click: true,//设置默认的取消的点击事件，true设置为可以被点击
                                probeType: 2//有效值为1，2，3数值越高，探测频率越高，
                            });//第一个参数是要托管的对象，而且必须是js原生对象，第二个参数是一些参数的配置。
                            this.scroll.on('scroll', () => {//判断用户有没有加载意图
                                console.log(this.scroll.y);
                                console.log(this.scroll.maxScrollY);
                                if (this.hasMore && !this.isLoading) {
                                    if (this.scroll.y === this.scroll.maxScrollY) {
                                        this.isTriggerLoding = true;


                                    } else {
                                        this.isTriggerLoding = false;
                                    }

                                }
                                console.log(this.isTriggerLoding);
                            });
                            this.scroll.on('scrollEnd', () => {
                                if (this.isTriggerLoding) {
                                    this.isTriggerLoding = false;
                                    this.getData(true);
                                }
                            })
                        }
                    })
                });
            },
        },
        watch: {
            'search.fid'(newValue, oldValue) {
                this.getData();
            },
            list(newValue, oldValue) {
                this.$nextTick(() => {
                    this.initOrRefreshScroll();
                });
            },
            'search.name'(newValue){
                this.list=[];
                this.getData().then(data=>{
                    this.list=data;
                });

            }
        },


        created() {
            this.search.fid = parseInt(this.$route.params.cid);
        },
    }
</script>

<style scoped>
    .page-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .header-wrapper {
        height: 84px;
        flex-shrink: 0;
    }

    .header {
        flex-shrink: 0;
        height: 44px;
        display: flex;
    }

    .header > .back-off {
        width: 40px;
        flex-shrink: 0;


    }

    .header > .back-off > span {
        display: block;
        width: 20px;
        height: 20px;
        margin: 12px auto 0;
        background-image: url(./imgs/back.png);
        background-position: center center;
        background-size: 100%;
    }


    .header > .header-function {
        width: 40px;
        flex-shrink: 0;
        position: relative;
    }

    .header > .header-function > span {
        width: 20px;
        height: 20px;
        display: block;
        margin: 12px auto;
        background-image: url(./imgs/c1.png);
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center center;
    }

    .header > .header-function > .header-function-content {
        position: absolute;
        display: none;
        top: 53px;
        right: 10px;
        width: 125px;
        background-color: rgba(0, 0, 0, .9);
        border-radius: 5px;
        z-index: 10;
    }

    .header > .header-function > .header-function-content::before {
        position: absolute;
        top: -8px;
        right: 5px;
        content: '';
        border-width: 4px;
        border-style: solid;
        border-left-color: transparent;
        border-top-color: transparent;
        border-right-color: transparent;
        border-bottom-color: rgba(0, 0, 0, .9);
    }

    .header > .header-function > .header-function-content > ul {
    }

    .header > .header-function > .header-function-content > ul > li {
        height: 40px;
    }

    .header > .header-function > .header-function-content > ul > li > a {
        display: block;
        line-height: 40px;
        color: #fff;
        font-weight: 400;
        font-size: 14px;
    }

    .header > .header-function > .header-function-content > ul > li > a > i {
        width: 40px;
        height: 40px;
        display: inline-block;
        vertical-align: middle;
    }

    .header > .header-function > .header-function-content > ul > li:nth-child(1) > a > i {
        background: url(imgs/c2.png) no-repeat center center/50%;
    }

    .header > .header-function > .header-function-content > ul > li:nth-child(2) > a > i {
        background: url(imgs/c3.png) no-repeat center center/50%;
    }

    .header > .header-function > .header-function-content > ul > li:nth-child(3) > a > i {
        background: url(imgs/c5.png) no-repeat center center/50%;
    }

    .header > .header-function > .header-function-content > ul > li:nth-child(4) > a > i {
        background: url(imgs/c6.png) no-repeat center center/50%;
    }

    .header > .header-function > .header-function-content > ul > li:nth-child(5) > a > i {
        background: url(imgs/c7.png) no-repeat center center/50%;
    }

    .header > .header-function > .header-function-content > ul > li > a > span {
        display: inline-block;
        vertical-align: middle;

    }

    .header-screen {
        display: flex;
        height: 40px;

    }

    .header-screen > div {
        width: 25%;
        text-align: center;
        line-height: 40px;
        font-size: 14px;
        color: #333;
        border-top: 1px solid #e5e5e5;
        border-bottom: 1px solid #e5e5e5;
    }

    .header-screen > div > span {
    }

    .header-screen > div:nth-child(4) {
        position: relative;
    }

    .header-screen > div:nth-child(4)::before {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        top: 10px;
        width: 1px;
        background-color: #e5e5e5;
        height: 20px;
    }

    .header-screen > div > i.screenImg {
        margin-left: 5px;
        width: 8px;
        height: 5px;
        display: inline-block;
        background: url(imgs/l1.png) no-repeat center center/100%;
        vertical-align: middle;
    }

    .reversal {
        transform: rotate(-180deg);
    }

    .header-screen > div > i.screen-child-img {
        margin-left: 3px;
        width: 13px;
        height: 13px;
        display: inline-block;
        background: url(imgs/l2.png) no-repeat center center/100%;
        vertical-align: middle;
    }

    .content {
        flex-grow: 1;
        background: #f7f7f7;

        overflow: hidden;
        /*iscroll插件要求的代码，*/
        touch-action: pan-y;
        /*消除iscroll垂直滚动的警告*/
    }

    .content > .scroll {
        padding: 10px 10px 0;
    }

    .content > .scroll > ul.list {
        margin-right: -10px;
    }

    .content > .scroll > ul.list > li {
        width: 50%;
        float: left;
        box-sizing: border-box;
        margin-bottom: 10px;
        padding-right: 10px;

    }

    .content > .scroll > ul.list > li:nth-child(2n) {

    }

    .content > .scroll > ul.list > li > a {
        color: #333;
        display: block;
        padding: 10px;
        background-color: #fff;
        border-radius: 5px;
    }

    .content > .scroll > ul.list > li > a > img {
        width: 100%;
    }

    .content > .scroll > ul.list > li > a > div {
        padding: 0 10px;
    }

    .content > .scroll > ul.list > li > a > div > h3 {
        isplay: -webkit-box;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        height: 38px;
        margin-top: 8px;
        font-size: 14px;
        font-weight: 400;

    }

    .content > .scroll > ul.list > li > a > div > h5 {
        height: 15px;
        font-size: 10px;
        font-weight: normal;
        color: #999;
        margin: 3px 0 1px;
    }

    .content > .scroll > ul.list > li > a > div > h5 > span {
        background-color: #f2f2f7;
        padding: 0 5px;
    }

    .content > .scroll > ul.list > li > a > div > p.price-p {
        margin-top: 3px;
        height: 16px;
        color: #e93b3d;
        font-size: 10px;
    }

    .content > .scroll > ul.list > li > a > div > p.price-p > strong > span {
        font-size: 14px;
    }

    .content > .scroll > ul.list > li > a > div > p.rate-p {
        font-size: 12px;
        color: #999;

    }

    .content > .scroll > p.info {
        text-align: center;
        font-size: 12px;
        color: #e5e5e5;
        height: 20px;
    }

</style>