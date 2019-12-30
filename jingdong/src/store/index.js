import Vue from 'vue';
import Vuex from 'vuex';
import user from './user.js';
import orderList from './orderList.js'

Vue.use(Vuex);

let store = new Vuex.Store({
        modules:{user,orderList},
        state:{

        },
        getters:{

        },
        mutations:{

        },
        actions:{

        },
});

export default store;