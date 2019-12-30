<template>
    <div>
        <div class="page-warpper  hide-scroll-bar">
            <div class="header">
                <div class='back' onclick="javascript:history.back()">
                    <span></span>
                </div>
                <div class='aggregate-function'>
                    <span></span>
                </div>
            </div>
            <div class='content hide-scroll-bar'>
                <div class="banner" ref="scroll">
                    <ul class="scroll" :style="bannerStyle">
                        <!--<li><img :src="banners[banners.length-1]" alt=""></li>-->
                        <li v-for="(item,i) in banners" :key="i">
                            <img :src="item" alt="">
                        </li>
                        <!--<li><img :src="banners[0]" alt=""></li>-->
                    </ul>
                    <!-- 轮播图的提示符 -->
                    <div class='banner-tips'>
                        <span v-for="(item,i) in banners" :key="i" :class="{active:i===index}"></span>
                    </div>
                </div>

                <div class='details'>
                    <div class='price-warpper'>
                        ￥<span class='price' v-text="list.price"></span>.00
                    </div>
                    <div class='name-warpper'>
                        <h1 class='name' v-text="list.name"></h1>
                    </div>
                    <div class='remark-warpper'>
                        <span class='remark' v-text="list.remark"></span>
                    </div>
                </div>
                <div class='kh'></div>
                <div class='discount'>
                    <div class='discount-title'>优惠</div>
                    <div class='discount-body'>
                        <p>购买1-5件时享受单件价￥1098，超出数量以结算价为准</p>
                        <p>体验卡免费领，超大流量任性用</p>
                    </div>
                    <div class='discount-footer'>
                        <span class='discount-footer-img'></span>
                    </div>
                </div>
                <div class='kh'></div>
                <img src="./11.png" alt="" class='moren' style='margin-bottom:50px'>
            </div>
            <div class="footer">
                <div class='cart-function'>
                    <!--onclick="location.href='/pages/cart/index.html'"    cart的跳转地址-->
                    <div class="customer_service">
                        <i class='customer_serviceimg'></i>
                        <span class='customer_servicename'>联系客服</span>
                    </div>
                    <div class="enter">
                        <i class='enter-img'></i>
                        <span class='enter-name'>进店</span>
                    </div>
                    <div class='cart' @click="$router.push({path:'/Cart'})">
                        <i class='number' v-text="total" v-show="total_isShow"></i>
                        <i class='cart-img'></i>
                        <span class='cart-name'>购物车</span>
                    </div>
                </div>
                <div class='cart-btn' @click="addCart">加入购物车</div>
                <div class='buy'>立即购买</div>
            </div>
        </div>
        <!-- 弹层区 -->

        <div class='dialog-wrapper' v-show="elastiLayer" @click.self="elastiLayer=false">
            <div class='dialog'>
                <div class="header">
                    <img :src="list.avatar" alt="" class="avatar">
                    <div class='header-title'>
                        <div class="price-warpper">
                            ￥<em class='price' v-text="list.price"></em>.00
                        </div>
                        <div class="name" v-text="list.name"></div>
                    </div>
                </div>
                <div class="content">
                    <div class='count-wrapeer'>
                        数量
                        <span class='incentive' @click="incentive" :class="count==5? 'active' :''">+</span>
                        <span class='count' v-text="count"></span>
                        <span class='decrease' @click="decrease" :class="count==1 ? 'active' : ''">-</span>
                    </div>
                </div>
                <button class='dialog-btn' @click="cart_add">确认</button>
            </div>

        </div>
    </div>


</template>

<script type="text/ecmascript-6">
    import imagesloaded from 'imagesloaded';
    import IScroll from 'iscroll';

    export default {
        data() {
            return {
                id: 0,
                elastiLayer: false,
                list: {},
                banners: [],
                bannerStyle: '',
                timer: '',
				count:1,
                total:null,
                duration: 1000,
                interval: 5000,
                index: 0,
                total_isShow:false,
            }
        },
        methods: {
            addCart() {//加入购物车
                this.elastiLayer = true;

            },
            incentive() {//添加数量
				if(this.count<5){
					this.count++;
				}else{
					this.$toast('最多只能购买五个哟亲！');
				}

            },
            decrease() {//减少数量
				if(this.count>1){
					this.count--;
				}else{
					this.$toast('最少需要选择一个哟亲！');
				}
            },
			cart_add(){//点击加入购物车
				this.$http({url:'/cart/add',data:{jsonStr:JSON.stringify({pid:this.id,count:this.count})}}).then(()=>{
					this.$toast('加入购物车成功！');
					this.elastiLayer=false;
					this.total=this.total+this.count;
                    this.total_isShow=true;
				})
			},
        },

        watch: {
            banners() {
                imagesloaded(this.$refs.scroll, () => {
                    setTimeout(() => {
                        this.scroll = new IScroll(this.$refs.scroll, {
                            scrollY: false,
                            scrollX: true,
                            snap: true,
                            momentum: false,
                        });
                        this.scroll.on('scrollStart', () => {
                            clearTimeout(this.timer);//开始滚动前清除所有已经存在timer任务，避免发生滚动混乱
                        });
                        this.scroll.on('scrollEnd', () => {
                            this.scroll.disable();//调用前禁用；
                            this.index = this.scroll.currentPage.pageX
                            this.scroll.enable();

                        });

//                                                this.scroll.goToPage(1, 0, 0);//必须snap为true才可以使用

                    }, 20)
                });
            },
            id(newValue){
                this.$http({url: `/product/model/${newValue}`, method: 'get'}).then(list => {
                    this.list = list;
                    if(this.list.banner){
                        this.banners = this.list.banner.split(',');
                        this.bannerStyle = {width: `${this.banners.length}00%`}
                    }
                });

            }

        },
        created() {
            this.id = parseInt(this.$route.params.id)||14;

            this.$http({url:'/cart/total',method:'get'}).then(total=>{

                if(total>0){
                    this.total_isShow=true;
                }
                this.total=total;
            })

        },
    }
</script>
<style scoped>
    .page-warpper {
        width: 100%;
        height: 100%;

    }

    .page-warpper > .header {
        height: 45px;
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        z-index: 100;
        justify-content: space-between;
    }

    .page-warpper > .header > .back {
        width: 30px;
        height: 30px;
        margin-left: 10px;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, .5);
        text-align: center;
    }

    .page-warpper > .header span {
        margin-top: 5px;
        width: 20px;
        height: 20px;
        display: inline-block;
    }

    .page-warpper > .header > .back > span {
        background: url(back.png) no-repeat center center/100%;
    }

    .page-warpper > .header > .aggregate-function {
        width: 30px;
        height: 30px;
        margin-right: 10px;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, .5);
        text-align: center;
    }

    .page-warpper > .header > .aggregate-function > span {
        background: url(jihe.png) no-repeat center center/100%;
    }

    .banner {
        width: 100%;
        touch-action: pan-x;
        position: relative;
        overflow: hidden;
        background-color: #ccc;
    }

    .banner > ul.scroll {
        display: flex;
    }

    .banner > ul.scroll > li {
        width: 100%;
        font-size: 0;
    }

    .banner > ul.scroll > li > img {
        width: 100%;
    }

    /*banner的标点*/
    .banner > .banner-tips {
        position: absolute;
        left: 50%;
        bottom: 15px;
        font-size: 0;
        transform: translate(-50%, 0);
    }

    .banner > .banner-tips > span {
        margin-right: 5px;
        display: inline-block;
        background-color: #999999;
        width: 6px;
        height: 6px;
    }

    .banner > .banner-tips > span.active {
        background-color: #F10000;
    }

    .details {
        margin-bottom: 10px;
        background: #fff;
        /*border-top: 1px solid #ccc;*/
    }

    .details > .price-warpper {
        font-size: 16px;
        color: #e4393c;
        font-weight: 700;
        padding: 16px 10px 0;
        line-height: 20px;
        margin-bottom: 5px;

    }

    .details > .price-warpper > span.price {
        font-size: 24px;
    }

    .details > .name-warpper {
        padding: 0 10px;

    }

    .details > .name-warpper > h1.name {
        font-size: 16px;
        color: #333;
    }

    .details > .remark-warpper {
        padding: 0 10px;
        margin-top: 5px;
    }

    .details > .remark-warpper > .remark {
        padding: 3px 5px;
        font-size: 12px;
        color: #FFF;
        background-color: #999;
        border-radius: 5px;
    }

    .kh {
        height: 10px;
        background: #e8e8ed;
    }

    /*优惠*/
    .discount {
        height: 65px;
        display: flex;
        align-items: center;
        text-align: center;

    }

    .discount > .discount-title {
        width: 50px;
        flex-shrink: 0;
        color: #999;
        font-size: 12px;
    }

    .discount > .discount-body {
        flex-grow: 1;
    }

    .discount > .discount-body > p {
        font-size: 12px;
        line-height: 18px;
        text-align: left;
        color: #333;
    }

    .discount > .discount-footer {
        width: 30px;
        flex-shrink: 0;

    }

    .discount > .discount-footer > .discount-footer-img {
    }

    .footer {
        border-top: 1px solid #ccc;
        position: fixed;
        bottom: 0;
        display: flex;
        height: 50px;
        width: 100%;
        text-align: center;
        line-height: 50px;
        background-color: #fff;
    }

    .footer > .cart-function {
        flex-grow: 1;
        display: flex;

    }

    .footer > .cart-function > div {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        position: relative;
    }

    .footer > .cart-function > div > i.number {
        position: absolute;
        width: 15px;
        height: 15px;
        border-radius: 5px;
        background-color: #F10000;
        left: 30%;
        top:-15%;
        transform: translate(100%, 0);
        font-size: 10px;
        line-height: 15px;
        color: #fff;
        font-style: normal;
    }

    .footer > .cart-function > div > i.cart-img, .footer > .cart-function > div > i.customer_serviceimg, .footer > .cart-function > div > i.enter-img {
        display: inline-block;
        width: 20px;
        height: 25px;
        margin: 3px auto 0;
        /*background: url(cart.png) no-repeat center center/100%;*/
    }

    .footer > .cart-function > div > i.cart-img {
        background: url(cart.png) no-repeat center center/100%;
    }

    .footer > .cart-function > div > i.customer_serviceimg {
        background: url(kefu.png) no-repeat center center/100%;
    }

    .footer > .cart-function > div > i.enter-img {
        background: url(dian.png) no-repeat center center/100%;
    }


    .footer > .cart-function > .cart > span.cart-name, .customer_servicename, .enter-name {
        font-size: 10px;
        color: #999;
        display: block;
        line-height: 20px;
    }

    .footer > .cart-btn {
        width: 120px;
        background: linear-gradient(138deg, #ffa600, #ffb000 77%, #ffbc00);
        color: #fff;
    }

    .footer > .buy {
        width: 120px;
        background: linear-gradient(-41deg, #ff4f18, #ff2000 24%, #f10000);
        color: #fff;
    }

    .dialog-wrapper {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .3);

    }

    .dialog-wrapper > .dialog {
        height: 50%;
        background: #fff;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .dialog-wrapper > .dialog > .header {
        height: 80px;
        flex-shrink: 0;
        position: relative;
    }

    .dialog-wrapper > .dialog > .header > img {
        width: 90px;
        height: 90px;
        position: absolute;
        left: 10px;
        top: -20px;
        border-radius: 2px;
    }

    .dialog-wrapper > .dialog > .header > .header-title {
        margin-left: 110px;
    }

    .dialog-wrapper > .dialog > .header > .header-title > .price-warpper {
        color: #e4393c;
        height: 40px;
        line-height: 40px;
        font-size: 10px;
    }

    .dialog-wrapper > .dialog > .header > .header-title > .price-warpper > em.price {
        font-size: 16px;
        font-style: normal;
    }

    .dialog-wrapper > .dialog > .header > .header-title > .name {
        height: 40px;
        isplay: -webkit-box;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .dialog-wrapper > .dialog > .content {
        flex-grow: 1;
        padding-top: 10px;
    }

    .dialog-wrapper > .dialog > .content > .count-wrapeer {
        height: 31px;
        line-height: 31px;
        font-size: 12px;
        color: #999;
        padding-left: 10px;
    }

    .dialog-wrapper > .dialog > .content > .count-wrapeer > span {
        float: right;
        width: 30px;
		color:#333;
        height: 30px;
        text-align: center;
        background: #f7f7f7;
    }
	.dialog-wrapper > .dialog > .content > .count-wrapeer > span.active{
		color:#999;
	}

    .dialog-wrapper > .dialog > .content > .count-wrapeer > span.count {
        width: 48px;
        margin: 0 1px;

    }

    .dialog-wrapper > .dialog > .content > .count-wrapeer > span:first-child {
        margin-right: 10px;
    }

    .dialog-wrapper > .dialog > .dialog-btn {
        font-size: 16px;
        height: 50px;
        flex-shrink: 0;
        color: #fff;
        background: linear-gradient(-41deg, #ff4f18, #ff2000 24%, #f10000);
    }

    .moren {
        width: 100%;
    }

    .content {
        width: 100%;
        height: 100%;
        overflow: auto;
        font-size: 0;
    }

    ::-webkit-scrollbar {
        width: 0;
        height: 1px
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, .2);
        background: rgba(0, 0, 0, .2)
    }

</style>