import http from '../util/http.js';

export default {
        namespaced:true,
        state:{
                userList:{},
                shoppingList:[],
                isinit:{
                        userInit:false,
                        shoppingListInit:false,
                }
        },
        getters:{

        },
        mutations:{
                user(state,user){
                        state.userList=user;
                        state.isinit.userInit=true;
                },
                shoppingList(state,results){
                        state.shoppingList=results;
                        state.isinit.shoppingListInit=true;
                        console.log(state.shoppingList);
                }
        },
        actions:{
                //登录者的名字
                userInit({state,commit}){
                        if(state.isinit.userinit){
                                return Promise.resolve();
                        }else{
                                return http({url:'/users/info'}).then(results=>commit('user',results))
                        }

                },
                shoppingList({state,commit}){
                        if(state.isinit.shoppingListInit){
                                return Promise.resolve();
                        }else{
                                return http({url:'/order/number'}).then(results=>commit('shoppingList',results));
                        }

                }
        },
}
