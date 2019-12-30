<template>
    <div class='page-warpper'>
        <div class="header">
            <router-link to="/Cart"></router-link>
            <h1>确认订单</h1>
        </div>
        <div class='content'>
            <div class='content-info'>
                <h3>收货地址</h3>
                <div class='address-wra' @click="$router.push({path: '/Address', query: {'address':'orderconfirm'}})" :class="{empty:empty}">
                    <span class='address-name' v-text="address.receiveName" v-show="isAddress"></span>
                    <span class='address-phone' v-text="address.receivePhone" v-show="isAddress"></span>
                    <p class='address' v-text="`${address.receiveRegion} ${address.receiveDetail}`" v-show="isAddress"></p>
                </div>
                <h3>商品列表</h3>
                <div class='commodity-list'>
                    <ul class='list'>
                        <li v-for="item in listSettlement" :key="item.id" >
                            <div class='commodity'>
                                <img :src="item.avatar" alt="">
                                <div>
                                    <h4 class='name' v-text="item.name"></h4>
                                    <span class='crat-remark' v-text="item.remark"></span>
                                    <p>
					<span class='price-warpper'>
						￥<em class='price' v-text="item.price"></em>
					</span>
                                        <span class='number'>X<span class='count' v-text="item.count"></span></span>
                                    </p>
                                </div>
                            </div>
                            <div class='delivery-wra'>
                                <p class='delivery-hd'>
                                    <span>配送服务</span>
                                    <span>快递服务</span>
                                </p>
                                <p class='delivery-btm'>
                                    <span>中小件送货时间</span>
                                    <span>工作日、双休日与节假日均可送货</span>
                                </p>
                            </div>
                        </li>

                    </ul>
                    <!-- 商家备注 -->
                    <div class='remarks'>
                        <span>商家备注</span>
                        <div>
                            <input type="text" placeholder="选填 给店家留言">
                        </div>
                    </div>

                </div>
                <div class='footer'>
                    <div class='money-wra'>
                        <span>商品总金额</span>
                        <span class='subtotal' v-text="`￥${totalPriceAll}`"></span>
                    </div>
                    <div class='freight-wra'>
                        <span class='freight-title'>运费</span>
                        <span class='freight'>0.00</span>
                    </div>
                    <h3>实付金额<span class='money'></span></h3>

                    <button class='btn-generate-order' @click="payment">在线支付</button>
                </div>



            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Orderconfirm",
        data(){//存储数据
            return{
                empty:false,
                totalPrice:0,
                listSettlement:[],//购买商品列表
                address:[],
                isAddress:false,
                id:0,
            }
        },
        methods:{
            payment(){
                if(this.address.length===0){
                    this.$toast('请选择地址');
                    return;
                }
                let ids =JSON.parse(sessionStorage.getItem('ids')).join(',') ;
                let account = this.totalPriceAll;
                let addressId = this.address.id;
                let jsonStr = JSON.stringify({ids,account,addressId});
                this.$http({url:'/order/confirm',data:{jsonStr}}).then(orderId=>{
                    this.$toast('请付款');
                    this.$router.push({path:'/Pay',query:{id:orderId}});

                })

            }
        }
        ,
        computed:{
            totalPriceAll(){
               this.listSettlement.forEach(item=>{
                    this.totalPrice += item.price * item.count;
                });
                return this.totalPrice;
            }
        }
        ,
        created() {//生命周期钩子函数
            let ids = sessionStorage.getItem('ids');
            this.$http({url:'/cart/listSettlement',data:{jsonStr:ids}}).then(data=>{
                this.listSettlement=data;
            });

            this.id = this.$route.query.id ||0;

            if(this.id===0){
                this.$http({url:'/address/getdefault'}).then(data=>{
                            if(data){
                                this.isAddress=true;
                                this.address=data;
                            }
                            else{
                                this.empty=true;
                            }
                        });
            }else{
                this.$http({url:`/address/obtain/${this.id}`}).then(data=>{
                        this.address=data;
                        this.isAddress=true;
                    })
            }
        }
    }
</script>

<style scoped>
    .page-warpper {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .header {
        height: 44px;
        flex-shrink: 0;
        position: relative;
        background: linear-gradient(180deg, #fff, #efefef);
    }

    .header>a {
        position: absolute;
        left: 0;
        top: 0;
        width: 44px;
        height: 100%;

    }

    .header>a::after {
        content: '';
        position: absolute;
        width: 12px;
        height: 12px;
        border-top: 1px solid #848689;
        border-left: 1px solid #848689;
        -webkit-transform-origin: 50%;
        transform-origin: 50%;
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg);
        position: absolute;
        top: 50%;
        left: 18px;
        margin-top: -6px;

    }

    .header>h1 {
        text-align: center;
        font-size: 16px;
        font-weight: 500;
        line-height: 44px;
    }

    .content {
        flex-grow: 1;
        overflow:hidden;
        background: #f7f7f7;
    }

    .content>.content-info {
        width: 100%;
        height: 100%;
        overflow: auto;
    }

    .content>.content-info>h3 {
        height: 40px;
        font-weight: 600;
        color: #333;
        font-size: 16px;
        line-height: 40px;
        padding-left: 15px;
        background-color: #fff;
    }

    .content>.content-info>.address-wra {
        padding: 10px 15px;
        background-color: #f0f0f0;
        color: #ccc;
        position: relative;
        background: #fff url(bj1.png) -7px bottom repeat-x;
        background-size: 64px 5px;
        min-height:50px;
    }
    .content>.content-info>.address-wra.empty::after{
        content:'你还没有默认地址哦，点击可以选择你的收货地址';
        display:block;
        line-height:50px;
    }
    .content>.content-info>.address-wra::before {
        content: '';
        position: absolute;
        width: 12px;
        height: 12px;
        border-bottom: 1px solid #808080;
        border-right: 1px solid #808080;
        -webkit-transform-origin: 50%;
        transform-origin: 50%;
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg);
        position: absolute;
        top: 50%;
        right: 15px;
        margin-top: -6px;

    }

    .content>.content-info>.address-wra>span {
        padding: 0 15px;
        font-size: 18px;
    }

    .content>.content-info>.address-wra>span.address-name {
        padding-left: 0;
        color: #b0b0b0;

    }

    .content>.content-info>.address-wra>span.address-phone {
        font-size: 16px;
    }

    .content>.content-info>.address-wra>p.address {
        font-size: 14px;
        margin-top: 5px;
    }


    /*商品列表*/
    .content>.content-info>.commodity-list {
        padding: 15px 15px;
        background-color: #fff;
    }

    .content>.content-info>.commodity-list>ul {}

    .content>.content-info>.commodity-list>ul>li {
        border-bottom: 1px solid #e5e5e5;
        padding-top:10px;

    }

    .content>.content-info>.commodity-list>ul>li>.commodity {
        padding-left: 5px;
        display: flex;

    }

    .content>.content-info>.commodity-list>ul>li>.commodity>img {
        width: 75px;
        height: 75px;
        flex-shrink: 0;
    }

    .content>.content-info>.commodity-list>ul>li>.commodity>div {
        flex-grow: 1;
        padding-left: 10px;
    }

    .content>.content-info>.commodity-list>ul>li>.commodity>div>h4 {
        font-size: 14px;
        color: #333;
        line-height: 20px;
        margin-bottom: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .content>.content-info>.commodity-list>ul>li>.commodity>div>span.crat-remark {
        font-size: 12px;
        padding: 4px 6px;
        background-color: #f0f0f0;
    }

    .content>.content-info>.commodity-list>ul>li>.commodity>div>p {
        height: 30px;
        line-height: 30px;
    }

    .content>.content-info>.commodity-list>ul>li>.commodity>div>p>span.price-warpper {
        font-size: 12px;
        color: red;

    }

    .content>.content-info>.commodity-list>ul>li>.commodity>div>p>span.price-warpper>em.price {
        font-size: 16px;
        font-style: normal;
        text-align: left;

    }

    .content>.content-info>.commodity-list>ul>li>.commodity>div>p>span.number {
        font-size: 12px;
        color: #b0b0b0;
        float: right;

    }

    .content>.content-info>.commodity-list>ul>li>.delivery-wra {
        margin-top: 15px;
    }

    .content>.content-info>.commodity-list>ul>li>.delivery-wra>p {
        min-height: 30px;
        line-height: 30px;
    }

    .content>.content-info>.commodity-list>ul>li>.delivery-wra>.delivery-hd {
        color: #333;
    }

    .content>.content-info>.commodity-list>ul>li>.delivery-wra>.delivery-hd>span:last-child {
        color: #666;
        font-size: 12px;
        float: right;
    }

    .content>.content-info>.commodity-list>ul>li>.delivery-wra>.delivery-btm {
        color: #333;
    }

    .content>.content-info>.commodity-list>ul>li>.delivery-wra>.delivery-btm>span:last-child {
        color: #666;
        font-size: 12px;
        float: right;
    }

    /*商家备注*/
    .remarks {

        display: flex;
        height: 45px;
    }

    .remarks>span {
        width: 70px;
        flex-shrink: 0;
        line-height: 45px;
        font-size: 16px;
        color: #333;
    }

    .remarks>div {
        flex-grow: 1;
    }

    .remarks>div>input {
        border: none;
        outline: none;
        font-size: 14px;
        height: 45px;
        line-height: 45px;
        /* margin-top:10px; */
    }


    .footer {
        padding: 10px 15px;
        background-color: #fff;
    }

    .footer>.money-wra,
    .footer>.freight-wra {
        height: 30px;
        line-height: 30px;
    }

    .footer>.money-wra>span,
    .footer>.freight-wra>span {
        font-size: 14px;
    }

    .footer>.money-wra>span.subtotal {
        color: red;
        float: right;
    }

    .freight-wra>span.freight {
        float: right;
    }

    .footer {
        margin-top: 15px;
    }

    .footer>h3 {
        height: 24px;
        font-size: 16px;
        line-height: 24px;
        text-align: right;
    }

    .footer>h3>.money {
        color: red;
        font-size: 14px;
        font-weight: 500;
        margin-left: 5px;
    }

    .footer>button {
        width: 100%;
        display: block;
        height: 46px;
        text-align: center;
        line-height: 46px;
        background: #3884ff;
        color: #fff;
        font-size: 16px;
        border-radius: 4px;
        margin-top: 30px;
    }

</style>