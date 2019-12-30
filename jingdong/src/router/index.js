import Vue from 'vue';
import Router from 'vue-router';
import Pages from '../pages';
import Register from "../pages/Register/index";

Vue.use(Router);//注册这个第三方包

var router = new Router ({
        routes:[
                {path:'/',redirect:'/Home'},
                {path:"/Home",component:Pages.Home},
                {path:'/Category',component:Pages.Category},
                {path:'/Profile',component:Pages.Profile},
                {path:'/Login',component:Pages.Login},
                {path:'/Cart',component:Pages.Cart},
                {path:'/List/:cid',component:Pages.List},
                {path:'/Detail/:id',component:Pages.Detail},
                {path:'/Account',component:Pages.Account},
                {path:'/Address',component:Pages.Address},
                {path:'/Testing',component:Pages.Testing},
                {path:'/Phonemodify',component:Pages.Phonemodify},
                {path:'/Orderconfirm',component:Pages.Orderconfirm},
                {path:'/Pay',component:Pages.Pay},
                {path:'/Register',component:Pages.Register},
                {path:'/OrderList',component:Pages.OrderList},

        ],
})

export default router;