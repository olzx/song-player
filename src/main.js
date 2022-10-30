import Vue from 'vue'
import App from './App.vue'

import ApiMusicPlugin from './plugins/apiMusic'
import store from './store/index'

Vue.use(ApiMusicPlugin)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
