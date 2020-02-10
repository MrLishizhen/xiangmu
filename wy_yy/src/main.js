import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import  './assets/font/iconfont.css';//引入css样式文件
import http from './util/http.js';
//引入vue-swiper轮播图组件
import VueAwesomeSwiper from 'vue-awesome-swiper';
//引入配套的样式
import 'swiper/dist/css/swiper.css';
import './assets/font/iconfont.css';
//注册这个组件
import tishi from './assets/tishi';
Vue.use(tishi);

Vue.use(VueAwesomeSwiper);
// import APlayer from '@moefe/vue-aplayer';
// //音乐aplayer
// Vue.use(APlayer, {
//         defaultCover: 'https://github.com/u3u.png',
//         productionTip: true,
// });
Vue.prototype.$http=http;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
