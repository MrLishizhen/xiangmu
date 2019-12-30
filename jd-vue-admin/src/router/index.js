import Vue from 'vue';//导入vue
import Router from 'vue-router';
import Pages from '../views';

Vue.use(Router);

let router = new Router({
        routes:[
                {path:'/',redirect:'/home'},
                {path:'/home',component:Pages.Home},
                {path:'/login',component:Pages.Login},
        ]
});

export default router;