<template>
	<view class="container">
		<view class="head-img w-100">
			<image :src="headImgSrc" mode="widthFix"></image>
		</view>
		<swiper class="banner-swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item class="banner-swiper-item" v-for="(banner, bIdx) in bannerList" :key="bIdx">
				<image :src="banner" mode="widthFix"></image>
			</swiper-item>
		</swiper>
		<view class="banner-entrance d-flex">
			<image :src="labImgSrc" mode="widthFix"></image>
			<image :src="inspirationImgSrc" mode="widthFix"></image>
		</view>
		<view class="plr-30">
			<view class="new-arrival">
				<view class="section-header ptb-20">
					<text class="title wenyue-font mr-20">新品推荐</text>
					<text class="subtitle">new arrivals</text>
				</view>
				<view class="section-body d-flex flex-column">
					<image class="mb-10" v-for="(item, idx) in newArrivalList" :key="idx" :src="item" mode="widthFix">
					</image>
				</view>
			</view>
			<view class="you-may-like">
				<view class="section-header ptb-20">
					<text class="title wenyue-font mr-20">猜你喜欢</text>
					<text class="subtitle">you may also like</text>
				</view>
				<view class="section-body d-flex flex-wrap justify-content-between">
					<navigator class="mart-item d-flex flex-column mb-20" v-for="(item, idx) in mart" :key="idx"
						open-type="navigate" :url="'/pages/mart/detail?id='+item.id" hover-class="none">
						<image class="product-img" :src="item.thumbnail" mode="widthFix"></image>
						<view class="info p-20 overflow-hidden">
							<view class="desc d-flex flex-column mb-20">
								<text class="w-100 font-size-lg text-truncate">{{item.name}}</text>
								<text class="font-size-sm text-color-assist">{{item.itemSalesVolume}}人已购买</text>
							</view>
							<view class="extra flex-between-center">
								<text class="price font-size-lg">￥{{item.salePrice}}</text>
								<image class="add-icon" :src="addIcon" mode="widthFix"></image>
							</view>
						</view>
					</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mart: [],
				headImgSrc: 'https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/fbd8ec7bc19541d1a692870bff4485b2.png',
				bannerList: [
					'https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/9af315b070af452ebe64c4dd4cd71b3a.png',
					'https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/8ed9b00fcbd444b496c550cf0adb2d4a.png',
					'https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/f85179a98f5b4b22b4f24019a6697ee2.png',
				],
				labImgSrc: 'https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/a3df4889c4154c51b8395337c6625d75.png',
				inspirationImgSrc: 'https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/f421c2db0d9d4cd19116dc1a450e0bf3.png',
				newArrivalList: [
					'https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/821f48529dab4a61a8b497e4867b9760.png',
					'https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/16ae5b0a73ce4abc9dcd4f4c97a1cdd6.jpg'
				],
				addIcon: this.$imgHttps + '/static/images/common/round_add_normal.png',
			}
		},
		async onLoad() {
			this.mart = await this.$api('mart')
		},
		methods: {}
	}
</script>

<style lang="scss" scoped>
	.head-img {
		height: 360rpx;

		image {
			width: 100%;
		}
	}

	.banner-swiper {
		height: 750rpx;

		.banner-swiper-item {
			image {
				width: 100%;
			}
		}
	}

	.banner-entrance {

		image {
			width: 100%;
		}
	}

	.section-header {
		display: flex;
		align-items: baseline;

		.title {
			font-size: 44rpx;
			letter-spacing: 4rpx;
		}

		.subtitle {
			font-size: $font-size-sm;
			color: $text-color-assist;
			text-transform: uppercase;
		}
	}

	.section-body {}

	.new-arrival {
		image {
			width: 100%;
		}
	}

	.you-may-like {
		.mart-item {
			width: 335rpx;
			background-color: $bg-color-white;
			border-radius: $border-radius-lg;

			.product-img {
				width: 100%;
				border-radius: $border-radius-lg $border-radius-lg 0 0;
			}

			.info {
				.desc {
					.title {
						margin-bottom: 14rpx;
					}
				}

				.extra {
					.price {
						color: $color-primary;
					}
				}
			}

			.add-icon {
				width: 40rpx;
				height: 40rpx;
			}
		}
	}
</style>