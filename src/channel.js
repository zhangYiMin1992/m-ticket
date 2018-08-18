import Vue from 'vue'
import channel from './components/Channel.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(channel)
}).$mount('#app')