import http from '../util/http.js';
export default{
    namespaced:true,
    state:{
        list:[],
        isInit:false,
    },
    getters:{},
    mutations:{
        init(state,data){
            state.list=data;
            state.isInit=true;
        },
    },
    actions:{
        init({state,commit}){
            if(state.isInit){
                return Promise.resolve();
            }else{
                // 请求数据
                http({url:'/order/allList'}).then(data=>{
                    return commit('init',data);

                });
            }
        },
    },

}