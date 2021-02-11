import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import '@/assets/css/global.css'

Vue.prototype.baseURL = 'http://127.0.0.1:5000/',

  Vue.filter('dateFormat', function (originVal) {
    let tt = Date.parse(originVal)
    let t = new Date()
    let zone = t.getTimezoneOffset()*60*1000
    let rt = tt+zone
    let dt = new Date()
    dt.setTime(rt)

    let y = dt.getFullYear()
    let m = (dt.getMonth() + 1 + '').padStart(2, '0')
    let d = (dt.getDate() + '').padStart(2, '0')

    return `${y}-${m}-${d}`
  })

Vue.filter('timeFormat', function (originVal) {
  let tt = Date.parse(originVal)
  let t = new Date()
  let zone = t.getTimezoneOffset()*60*1000
  let rt = tt+zone
  let dt = new Date()
  dt.setTime(rt)

  let y = dt.getFullYear()
  let m = (dt.getMonth() + 1 + '').padStart(2, '0')
  let d = (dt.getDate() + '').padStart(2, '0')
  let hh = (dt.getHours() + '').padStart(2, '0')
  let mm = (dt.getMinutes() + '').padStart(2, '0')
  let ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d}  ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
