<template>
	<uni-popup ref="popup" type="bottom">
		<view class="modal-warp w-100">
			<view class="bg-white">
				<view class="header flex-between-center w-100">
					<view class="order-type flex-horizontal-center">
						<view class="text-color-base font-bold">门店订单</view>
						<view class="extra ml-10">自提/外送</view>
					</view>
					<view class="clear flex-horizontal-center" @close="$emit('clear')">
						<image class="c-icon mr-10" :src="clearIcon"></image>
						<text class="">清空购物车</text>
					</view>
				</view>
				<scroll-view scroll-y class="content">
					<view class="wrapper">
						<view class="list d-flex flex-column">
							<view class="item d-flex align-items-center" v-for="(item, index) in cart" :key="index">
								<view class="left flex-shrink-0">
									<image class="image" :src="item.image" mode="widthFix"></image>
								</view>
								<view class="right flex-fill">
									<view class="name font-bold">{{item.name}}</view>
									<view class="price flex-between-center">
										<view class="num">{{item.price}}</view>
										<actions :materialsBtn="!item.is_single" :number="item.number" @add="add(item)"
											@minus="minus(item)"></actions>
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
	import Actions from '../actions.vue'
	export default {
		components: {
			Actions,
		},
		props: {
			cart: {
				type: Array,
				default: () => [],
			}
		},
		watch: {},
		computed: {},
		data() {
			return {
				clearIcon: this.$imgHttps + '/static/images/common/delete.png',
			}
		},
		methods: {
			add(product) {
				this.$emit('add', product)
			},
			minus(product) {
				this.$emit('minus', product)
			},
			open() {
				this.$refs['popup'].open()
			},
			close() {
				this.$refs['popup'].close()
			},
		}
	}
</script>

<style lang="scss" scoped>
	.modal-warp {
		padding-bottom: 100rpx;
		background-color: $bg-color-white;

		.header {
			padding: 20rpx 30rpx;
			border-bottom: 1rpx solid rgba(200, 199, 204, 0.6);

			.extra {
				color: $color-primary;
				border: .5rpx solid $color-primary;
			}

			.clear {
				color: $text-color-assist;

				.c-icon {
					width: 46rpx;
					height: 46rpx;
				}
			}
		}

		.content {
			max-height: calc(100vh - 600rpx);

			.wrapper {
				width: 100%;
				height: 100%;
				padding: 0 30rpx;

				.list {

					.item {
						display: flex;
						align-items: stretch;
						padding: 30rpx 0;
						position: relative;

						&::after {
							content: '';
							border-bottom: 1rpx solid rgba(200, 199, 204, 0.6);
							position: absolute;
							left: 180rpx;
							right: 0;
							bottom: 0;
						}

						.left {
							.image {
								width: 180rpx;
							}
						}

						.right {
							display: flex;
							flex-direction: column;
							justify-content: space-between;
							font-size: $font-size-medium;
						}

					}
				}
			}
		}
	}
</style>