<template>
	<view class="modal-warp flex-horizontal-center">
		<uni-popup ref="popup">
			<view class="bg-white">
				<view class="header w-100">
					<image class="share mr-30" :src="shareIcon"></image>
					<image class="close" :src="closeIcon" @close="$emit('close')"></image>
				</view>
				<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
					<swiper-item class="swiper-item" v-for="(image, iIdx) in productData.images" :key="iIdx">
						<image class="img" :src="image.url"></image>
					</swiper-item>
				</swiper>
				<scroll-view scroll-y class="content">
					<view class="wrapper">
						<view class="title text-extra-lg text-color-base mb-10">{{productData.name}}</view>
						<view class="labels d-flex flex-wrap mb-10">
							<view class="label mr-10" v-for="(label, lIdx) in productData.labels" :key="lIdx"
								:style="{color: label.label_color, background: $util.hexToRgba(label.label_color, 0.2)}">
								{{label.name}}
							</view>
						</view>
						<view class="mb-10">产品描述</view>
						<view class="mb-20">{{productData.description}}</view>
						<view class="materials mb-20" v-for="(material, mIdx) in productData.materials" :key="mIdx">
							<view class="group-name">{{material.group_name}}</view>
							<view class="values d-flex flex-wrap">
								<view class="value mr-10" :class="{selected: val.is_selected}" v-for="(val, vIdx) in material.values"
									:key="vIdx" @click="changeMaterialSelected(mIdx, vIdx)">
									{{val.name}}
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
				<view class="bottom d-flex flex-column justify-content-between">
					<view class="price flex-between-center">
						<view class="overflow-hidden">
							<view class="">￥{{productData.price}}</view>
							<view class="" v-show="getProductSelectedMaterialsTxt">{{getProductSelectedMaterialsTxt}}</view>
						</view>
						<view class="flex-shrink-0 action">
							<actions :number="productData.number" @add="add" @minus="minus">
							</actions>
						</view>
					</view>
					<button class="mt-20 text-lg" type="primary" @click="addToCart">加入购物袋</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import Actions from '../actions.vue'
	export default {
		components: {
			Actions,
		},
		props: {
			visible: {
				type: Boolean,
				default: false,
			},
			product: {
				type: Object,
				default: () => {},
			},
			round: {
				type: Number,
				default: 10,
			}
		},
		watch: {
			product(nVal) {
				this.productData = Object.assign({}, nVal)
				this.$set(this.productData, 'number', 1)
			},
			visible(nVal) {
				if (nVal) {
					this.$refs.popup.open('center')
					return
				}
				this.$refs.popup.close()
			}
		},
		computed: {
			getProductSelectedMaterialsTxt() {
				if (!this.productData.is_single && this.productData.materials) {
					const materials = this.productData?.materials
					const list = materials.reduce((acc, cur) => {
						const selected = cur.values.reduce((sAcc, item) => {
							if (item.is_selected) {
								// sAcc += `${item.name}`
								sAcc?.push(item.name)
							}
							return sAcc
						}, [])
						// acc += selected
						acc?.push(selected)
						return acc
					}, [])
					return list?.filter(item => item?.length > 0).join(',')
				}
				return ''
			}
		},
		data() {
			return {
				productData: {}, // 商品详情
				shareIcon: this.$imgHttps + '/static/images/index/menupopup_btn_share_normal.png',
				closeIcon: this.$imgHttps + '/static/images/index/round_close_btn.png',
			}
		},
		methods: {
			addToCart() {
				const product = {
					...this.productData,
					'material_text': this.getProductSelectedMaterialsTxt
				}
				this.$emit('add-to-cart', product)
			},
			add() {
				this.productData.number += 1
			},
			minus() {
				if (this.productData.number === 1) return
				this.productData.number -= 1
			},
			changeMaterialSelected(materailIndex, valueIndex) {
				const curMaterial = this.productData.materials[materailIndex].values[valueIndex]
				this.productData.materials[materailIndex]?.values?.forEach(value => this.$set(value, 'is_selected', 0))
				curMaterial.is_selected = !curMaterial.is_selected
				this.productData.number = 1
			}
		}
	}
</script>

<style lang="scss" scoped>
	.modal-warp {
		font-size: $font-size-sm;
		color: $text-color-assist;
	}

	.header {
		padding: 20rpx 30rpx;
		position: absolute;
		display: flex;
		justify-content: flex-end;
		z-index: 9;

		.share,
		.close {
			width: 60rpx;
			height: 60rpx;
		}
	}

	.swiper {
		height: 426rpx;

		.swiper-item {

			.img {
				width: 100%;
				height: 100%;
			}
		}
	}

	.content {
		min-height: 1vh;
		max-height: calc(100vh - 100rpx - 426rpx - 250rpx);

		.wrapper {
			padding: 30rpx 30rpx 20rpx;

			.group-name {
				padding: 10rpx 0;
			}

			.label {
				max-width: 40%;
				padding: 6rpx 10rpx;

			}

			.value {
				padding: 10rpx 20rpx;
				background-color: #f5f5f7;
				border-radius: 8rpx;

				&.selected {
					background-color: $color-primary;
					color: #fff;
				}
			}
		}
	}

	.bottom {
		height: 250rpx;
		padding: 20rpx 40rpx;
		border-top: 1rpx solid rgba(200, 199, 204, .3);
	}
</style>