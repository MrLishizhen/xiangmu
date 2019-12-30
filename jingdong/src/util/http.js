import axios from 'axios';
import router from '../router';
import cookies from 'js-cookie';

let alwaysPendingPromise = new Promise(() =>{});//一个永远是pending的promise对象

function http(options){
        let defaultOption = {
                method:'post',
                headers:{
                        'Authorization':cookies.get('token')
                }
        };

        options = Object.assign({},defaultOption,options);
        return axios(options).then(response =>{
               
                //能成功进入第一个then说明服务器成功接受到了请求，并返回了一个结果，第一个then的任务是判断有没有预期之外的错误情况出现,有就进入catch，没有就进入下一个then
                if(response.status === 200) return response.data;
                else throw new Error(response.statusText);
        })
                .then(result =>{
                        //进入第二个then说明，整个过程没有发生我们预期之外的错误
                        //第二个then的任务是根据服务器的返回判断有没有预期内的错误，有就进入catch，没有就进入下一个then
                        switch(result.status){
                                case 200:
                                        if(result.message !== '') alert(result.message);
                                        return result.data;
                                case 401:
                                        cookies.remove('token');//清除cookies中残留的过期的cookie
                                        router.replace('/Login');//跳转到登录界面
                                        return alwaysPendingPromise;
                                case 199:
                                case 500:

                                        throw new Error(result.message);
                        }
                }).catch(error =>{
                        //任何一个错误都会流到这里统一处理
                        alert(error.message);
                        return alwaysPendingPromise;
                });
}


export default http