<template>
	<view class="container d-flex flex-column">
		<view class="header">
			<view class="search-box flex-horizontal-center">
				<view class="search-input w-100 flex-horizontal-center">
					<image class="icon mr-10" :src="searchIcon"></image>
					<text>搜索</text>
				</view>
			</view>
			<view class="center">
				<view class="store flex-between-center ">
					<view class="store-name d-flex align-items-center overflow-hidden">
						<image class="flex-shrink-0 star-icon" :src="starIcon"></image>
						<text class="text-lg font-bold text-truncate">{{storeName}}</text>
						<image class="flex-shrink-0 r-arrow-icon" :src="rightArrowIcon"></image>
					</view>
					<view class="switch-btns d-flex align-items-center">
						<button class="sw-btn" :class="{'active': !switchBtnIdx}" type="default"
							@tap="switchTabChange(0)">自取</button>
						<button class="sw-btn" :class="{'active': switchBtnIdx}" type="default"
							@tap="switchTabChange(1)">外卖</button>
					</view>
				</view>
				<view class="distance text-color-assist">距离您{{distance}}m</view>
			</view>
			<view class="notice d-flex text-color-assist">
				<swiper class="notice-swipper" vertical :autoplay="true" :interval="3000" :duration="1000">
					<swiper-item v-for="(notice, nIdx) in noticeList" :key="nIdx">
						<view class="notice-swiper-item d-flex align-items-center overflow-hidden">
							<image class="flex-shrink-0 n-icon mr-10" :src="notice.image"></image>
							<text class="n-content text-truncate">{{notice.content}}</text>
						</view>
					</swiper-item>
				</swiper>
				<view class="more pl-30 d-flex align-items-center">
					<text class="">更多</text>
					<image class="down-icon ml-10" :src="downArrowIcon"></image>
				</view>
			</view>
		</view>
		<view class="main">
			<scroll-view class="menu-bar" scroll-y>
				<view class="menu-wrap">
					<view class="cate-item flex-vertical-center overflow-hidden" :class="{active: curCategoryId == cate.id}"
						v-for="(cate,cIdx) in categories" :key="cIdx" @tap="handleMenuSelected(cate.id)">
						<image class="c-icon" :src="cate.category_image_url"></image>
						<text class="c-content text-truncate">{{cate.name}}</text>
					</view>
				</view>
			</scroll-view>
			<scroll-view class="product-list" scroll-y :scroll-top="productScrollTop">
				<view class="product-wrap">
					<view id="ads" class="ad-swipper">
						<swiper class="ad-swiper mb-20" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
							<swiper-item class="-ad-swiper-item" v-for="(headAd, haIdx) in headAdList" :key="haIdx">
								<image class="ad-img" :src="headAd"></image>
							</swiper-item>
						</swiper>
						<swiper class="ad-swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
							<swiper-item class="ad-swiper-item" v-for="(bottomAd, baIdx) in bottomAdList" :key="baIdx">
								<image class="ad-img" :src="bottomAd"></image>
							</swiper-item>
						</swiper>
					</view>
					<view class="product-group-list mb-20" v-for="(category, index) in categories" :id="'products-'+category.id"
						:key="index">
						<view class="list-header ptb-30">{{category.name}}</view>
						<view class="list-wrap">
							<view class="item d-flex align-items-center mb-40" v-for="(product, pIdx) in category.products"
								:key="pIdx" @click="showProductModal(product)">
								<image class="flex-shrink-0 i-image" :src="product.images[0].url" mode="widthFix"></image>
								<view class="i-infos overflow-hidden">
									<view class="name text-medium">{{product.name}}</view>
									<view class="tags-scroll d-flex flex-wrap">
										<view class="tag mr-10 text-truncate" v-for="(tag, tIdx) in product.labels" :style="{
											'color': tag.label_color,
											'background': $util.hexToRgba(tag.label_color, 0.2)
										}" :key="tIdx">
											{{tag.name}}
										</view>
									</view>
									<view class="desc text-sm text-color-assist mb-20">{{product.description}}</view>
									<view class="price flex-between-center">
										<view class="text-extra-lg font-bold">￥{{product.price}}</view>
										<actions :materialsBtn="!product.is_single" :number="singleProductCartNum(product.id)"
											@add="handleAddToCart(product)" @minus="handleMinusFromCart(product)"
											@materials="showProductModal(product)">
										</actions>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<product-modal :visible="productModalVisible" :product="product" @close="closeProductModal"
			@add-to-cart="handAddToCartInModal"></product-modal>
		<cart-bar :cart="cart" @pay="pay" @clear="clearall" @add="handleAddToCart" @minus="handleMinusFromCart"></cart-bar>
	</view>
</template>

<script>
	import Actions from './components/actions.vue'
	import ProductModal from './components/product-modal/product-modal.vue'
	import CartBar from './components/cartbar/cartbar.vue'

	export default {
		components: {
			Actions,
			ProductModal,
			CartBar,
		},
		data() {
			return {
				switchBtnIdx: 0, // 配送方式按钮
				distance: 99,
				storeName: '中心城店',
				noticeList: [],
				categories: [],
				productScrollTop: 0, // 右侧商品滑动条
				curCategoryId: '',
				productModalVisible: false, // 商品详情
				product: {},
				cart: [], // 购物车
				headAdList: [
					"https://go.cdn.heytea.com/storage/ad/2020/05/28/752a5519e89541bd8417614c599cf8c3.jpg",
					"https://go.cdn.heytea.com/storage/ad/2020/05/24/38b7f686cf10449c85b0f5489d5d958e.jpg",
					"https://go.cdn.heytea.com/storage/ad/2020/05/21/2315beb5105944e8b795c5c0084ec99f.jpg",
					"https://go.cdn.heytea.com/storage/ad/2020/05/21/b88c6780a73249b0b0166784917a5046.jpg",
				],
				bottomAdList: [
					"https://go.cdn.heytea.com/storage/ad/2020/05/21/acfc6504f3074cf6b730f516adc558f6.jpg",
					"https://go.cdn.heytea.com/storage/ad/2020/04/26/2373600789c64752b2415293877ead40.jpg",
					"https://go.cdn.heytea.com/storage/ad/2020/04/22/515df8c726e740089ae4c55582b4ce09.jpg",
					"https://go.cdn.heytea.com/storage/ad/2020/04/14/d0e51cb22c0a437293c0e6a879b59c7d.jpg",
				],
				searchIcon: this.$imgHttps + '/static/images/common/search-icon.png',
				starIcon: this.$imgHttps + '/static/images/common/star_normal.png',
				rightArrowIcon: this.$imgHttps + '/static/images/common/black_arrow_right.png',
				downArrowIcon: this.$imgHttps + '/static/images/common/gray_arrow_down.png',
			}
		},
		computed: {
			singleProductCartNum() {
				return (id) => {
					const num = this.cart.reduce((acc, cur) => {
						if (id == cur.id) {
							return (acc += cur.number)
						}
						return acc
					}, 0)
					return num
				}
			}
		},
		async onLoad() {
			this.categories = await this.$api('categories')
			this.noticeList = await this.$api('notices')
			this.curCategoryId = this.categories?.length && this.categories[0].id
			this.$nextTick(() => this.calcSize())
		},
		updated() {},
		methods: {
			pay() {

			},
			clearall() {

			},
			// 添加购物车(直接/根据某一规格匹配)
			handleAddToCart(product) {
				const index = this.cart.findIndex((item) => {
					if (!item.is_single) {
						// 如果是多个规格，要匹配所有规格是否一致
						return (item.id === product.id && item.material_text === product.material_text)
					}
					return (item.id === product.id)
				})
				// 购物车已有商品
				if (index > -1) {
					this.cart[index].number += product.number || 1
				}
				debugger
				// 购物车新添加商品
				this.cart.push({
					id: product.id,
					cate_id: product.category_id,
					name: product.name || '--', // falsy value 
					price: product.price,
					number: product.number || 1,
					image: product.images[0]?.url ?? '',
					is_single: product.is_single,
					material_text: product.material_text,
				})
			},
			handleMinusFromCart(product) {
				let index = -1
				if (product.is_single) {
					index = this.cart.findIndex(item => item.id === product.id)
				} else {
					index = this.cart.findIndex(item => item.id === product.id && item.material_text === product.material_text)
				}
				this.cart[index].number -= 1
				if (this.cart[index].number <= 0) {
					this.cart.splice(index, 1)
				}
			},
			handAddToCartInModal() {
				this.closeProductModal()
			},
			closeProductModal() {
				this.productModalVisible = false
				this.product = {}
			},
			showProductModal(product) {
				this.product = product
				this.productModalVisible = true
			},
			switchTabChange(idx) {
				if (this.switchBtnIdx === idx) return
				this.switchBtnIdx = idx
				// 外卖进入地址页面
				if (this.switchBtnIdx) {
					uni.navigateTo({
						url: '/pages/addresses/addresses'
					})
				}
			},
			handleMenuSelected(id) {
				if (id == this.curCategoryId) return
				this.productScrollTop = this.categories.find(item => item.id === id)?.top
				// 样式高亮
				this.$nextTick(() => (this.curCategoryId = id))
				// 产品列表居首位
			},
			calcSize() {
				let h = 0
				const adDom = uni.createSelectorQuery().select('#ads')
				adDom.fields({
					size: true
				}, (data) => {
					h += Math.floor(data.height)
				}).exec()

				this.categories.forEach(item => {
					let productsDom = uni.createSelectorQuery().select(`#products-${item.id}`)
					productsDom.fields({
						size: true
					}, (data) => {
						item.top = h
						h += Math.floor(data.height)
						item.bottom = h
					}).exec()
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		height: 100%;
		background-color: $bg-color-white;
	}

	.header {
		// z-index: 10;
		box-shadow: $box-shadow;

		.search-box {
			padding: 20rpx 40rpx;
			height: 100rpx;

			.search-input {
				height: 60rpx;
				background-color: #f7f7f7;
				border-radius: 50rem;

				.icon {
					width: 30rpx;
					height: 30rpx;
				}
			}
		}

		.center {
			height: 130rpx;
			padding: 10rpx 40rpx;

			.store {

				.store-name {
					flex: 1;

					.star-icon {
						width: 30rpx;
						height: 30rpx;
						margin: 10rpx;
					}

					.r-arrow-icon {
						width: 40rpx;
						height: 40rpx;
					}
				}
			}

			.switch-btns {
				padding: 4rpx;
				background-color: #f6f6f6;
				border-radius: 50rem;
				border: 2rpx solid #eaeaea;

				.sw-btn {
					width: 50%;
					border-radius: 50rem;
					font-size: $font-size-sm;
					line-height: 2.4;
					padding: 0 28rpx;

					&.active {
						background-color: #343434;
						color: #fff;
					}
				}
			}
		}

		.notice {
			height: 60rpx;
			padding: 10rpx 40rpx;

			.notice-swipper {
				flex: 1;
				height: 100%;
				width: 100%;

				.notice-swiper-item {
					height: 100%;
					width: 100%;

					.n-icon {
						width: 30rpx;
						height: 30rpx;
					}

					.n-content {
						flex: 1;
					}
				}
			}

			.more {
				.down-icon {
					width: 30rpx;
					height: 30rpx;
				}
			}
		}
	}

	.main {
		flex: 1;
		display: flex;
		overflow: hidden;


		.i-image {
			width: 180rpx;
		}

		.i-infos {

			.tags-scroll {
				margin-bottom: 8rpx;


				.tag {
					max-width: 40%;
					padding: 6rpx 10rpx;
					font-size: 20rpx;
				}
			}

			.desc {
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
			}
		}

		.menu-bar,
		.product-list {
			height: calc(100vh - 100rpx - 130rpx - 60rpx); // 通过计算header各个区块大小来的
		}

		.menu-bar {
			width: 170rpx;
			background-color: #f7f7f7;

			.menu-wrap {

				.cate-item {
					padding: 30rpx 20rpx;

					.c-icon {
						width: 50rpx;
						height: 50rpx;
					}

					&.active {
						background-color: $bg-color-white;
						font-weight: 500;
						color: $text-color-base;
						border-left: 7rpx solid $color-primary;
					}
				}
			}
		}

		.product-list {
			flex: 1;

			.product-wrap {
				padding: 0 20rpx;
				padding-bottom: 130rpx;

				.ad-swipper {

					.ad-swiper {
						height: 300rpx;

						.ad-swiper-item {

							.ad-img {
								width: 100%;
								height: 100%;
							}
						}
					}
				}
			}
		}
	}
</style>