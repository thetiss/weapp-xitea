import mart from './mart.js'
import martDetail from './martDetail.js'
import news from './news.js' // 注册1： 引入
import notices from './notices.js' // 注册1： 引入
import categories from './categories.js' // 注册1： 引入


const json = {
	mart,
	martDetail,
	news, // 注册2： 命名[finish mock api]
	notices,
	categories,
}

export default (name, Loading = true) => {
	if (Loading) {
		uni.showLoading()
	}
	return new Promise(resolve => {
		setTimeout(() => {
			uni.hideLoading()
			resolve(json[name])
		}, 500)
	})
}