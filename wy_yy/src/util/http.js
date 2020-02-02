import axios from 'axios';
import cookie from 'js-cookie'

function http(options){
        let defaultOption = {
                method: 'post',
                headers: {
                        'MUSIC_U': cookie.get('MUSIC_U'),
                        '__csrf':cookie.get('__csrf'),
                        '__remember_me':cookie.get('__remember_me'),
                }

        };
        let alwaysPendingPromise = new Promise(() =>{
        });//一个永远是pending的promise对象
        options = Object.assign({}, defaultOption, options);//合并
        return axios(options).then(response =>{
                if(response.status == 200) return response.data;
                else throw new Error(response.statusText);
        }).then(result =>{
                switch(result.code){
                        case 200:
                                return result;
                        case 502:
                                throw new Error(result.message);
                }
        }).catch(error =>{
                alert(error.message);
                return alwaysPendingPromise;
        })

}

export default http