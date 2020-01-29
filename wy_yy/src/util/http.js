import axios from 'axios';
import cookie from 'js-cookie'

function http(options){
    let defaultOption={
        method:'post',

    }
    options=Object.assign({},defaultOption,options);//合并
    return axios(options).then(response=>{
        if(response.status==200) return response.data;
        else throw new Error(response.statusText);
    }).then(result=>{
        switch(result.code){
            case 200:return result;

        }
    })

}

export default http