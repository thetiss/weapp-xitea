<template>
	<view class="container">
		<swiper class="swipper w-100" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(url, index) in detail.materialUrls" :key="index">
				<image :src="url" class="w-100" mode="widthFix"></image>
			</swiper-item>
		</swiper>
		<view class="p-30 mb-20 bg-white">
			<view class="mb-30 flex-between-center">
				<view class="text-color-primary text-extra-lg font-bold">￥{{ detail.salePrice | fenPriceFilter}}</view>
				<view class="text-sm text-color-assist">{{detail.itemSalesVolume}}人已购买</view>
			</view>
			<view class="mb-10 text-extra-lg">{{detail.name}}</view>
			<view class="mb-10 text-sm text-color-assist">{{detail.subName}}</view>
		</view>
		<view class="p-30 mb-20 bg-white text-sm">
			<view class="mb-40 d-flex">
				<view class="mr-40 text-color-assist">品牌</view>
				<view class="">{{detail.brand}}</view>
			</view>
			<view class="flex-between-center">
				<view class="mr-40 text-color-assist">发货</view>
				<view class="flex-fill flex-between-center">
					<view class="d-flex align-items-center">
						<view>{{detail.placeOfDispatch}}</view>
						<view class="divider"></view>
						<view>快递：￥{{detail.freight | fenPriceFilter}}</view>
					</view>
					<view class="text-color-assist">预计{{detail.daysAfterBuyRange}}日发货</view>
				</view>
			</view>
		</view>
		<view class="p-30 bg-white">
			<view class="mt-30 mb-30 text-center">商品详情</view>
		</view>
		<view class="footer w-100 fixed-bottom flex-between-center bg-white">
			<view class="grid d-flex align-items-center">
				<view class="item flex-vertical-center">
					<image class="mb-10" :src="martIcon"></image>
					<text>百货</text>
				</view>
				<view class="item flex-vertical-center ">
					<image class="mb-10" :src="chatIcon"></image>
					<text>客服</text>
				</view>
			</view>
			<view class="btns d-flex">
				<button type="info" class="mr-20" :plain="true">加入购物车</button>
				<button type="primary" :plain="true">立即购买</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				detail: {},
				swipperList: [],
				martIcon: this.$imgHttps + "/static/images/mall/store_brh_home_page_normal.png",
				chatIcon: this.$imgHttps + "/static/images/mall/store_brh_service_normal.png",
			}
		},
		onLoad(option) {
			this.id = option?.id
			this.getDetail()
		},
		methods: {
			async getDetail() {
				this.detail = await this.$api('martDetail')
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		height: auto;
		padding-bottom: 120rpx;

		.swipper {
			height: 750rpx;
		}

		.footer {
			height: 120rpx;
			padding: 10rpx 20rpx;

			.grid {

				.item {
					padding: 0 20rpx;

					image {
						width: 48rpx;
						height: 48rpx;
					}
				}
			}

			.btns {
				button {
					padding: 0 40rpx;
					font-size: $font-size-lg;
				}
			}
		}
	}
</style>