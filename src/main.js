import Vue from 'vue'
import App from './App.vue'

import ApiMusicPlugin from './plugins/apiMusic'

Vue.use(ApiMusicPlugin)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
