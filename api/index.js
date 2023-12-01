import mart from './mart.js'
import martDetail from './martDetail.js'

const json = {
	mart,
	martDetail,
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