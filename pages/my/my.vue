<template>
	<view class="container">
		<image class="w-100" :src="headSrc" mode="widthFix"></image>
		<view class="content plr-30 bg-white">
			<view class="welcome">
				<view class="text-lg">你好{{isLogin? userInfo.nickname : '立即登录开启喜茶星球之旅'}}</view>
				<view>灵感之茶，中国制造</view>
			</view>
			<view class="member-card p-20">
				<view class="info flex-between-center">
					<view class="title">
						<view class="d-flex align-items-center">
							<view class="font-wenyue">GO会员</view>
							<view class="join-member ml-10 text-sm text-color-assist">
								<text>成为星球会员享双倍积分</text>
								<image :src="arrowRightIcon"></image>
							</view>
						</view>
					</view>
					<image class="avatar" :src="avartarIcon"></image>
					<view class="level font-neutra">{{userInfo.level}}</view>
				</view>
				<view class="row d-flex mt-20">
					<view class="grid flex-vertical-center" v-for="(member, mIdx) in memberList" :key="mIdx">
						<image class="g-icon" :src="member.icon"></image>
						<text class="font-neutra text-lg mb-10">{{member.value}}</text>
						<text class="text-sm text-color-grey">{{member.label}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="open-gift"></view>
		<view class="entrace-list">
			<view class="list-cell"></view>
			<view class="list-cell"></view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				memberList: [{
					label: '积分商城',
					value: '63',
					icon: this.$imgHttps + '/static/images/my/me_icon_points.png',
				}, {
					label: '喜茶劵',
					value: '0',
					icon: this.$imgHttps + '/static/images/my/me_icon_quan.png',
				}, {
					label: '钱包',
					value: '0.00',
					icon: this.$imgHttps + '/static/images/my/me_icon_wallet.png',
				}, {
					label: '阿喜有礼',
					value: '0',
					icon: this.$imgHttps + '/static/images/my/me_icon_gift_card.png',
				}],
				arrowRightIcon: this.$imgHttps + '/static/images/my/icon_arrow.png',
				avartarIcon: 'https://wx.qlogo.cn/mmopen/vi_32/Hx7MFkCEmZVHziaTTiaHSiaCs4ApnH5CD0nYOhOg1nYUUMYtxMXkL6L4VL5icRfO5w4LGzW5ib0FZicwj2MficyYfZgCw/132',
				headSrc: 'https://go.cdn.heytea.com/storage/products/2019/12/18/01954797f3fb470cb6ba1606476c658c.png',
			}
		},
		computed: {
			...mapState(['isLogin', 'userInfo']),
		},
		methods: {}
	}
</script>

<style lang="scss" scoped>
	.welcome {
		color: #432A21;
		position: relative;
		margin-top: -136rpx;
	}

	.avatar {
		width: 150rpx;
		height: 150rpx;
		border-radius: 100%;
	}

	.info {
		padding: 20rpx 0;
		position: relative;
		border-bottom: 1rpx solid rgba(200, 199, 204, 0.3);

		.title {
			font-size: 40rpx;

			.join-member {
				padding: 10rpx 30rpx;
				background-color: #e9e9e9;
				border-radius: 50rem;

				image {
					width: 20rpx;
					height: 20rpx;
				}
			}
		}

		.level {
			padding: 2rpx 20rpx;
			position: absolute;
			bottom: 20rpx;
			border: 2rpx solid #343434;
			border-radius: 12rpx;
		}
	}

	.grid {
		flex: 1;
		flex-shrink: 0;

		.g-icon {
			width: 100rpx;
			height: 100rpx;
		}
	}
</style>