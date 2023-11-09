<template>
	<view class="container">
		<view class="section">1</view>
		<view class="section">2</view>
		<view class="card"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.container {
		// width: 100%;
		// height: 100%;
		height: 100vh;
		display: flex;
		background-color: #999;
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