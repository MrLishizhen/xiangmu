import Vue from 'vue'
import Vuex from 'vuex'
import gedan from './gedan.js';
import user from './user.js';


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {//这个是你要注册的子仓库
          gedan,
          user,

  }
})
