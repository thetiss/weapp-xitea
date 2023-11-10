import mart from './mart.js'

const json = {
	mart
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