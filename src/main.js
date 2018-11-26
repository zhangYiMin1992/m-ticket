/*!
 * 门票频道页入口
 * (c) tuniu.com
 */
require('./styles/init.css')
require('./styles/style.css')
require('./styles/header.css')
//var lazyload = require('./components/vue-components/components/vue-lazyload/index.js')报错
import flexible from './util/flexible'
import Vue from 'vue'
import App from './components/channel/Channel.vue'
import axios from 'axios'
import {
    moreScenic,
    nearbyScenic,
    matchProdImg,
    matchProdText,
    searchLink,
    scenicThemeL,
    scenicLink,
    adLinksConverter
} from './filters/concat-url'
import {highlight} from './filters/decorator'
import {formatDistance, autoProtocol,imgAutoProtocolWebP} from './filters/string-tools'
//import lazyLoad from './components/vue-components/components/vue-lazyload/index.js'
import Sticky from './directives/sticky'
import back from './directives/back'

Vue.prototype.$axios = axios 
Vue.config.productionTip = false
Vue.directive('Sticky', Sticky)
Vue.directive('back', back)
Vue.directive('focus',{
    updata: function(el){
        el.focus()
    }
});
// Vue.use(lazyload, {      报错
//     preLoad: 1.2,
//     //loading: '//m.tuniu.com/site/m2015/images/ticket/ticket-loading.gif', // loading图片
//     attempt: 3
// });
//Vue.use(asyncComp);

var img = new Image();
img.onload = function () {
    window.webpCapability = (img.width > 0) && (img.height > 0);
};
img.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA";

Vue.filter('adLinksConverter', adLinksConverter);
Vue.filter('autoProtocol', autoProtocol);
Vue.filter('imgAutoProtocolWebP', imgAutoProtocolWebP);
Vue.filter('moreScenic', moreScenic);
Vue.filter('searchLink', searchLink);
//Vue.filter('scenicThemeLink', scenicThemeLink);报错
Vue.filter('scenicLink', scenicLink);
Vue.filter('nearbyScenic', nearbyScenic);
Vue.filter('matchProdImg', matchProdImg);
Vue.filter('matchProdText', matchProdText);
Vue.filter('highlight', highlight);
Vue.filter('formatDistance', formatDistance);

new Vue({
    replace:true,
    data: {
        isApp :G.isApp,
        city: {
            code:GDATA.cityCode,
            name:GDATA.cityName
        }
    },
    template: '<div><app :is-app="isApp" :current-city="city"></app></div>',
    render: h => h(App)
}).$mount('#temp_app');

const citySelectBtn = document.querySelector('.city-select');
citySelectBtn && (citySelectBtn.onclick = function () {
    app.$refs.channel.showCityPicker()
});

//export default app


