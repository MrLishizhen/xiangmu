import vue from 'vue';
import commit from '../components/commit.vue';
const VueConfrim =vue.extend(commit);


function show(text){
        const confrim = new VueConfrim({
                el: document.createElement('div'),
                data(){
                        return {
                                text:text,
                        }
                },

        });
        document.body.appendChild(confrim.$el);
}
function confrimFun() {
        vue.prototype.$confrim = show;
}
export default confrimFun;


