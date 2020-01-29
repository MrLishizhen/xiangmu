import http from '../util/http';
export default{

        namespaced:true,
        state:{
                data:null,
                isinit:false,
        },
        getters:{

        },
        mutations:{
                init(state,data){
                        state.data=data;
                        state.isinit=true;
                        console.log(state.data);
                }
        },
        actions:{
                init({state,commit},id){
                        if(state.ininit){
                                return Posime.resolve();
                        }else{
                                return  http({url:`/playlist/detail?id=${id}`}).then(result=>{
                                        commit('init',result);
                                })
                        }
                }
        }
}
