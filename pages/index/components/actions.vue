<template>
	<view class="comp-wrap d-flex align-items-center">
		<template v-if="!materialsBtn">
			<image v-show="number" class="operator-icon" :src="minusIcon" @click.stop="minus"></image>
			<view class="number flex-horizontal-center" v-show="number">{{number}}</view>
			<image class="operator-icon" :src="addIcon" @click.stop="add"></image>
		</template>
		<template v-else>
			<button type="primary" size="mini" data-func="property" @click.stop="$emit('materials')">选规格</button>
		</template>
	</view>
</template>

<script>
	export default {
		props: {
			materialsBtn: {
				type: Boolean,
				default: false,
			},
			number: {
				type: Number,
				default: 0,
			}
		},
		data() {
			return {
				minusIcon: this.$imgHttps + '/static/images/common/round_minus.png',
				addIcon: this.$imgHttps + '/static/images/common/round_add_normal.png',
			}
		},
		methods: {
			minus() {
				this.$emit('minus')
			},
			add() {
				this.$emit('add')
			},
		}
	}
</script>

<style lang="scss" scoped>
	.operator-icon {
		width: 44rpx;
		height: 44rpx;
	}

	.number {
		width: 44rpx;
		height: 44rpx;
		margin: 0 20rpx;
		font-size: $font-size-extra-lg;
	}

	button {
		font-size: $font-size-base;

		&[data-func='property'] {
			border-radius: 50rem !important;
		}
	}
</style>