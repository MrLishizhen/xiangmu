import vue from 'vue';//导入vue
import Tishi from '../components/tishi.vue';

const tishi=vue.extend(Tishi);

function showTiShi(title,duration=3000){
        const TiShi = new tishi({
                el: document.createElement('div'),
                data() {
                        return {
                                title: title,
                                show: true,
                                isShow:true,  // 作用:在隐藏组件之前,显示隐藏动画
                        }
                }
        });
        document.body.appendChild(TiShi.$el);

        setTimeout(() => {TiShi.isShow= false} ,duration - 1250)  // 过了 duration 时间后隐藏整个组件
        setTimeout(() => {TiShi.show = false}, duration)


}
function registryToast() {

        vue.prototype.$tiShi = showTiShi;
}
export default registryToast