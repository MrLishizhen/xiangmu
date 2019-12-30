//根实例：穿件vue的根实例对象，并且挂载到挂载点上
import Vue from 'vue';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import cookies from 'js-cookie';
import http from './util/http.js';
import store from './store';


Vue.use(ElementUI);
Vue.prototype.$cookies=cookies;
Vue.prototype.$http = http;
let vm = new Vue({
        router,
        store,
        components: {App},
        render:h=>h(App),
}).$mount('#app');

