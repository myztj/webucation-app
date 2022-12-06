<template>
	<view>
		<view class="coupon-list">
			<view class="coupon-item">
				<view class="coupon-left" :class="{'reduce':item.isgetcoupon}">
					<view class="price">￥{{item.price}}</view>
					<view class="title" v-if="item.value">{{item.value.title}}</view>
					<view class="title" v-if="!item.value">{{item.title}}</view>
				</view>
				<view class="coupon-right" hover-class="active" v-if="!item.value">立即使用</view>
				<view @click="getCoupon(item)" class="coupon-right reduce-width" :class="{'reduce':item.isgetcoupon}" hover-class="active" v-if="item.value">{{item.isgetcoupon?'已领取':'领取'}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import indexApi from "@/api/indexApi.js"
	export default {
		name:"z-coupon-item",
		props:{
			item:{
				type:Object,
				default:()=>({
					end_time:'2025-08-23 00:00:00',
					goods_id:1636,
					id:921,
					price:'4.00',
					start_time:'2022-07-15 00:00:00',
					value:{title:'中级经济法-知识点精讲课',id: 1636},
					type:'course',
					used:0,
					btn:"立即使用"
				})
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
           getCoupon(item){
			   this.$emit('getCoupon',item)
		   }
		}
	}
</script>

<style lang="scss">
.coupon-item{
	display: flex;
	margin: 20rpx 0;
	.coupon-left{
		width: 450rpx;
		background-color: #d39e00;
		padding: 20rpx;
		color: #fff;
		border-right: 1rpx dashed #fff;
		.price{
			font-size: 40rpx;
		}
		.title{
			font-size: 24rpx;
		}
	}
	.coupon-right{
		// flex: 1;
		background-color: #fec107;
		color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 200rpx;
	}
	.active{
		background-color: #d39e00;
	}
}
.reduce{
	background-color: #dae0e5 !important;
}
.reduce-width{
	width: 150rpx !important;
}
</style>