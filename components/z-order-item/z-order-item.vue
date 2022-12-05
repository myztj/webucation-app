<template>
	<view class="boos">
		<view class="orderItem-box">
			<view class="order-top">
				<view class="time-number">
					<text>订单时间：{{item.created_time}}</text>
					<text>订单号：{{item.no}}</text>
				</view>
			</view>
			<view class="order-bottom">
				<view class="goods-title">{{item.goods}}</view>
				<view class="goods-paice">￥{{item.price}}</view>
			</view>
		</view>
		<view class="order-status">
			<text>交易成功</text>
		</view>
		<view class="hint">没有更多数据了</view>
	</view>
</template>

<script>
export default {
	name: 'z-order-item',
	props:{
		item:{
			type:Object,
			default:()=>({
				created_time:'2022-09-03 16:11:09',
				goods:'[图文]uni-app实战商城类app和小程序',
				id:1211,
				no:'20229316119fyf2jo607',
				price:'0.00',
				status:'success',
				total_price:'0.00',
				type:'default'
			})
		}
	},
	data() {
		return {};
	}
};
</script>

<style lang="scss">
	page{

	}
.boos {
}
.orderItem-box {
	padding: 0rpx 30rpx;
	border-top: 1rpx solid #f5f5f3;
	border-bottom: 1rpx solid #f5f5f3;
	.order-top {	
		.time-number {
			display: flex;
			font-size: 24rpx;
			color: #6c757d;
			> text {
				padding: 40rpx 70rpx 20rpx 0;
				width: 254rpx;
				height: 64rpx;
			}
		}
	}
	.order-bottom {
		.goods-title{
			font-size: 34rpx;
			color: #333;
		}
		.goods-paice {
			text-align: right;
			font-weight: bold;
			font-size: 34rpx;
			color: #dc3545;
			margin-bottom: 20rpx;
		}
	}
}
.order-status{
	padding: 20rpx 30rpx;
	color: #1aa034;
}
.hint{
	border-top: 18rpx solid #f5f5f3;
	padding-top: 20rpx;
	text-align: center;
	font-size: 30rpx;
	color: rgb(119, 119, 119);
}
</style>
