/*!
 * 门票频道页入口
 * (c) tuniu.com
 */
require('./styles/init.css')
require('./styles/style.css')
require('./styles/header.css')

import Vue from 'vue'
import App from './components/channel/Channel.vue'
import Sticky from './directives/sticky'
import back from './directives/back'
Vue.config.productionTip = false
Vue.directive('Sticky', Sticky)
Vue.directive('back', back)
new Vue({
  render: h => h(App)
}).$mount('#temp_app')
