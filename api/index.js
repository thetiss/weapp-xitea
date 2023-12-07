import mart from './mart.js'
import martDetail from './martDetail.js'
import news from './news.js' // 注册1： 引入

const json = {
	mart,
	martDetail,
	news, // 注册2： 命名[finish mock api]
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