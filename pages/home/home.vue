<template>
	<view class="container">
		<swiper class="banner-swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item class="banner-swiper-item" v-for="(banner, bIdx) in bannerList" :key="bIdx">
				<image :src="banner" mode="widthFix"></image>
			</swiper-item>
		</swiper>
		<view class="plr-30">
			<view class="section-1 d-flex">
				<view class="item-wrap" v-for="(entrance, eIdx) in entranceList1" :key="eIdx">
					<navigator class="flex-vertical-center" :open-type="entrance.openType" :url="entrance.path"
						hover-class="none">
						<image class="mb-20" :src="entrance.icon" mode="widthFix"></image>
						<text class="title wenyue-font mb-10">{{entrance.title}}</text>
						<text class="text-color-assist">{{entrance.desc}}</text>
					</navigator>
				</view>
			</view>
			<view class="section-2 d-flex justify-content-between mt-30">
				<view class="item-wrap ptb-30" v-for="(entrance, eIdx) in entranceList2" :key="eIdx">
					<navigator class="flex-vertical-center" :open-type="entrance.openType" :url="entrance.path"
						hover-class="none">
						<view class="flex-horizontal-center">
							<image class="mr-10" :src="entrance.icon" mode="widthFix"></image>
							<text class="font-size-lg">{{entrance.title}}</text>
						</view>
						<text class="text-color-assist">{{entrance.desc}}</text>
					</navigator>
				</view>
			</view>
			<view class="section-3 flex-between-center mt-30 ">
				<navigator class="flex-fill d-flex flex-column" open-type="navigate" url="/pages/integral/mall"
					hover-class="none">
					<view class="font-size-lg mb-10"><text>我的积分</text><text class="neutra-font ml-10">{{integralCount}}</text>
					</view>
					<view class="text-color-assist">可兑换喜茶券和丰富灵感周边</view>
				</navigator>
				<navigator class="member-qrcode flex-vertical-center plr-30" open-type="navigate" url="/pages/my/code"
					hover-class="none">
					<image class="mb-10" :src="memberIcon" mode="widthFix"></image>
					<text class="text-color-assist">会员码</text>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bannerList: [
					"https://go.cdn.heytea.com/storage/ad/2020/05/21/bfd57914d80d4671b19f5d0ccc176cd5.jpg",
					"https://go.cdn.heytea.com/storage/ad/2020/05/24/49f9b50738dd47878cf1ab54c2eee2e0.jpg",
					"https://go.cdn.heytea.com/storage/ad/2020/05/01/e1c6915022c849fd9492377021aef454.jpg",
					"https://go.cdn.heytea.com/storage/ad/2020/04/27/db60b797c1cd4afabe9666e7df958ffd.jpg",
					"https://go.cdn.heytea.com/storage/ad/2020/05/21/4ba53dda599345bdaf28a08420dd1b6f.jpg"
				],
				entranceList1: [{
					icon: this.$imgHttps + '/static/images/home/home_icon_ziqu1.png',
					title: '门店自取',
					desc: '下单免排队',
					openType: 'switchTab',
					path: '/pages/index/index',
				}, {
					icon: this.$imgHttps + '/static/images/home/home_icon_ziqu1.png',
					title: '外卖',
					desc: '无需接触，送喜到家',
					openType: 'navigate',
					path: '/pages/addresses/addresses',
				}],
				entranceList2: [{
					icon: this.$imgHttps + '/static/images/home/home_icon_baihuo1.png',
					title: '喜茶百货',
					desc: '灵感商品 立即选购',
					openType: 'switchTab',
					path: '/pages/mart/mart',
				}, {
					icon: this.$imgHttps + '/static/images/home/home_icon_qiye1.png',
					title: '企业团餐',
					desc: '50份起送',
					openType: 'navigate',
					path: '/pages/home/group-dinner',
				}],
				integralCount: 63,
				memberIcon: this.$imgHttps + '/static/images/home/home_icon_erweima.png',
			}
		},
		methods: {}
	}
</script>

<style lang="scss" scoped>
	.banner-swiper {
		width: 100%;
		height: 600rpx;

		.banner-swiper-item {
			image {
				width: 100%;
			}
		}
	}

	.section-1 {
		padding: 60rpx 0;
		margin-top: -60rpx;
		position: relative;
		border-radius: $border-radius-lg;
		background-color: $bg-color-white;
		box-shadow: $box-shadow;

		.item-wrap {
			flex: 1;
			position: relative;

			image {
				width: 100rpx;
			}

			.title {
				font-size: 48rpx;
			}
		}

		.item-wrap:nth-child(1)::after {
			content: '';
			position: absolute;
			right: 0;
			top: 0;
			width: 2rpx;
			height: 100%;
			background-color: $border-color;

		}
	}

	.section-2 {
		.item-wrap {
			width: 335rpx;
			border-radius: $border-radius-lg;
			background-color: #EAEBEC;

			image {
				width: 60rpx;
			}
		}
	}

	.section-3 {
		padding: 0 10rpx;



		.neutra-font {
			font-size: 42rpx;
		}

		.member-qrcode {
			position: relative;

			image {
				width: 60rpx;
			}

			&::before {
				content: '';
				height: 100%;
				width: 2rpx;
				background-color: $border-color;
				position: absolute;
				left: 0;
			}
		}
	}
</style>