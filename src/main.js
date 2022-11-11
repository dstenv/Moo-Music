import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import vantUI from '../src/vantUi'
import MySkeleton from '@/components/MyPlugins/MySkeleton.vue'


Vue.prototype.axios = axios
Vue.use(vantUI)
Vue.component('MySkeleton',MySkeleton)



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
