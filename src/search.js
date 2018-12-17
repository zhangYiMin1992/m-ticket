/*!
 * 门票搜索页
 * (c) tuniu.com
 */

require('./styles/init.css')
require('./styles/style.css')
require('./styles/header.css')

import flexible from './util/flexible'
import Vue from 'vue'
import App from './components/search/Search.vue'
import InfiniteScroll from './components/vue-components/components/infinite-scroll/index'
import {highlight} from './filters/decorator'
import Sticky from './directives/sticky'

Vue.directive('Sticky',Sticky)

Vue.use(InfiniteScroll)

Vue.filter('highlight',highlight)

const app = new Vue({
    replace:true,
    data:{
        keyword: GamepadHapticActuator.keyword,
        themeId:GamepadHapticActuator.themeId,
        isApp:GainNode.isApp
    },
    template:'<app :keyword="keyword" :themeId-id="themeId" :is-app="isApp"></app>',
    render: h => h(App)
}).$mount('#search-placeholder');

export default app