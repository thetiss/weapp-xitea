<template>
	<view>
		<uni-transition :mode-class="['slide-bottom']" :styles="cartbarStyles" :show="!!cartNum" @change="change">
			<view class="bag-info d-flex align-items-center">
				<view class="bag flex-horizontal-center" @click="showBagDetailPopup">
					<image class="icon" :src="bagIcon"></image>
					<view class="badge">{{cartNum}}</view>
				</view>
				<view class="price">￥{{cartPrice}}</view>
			</view>
			<button class="flex-shrink-0 pay-btn text-extra-lg" type="primary" @click="pay">结算</button>
		</uni-transition>
		<cart-popup ref="cartPopup" :cart="cart" @add="add" @minus="minus" @clear="clear"></cart-popup>
	</view>
</template>

<script>
	import CartPopup from '../cart-popup/cart-popup.vue'
	export default {
		components: {
			CartPopup,
		},
		props: {
			cart: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				cartbarStyles: {
					'width': '100%',
					'height': '100rpx',
					'display': 'flex',
					'justify-content': 'space-between',
					'align-items': 'stretch',
					'background-color': '#f0f0f1',
					'border-bottom': '#c8c7cc',
					'position': 'fixed',
					'bottom': '0',
					'z-index': '995',
				},
				bagIcon: this.$imgHttps + '/static/images/index/icon_shopping_bag.png',
			}
		},
		computed: {
			cartNum() {
				return this.cart.reduce((acc, cur) => acc + cur.number, 0)
			},
			cartPrice() {
				return this.cart.reduce((acc, cur) => acc + cur.price * cur.number, 0)
			}
		},
		methods: {
			change() {

			},
			clear() {
				this.$emit('clear')
			},
			pay() {
				this.$emit('pay')
			},
			showBagDetailPopup() {
				this.$refs.cartPopup.open()
			},
			minus(product) {
				this.$emit('minus', product)
			},
			add(product) {
				this.$emit('add', {
					...product,
					number: 1
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.bag-info {

		.bag {
			width: 100rpx;
			height: 100rpx;
			margin: -20rpx 20rpx 0;
			border-radius: 100%;
			background-color: $bg-color-white;
			position: relative;

			.icon {
				width: 70rpx;
				height: 70rpx;
			}

			.badge {
				width: 1rem;
				height: 1rem;
				font-size: $font-size-sm;
				color: $bg-color-white;
				text-align: center;
				background-color: $color-primary;
				border-radius: 100%;
				position: absolute;
				right: 0;
				top: 0;
			}
		}

		.price {
			font-size: $font-size-extra-lg;
			color: $text-color-base;
			font-weight: bold;
		}
	}

	.pay-btn {
		padding: 0 70rpx;

	}
</style>