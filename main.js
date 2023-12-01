// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import api from './api'
import base from '@/config/baseUrl.js'
import store from './store/index.js'

Vue.prototype.$store = store;
Vue.prototype.$api = api;
// 图片资源访问
Vue.prototype.$imgHttps = base.imgHttpsUrl;
// 
// 金额显示分->元
Vue.filter('fenPriceFilter', function(fen) {
	if (fen == 0) return 0 // 0
	let fenNum = +fen
	if (!fenNum) return '--' // null、undefine
	return parseFloat(fenNum / 100)
})

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif