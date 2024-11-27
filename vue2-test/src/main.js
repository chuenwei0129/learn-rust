import Vue from 'vue'
import App from './App.vue'
import './index.css'
import Alert from './components/alert/alert.js'

Vue.config.productionTip = false
Vue.prototype.$Alert = Alert

const vm = new Vue({
  render: (h) => h(App),
}).$mount('#app')

console.log('🚀 ~ vm:', vm)
