import Vue from 'vue'
import channel from './components/channel/Channel.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(channel)
}).$mount('#temp_app')