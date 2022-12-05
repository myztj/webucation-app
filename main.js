import App from './App'
import Vue from 'vue'

//引入Vuex
import store from "@/store/index.js"
Vue.prototype.$store = store

//全局mixins
import mixins from "@/common/mixins/index.js"
Vue.mixin(mixins)

// #ifndef VUE3
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	store,
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif