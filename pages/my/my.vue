<template>
	<view class="container">
		<image class="w-100" :src="headSrc" mode="widthFix"></image>
		<view class="content plr-30">
			<view class="welcome">
				<view class="text-lg">你好{{isLogin? userInfo.nickname : '立即登录开启喜茶星球之旅'}}</view>
				<view>灵感之茶，中国制造</view>
			</view>
			<view class="member-card p-20 mb-40">
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
			<view class="news">
				<view class="mt-10 mb-10 text-lg font-thin-bold">星球播报</view>
				<swiper class="news-swiper mb-10" next-margin="50px" :autoplay="true" :interval="3000" :duration="1000"
					circular>
					<swiper-item class="news-swiper-item" v-for="(news, nIdx) in newsList" :key="nIdx">
						<view class="news-swiper-item-wrap d-flex align-items-center mr-40">
							<image class="cover mr-20" :src="news.coverPic"></image>
							<view class="desc">
								<view class="title text-medium font-thin-bold mt-10 mb-10">{{news.title}}</view>
								<view class="subtitle">{{news.subtitle}}</view>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="task-center d-flex align-items-center bg-white border-radius-base mt-40 mb-40 ptb-10">
				<view class="intro flex-vertical-center">
					<view class="text-lg">任务中心</view>
					<view class="text-sm en">mission center</view>
				</view>
				<view class="image flex-horizontal-center">
					<image :src="taskSrc"></image>
				</view>
			</view>
		</view>
		<view class="open-gift bg-white mb-20">
			<view class="header flex-between-center">
				<text>开通礼包</text><text>更多</text>
			</view>
			<view class="grid d-flex flex-wrap">
				<view class="item flex-vertical-center p-20" v-for="(gift, gIdx) in giftList" :key="gIdx">
					<image class="icon mb-20" :src="gift.icon"></image>
					<view class="">
						<text>{{gift.name}}</text>
						<text class="num font-neutra">{{gift.number}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="entrace-list">
			<view class="list-cell w-100 d-flex align-items-center text-medium bg-white p-30"
				v-for="(listCell, lIdx) in listCellList" :key="lIdx">
				<view class="list-cell-content-wrap w-100 flex-between-center">
					<text>{{listCell.name}}</text>
					<text class="font-size-sm text-color-assist">{{listCell.desc}}</text>
				</view>
				<image class="flex-shrink-0 right-icon ml-10" :src="rightArrowIcon"></image>
			</view>
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
				newsList: [],
				giftList: [{
						icon: this.$imgHttps + '/static/images/my/member_benefits/me_rights_icon_free.png',
						name: '星球赠饮券',
						number: '1',
					},
					{
						icon: this.$imgHttps + '/static/images/my/member_benefits/me_rights_icon_1jia1.png',
						name: '买一赠一券',
						number: '1',
					},
					{
						icon: this.$imgHttps + '/static/images/my/member_benefits/me_rights_icon_2jia1.png',
						name: '买二赠一券',
						number: '2',
					},
					{
						icon: this.$imgHttps + '/static/images/my/member_benefits/me_rights_icon_qingshi.png',
						name: '喜茶轻食券',
						number: '2',
					},
					{
						icon: this.$imgHttps + '/static/images/my/member_benefits/me_rights_icon_youxian_new.png',
						name: '优先券',
						number: '1',
					},
					{
						icon: this.$imgHttps + '/static/images/my/member_benefits/me_rights_icon_waimai_new.png',
						name: '免运费券',
						number: '3',
					},
				],
				listCellList: [{
						name: '会员码',
						desc: '门店扫码积分、喜茶钱包和阿喜有礼卡支持',
						path: '/pages/my/code',
					},
					{
						name: '兑换中心',
						desc: '兑换星球会员、喜茶券和阿喜有礼卡',
						path: '',
					}, {
						name: '星球封面',
						desc: '',
						path: '',
					},
					{
						name: '联系客服',
						desc: '',
						path: '',
					}, {
						name: '消息中心',
						desc: '',
						path: '',
					},
					{
						name: '更多',
						desc: '',
						path: '',
					},
				],
				arrowRightIcon: this.$imgHttps + '/static/images/my/icon_arrow.png',
				avartarIcon: 'https://wx.qlogo.cn/mmopen/vi_32/Hx7MFkCEmZVHziaTTiaHSiaCs4ApnH5CD0nYOhOg1nYUUMYtxMXkL6L4VL5icRfO5w4LGzW5ib0FZicwj2MficyYfZgCw/132',
				headSrc: 'https://go.cdn.heytea.com/storage/products/2019/12/18/01954797f3fb470cb6ba1606476c658c.png',
				taskSrc: this.$imgHttps + '/static/images/my/b3d3a98e3c7f450aaa32fbec6aecdfaf.png',
				rightArrowIcon: this.$imgHttps + '/static/images/common/icon_jump_black3.png',
			}
		},
		computed: {
			...mapState(['isLogin', 'userInfo']),
		},
		async onLoad() {
			this.newsList = await this.$api('news') //TODO MOCK DATA FROM API.JS
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
		border-bottom: 1rpx solid rgba(200, 199, 204, 0.3);
		position: relative;
		margin-top: -50rpx;

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


	.news-swiper {
		height: 200rpx;

		.news-swiper-item {
			.news-swiper-item-wrap {
				padding: 40rpx 60rpx;
				background-color: $bg-color-white;
				border-radius: 6rpx;
			}

			.cover {
				width: 100rpx;
				height: 100rpx;
				border-radius: 100%;
			}

			.desc {

				.title {}

				.subtitle {}
			}
		}
	}

	.task-center {

		.intro {
			flex: 1;

			.en {
				text-transform: uppercase;
			}
		}

		.image {
			flex: 1;

			image {
				width: 200rpx;
				height: 200rpx;
			}
		}
	}

	.open-gift {
		padding: 30rpx 40rpx;

		.grid {
			.item {
				width: 33.3333%;

				.icon {
					width: 70rpx;
					height: 70rpx;
				}

				.num {
					margin-left: 5rpx;
					color: $color-warning;
				}
			}
		}
	}

	.list-cell {
		position: relative;

		.list-cell-content-wrap {}

		.right-icon {
			width: 20rpx;
			height: 32rpx;
		}

		&::after {
			width: 100%;
			content: '';
			border-bottom: 2rpx solid rgba(200, 199, 204, 0.3);
			position: absolute;
			bottom: 0;
			left: 30rpx;
		}
	}
</style>