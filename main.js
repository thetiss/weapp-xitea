// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import api from './api'
import base from '@/config/baseUrl.js'

Vue.prototype.$api = api;
// 图片资源访问
Vue.prototype.$imgHttps = base.imgHttpsUrl;

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
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