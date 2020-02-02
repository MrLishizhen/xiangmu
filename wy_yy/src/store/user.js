export default {
        namespaced:true,
        state:{

                data:null,//保存用户的信息
        },
        getters:{

        },
        mutations:{
                init(state,data){
                        state.data=data;//赋值
                }
        },
        actions:{

        },
}