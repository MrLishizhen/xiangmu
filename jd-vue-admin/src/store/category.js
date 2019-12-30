import http from '../util/http.js';
// import $cookies from 'js-cookie';
export default{
        namespaced:true,
        state:{
                list:[],
                isInit:false,
        },
        getters:{

        },
        mutations:{
                init(state,list){
                        state.list=list;
                        state.isInit=true;
                },
                add(state,model){
                        state.list.push(model);
                },
                remove(state,data){
                        let i = state.list.findIndex(item=>item.id===data.id);
                        state.list.splice(i,1);

                },
                update(state,model){
                        let i = state.list.findIndex(item=>item.id===model.id);
                        state.list.splice(i,1,model);
                }

        },
        actions:{
                init( {state,commit}){
                        //给组件调用的东西尽量都返回一个promise对象，这样组件那边如果有收尾工作才方便进行
                        if(state.isInit){
                                return Promise.resolve();

                        }else{
                                return http({url:'/category/all'})
                                        .then(list=>commit('init',list));
                        }
                },
                add({commit},model){
                        return http({url:'/category/add',data:model})
                                .then(id=>{
                                        let {fid,name,newAvatar} = model;
                                        let avatar=newAvatar?`/images/category/${newAvatar}`:null;
                                        commit('add',{id,fid,name,avatar});
                                })
                }
                ,
                remove({commit},data){
                        return http({url:'/category/remove',data}).then(()=>commit('remove',data))
                },
                //修改
                update({commit},data){
                        return http({url:'category/update',data})
                }
        },
}