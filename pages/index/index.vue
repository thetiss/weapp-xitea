<template>
	<view class="container">
		<view class="section">1</view>
		<view class="section">2</view>
		<view class="card"></view>
		<view class="btn" @click="chooseContact">选择联系人</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {
			chooseContact() {
				wx.addPhoneContact({
					success: function(res) {
						console.log(res, '成功回调')
					},
					fail(res) {
						console.log(res, '错误回调')
					},
					complete(res) {
						console.log(res, '结束回调')
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		height: 100%;
		background-color: #999;
		// display: flex;
	}

	.section {
		width: 120rpx;
		height: 120rpx;
		background-color: pink;
		padding: 30rpx;
		margin: 20rpx;
	}

	.section:nth-child(2n) {
		box-sizing: border-box;
	}

	.card {
		width: 120rpx;
		height: 120rpx;
		background-color: blue;
	}
</style>