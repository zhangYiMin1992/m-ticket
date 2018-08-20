/*!
 * 门票频道页入口
 * (c) tuniu.com
 */
require('./styles/init.css');
require('./styles/style.css')
require('./styles/header.css')

import Vue from 'vue'
import App from './components/channel/Channel.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#temp_app')
