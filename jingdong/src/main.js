// main.js是vue程序的根实例
import Vue from 'vue';//导入的vue这个包
import App from './App.vue';//导入根组件，自定义要加上路径，第三方包就可以直接写名字
import router from './router';//导入路由对象，完整行驶时为import router from './router/index.js'
import './assets/reset.css';//导入公共样式文件
import store from './store';//导入仓库
import elementUI from 'element-ui';//导入element-ui
import 'element-ui/lib/theme-chalk/index.css';
import toastRegistry from './assets/tishi.js'//提示框


Vue.use(toastRegistry)  // 这里也可以直接执行 toastRegistry()
Vue.use(elementUI);

import Cookies from 'js-cookie';
import http from './util/http.js';

Vue.prototype.$http = http;
Vue.prototype.$Cookies = Cookies;


let vm = new Vue({
        render:h => h(App),//是一个复合形式
        //components:{App:App},组件
        //template:<App></App>模板
        router,//挂载路由对象
        store,//导入主仓库
}).$mount('#app');//将上面的东西挂载