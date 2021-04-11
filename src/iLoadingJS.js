import Vue from 'vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
Vue.use(Loading);

const animationLoad = {
    startLoad: function (param) {
        let loader = Vue.$loading.show({
            color: '#620003',
            loader: 'bars',
            width: 65,
            height: 128,
            backgroundColor: '#ffffff',
            opacity: 0.5,
            zIndex: 999,
          });

          return loader;
          
    },
    endLoad:function(resultLoad,end_seconds){
        if(end_seconds){
            setTimeout(() => {
                resultLoad.hide();
            }, end_seconds);
        }else{
            resultLoad.hide();
        }
    }
}

export default {
    animationLoad
}
