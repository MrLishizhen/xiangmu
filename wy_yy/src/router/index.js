import Vue from 'vue'
import VueRouter from 'vue-router'
import pages from '../pages';

Vue.use(VueRouter);

const router =new VueRouter({
   routes:[
           {path:'/',redirect:'/home'},
           {path:'/home',component:pages.home},
           {path:'/list',component:pages.list},
           {path:'/classify',component:pages.classify},
           {path:'/singer',component:pages.singer},
           {path:'/my',component:pages.my},
           {path:'/sousuo',component:pages.sousuo},
           {path:'/details/:id',component:pages.details},//歌单详情页
           {path:'/play/:gid',component:pages.play},//歌曲播放页
           {path:'/login',component:pages.login},//登录
           {path:'/register',component:pages.register},//注册
           {path:'/setUp',component:pages.setUp},//退出登录
           {path:'*',component:pages.f}//404界面
           ]
});
export default router
