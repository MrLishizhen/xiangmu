import Vue from 'vue';//导入vue
import Vuex from 'vuex';//导入vuex
import category from './category.js';

Vue.use(Vuex);

let store = new Vuex.Store({

        modules:{category},//引入子仓库

        state:{//保存的是仓库的数据

        },
        getters:{//仓库的计算属性

        },
        mutations:{//仓库的方法，在这里面不能包含任何耗时的异步操作，所有想要更改state中的数据都必须从这里更改

        },
        actions:{//仓库的方法，在这里面可以包含异步的耗时的方法，在这里没有更改state中数据的资格

        },
})

export default store;