import axios from 'axios';
import router from '../router';//引入router
import cookies from 'js-cookie';
import { Message } from 'element-ui';//单独引入这个包，用来显示消息提示
let alwaysPendingPromise = new Promise(() =>{
});//一个永远是pending的promise对象

function http(options){

        let defaultOptions = {//晟敏一个对象，里面是一个http的默认发送属性
                method: 'post',
                headers: {
                        'Authorization': cookies.get('token'),
                },
        };

        options = Object.assign({}, defaultOptions, options);//合并默认对象和传入对象的值
        return axios(options).then(response =>{//发送ajax请求

                if(response.status === 200) return response.data;//如果成功就返回data中的内容
                else throw new Error(response.statusText);//如果是错误就返回一个错误对象
        })
                .then(result =>{
                        switch(result.status){
                                case 200 :
                                        if(result.message !== '')
                                                Message.success({message:result.message});;//如果有错误就alert错误
                                        return result.data;//否则就返回result中的data数据
                                case 401 :
                                        cookies.remove('token');//清除cookies中残留的过期的cookie
                                        router.replace('/login');//跳转到登录界面
                                        return alwaysPendingPromise;
                                case 199://除了上面的那些错误，就构建一个错误对象
                                case 500:
                                        throw new Error(result.message);
                        }
                }).catch(error=>{
                        Message.error({message:error.message});//错误弹窗
                        return alwaysPendingPromise;
                })
}

export default http//导出http函数